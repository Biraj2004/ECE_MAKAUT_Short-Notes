# ============================================================
#  pdf_build_combined.ps1  --  Build combined notes for every subject
#
#  Discovers subject folders automatically (any subfolder that
#  contains *_Module*_Notes.tex files).
#  For each subject it:
#    1. Reads all Module*.tex files in order
#    2. Extracts the module title from the first \section heading
#    3. Generates a self-contained combined .tex with shared preamble,
#       title page, synced TOC, and per-module headings
#    4. Compiles with xelatex (3 passes for stable TOC)
#    5. Cleans aux files
#
#  Usage:
#    .\pdf_build_combined.ps1                   # rebuild all subjects
#    .\pdf_build_combined.ps1 -Subject "EC601"  # one subject only
#    .\pdf_build_combined.ps1 -SkipCompile      # generate .tex only
# ============================================================

param(
    [string]$Subject     = "",
    [switch]$SkipCompile = $false,
    [switch]$Clean       = $false
)

$ROOT     = $PSScriptRoot
$COMPILER = "xelatex"
$PASSES   = 3

function Write-Ok   { param($m) Write-Host "  [OK]   $m" -ForegroundColor Green  }
function Write-Fail { param($m) Write-Host "  [FAIL] $m" -ForegroundColor Red    }
function Write-Info { param($m) Write-Host "  [..]   $m" -ForegroundColor Cyan   }
function Write-Head { param($m) Write-Host "`n$m"        -ForegroundColor Yellow }
function Write-Step { param($m) Write-Host "  >>  $m"   -ForegroundColor White  }

if (-not $SkipCompile -and -not (Get-Command $COMPILER -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] xelatex not found in PATH." -ForegroundColor Red; exit 1
}

# ---- Discover subject folders -----------------------------------------------
$subjectFolders = Get-ChildItem -Path $ROOT -Directory -Recurse |
    Where-Object { $_.Name -match '^\d+\.' } |
    Where-Object { (Get-ChildItem $_.FullName -Filter "*_Module*_Notes.tex" |
                    Where-Object { $_.Name -notmatch '^_' }).Count -gt 0 } |
    Sort-Object FullName

if ($Subject -ne "") {
    $subjectFolders = $subjectFolders | Where-Object {
        (Get-ChildItem $_.FullName -Filter "*_Module*_Notes.tex" |
         Where-Object { $_.Name -notmatch '^_' } |
         Select-Object -First 1).BaseName -match $Subject
    }
}

if ($subjectFolders.Count -eq 0) {
    Write-Host "[INFO] No subject folders found." -ForegroundColor Yellow; exit 0
}

