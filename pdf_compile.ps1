# ============================================================
#  pdf_compile.ps1  —  Compile all module notes to PDF
#
#  Discovers every *_Module*_Notes.tex file under Short Notes
#  and compiles each one with xelatex (2 passes for TOC sync).
#
#  Skips automatically:
#    - _*.tex          (helper/preamble templates)
#    - *_Combined_Notes.tex  (use pdf_build_combined.ps1 for those)
#
#  Usage:
#    .\pdf_compile.ps1                                        # compile all modules
#    .\pdf_compile.ps1 -Subject "EC601"                      # one subject only
#    .\pdf_compile.ps1 -Module "EC601_Module2_Notes.tex"     # one file only
#    .\pdf_compile.ps1 -Passes 3                             # extra passes
#    .\pdf_compile.ps1 -KeepLogs                             # don't delete .log files
# ============================================================

param(
    [string]$Subject  = "",     # Filter by subject code, e.g. "EC601"
    [string]$Module   = "",     # Compile a single file (relative or absolute path)
    [int]   $Passes   = 2,      # Number of xelatex passes (default 2)
    [switch]$KeepLogs = $false, # Keep .log files after compilation
    [switch]$Clean    = $false  # Clean up all auxiliary build files and exit
)

$ROOT     = $PSScriptRoot
$COMPILER = "xelatex"

# ── Colour helpers ────────────────────────────────────────────────────────────
function Write-Ok   { param($m) Write-Host "  [OK]   $m" -ForegroundColor Green  }
function Write-Fail { param($m) Write-Host "  [FAIL] $m" -ForegroundColor Red    }
function Write-Info { param($m) Write-Host "  [..]   $m" -ForegroundColor Cyan   }
function Write-Head { param($m) Write-Host "`n$m"        -ForegroundColor Yellow }
function Write-Skip { param($m) Write-Host "  [SKIP] $m" -ForegroundColor DarkGray }

# ── Linter function to check for raw markdown syntax ──────────────────────────
function Test-MarkdownFormatting {
    param([string]$FilePath)
    
    $errors = @()
    if (-not (Test-Path $FilePath)) { return $errors }
    
    $lines = Get-Content -Path $FilePath -Encoding UTF8
    $inTikz = $false
    $lineNum = 0
    
    foreach ($line in $lines) {
        $lineNum++
        $trimmed = $line.Trim()
        
        if ($trimmed.Contains("\begin{tikzpicture}")) {
            $inTikz = $true
        }
        if ($trimmed.Contains("\end{tikzpicture}")) {
            $inTikz = $false
        }
        
        # Skip comments and empty lines
        if ($trimmed.StartsWith("%") -or $trimmed -eq "") {
            continue
        }
        
        # Check for raw markdown bold **
        if ($trimmed.Contains("**") -and -not $trimmed.Contains("\texttt{**}") -and -not $trimmed.Contains("\verb")) {
            $errors += "Line ${lineNum}: Raw bold '**' found: $trimmed"
        }
        
        # Check for raw bullets * or - outside TikZ
        if (-not $inTikz) {
            if ($trimmed -match "^\*[ \t]+\S") {
                $errors += "Line ${lineNum}: Raw asterisk list item found: $trimmed"
            }
            if ($trimmed -match "^-[ \t]+\S") {
                $errors += "Line ${lineNum}: Raw hyphen list item found: $trimmed"
            }
            if ($trimmed -match "^\d+\.[ \t]+\S" -and -not $trimmed.StartsWith("\item") -and -not ($trimmed -match "^\d+\.[ \t]+\\textbf")) {
                $errors += "Line ${lineNum}: Raw numbered list item found (needs \item inside enumerate): $trimmed"
            }
        }
    }
    return $errors
}

# ── Check xelatex ─────────────────────────────────────────────────────────────
if (-not (Get-Command $COMPILER -ErrorAction SilentlyContinue)) {
    $tinyTexPath = Join-Path $env:APPDATA "TinyTeX\bin\windows"
    if (Test-Path (Join-Path $tinyTexPath "xelatex.exe")) {
        $env:PATH = "$tinyTexPath;$env:PATH"
    }
}
if (-not (Get-Command $COMPILER -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] '$COMPILER' not found in PATH." -ForegroundColor Red
    Write-Host "        Install TeX Live or MiKTeX and ensure xelatex is on PATH." -ForegroundColor Red
    exit 1
}

# ── Ensure required packages ──────────────────────────────────────────────────
$requiredPkgs = @("caption","setspace","multirow","booktabs","tocloft")
foreach ($pkg in $requiredPkgs) {
    $check = kpsewhich "$pkg.sty" 2>&1
    if (-not $check) {
        Write-Info "Installing missing package: $pkg"
        tlmgr install $pkg 2>&1 | Out-Null
    }
}

# ── Collect .tex files ────────────────────────────────────────────────────────
if ($Module -ne "") {
    # Single file mode — accept relative or absolute path
    $resolved = if ([System.IO.Path]::IsPathRooted($Module)) { $Module } else { Join-Path $ROOT $Module }
    $texFiles = @(Get-Item $resolved -ErrorAction Stop)
} else {
    # Batch mode — find all *_Module*_Notes.tex files recursively
    $texFiles = Get-ChildItem -Path $ROOT -Filter "*.tex" -Recurse |
        Where-Object {
            # Must match module naming pattern
            $_.Name -match '_Module\d+_Notes\.tex$' -and
            # Skip helper/preamble files
            $_.Name -notmatch '^_' -and
            # Skip combined notes (handled by pdf_build_combined.ps1)
            $_.Name -notmatch '_Combined_Notes\.tex$'
        } |
        # Apply subject filter if given
        Where-Object { $Subject -eq "" -or $_.Name -match $Subject } |
        Sort-Object FullName
}

