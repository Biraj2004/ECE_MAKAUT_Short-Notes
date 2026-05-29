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
    [switch]$KeepLogs = $false  # Keep .log files after compilation
)

$ROOT     = $PSScriptRoot
$COMPILER = "xelatex"

# ── Colour helpers ────────────────────────────────────────────────────────────
function Write-Ok   { param($m) Write-Host "  [OK]   $m" -ForegroundColor Green  }
function Write-Fail { param($m) Write-Host "  [FAIL] $m" -ForegroundColor Red    }
function Write-Info { param($m) Write-Host "  [..]   $m" -ForegroundColor Cyan   }
function Write-Head { param($m) Write-Host "`n$m"        -ForegroundColor Yellow }
function Write-Skip { param($m) Write-Host "  [SKIP] $m" -ForegroundColor DarkGray }

# ── Check xelatex ─────────────────────────────────────────────────────────────
if (-not (Get-Command $COMPILER -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] '$COMPILER' not found in PATH." -ForegroundColor Red
    Write-Host "        Install TeX Live or MiKTeX and ensure xelatex is on PATH." -ForegroundColor Red
    exit 1
}

# ── Ensure required packages ──────────────────────────────────────────────────
$requiredPkgs = @("caption","setspace","multirow","booktabs","tocloft")
foreach ($pkg in $requiredPkgs) {
    $check = tlmgr info $pkg 2>&1 | Select-String "installed: Yes"
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
        $sizeKB  = [math]::Round((Get-Item $pdfPath).Length / 1KB, 1)
        $sizeStr = "$sizeKB KB"
        Write-Ok "$name.pdf  ($sizeStr)"
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