if ($Clean) {
    Write-Head "============================================================"
    Write-Head "  Combined Notes Builder -- Cleaning Build Files"
    Write-Head "============================================================"
    $count = 0
    foreach ($folder in $subjectFolders) {
        $folderPath = $folder.FullName
        # Find all modules to get their subject codes
        $moduleFiles = Get-ChildItem -Path $folderPath -Filter "*_Module*_Notes.tex" |
            Where-Object { $_.Name -notmatch '^_' -and $_.Name -notmatch '_Combined_' }
        if ($moduleFiles.Count -eq 0) { continue }
        $subjectCode = $moduleFiles[0].BaseName -replace '_Module.*',''
        
        # Extensions to clean
        $exts = '*.aux','*.toc','*.out','*.synctex.gz','*.fls','*.fdb_latexmk','*.log','*_Combined_Notes.tex','_comb.out.tmp','_comb.err.tmp'
        foreach ($ext in $exts) {
            Get-ChildItem -Path $folderPath -Filter $ext |
                Where-Object { $_.Name -like "*${subjectCode}*" -or $_.Name -match '_comb\.(out|err)\.tmp' } |
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
Write-Head "  Combined Notes Builder  --  $($subjectFolders.Count) subject(s)"
Write-Head "============================================================"

$results = @()

foreach ($folder in $subjectFolders) {
    $folderPath = $folder.FullName

    # ---- Collect module files -----------------------------------------------
    $moduleFiles = Get-ChildItem -Path $folderPath -Filter "*_Module*_Notes.tex" |
        Where-Object { $_.Name -notmatch '^_' -and $_.Name -notmatch '_Combined_' } |
        Sort-Object { [int]($_.BaseName -replace '.*Module(\d+).*','$1') }

    if ($moduleFiles.Count -eq 0) { continue }

    $firstFile   = $moduleFiles[0]
    $subjectCode = $firstFile.BaseName -replace '_Module.*',''   # e.g. EC601
    $outTex      = Join-Path $folderPath "${subjectCode}_Combined_Notes.tex"

    Write-Head "------------------------------------------------------------"
    Write-Step "Subject : $subjectCode   Modules : $($moduleFiles.Count)"

    # ---- Extract subject name from title block ------------------------------
    $firstLines  = Get-Content $firstFile.FullName -Encoding UTF8
    $titleLine   = $firstLines | Where-Object { $_ -cmatch 'LARGE' -and $_ -cmatch 'bfseries' -and $_ -cmatch 'myred' } | Select-Object -First 1
    $subjectFull = if ($titleLine) {
        ($titleLine -replace '.*\\color\{myred\}\s*','') -replace '\}\\.*','' -replace '^\s+|\s+$',''
    } else { $subjectCode }
    $cleanName   = ($subjectFull -split [char]0x2014)[-1].Trim()
    if ($cleanName -eq $subjectFull) { $cleanName = ($subjectFull -split '---')[-1].Trim() }
    if (-not $cleanName)             { $cleanName = $subjectCode }
    $safeName    = ($cleanName -replace '\\&','and' -replace '&','and' -replace '[^\w\s]','' -replace '\s+','_').Trim('_')
    $outPdf      = Join-Path $folderPath "${subjectCode}_${safeName}.pdf"

    # ---- Extract credit line ------------------------------------------------
    $creditMatch = $firstLines | Select-String 'Semester .*Credits' | Select-Object -First 1
    $creditStr   = if ($creditMatch) {
        ($creditMatch.Line -replace '^\s*\{\\normalsize\\color\{[^}]+\}\s*','') -replace '\}\\\\.*','' -replace '^\s+|\s+$',''
    } else { 'Semester' }

    # ---- Extract module titles from first \section of each module -----------
    $moduleTitles = @{}
    foreach ($mf in $moduleFiles) {
        $mNum  = [int]($mf.BaseName -replace '.*Module(\d+).*','$1')
        $mLine = Get-Content $mf.FullName -Encoding UTF8 | Select-String '^\\section\{' | Select-Object -First 1
        $moduleTitles[$mNum] = if ($mLine) {
            ($mLine.Line -replace '^\\section\{','') -replace '\}.*','' `
                         -replace '\\texorpdfstring\{[^}]*\}\{[^}]*\}','' `
                         -replace '\\[a-zA-Z]+\{([^}]*)\}','$1' `
                         -replace '\\[a-zA-Z]+','' -replace '^\s+|\s+$',''
        } else { "Module $mNum" }
    }

    # ---- Extract \tcbset block from first module ----------------------------
    $tcbLines = @(); $inTcb = $false
    foreach ($line in $firstLines) {
        if ($line -match '\\tcbset\s*\{' -and -not $inTcb) { $inTcb = $true; $tcbLines += $line; continue }
        if ($inTcb) { $tcbLines += $line; if ($line -match '^\}') { $inTcb = $false; break } }
    }
    # Patch exambox: ensure breakable is present
    $tcbBlock = ($tcbLines -join "`n") -replace '(fonttitle=\\bfseries\s*)\}(\s*\})', '$1, breakable}$2'

    # ---- Extract and merge \tikzset blocks from ALL modules ----------------
    $mergedStyles = [ordered]@{}

    foreach ($mf in $moduleFiles) {
        $mLines2 = Get-Content $mf.FullName -Encoding UTF8
        $inTikz2 = $false
        $curName = $null
        $curLines = @()

        foreach ($line in $mLines2) {
            if (-not $inTikz2 -and $line -match '\\tikzset\s*\{') {
                $inTikz2 = $true; continue
            }
            if (-not $inTikz2) { continue }

            if ($line -match '^\}\s*$') {
                if ($curName -and -not $mergedStyles.Contains($curName)) {
                    $mergedStyles[$curName] = $curLines
                }
                $inTikz2 = $false; $curName = $null; $curLines = @()
                break
            }

            if ($line -match '^\s*(\w+)/\.style\s*=') {
                if ($curName -and -not $mergedStyles.Contains($curName)) {
                    $mergedStyles[$curName] = $curLines
                }
                $curName = $Matches[1]
                $curLines = @($line)
            } elseif ($curName) {
                $curLines += $line
            }
        }
    }

    # Build merged tikzset block
    $tikzParts = @('\tikzset{')
    $styleNames = @($mergedStyles.Keys)
    for ($si = 0; $si -lt $styleNames.Count; $si++) {
        $sLines = $mergedStyles[$styleNames[$si]]
        $lastLine = $sLines[-1]
        if ($si -lt $styleNames.Count - 1) {
            if ($lastLine -notmatch ',\s*$') { $lastLine = $lastLine + ',' }
        } else {
            $lastLine = $lastLine -replace ',\s*$',''
        }
        $sLines[-1] = $lastLine
        $tikzParts += $sLines
    }
    $tikzParts += '}'
    $tikzBlock = $tikzParts -join "`n"

    # ---- Extract colour definitions from first module -----------------------
    $colourBlock = ($firstLines | Select-String '\\definecolor') -join "`n"

    # =========================================================================
    # Build the .tex file using a StringBuilder
    # =========================================================================
    $sb = [System.Text.StringBuilder]::new()

    # -- Preamble packages ----------------------------------------------------
    $preamble = @'
\documentclass[12pt,a4paper]{article}
\usepackage[a4paper, margin=0.8in, headheight=14pt]{geometry}
\usepackage{fontspec}
\usepackage{unicode-math}
\setmainfont{TeX Gyre Pagella}
\setmonofont[Scale=0.88]{TeX Gyre Cursor}
\setmathfont{Latin Modern Math}
\usepackage{xcolor}
\usepackage{colortbl}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage{tabularx}
\usepackage{booktabs}
\usepackage{array}
\usepackage{amsmath}
\usepackage{tikz}
\usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, fit, decorations.pathreplacing, decorations.pathmorphing}
\usepackage{tcolorbox}
\tcbuselibrary{skins, breakable}
\usepackage{hyperref}
\usepackage{fancyhdr}
\usepackage{graphicx}
\usepackage{microtype}
\hyphenpenalty=10000
\exhyphenpenalty=10000
\sloppy
\usepackage{caption}
\usepackage{setspace}
\usepackage{multirow}
\usepackage{tocloft}
\newcommand{\Q}[1]{\textbf{#1}\par\noindent\ignorespaces}
'@
    [void]$sb.AppendLine($preamble)

    # -- Colours --------------------------------------------------------------
    [void]$sb.AppendLine($colourBlock)
    [void]$sb.AppendLine('')

    # -- Section formatting ---------------------------------------------------
    $secFmt = @'
\titleformat{\section}{\large\bfseries\color{myred}}{\thesection.}{0.5em}{}[\vspace{1pt}{\color{myred}\rule{\linewidth}{0.8pt}}]
\titleformat{\subsection}{\normalsize\bfseries\color{myteal}}{\thesubsection}{0.5em}{}
\titlespacing*{\section}{0pt}{18pt}{7pt}
\titlespacing*{\subsection}{0pt}{11pt}{4pt}
\setlength{\parindent}{0pt}
\setlength{\parskip}{4pt}
'@
    [void]$sb.AppendLine($secFmt)

    # -- TOC styling ----------------------------------------------------------
    $tocFmt = @'
\renewcommand{\cfttoctitlefont}{\large\bfseries\color{myred}}
\renewcommand{\cftaftertoctitle}{\par\noindent{\color{myred}\rule{\linewidth}{0.8pt}}}
\setlength{\cftbeforetoctitleskip}{0pt}
\setlength{\cftaftertoctitleskip}{6pt}
\renewcommand{\cftsecfont}{\normalsize\bfseries\color{mydark}}
\renewcommand{\cftsecpagefont}{\normalsize\bfseries\color{mydark}}
\renewcommand{\cftsecleader}{\cftdotfill{\cftdotsep}}
\setlength{\cftbeforesecskip}{7pt}
\renewcommand{\cftsubsecfont}{\small\color{mydark}}
\renewcommand{\cftsubsecpagefont}{\small\color{mydark}}
\setlength{\cftbeforesubsecskip}{3pt}
\setlength{\cftsubsecindent}{1.4em}
\renewcommand{\cftpartfont}{\normalsize\bfseries\color{myteal}}
\renewcommand{\cftpartpagefont}{\normalsize\bfseries\color{myteal}}
\setlength{\cftbeforepartskip}{14pt}
'@
    [void]$sb.AppendLine($tocFmt)

    # -- Table helpers --------------------------------------------------------
    $tblFmt = @'
\renewcommand{\arraystretch}{1.45}
\setlength{\tabcolsep}{6pt}
\arrayrulecolor{mydark}
\newcolumntype{B}[1]{>{\small\bfseries\raggedright\arraybackslash}m{#1}}
\newcolumntype{C}[1]{>{\centering\arraybackslash}m{#1}}
\newcolumntype{Y}{>{\small\raggedright\arraybackslash}X}
\renewcommand{\tabularxcolumn}[1]{m{#1}}
'@
    [void]$sb.AppendLine($tblFmt)

    # -- Header/footer --------------------------------------------------------
    [void]$sb.AppendLine('\newcommand{\currmodule}{Module 1}')
    [void]$sb.AppendLine('\pagestyle{fancy}')
    [void]$sb.AppendLine('\fancyhf{}')
    [void]$sb.AppendLine('\fancyhead[L]{\small\color{myred}\textbf{' + $subjectCode + '}\;\color{mydark}--- ' + $cleanName + '}')
    [void]$sb.AppendLine('\fancyhead[R]{\small\color{myteal}\textbf{\currmodule\ Notes}}')
    [void]$sb.AppendLine('\fancyfoot[C]{\small\color{mydark}\thepage}')
    [void]$sb.AppendLine('\fancyfoot[R]{\small\color{watermark}\textit{\copyright\ Biraj}}')
    [void]$sb.AppendLine('\renewcommand{\headrulewidth}{0.5pt}')
    [void]$sb.AppendLine('\renewcommand{\footrulewidth}{0.3pt}')
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('\hypersetup{colorlinks=true, linkcolor=myteal, urlcolor=myteal,')
    [void]$sb.AppendLine('  pdfauthor={Biraj Sarkar},')
    [void]$sb.AppendLine('  pdftitle={' + $subjectCode + ' --- Combined Notes}}')
    [void]$sb.AppendLine('')

    # -- tcolorbox styles (extracted from first module) -----------------------
    [void]$sb.AppendLine($tcbBlock)
    # CRITICAL FIX: XeLaTeX does not support pdfcol color stacks (used by the
    # tcolorbox breakable library). Without this, coltitle=white leaks out of
    # any breakable box and makes all subsequent body text invisible.
    # Solution: after every tcolorbox closes, explicitly reset text color to black.
    [void]$sb.AppendLine('\tcbset{after={\color{black}}}')
    [void]$sb.AppendLine('')

    # -- TikZ styles (merged from all modules) --------------------------------
    [void]$sb.AppendLine($tikzBlock)
    [void]$sb.AppendLine('')

    # -- Module heading command -----------------------------------------------
    $modCmd = @'
\newcommand{\modulestart}[2]{%
  \clearpage
  \renewcommand{\currmodule}{Module #1}%
  \phantomsection
  \addcontentsline{toc}{part}{Module #1: #2}%
  \setcounter{section}{0}%
  \begin{center}
    \vspace*{1.0cm}
    {\Huge\bfseries\color{myred} Module #1}\\[10pt]
    {\Large\bfseries\color{mydark} #2}\\[10pt]
    {\color{myred}\rule{0.55\linewidth}{1.2pt}}
  \end{center}
  \vspace{14pt}
}
'@
    [void]$sb.AppendLine($modCmd)

    # -- Begin document -------------------------------------------------------
    [void]$sb.AppendLine('\begin{document}')
    [void]$sb.AppendLine('')

    # -- Title page -----------------------------------------------------------
    [void]$sb.AppendLine('\thispagestyle{empty}')
    [void]$sb.AppendLine('\vspace*{1.0cm}')
    [void]$sb.AppendLine('\begin{center}')
    [void]$sb.AppendLine('  {\Huge\bfseries\color{myred} ' + $subjectCode + '}\\[10pt]')
    [void]$sb.AppendLine('  {\LARGE\bfseries\color{mydark} ' + $cleanName + '}\\[20pt]')
    [void]$sb.AppendLine('  {\color{myred}\rule{0.7\linewidth}{1.5pt}}\\[18pt]')
    [void]$sb.AppendLine('  {\Large\color{myteal}\textbf{Combined Module Notes}}\\[8pt]')
    [void]$sb.AppendLine('  {\large\color{mydark} Modules 1 -- ' + $moduleFiles.Count + '}\\[40pt]')
    [void]$sb.AppendLine('  {\normalsize\color{mydark} ' + $creditStr + '}\\[12pt]')
    [void]$sb.AppendLine('  {\normalsize\color{mydark} CGEC \;$|$\; B.Tech ECE (2023--27)}\\[6pt]')
    [void]$sb.AppendLine('  {\normalsize\color{mydark}\textit{Biraj Sarkar}}')
    [void]$sb.AppendLine('\end{center}')
    [void]$sb.AppendLine('\vspace{1.0cm}')
    [void]$sb.AppendLine('\begin{center}')
    [void]$sb.AppendLine('  \begin{tcolorbox}[colback=mygray, colframe=mgframe, boxrule=0.5pt, arc=3pt, width=0.85\linewidth]')
    [void]$sb.AppendLine('    \centering\small\color{mydark}')
    [void]$sb.AppendLine('    \textbf{Disclaimer / Study Guide Notice:}\\')
    [void]$sb.AppendLine('    These are condensed \textbf{Short Notes} focusing on core theory, key formulas, block/circuit diagrams, and standard viva Q\&As for university exam revision. Exhaustive numerical practice problems and derivation edge cases are not covered. This serves as a quick-revision reference guide for students.')
    [void]$sb.AppendLine('  \end{tcolorbox}')
    [void]$sb.AppendLine('\end{center}')
    [void]$sb.AppendLine('\vfill')
    [void]$sb.AppendLine('\begin{center}{\small\color{watermark}\textit{Exam-Ready Notes}}\end{center}')
    [void]$sb.AppendLine('\clearpage')
    [void]$sb.AppendLine('')
    [void]$sb.AppendLine('\hypersetup{linkcolor=mydark}')
    [void]$sb.AppendLine('\tableofcontents')
    [void]$sb.AppendLine('\hypersetup{linkcolor=myteal}')
    [void]$sb.AppendLine('\clearpage')
    [void]$sb.AppendLine('')

    # ---- Module bodies ------------------------------------------------------
    foreach ($mf in $moduleFiles) {
        $mNum   = [int]($mf.BaseName -replace '.*Module(\d+).*','$1')
        $mTitle = $moduleTitles[$mNum]
        $mLines = Get-Content $mf.FullName -Encoding UTF8

        # Body start: first \section (walk back one line for %=== comment)
        $bodyStart = -1
        for ($i = 0; $i -lt $mLines.Count; $i++) {
            if ($mLines[$i] -match '^\\section\{') {
                $bodyStart = if ($i -gt 0 -and $mLines[$i-1] -match '^%[=]') { $i-1 } else { $i }
                break
            }
        }
        # Body end: line before \end{document}
        $endIdx = -1
        for ($i = $mLines.Count-1; $i -ge 0; $i--) {
            if ($mLines[$i] -match '\\end\{document\}') { $endIdx = $i; break }
        }

        if ($bodyStart -lt 0 -or $endIdx -lt 0) {
            Write-Fail "Cannot find body in $($mf.Name) -- skipping"; continue
        }

        $body = $mLines[$bodyStart..($endIdx-1)] -join "`n"

        [void]$sb.AppendLine('% -- Module ' + $mNum + ' -----------------------------------------------------------------')
        [void]$sb.AppendLine('\modulestart{' + $mNum + '}{' + $mTitle + '}')
        [void]$sb.AppendLine('')
        [void]$sb.AppendLine($body)
        [void]$sb.AppendLine('')
    }

    [void]$sb.AppendLine('\end{document}')

    # ---- Write file (UTF-8 without BOM) ------------------------------------
    $utf8NoBom = [System.Text.UTF8Encoding]::new($false)
    [System.IO.File]::WriteAllText($outTex, $sb.ToString(), $utf8NoBom)
    $texKB = [math]::Round((Get-Item $outTex).Length/1KB, 1)
    Write-Ok "Generated: $(Split-Path $outTex -Leaf)  ($texKB KB)"

    # ---- Compile ------------------------------------------------------------
    if ($SkipCompile) {
        $results += [PSCustomObject]@{ Subject=$subjectCode; Modules=$moduleFiles.Count; Status='TEX only'; PDF='-'; KB=$texKB }
        continue
    }

    $compileOk = $true
    for ($pass = 1; $pass -le $PASSES; $pass++) {
        Write-Info "Compiling pass $pass / $PASSES ..."
        $tmpOut = Join-Path $folderPath '_comb.out.tmp'
        $tmpErr = Join-Path $folderPath '_comb.err.tmp'
        $proc = Start-Process -FilePath $COMPILER `
            -ArgumentList @('-interaction=nonstopmode', '-halt-on-error',
                            '-output-directory', "`"$folderPath`"", "`"$outTex`"") `
            -WorkingDirectory $folderPath -Wait -PassThru -NoNewWindow `
            -RedirectStandardOutput $tmpOut -RedirectStandardError $tmpErr
        Remove-Item $tmpOut,$tmpErr -ErrorAction SilentlyContinue

        if ($proc.ExitCode -ne 0) {
            $compileOk = $false
            Write-Fail "xelatex failed on pass $pass (exit $($proc.ExitCode))"
            $logFile = Join-Path $folderPath "${subjectCode}_Combined_Notes.log"
            if (Test-Path $logFile) {
                Write-Host "`n  Last 30 lines of log:" -ForegroundColor DarkYellow
                Get-Content $logFile -Tail 30 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkYellow }
            }
            break
        }
    }

    # Clean aux files
    foreach ($ext in '*.aux','*.toc','*.out','*.synctex.gz','*.fls','*.fdb_latexmk') {
        Get-ChildItem -Path $folderPath -Filter $ext | Remove-Item -ErrorAction SilentlyContinue
    }

    if ($compileOk -and (Test-Path (Join-Path $folderPath "${subjectCode}_Combined_Notes.pdf"))) {
        $rawPdf    = Join-Path $folderPath "${subjectCode}_Combined_Notes.pdf"
        if ($outPdf -ne $rawPdf -and (Test-Path $outPdf)) { Remove-Item $outPdf -Force }
        Rename-Item $rawPdf $outPdf -Force
        $pdfKB = [math]::Round((Get-Item $outPdf).Length/1KB, 1)
        $logFile = Join-Path $folderPath "${subjectCode}_Combined_Notes.log"
        $pageInfo = if (Test-Path $logFile) {
            (Get-Content $logFile | Select-String 'Output written' | Select-Object -Last 1).Line
        } else { '' }
        $pages = if ($pageInfo -match '\((\d+) page') { $Matches[1] } else { '?' }
        Remove-Item $logFile -ErrorAction SilentlyContinue
        Write-Ok "PDF ready: $(Split-Path $outPdf -Leaf)  ($pdfKB KB, $pages pages)"
        $results += [PSCustomObject]@{ Subject=$subjectCode; Modules=$moduleFiles.Count; Status='OK'; PDF=$(Split-Path $outPdf -Leaf); KB=$pdfKB }
    } else {
        $results += [PSCustomObject]@{ Subject=$subjectCode; Modules=$moduleFiles.Count; Status='FAIL'; PDF='-'; KB=0 }
    }
}

Write-Head "============================================================"
Write-Head "  SUMMARY"
Write-Head "============================================================"
$results | Format-Table -AutoSize
Write-Host ""