if ($texFiles.Count -eq 0) {
    Write-Host "[INFO] No module .tex files found." -ForegroundColor Yellow
    exit 0
}

if ($Clean) {
    Write-Head "============================================================"
    Write-Head "  Short Notes -- Cleaning Build Files"
    Write-Head "============================================================"
    $count = 0
    foreach ($tex in $texFiles) {
        $dir      = $tex.DirectoryName
        $name     = $tex.BaseName
        $auxExts  = "*.aux","*.toc","*.out","*.synctex.gz","*.fls","*.fdb_latexmk","*.log","*.tmp"
        foreach ($ext in $auxExts) {
            Get-ChildItem -Path $dir -Filter $ext |
                Where-Object { $_.BaseName -eq $name -or $_.BaseName -eq "${name}.out" -or $_.Name -match '\.tmp$' } |
                ForEach-Object {
                    Remove-Item $_.FullName -Force -ErrorAction SilentlyContinue
                    Write-Ok "Removed: $($_.Name)"
                    $count++
                }
        }
    }
    Write-Host "`n  Cleanup complete. Removed $count files.`n" -ForegroundColor Green
    exit 0
}

Write-Head "============================================================"
Write-Head "  Short Notes -- Module Compiler"
Write-Head "  Files  : $($texFiles.Count)"
Write-Head "  Passes : $Passes"
Write-Head "============================================================"

$success = 0
$failed  = 0
$skipped = 0
$results = @()

foreach ($tex in $texFiles) {
    $dir      = $tex.DirectoryName
    $name     = $tex.BaseName
    $fullPath = $tex.FullName
    $pdfPath  = Join-Path $dir "$name.pdf"

    Write-Head "► $($tex.Name)"

    # Lint for raw markdown syntax
    $lintErrors = Test-MarkdownFormatting -FilePath $fullPath
    if ($lintErrors.Count -gt 0) {
        Write-Fail "Markdown syntax check failed for $($tex.Name):"
        foreach ($err in $lintErrors) {
            Write-Host "    $err" -ForegroundColor Red
        }
        $failed++
        $results += [PSCustomObject]@{ File=$tex.Name; Status="FAIL (Lint)"; Size="-" }
        continue
    }

    $passOk = $true

    for ($pass = 1; $pass -le $Passes; $pass++) {
        Write-Info "Pass $pass / $Passes ..."

        $tmpOut = Join-Path $dir "$name.out.tmp"
        $tmpErr = Join-Path $dir "$name.err.tmp"

        $proc = Start-Process -FilePath $COMPILER `
            -ArgumentList @("-interaction=nonstopmode", "-halt-on-error",
                            "-output-directory", "`"$dir`"", "`"$fullPath`"") `
            -WorkingDirectory $dir -Wait -PassThru -NoNewWindow `
            -RedirectStandardOutput $tmpOut `
            -RedirectStandardError  $tmpErr

        Remove-Item $tmpOut -ErrorAction SilentlyContinue
        Remove-Item $tmpErr -ErrorAction SilentlyContinue

        if ($proc.ExitCode -ne 0) {
            $passOk = $false
            Write-Fail "xelatex exited with code $($proc.ExitCode) on pass $pass"
            $logFile = Join-Path $dir "$name.log"
            if (Test-Path $logFile) {
                Write-Host "`n  Last 25 lines of $name.log :" -ForegroundColor DarkYellow
                Get-Content $logFile -Tail 25 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkYellow }
            }
            break
        }
    }

    # Clean aux files
    $auxExts = "*.aux","*.toc","*.out","*.synctex.gz","*.fls","*.fdb_latexmk"
    foreach ($ext in $auxExts) {
        Get-ChildItem -Path $dir -Filter $ext |
            Where-Object { $_.BaseName -eq $name } |
            Remove-Item -ErrorAction SilentlyContinue
    }
    if (-not $KeepLogs) {
        $logFile = Join-Path $dir "$name.log"
        Remove-Item $logFile -ErrorAction SilentlyContinue
    }

    if ($passOk -and (Test-Path $pdfPath)) {
        # Secure the PDF with permissions from .env
        $secScript = Join-Path $ROOT "pdf_secure.py"
        if (Test-Path $secScript) {
            $null = & python $secScript $pdfPath 2>&1
        }
        $sizeKB  = [math]::Round((Get-Item $pdfPath).Length / 1KB, 1)
        $sizeStr = "$sizeKB KB"
        Write-Ok "$name.pdf  ($sizeStr) [Secured]"
        $success++
        $results += [PSCustomObject]@{ File=$tex.Name; Status="OK"; Size=$sizeStr }
    } else {
        Write-Fail "PDF not produced for $($tex.Name)"
        $failed++
        $results += [PSCustomObject]@{ File=$tex.Name; Status="FAIL"; Size="-" }
    }
}

# ── Summary ───────────────────────────────────────────────────────────────────
Write-Head "============================================================"
Write-Head "  SUMMARY"
Write-Head "============================================================"
$results | Format-Table -AutoSize

$colour = if ($failed -eq 0) { "Green" } else { "Yellow" }
Write-Host "  Compiled : $success / $($texFiles.Count)" -ForegroundColor $colour
if ($failed -gt 0) {
    Write-Host "  Failed   : $failed  (re-run with -KeepLogs to inspect .log files)" -ForegroundColor Red
}
Write-Host ""
