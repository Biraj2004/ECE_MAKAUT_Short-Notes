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
use paraindent only for bullet points, bracketed alphabetic points (a), (b), (c), and roman numerals (i., ii., iii.) — DO NOT use direct natural numbers (1, 2, 3) in answer points. Choose whichever of (a), (b), (c), bullet points, or i., ii., iii. is most suitable as the top-level scheme for each answer.

Only bullet points may nest into sub-levels. Bullet lists nest as a fixed 3-level structure, indented INWARDS:
  Level 1: filled bullet (•), leftmargin=2.75em
  Level 2: hollow circle (◦), leftmargin=2.50em
  Level 3: en-dash (–), leftmargin=2.50em
Set each marker explicitly via \setlist — never rely on LaTeX's own itemize defaults (• then – then *).

Alphabetic (a)/(b)/(c) and roman i./ii./iii. schemes are used flat, single-level only, when chosen as the top-level point style for an answer — never nested into their own sub-variants (no (i) under (a), no A. under i.), and never used as Level 3 of a bullet nest (Level 3 is always en-dash per the structure above). If a nested sub-point is needed under an alphabetic or roman list, drop down to a bullet sub-list instead.

Understand first, then do it.
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
Spacing:     \setlength{\tabcolsep}{8pt} and \renewcommand{\arraystretch}{1.5}
             so text never touches cell borders and looks uncluttered
& count:     must exactly match column spec (no mismatches)
Consistency: use the same settings, column types, bold rule and alignment rule
             in EVERY table of a document. Set them once in the preamble.
Engine:      Standard tabular or longtable with budgeted column widths (\wA, \wB...).
             DO NOT use tabularx with unconstrained \multicolumn{1}{c|}{...} headers
             or arbitrary X columns, which cause columns to blow past the container boundary.
