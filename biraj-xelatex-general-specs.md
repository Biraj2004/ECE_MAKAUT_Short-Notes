# LaTeX Doc General Specs — Biraj's Notes

## Page & Body

```
Page: A4, margin 0.8in all sides
Writing-Style: While writing prefer to use simple commonly used words which are easier to understand than complex words unless really needed, understand and do accordingly.
Class: \documentclass[12pt]{article}
Body: 12pt fixed
Global Line spacing: 1.2 (\setstretch{1.2})
Para indent: 0pt | Para skip: 5pt
Hyphenation: disabled (\hyphenpenalty=10000, \exhyphenpenalty=10000)
left aligned, not use justify contents until specified
use paraindent only for bullet points, bracketed alphabetic points (a), (b), (c), and roman numerals (i., ii., iii.) — DO NOT use direct natural numbers (1, 2, 3) in answer points. Always indent lists INWARDS (Level 1: leftmargin=2.75em, Level 2 subpoints: leftmargin=2.50em, Level 3 subpoints: leftmargin=2.50em) to establish a clear visual hierarchy relative to body text. Choose whichever of (a), (b), (c), bullet points, or i., ii., iii. is most suitable for each answer. Understand first then do it.
```

## Heading Scale & Multi-Line Heading Spacing

```
Step 1: Scan the actual heading tree depth of THIS document
        (top-level only? +1 sub? +sub-sub? +sub-sub-sub?)
Step 2: Build bottom-up from body (12pt fixed)
        deepest sub-heading present = body + 2pt
        each level up from there = +2pt more
Step 3: Apply top-level exception LAST
        top-level = its direct child's size + 3pt
        (not +2pt) — plus centered, bold, CAPS
Never assume/reserve a size for a level that isn't in the doc.
Only Top level heading should be bold, centered, all CAPS.

Multi-Line Heading Line Spacing Rule:
When a long title or heading wraps into 2 or more lines, set `baselineskip` proportionally to 1.2x font size (e.g. \fontsize{21}{26}\selectfont for 21pt font, \fontsize{18}{22}\selectfont for 18pt font, \fontsize{16}{20}\selectfont for 16pt font, \fontsize{15}{18}\selectfont for 15pt font) ended with \par so that inter-line spacing between wrapped heading lines is comfortable (1.2 line height), never tight or squished.

Example — doc with Top-level + 1 sub-level only:
  Body            12pt  regular
  Sub-heading     14pt  bold        (12 + 2)
  Top-level       17pt  bold, centered, CAPS   (14 + 3)

Example — doc with Top-level + 3 nested sub-levels:
  Body              12pt  regular
  Level 3 (1.1.1)   14pt  bold
  Level 2 (1.1)     16pt  bold
  Level 1 (1.)      18pt  bold
  Top-level         21pt  bold, centered, CAPS
```

## Header & Footer

```
Header rule:  none (\headrulewidth = 0pt)
Footer rule:  none by default (\footrulewidth = 0pt) — do not add unless asked
Page number:  centered in footer
Branding:     "\copyright~Biraj's Notes" — muted/deep purple (\textcolor{mainpurple}{\textit{\copyright~Biraj's Notes}}) — bottom-RIGHT of footer
              Include by default on every page
              OMIT when explicitly told to remove branding for that doc (footers then show only centered page numbers) —
              apply this instruction per-document going forward without
              needing to be reminded each time
```

## Fonts (XeLaTeX)

```
Main:  TeX Gyre Pagella      \setmainfont{TeX Gyre Pagella}
Mono:  TeX Gyre Cursor @88%  \setmonofont[Scale=0.88]{TeX Gyre Cursor}
Math:  Latin Modern Math     \setmathfont{Latin Modern Math}
Overleaf .tex source only:   \setmainfont{Calibri}
Deliverable: always both .tex + compiled .pdf
```

## Hyperlinks

```
Link Color: Light / muted purple:
  \definecolor{linkpurple}{RGB}{128, 70, 160}
  \usepackage[colorlinks=true, linkcolor=linkpurple, urlcolor=linkpurple, citecolor=linkpurple]{hyperref}
Understand then use it for links, urls, citations, etc not TOC.
```

## Table Rules

```
Borders:     full grid, all cells
Spacing:     all-sides cell padding via \setlength{\tabcolsep}{8pt} and \renewcommand{\arraystretch}{1.5} so text never touches cell borders and looks uncluttered
Column Types: Define explicit non-justified column types in preamble:
             \newcolumntype{L}[1]{>{\raggedright\arraybackslash}p{#1}}
             \newcolumntype{C}[1]{>{\centering\arraybackslash}p{#1}}
             \newcolumntype{R}[1]{>{\raggedleft\arraybackslash}p{#1}}
Alignment:   Strictly left-align text content cells (>{\raggedright\arraybackslash}p{...} / L{...})
             NEVER use justify contents in table items (no word stretching or ugly spaces)
Header row:  centered horizontal + vertical + bold (\multicolumn{1}{|c|}{\textbf{...}})
Row colour:  none — no \rowcolor, no column background tints (clean B/W)
& count:     must exactly match column spec (no mismatches)
Widths:      Balance column widths so sum of column widths + cell padding <= textwidth (no overfull hboxes)
```

## TikZ Rules

```
Libraries: load all required libraries explicitly
Nodes:     define before use
Fill tint: light tints ONLY (e.g. myred!10, myblue!10)
           never solid/dark fills at !50 or above
           proper spacing and clear labelling
```

## Inline Code

```
\code{}  → bold, monospace, background RGB(225,228,233) (darker cool-gray pill for crisp contrast against white page background; \fboxsep=2.5pt)
           \definecolor{inlinecodebg}{RGB}{225,228,233}
           \newcommand{\code}[1]{\colorbox{inlinecodebg}{\texttt{\textbf{\detokenize{#1}}}}}
```

## Code Block (listings) Style

```
Background: RGB(242,244,248)
Comments:   RGB(106,153,85), italic
Border:     single frame, RGB(208,215,222)
Never dark backgrounds
```

## Post-Build Cleanup

```
After building the LaTeX document to PDF, delete all temporary auxiliary files:
  *.aux, *.log, *.out, *.toc, *.lot, *.lof, *.synctex.gz, *.fls, *.fdb_latexmk
Keep only the source .tex and compiled .pdf files.
```

## Math Formatting (chat, not LaTeX docs)

```
Inline:  $...$
Display: $$...$$
No \[...\] delimiters; prefer single-line expressions
Scientific notation: wrap in $...$; strip \text and stray backslashes
```