BREAKABLE - TABLES / LONG TABLES
```

### Preamble (add once per document)

```latex
\usepackage{longtable}
\newcolumntype{L}[1]{>{\raggedright\arraybackslash}m{#1}}     % body cells: left-aligned, vertically centered
\newcolumntype{B}[1]{>{\raggedright\arraybackslash\bfseries}m{#1}} % body label: left-aligned bold, vertically centered
\newcolumntype{C}[1]{>{\centering\arraybackslash}m{#1}}       % body cells: centered, vertically centered
\newcolumntype{R}[1]{>{\raggedleft\arraybackslash}m{#1}}       % body cells: right, vertically centered
\newcolumntype{M}[1]{>{\centering\arraybackslash\bfseries}m{#1}} % header cells: bold, horizontally & vertically centered
\renewcommand{\tabularxcolumn}[1]{m{#1}}                     % tabularx X columns: vertically centered
\newcolumntype{Y}{>{\raggedright\arraybackslash}X}
\newcommand{\tallstrut}{\rule[-1.6ex]{0pt}{4.6ex}}          % extra height for cells with fractions

% Column width budget variables (declare in preamble):
\newlength{\tblavail}
\newlength{\wA}
\newlength{\wB}
\newlength{\wC}
\newlength{\wD}
\newlength{\wE}
\newlength{\wF}
```

### Column Widths (no text touching or crossing a border)

```
Width budget: m{} widths do NOT include cell padding (2\tabcolsep per col)
              or vertical rules ((N+1)\arrayrulewidth). Budget for them accurately.
              Always use \linewidth (NOT \textwidth), which automatically matches:
              - The exact inner text width when inside a tcolorbox
              - The \textwidth when placed on an open page

              For N columns:
  \setlength{\tblavail}{\dimexpr\linewidth-2N\tabcolsep-(N+1)\arrayrulewidth\relax}
  (write the concrete numbers, e.g.
   N=2: \linewidth - 4\tabcolsep - 3\arrayrulewidth
   N=3: \linewidth - 6\tabcolsep - 4\arrayrulewidth
   N=4: \linewidth - 8\tabcolsep - 5\arrayrulewidth
   N=5: \linewidth - 10\tabcolsep - 6\arrayrulewidth
   N=6: \linewidth - 12\tabcolsep - 7\arrayrulewidth)

  Wide Tables (5+ columns):
  With \tabcolsep=8pt, 6 columns consume 96pt solely in padding, restricting text space.
  For 5 or 6-column tables, enclose the table in a group and set \tabcolsep to 4pt or 5pt:
  \begingroup
  \setlength{\tabcolsep}{4pt}
  \setlength{\tblavail}{\dimexpr\linewidth - 12\tabcolsep - 7\arrayrulewidth\relax}
  ...
  \end{longtable}
  \endgroup

  Then allocate each column a fractional share of \tblavail, shares summing to 1.00:
  \setlength{\wA}{0.22\tblavail}
  \setlength{\wB}{0.28\tblavail}
  \setlength{\wC}{0.25\tblavail}
  \setlength{\wD}{0.25\tblavail}

  Define each width once immediately before the table, and reuse the identical
  lengths (\wA, \wB, \wC...) in both the tabular column spec and the header row!

Balance:      size columns by their longest content, not equally.
  - The longest single word or label in a column MUST fit inside its width.
    A word wider than its column spills into padding and crosses borders.
  - Label (first) column: wide enough for its longest word (e.g. "Orientation", "Competitive").
  - No column may wrap to 4+ lines while another column is mostly empty. Rebalance.

Hyphenation & Long Compound Words:
  Hyphenation is off globally (\hyphenpenalty=10000), so words cannot break automatically.
  - For long compound words, write explicit break points using \allowbreak after hyphens/slashes:
    Non-\allowbreak competitive
    Glyceraldehyde-\allowbreak 3-\allowbreak phosphate
    Phospho-\allowbreak fructokinase
  - For chemical ion lists in cells, NEVER group multiple ions into a single math box
    like $\mathrm{Zn^{2+}, Mg^{2+}, Fe^{2+/3+}, Cu^{2+}}$ (which LaTeX treats as one
    indivisible 140pt string that crashes through borders). Instead, put each item in its
    own math delimiters with spaces outside:
    Bound $\mathrm{Zn^{2+}}$, $\mathrm{Mg^{2+}}$, $\mathrm{Fe^{2+/3+}}$, $\mathrm{Cu^{2+}}$ cofactors.

Overfull:     any "Overfull \hbox" warning for a table is an unacceptable defect.
              Fix by widening a column, rebalancing shares, inserting \allowbreak,
              or rewording. Never fix it by shrinking font size.
```

### Alignment & Header Rules

```
Horizontal:   body cells strictly left-aligned (L{...} or B{...}). (Or centered C{...} only for short symbols/numbers).
Vertical:     ALL body cells MUST be VERTICALLY CENTERED (L, B, C, R all use m{#1} from the array package).
              NEVER use top-aligned p{#1} columns for body rows! Top alignment leaves unsightly,
              lopsided vertical voids at the bottom of shorter cells whenever adjacent cells
              span multiple lines or contain stacked formulas/fractions.
Header row:   headings MUST be BOTH VERTICALLY AND HORIZONTALLY CENTERED + BOLD:
              M{...} = >{\centering\arraybackslash\bfseries}m{#1}
              Use \multicolumn{1}{...} with the EXACT budgeted column length:
  first header cell:   \multicolumn{1}{|M{\wA}|}{\textbf{...}}
  other header cells:  \multicolumn{1}{M{\wB}|}{\textbf{...}}     (NO leading |)
  
  CRITICAL: A leading | on cells 2..N doubles the vertical border line and makes
  the table wider than the container, creating an Overfull \hbox!
  NEVER use \multicolumn{1}{c|}{...} or \multicolumn{1}{|c|}{...} in headers —
  natural-width 'c' ignores column bounds, prevents line wrapping, and blows
  the entire table out of the right margin.
```

### Text Style

```
Font size:    12pt, identical to document body.
              Strictly prohibited: \small, \footnotesize, \scriptsize, \resizebox, \scalebox.
Bold:         only the header row and the first (label) column.
              Bold is always WHOLE-CELL (via B{\wA} or \textbf{...}).
              Never bold only the first word/line of a body cell.
              All other body cells: regular text. Use italic for a key term if needed.
Row colour:   none — no \rowcolor, no column background tints (clean B/W only).
```

### Math Inside Cells

```
Wrap all maths in $...$.
Never let a formula break awkwardly across lines. Do not end a line with =, +, − or ×.
Several forms of one formula: put each on its own line with \newline
  (NOT \\ — after \arraybackslash, \\ ends the table row) and start every line
  with the left side, e.g.  k = ...  \newline  k = ...
Fractions:    use \dfrac and add \tallstrut at the start of the cell so the fraction
              does not touch the top or bottom border.
Too long:     if a formula still does not fit its column, move it out of the table
              into a display formula below the table and refer to it from the cell.
Row height:   rows keep natural height. If one row is much taller than the rest,
              move that formula out of the table.
```

### Complete Implementation Template (4-Column Table Inside a Box)

```latex
\begin{tcolorbox}[examplebox, title={Diagnostic Profile of Lactate Dehydrogenase (LDH) Isoenzymes}]
Lactate dehydrogenase is a tetramer formed by combinatorial assembly of Heart ($\mathrm{H}$) and Muscle ($\mathrm{M}$) subunits:
\par\vspace{6pt}\noindent
\setlength{\tblavail}{\dimexpr\linewidth - 8\tabcolsep - 5\arrayrulewidth\relax}
\setlength{\wA}{0.14\tblavail}
\setlength{\wB}{0.14\tblavail}
\setlength{\wC}{0.34\tblavail}
\setlength{\wD}{0.38\tblavail}
\begin{tabular}{|B{\wA}|L{\wB}|L{\wC}|L{\wD}|}
\hline
\multicolumn{1}{|M{\wA}|}{\textbf{Isoform}} &
\multicolumn{1}{M{\wB}|}{\textbf{Subunits}} &
\multicolumn{1}{M{\wC}|}{\textbf{Primary Tissue Distribution}} &
\multicolumn{1}{M{\wD}|}{\textbf{Diagnostic / Clinical Utility}} \\
\hline
$\mathrm{LDH_1}$ & $\mathrm{H_4}$ & Myocardium (Heart), Erythrocytes & Elevated in Acute Myocardial Infarction ($\mathrm{LDH_1 > LDH_2}$ "flipped" pattern). \\
\hline
$\mathrm{LDH_2}$ & $\mathrm{H_3M_1}$ & Reticuloendothelial system & Dominant isoform in healthy human serum. \\
\hline
$\mathrm{LDH_3}$ & $\mathrm{H_2M_2}$ & Lungs, Spleen, Pancreas & Elevated in pulmonary embolism, malignant lymphomas. \\
\hline
$\mathrm{LDH_4}$ & $\mathrm{H_1M_3}$ & Kidney, Placenta & Elevated in renal infarction. \\
\hline
$\mathrm{LDH_5}$ & $\mathrm{M_4}$ & Skeletal muscle, Liver parenchyma & Markedly elevated in viral hepatitis, hepatic cirrhosis, and skeletal muscle trauma. \\
\hline
\end{tabular}
\end{tcolorbox}
```

### Placement & Multi-Page Tables

```
Placement:    Centre the table (\begin{center}...\end{center} or \noindent inside box).
              Never wider than \linewidth (the budget guarantees this).
Page breaks:  Short tables must stay on one page. Put \needspace{<table height>} before them.
Multi-page:   For tables spanning across pages, use longtable with \endfirsthead,
              \endhead, and \endfoot so the header row repeats automatically on every page.
```

### Pre-Delivery Table Check

```
After compiling, open the log and the PDF and confirm:
  1. Zero "Overfull \hbox" warnings for any table
  2. No text touches or crosses a border (check the longest word in every column)
  3. All body cells left-aligned + vertically centered (m{...}); headers both vertically and horizontally centered + bold (M{...})
  4. Bold only in header and label column, always whole-cell
  5. No formula breaks or ends a line with an operator
  6. Column widths balanced (no 4+ line cells beside empty ones)
  7. Vertical borders are single lines, including in the header (no leading | on cells 2..N)
  8. Table text is 12pt body font
```

## TikZ Vector Diagram Standards & Spacing Guide

```
Container:   Every diagram MUST be wrapped inside a \begin{tcolorbox}[tikzbox, title={...}]
             with \centering so it stays visually unified with the rest of the document.
Libraries:   Explicitly load required TikZ libraries in preamble:
             \usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, decorations.pathreplacing}
Arrowheads:  Always use modern stealth or latex arrowheads:
             \tikzset{arrow/.style={-{Latex[length=2.2mm, width=1.6mm]}, thick, color=mydark}}
             or -Stealth with explicit dimensions. Never use blunt standard -> or default LaTeX arrows.
```

### 1. Canvas Sizing & Coordinate Budgeting (No Narrow Cramming)
- **Use the Full Width:** The inner width of a `tikzbox` on standard A4 margin=0.8in is **15.0 cm to 16.0 cm**. Never squeeze a multi-item diagram into a narrow central 8 cm or 9 cm span, which causes boxes to overlap and forces awkward downward staggering.
- **Budgeting $N$ Columns / Leaf Nodes:**
  - Allocate the total available span (e.g. from $x = -7.5$ to $+7.5$).
  - For $N$ leaf boxes of width $W$, compute center-to-center spacing:
    $\Delta x \ge W + \text{gap}$, where $\text{gap} \ge 4\text{ mm}$ ($0.4\text{ cm}$).
  - Example (5 leaves): Centers at $-6.0, -3.0, 0.0, +3.0, +6.0$ with $W = 2.6\text{ cm}$ gives a uniform $4\text{ mm}$ clear gap between every box across $15.0\text{ cm}$.

### 2. Hierarchy & Tree Layouts (Preventing Congestion & Arrow Collisions)
- **Pure Orthogonal Distribution (Bus Architecture):**
  - NEVER draw long diagonal arrows that slice past other nodes, cut through corners, or cross near unrelated boxes.
  - Connect hierarchical levels using **orthogonal distribution buses**:
    1. A vertical trunk drops from parent south: `(root.south) -- (0, 3.0);`
    2. A clean horizontal bus spans across the child columns: `(-4.5, 3.0) -- (6.0, 3.0);`
    3. Vertical drop arrows plunge straight down into the child heads: `\draw[arrow] (-4.5, 3.0) -- (c1.north);`
  - All drop arrows must be **100% vertical** (`\draw[arrow] (x, y_bus) -- (child.north)`).
- **Same Tier = Same Vertical Level:**
  - Nodes that represent peer categories or peer methods must share the **exact same $y$-coordinate**.
  - Never push some children down to a lower $y$-level just because of horizontal cramming! If they do not fit, rebalance column widths or switch to a Left-to-Right layout.
- **Intentional Node Text Wrapping (Zero Ugly Hyphenation):**
  - Always specify `text width=...` and `text centered` (or `align=center`).
  - Break titles manually using `\textbf{First}\\\textbf{Second}` to prevent awkward mid-word breaks like `Ad-sorption` or `Micro-encapsulation`.
  - Subtitle descriptions inside nodes: use `\scriptsize` or `\footnotesize` with 2pt vertical spacing: `\textbf{Title}\\[2pt]\scriptsize Subtitle text`.

### 3. Reaction Coordinates & Function Curves (Zero Text Collisions)
- **Bézier Curve Apex Calculation:**
  - A Bézier curve `.. controls (x_c, y_c) ..` pulls the curve toward the control point. For a cubic curve, the apex reaches approx $60\%\text{--}75\%$ of the distance to $(x_c, y_c)$.
  - Calculate or test the true curve apex so labels placed `above` or `below` sit with at least $4\text{ pt}$ of clear breathing room above the peak.
- **White Protective Halos:**
  - ALWAYS give text nodes near curves, axes, or shaded regions an opaque background:
    `node[above, color=myred, fill=white, inner sep=1.5pt] {Label}`
  - This guarantees that no line, dashed curve, or axis ever cuts through the text glyphs.
- **Unobstructed Annotation Lanes:**
  - Place dimension lines and brackets ($\Delta G^\ddagger$, $K_m$, $V_{\max}$) in clear vertical/horizontal corridors outside the curve.
  - Use dashed reference extension lines (`thin, dashed, color=mydark!40`) connecting the state levels to the dimension arrows.
  - Place regime annotations (e.g. "First-Order", "Zero-Order") in open white quadrants with dedicated leader/pointer arrows pointing to the curve, never printed directly on top of the curve itself.

---

## Strict Black-and-White (B/W & Monochrome) Document Mode

When a document is requested or specified in **Black and White (B/W)** or **Monochrome**:

```
Rule:        NO chromatic colors anywhere in the entire document.
             Strictly zero red, teal, green, amber, purple, blue, or saturated tints.
Palette:     ONLY black, white, and neutral grayscale values:
             - black
             - white
             - black!90, black!80 (dark borders / strong text)
             - black!70, black!60 (medium borders / secondary text)
             - black!40, black!30 (guidelines / subtle borders)
             - black!12, black!8, black!4 (subtle background tints)
Consistency: Apply monochrome styling uniformly across Cover Page, Running Headers/Footers,
             TOC, Section Titles, tcolorboxes, Tables, and TikZ Diagrams.
```

### 1. Document Structure & Typography in B/W
- **Cover Page:**
  - Double border: Outer rule `1.2pt` in `black`, inner rule `0.6pt` in `black`.
  - Course code, subject title, document title, and metadata in `black` and `black!85`.
  - Horizontal rules: `black`.
  - Disclaimer box: `colback=black!4`, `colframe=black!40`, text in `black`.
  - Author signature `Biraj Sarkar` in `black` (NEVER purple).
- **Running Headers & Footers:**
  - Header: `\small\color{black}\textbf{<CODE>}\;---\;<SUBJECT>` and `\textbf{<SCOPE>}` in `black`.
  - Header rule: `0.5pt` in `black`.
  - Footer page number: `black`.
  - Copyright mark: `\small\color{black!70}\textit{\copyright\ Biraj}` (NEVER purple, always grayscale/black).
  - Footer rule: `0.3pt` in `black!50`.
- **Headings & Table of Contents:**
  - Section titles: `\large\bfseries\color{black}`, underline rule in `black!80`.
  - Subsection titles: `\normalsize\bfseries\color{black}`.
  - TOC: `Contents` title in `black`, module/part entries and page numbers in `black` (no crimson red).

### 2. tcolorbox Environments in B/W Mode
All 6 standard boxes must be declared with grayscale equivalents:
```latex
\tcbset{
  tikzbox/.style={
    colback=white, colframe=black!50, boxrule=0.7pt, arc=3.5pt,
    colbacktitle=black!10, coltitle=black, fonttitle=\small\bfseries
  },
  defbox/.style={
    colback=black!3, colframe=black!80, boxrule=0.8pt, arc=3.5pt,
    colbacktitle=black!85, coltitle=white, fonttitle=\small\bfseries
  },
  formulabox/.style={
    colback=white, colframe=black!80, boxrule=0.8pt, arc=3.5pt,
    colbacktitle=black!85, coltitle=white, fonttitle=\small\bfseries
  },
  examplebox/.style={
    colback=black!3, colframe=black!50, boxrule=0.7pt, arc=3.5pt,
    colbacktitle=black!12, coltitle=black, fonttitle=\small\bfseries
  },
  masonbox/.style={
    colback=black!3, colframe=black!75, boxrule=0.8pt, arc=3.5pt,
    colbacktitle=black!80, coltitle=white, fonttitle=\small\bfseries
  },
  exambox/.style={
    colback=black!4, colframe=black!85, boxrule=1.0pt, arc=4pt,
    colbacktitle=black!90, coltitle=white, fonttitle=\bfseries,
    breakable, title after break={\textbf{\color{white}Frequently Asked / Viva Questions (contd.)}}
  }
}
```

### 3. TikZ Vector Diagrams in B/W Mode
- **Zero Color:** No colored node borders, fills, or arrows.
- **Node Styling:**
  - Root / Dominant Nodes: `draw=black, fill=black!8, line width=1.1pt, font=\bfseries\color{black}`.
  - Category / Intermediate Nodes: `draw=black!70, fill=black!4, line width=0.9pt, font=\bfseries\color{black}`.
  - Leaf / Detail Nodes: `draw=black!40, fill=white, line width=0.6pt, font=\color{black}`.
  - Connections & Arrows: `draw=black!80, line width=0.8pt, -{Latex[length=2.2mm, width=1.6mm]}`.
- **Plot Curves Differentiation:**
  - Differentiate multiple series/curves strictly using **line dashing and weight**:
    - Primary curve (e.g. Catalyzed): `very thick, solid, draw=black`
    - Secondary curve (e.g. Uncatalyzed): `very thick, dashed, draw=black!70`
    - Asymptotes / Reference lines: `thick, dashdotted, draw=black!50`
    - Shaded regions (e.g. active site or integration area): `fill=black!10` or cross-hatching (`pattern=north east lines` from `patterns` library).
- **Text Labels:**
  - All labels in `color=black` with `fill=white, inner sep=1.5pt` background halos so lines never clash with text.

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