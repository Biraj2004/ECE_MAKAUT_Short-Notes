# Exam-Ready Module Notes Instruction
**MAKAUT B.Tech — Build Guide**
> Author: Biraj Sarkar | CGEC | B.Tech ECE (2023–27) | Last updated: June 2026

---

## Table of Contents

1. [Content Philosophy](#1-content-philosophy)
2. [File Naming & Structure](#2-file-naming--structure)
3. [LaTeX Preamble](#3-latex-preamble)
4. [Colour Palette](#4-colour-palette)
5. [tcolorbox Styles](#5-tcolorbox-styles)
6. [Table Rules](#6-table-rules)
7. [TOC Styling](#7-toc-styling)
8. [Section & Paragraph Formatting](#8-section--paragraph-formatting)
9. [Header / Footer](#9-header--footer)
10. [Title Page](#10-title-page)
11. [Quick Revision Page](#11-quick-revision-page)
12. [Viva Q&A Format](#12-viva-qa-format)
13. [TikZ Diagram Guidelines](#13-tikz-diagram-guidelines)
14. [Known Issues & Fixes](#14-known-issues--fixes)
15. [Compile Scripts](#15-compile-scripts)
16. [Adapting for Other Subjects](#16-adapting-for-other-subjects)
17. [Final Quality Checklist](#17-final-quality-checklist)

---

## 1. Content Philosophy

- **Target audience:** MAKAUT B.Tech ECE students preparing for semester exams, internals, viva, and last-minute revision.
- Keep content concise, revision-friendly, and of moderate depth.
- Use simple English and standard Indian engineering terminology.
- Avoid unnecessary theory, history, research discussions, and textbook-style explanations.
- Answers must be suitable for **2, 5, 10, and 15-mark** university questions.

### Topic Structure
Follow this order for every topic:

> **Definition → Concept → Working → Formula → Diagram → Advantages/Disadvantages → Applications → Exam Points**

### Every topic must include

| Element | Details |
|---|---|
| Short definition | 1–3 lines in a `defbox` |
| Formulas | All important ones with variable descriptions and units |
| Derivations | Step-by-step, no skipped steps |
| Comparison tables | Wherever two or more concepts are contrasted |
| TikZ diagrams | Block diagrams, circuits, waveforms, flow diagrams |
| Exam tips box | Frequently asked questions and viva points |

---

## 2. File Naming & Structure

- One `.tex` file per module. Naming convention:

  ```
  <SubjectCode>_Module<N>_Notes.tex  →  <SubjectCode>_Module<N>_Notes.pdf
  ```

  Examples:
  ```
  EC601_Module1_Notes.tex  →  EC601_Module1_Notes.pdf
  EC602_Module2_Notes.tex  →  EC602_Module2_Notes.pdf
  ```

- Each file is **self-contained** — full preamble, no `\input` or `\include`.
- Compile command:
  ```
  xelatex -interaction=nonstopmode <file>.tex
  ```
- **Run TWICE** for correct TOC page numbers.
- Clean these aux files after the second pass:
  ```
  .aux  .toc  .out  .synctex.gz  .log  .fls  .fdb_latexmk
  ```

---

## 3. LaTeX Preamble

> Copy this exactly for every new module. Only the header/title fields change.

### Compiler

**XeLaTeX only.** Do NOT use pdfLaTeX or LuaLaTeX.

### Required packages (in this order)

```latex
\usepackage{xcolor}       % required for custom colors
\usepackage{titlesec}     % section heading formatting
\usepackage{enumitem}     % list customisation
\usepackage{tabularx}     % flexible-width tables
\usepackage{booktabs}     % professional table rules
\usepackage{array}        % column type extensions
\usepackage{amsmath}      % math environments
% ⚠ Do NOT load amssymb — conflicts with unicode-math under XeLaTeX
\usepackage{tikz}
\usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, fit, decorations.pathreplacing}
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
```

### Fonts

```latex
\usepackage{fontspec}
\usepackage{unicode-math}
\setmainfont{TeX Gyre Pagella}
\setmonofont[Scale=0.88]{TeX Gyre Cursor}
\setmathfont{Latin Modern Math}
```

### Q&A helper macro *(required in every file)*

```latex
\newcommand{\Q}[1]{\textbf{#1}\par\noindent\ignorespaces}
% Usage inside viva enumerate:
%   \item \Q{Question text?} Answer text here on the next line.
```

---

## 4. Colour Palette

> RGB values are **fixed** — do not change them across subjects.

```latex
% ── Primary colours ──────────────────────────────────────────────────────────
\definecolor{myred}{RGB}{196,30,58}       % section headings
\definecolor{mydark}{RGB}{30,30,50}       % body text
\definecolor{mygreen}{RGB}{14,120,80}     % definition boxes
\definecolor{myteal}{RGB}{0,130,140}      % formula boxes, diagrams, subsection headings
\definecolor{myamber}{RGB}{180,100,0}     % example boxes
\definecolor{mypurple}{RGB}{100,30,160}   % exam/viva boxes
\definecolor{mygray}{RGB}{246,247,249}    % tikzbox background
\definecolor{mgframe}{RGB}{180,185,200}   % tikzbox border
\definecolor{watermark}{RGB}{145,150,170} % footer watermark (darkened for legibility)

% ── Light header backgrounds (table headers & box fills) ─────────────────────
\definecolor{hdrred}{RGB}{250,232,235}
\definecolor{hdrgreen}{RGB}{220,244,233}
\definecolor{hdrteal}{RGB}{220,242,244}
\definecolor{hdramber}{RGB}{253,242,215}
\definecolor{hdrpurple}{RGB}{238,228,255}
\definecolor{hdrgray}{RGB}{238,240,245}   % DEPRECATED (Do not use for table headers)
\definecolor{rowalt}{RGB}{250,251,253}    % DEPRECATED (Do not use for row shading)
```

### Colour usage rules

| Colour | Use for |
|---|---|
| `myred` | `\section` headings only |
| `mydark` | Body text |
| `mygreen` | `defbox` — definitions, terminology |
| `myteal` | `\subsection` headings, `formulabox` — formulas, derivations, block diagrams |
| `myamber` | `examplebox` — worked examples, solved problems |
| `mypurple` | `masonbox`, `exambox` — viva Q&A, exam tips |
| `hdrgray` | DEPRECATED (Do not use for table headers) |
| `hdrteal` | Box header background only (Do not use for tables) |
| `hdrgreen` | Box header background only (Do not use for tables) |
| `hdrpurple` | Box header background only (Do not use for tables) |

---

## 5. tcolorbox Styles

> All 6 styles are required in every file. Copy the `\tcbset{...}` block exactly.
> **Add `\tcbset{breakable}` after the block** so all boxes split across pages automatically.

```latex
\tcbset{
  tikzbox/.style={
    colback=mygray, colframe=mgframe, boxrule=0.6pt, arc=4pt,
    left=8pt, right=8pt, top=6pt, bottom=6pt,
    colbacktitle=mgframe, coltitle=mydark, fonttitle=\small\bfseries
  },
  defbox/.style={
    colback=hdrgreen, colframe=mygreen, boxrule=0.8pt, arc=4pt,
    left=9pt, right=9pt, top=6pt, bottom=6pt,
    colbacktitle=mygreen, coltitle=white, fonttitle=\small\bfseries
  },
  formulabox/.style={
    colback=hdrteal, colframe=myteal, boxrule=0.8pt, arc=4pt,
    left=9pt, right=9pt, top=7pt, bottom=7pt,
    colbacktitle=myteal, coltitle=white, fonttitle=\small\bfseries
  },
  examplebox/.style={
    colback=hdramber, colframe=myamber, boxrule=0.8pt, arc=4pt,
    left=9pt, right=9pt, top=6pt, bottom=6pt,
    colbacktitle=myamber, coltitle=white, fonttitle=\small\bfseries
  },
  masonbox/.style={
    colback=hdrpurple, colframe=mypurple, boxrule=0.8pt, arc=4pt,
    left=9pt, right=9pt, top=6pt, bottom=6pt,
    colbacktitle=mypurple, coltitle=white, fonttitle=\small\bfseries
  },
  exambox/.style={
    colback=hdrpurple, colframe=mypurple, boxrule=1pt, arc=5pt,
    left=10pt, right=10pt, top=8pt, bottom=8pt,
    colbacktitle=mypurple, coltitle=white, fonttitle=\bfseries,
    breakable, title after break={\textbf{Frequently Asked / Viva Questions (contd.)}}
  }
}
% Allow all boxes to break across pages — prevents footer overflow
\tcbset{breakable}
```

### Box usage guide

| Style | Use for |
|---|---|
| `tikzbox` | TikZ diagrams, block diagrams, circuit sketches |
| `defbox` | Definitions and terminology |
| `formulabox` | Formulas, derivations, key equations |
| `examplebox` | Worked examples, solved problems |
| `masonbox` | SFG/Mason's formula, special topic boxes |
| `exambox` | Exam tips, viva Q&A, frequently asked questions |

> **⚠ Critical:** Always set both `colbacktitle` **and** `coltitle` for every style.
> Without `coltitle=white`, dark title backgrounds produce invisible black-on-dark text.
> **Never use `attach title to upper`** or basebox wrappers with `attach title to upper`. Doing so merges the title into the upper box body background (`colback`), causing invisible white text on light green/teal backgrounds.

### ⚠ Page Breaking and White Space Mitigation (Strategic Splitting)

By default, all boxes must be breakable (`\tcbset{breakable}` in preamble) to prevent them from overflowing into the footer or leaving huge white spaces on the page. However, you must use page breaks **awarely** and **strategically**:

1. **The Pushed-Box Problem:** If a breakable box starts with a tall unbreakable element (like a tall diagram, a large table, or a multi-line `\displaystyle\frac` equation) and is placed near the bottom of a page, LaTeX cannot split it at that first element. Instead of breaking, the compiler will push the **entire box** to the next page, leaving a large, ugly white space at the bottom of the current page.
2. **The Strategic Fix (Internal Page-Breaking):** If a box is pushed to the next page and leaves empty space, you must manually intervene by inserting a strategic `\newpage` or `\pagebreak` inside the box body:
   - For example, in an `exambox` containing several Q&A items, if the box is pushed to the next page because it starts too low, insert `\newpage` inside the box *after* the first or second Q&A item. This forces the box to start on the current page, print the first few items, break cleanly at the `\newpage`, and continue on the next page.
   - For bulleted/numbered lists, place the `\newpage` or `\pagebreak` cleanly between items.
3. **Isolate Unbreakable Elements:** If a box contains an unbreakable block diagram or comparative table that is causing the entire box to jump, pull that element out of the main text box. Place it in its own separate `tikzbox` or standalone table, allowing the remaining text boxes to break naturally.

---

## 6. Table Rules

> Follow exactly — these rules prevent broken/phantom column layouts.

### ⚠ Strict Boxed Styling (No Colors, Full Borders)

All tables inside module files must strictly adhere to a standard boxed style. Diverging from this causes visual inconsistencies:
* **No `\rowcolor` or Shading:** Do NOT use `\rowcolor{...}` or alternating row colors (like `rowalt`). Table headers and data rows must have a transparent/white background.
* **No `booktabs` Rules:** Do NOT use `\toprule`, `\midrule`, or `\bottomrule`.
* **Explicit Grids:** Always enclose all columns with vertical lines (`|`) in the column specifier and separate all rows with `\hline` (top, bottom, and between every row).

### ⚠ Preventing Grid Line Collisions (Comprehensive 4-Side Cell Padding)

In boxed tables, text or mathematical symbols can easily collide with vertical column lines (`|`) or horizontal `\hline` rules if cell padding is insufficient. To guarantee clean breathing room on all four sides:

1. **Horizontal Padding (`\tabcolsep`) \& Hyphenation Handling:**
   * Wrap the table block in a local `\begingroup ... \endgroup` and set `\setlength{\tabcolsep}{...}`:
     * For 2 or 3-column tables: `\setlength{\tabcolsep}{5pt}`
     * For wide multi-column tables (5+ columns across `\linewidth`): Set `\setlength{\tabcolsep}{2.5pt}` (or `3pt`), adjust the first fixed column width (e.g., `p{1.9cm}`), and set `\footnotesize` inside the group.
   * **Explicit Hyphen Breaking (`\allowbreak`):** Because global hyphenation is disabled (`\hyphenpenalty=10000`, `\exhyphenpenalty=10000`), long hyphenated words in narrow columns (e.g., *Self-actualization*, *Higher-order*) cannot break automatically at `-` and will spill over vertical borders (`|`). Always insert `\allowbreak` after hyphens in narrow cells: `Self-\allowbreak actualization` or `Higher-\allowbreak order`.
2. **Vertical Top-Padding (`\extrarowheight` strut):**
   * Set `\setlength{\extrarowheight}{3pt}` inside the table group. This adds a top strut to every row, guaranteeing that capital letters and bold header text never touch the top `\hline`.
3. **Vertical Bottom-Padding (`\arraystretch`):**
   * Set `\renewcommand{\arraystretch}{1.35}` for text tables, `1.65` for standard equations, and `1.9` for tall fractions (`\frac`).
4. **Centered Bold Table Headings (`\multicolumn{1}{c|}{\textbf{...}}`):**
   * All column titles in the header row must be centered and bold. Use `\multicolumn{1}{|c|}{\textbf{Header}}` for the first column and `\multicolumn{1}{c|}{\textbf{Header}}` for all subsequent columns to guarantee clean centering without overriding vertical borders.
5. **Standard Table Group Pattern:**
   ```latex
   \par\vspace{6pt}\noindent
   \begingroup
   \setlength{\tabcolsep}{5pt}% Horizontal cell padding (left & right)
   \setlength{\extrarowheight}{3pt}% Top vertical padding (strut height)
   \renewcommand{\arraystretch}{1.35}% Bottom vertical padding
   \begin{tabularx}{\linewidth}{|>{\raggedright\arraybackslash\bfseries}p{3.5cm}|Y|Y|}
   \hline
   \multicolumn{1}{|c|}{\textbf{Feature}} & \multicolumn{1}{c|}{\textbf{Formal Organization}} & \multicolumn{1}{c|}{\textbf{Informal Organization}} \\
   \hline
   ...
   \end{tabularx}
   \endgroup
   ```

### Always use `tabularx` with `\linewidth`

```latex
\begin{tabularx}{\linewidth}{...column spec...}
```

### ⚠ Always add `\par\noindent` before a table that follows inline text

If a table immediately follows a `\textbf{Label:}` line (no blank line between), LaTeX measures `\linewidth` as the remaining line width — causing the table to overflow the right margin. Fix:

```latex
\textbf{CSMA Variants:}\par\noindent
\begin{tabularx}{\linewidth}{...}
```

### Column type rules inside `tabularx`

| | Column spec | Notes |
|---|---|---|
| ✅ Correct | `Y` (pre-defined) | Left-aligned ragged-right stretch column — **MUST use for all text description columns** (prevents justification gaps) |
| ✅ Correct | `>{\centering\arraybackslash}X` | Centered stretch column — use for short values or metrics |
| ✅ Correct | `>{\small\bfseries\raggedright\arraybackslash}m{3.2cm}` | Bold-left fixed — first column only (use `m{}` not `p{}`) |
| ❌ Wrong | Plain `X` | **NEVER use plain `X` for text.** Because hyphenation is disabled globally (`\hyphenpenalty=10000`), LaTeX will stretch spaces to extreme limits to justify the text, causing ugly, uneven gaps between words. Use `Y` instead. |
| ❌ Wrong | `C{2.6cm}` inside tabularx | Causes phantom extra column on right edge |
| ❌ Wrong | `p{...}` in any column | Top-aligns text — use `m{...}` for vertical centering |
| ❌ Wrong | `\multicolumn{1}{...p{...}...}{...}` | Top-aligns header text — use `m{...}` inside `\multicolumn` |

### ⚠ Table Heading Gaps (No Collisions with Heading Text)

When placing a table immediately following a bold heading or label, ensure there is adequate vertical space so that the table's top horizontal line does not touch the baseline of the heading text:
- **Always use `\par\vspace{6pt}\noindent`:** When starting a table after a label/heading, use `\par\vspace{6pt}\noindent` before the `\begin{tabularx}` or local stretch group. Do NOT use just `\par\noindent` or extremely small spaces like `\vspace{2pt}`.
- **Intermediate spacing:** If there are multiple tables in the same box separated by text headings, use `\vspace{12pt}` before the subsequent heading to cleanly separate it from the preceding table.


### ⚠ Multicolumn Column Types
When overriding column types using `\multicolumn` (e.g. in table headers), you must explicitly use `m{...}` rather than `p{...}` to maintain the vertical centering of the text:
- **Correct:** `\multicolumn{1}{|>{\centering\arraybackslash}m{3.0cm}|}{\textbf{Header}}`
- **Incorrect:** `\multicolumn{1}{|>{\centering\arraybackslash}p{3.0cm}|}{\textbf{Header}}` (causes top-alignment mismatch)

### ⚠ Multirow Column Borders (No Intersecting Lines)
When a table contains `\multirow` blocks (e.g., grouping multiple rows under a single category), standard horizontal lines (`\hline`) will cut through the first column and intersect the category name. To prevent this:
- **Do NOT use `\hline` inside the multirow span:** Only use `\hline` at the very top and bottom boundaries of the multirow block.
- **Use `\cline{start-end}` for inner rows:** For horizontal separators *inside* the multirow block, use `\cline{2-3}` (or whichever columns should have horizontal borders), leaving the first column open.
- **Correct:**
  ```latex
  \multirow{3}{*}{\textbf{Interpersonal}} & Figurehead & ... \\
  \cline{2-3}
  & Leader & ... \\
  \cline{2-3}
  & Liaison & ... \\
  \hline
  ```
- **Incorrect (cuts through "Interpersonal"):**
  ```latex
  \multirow{3}{*}{\textbf{Interpersonal}} & Figurehead & ... \\
  \hline
  & Leader & ... \\
  \hline
  & Liaison & ... \\
  \hline
  ```

### ⚠ Invisible Table Headers (No White Text)
When converting table headers to satisfy the strict boxed table styling (removing all shading/row colors like `rowalt` or `myteal` from headers):
- **Always ensure header text is black/dark:** Remove any legacy `\color{white}` or similar specifiers in your column/multicolumn definitions.
- **Why it matters:** Leaving `\color{white}` on a transparent/white background makes the table header text invisible (white on white).
- **Correct:** `\multicolumn{1}{|>{\centering\arraybackslash}m{3.0cm}|}{\textbf{Type}}`
- **Incorrect (invisible text):** `\multicolumn{1}{|>{\centering\arraybackslash\color{white}}m{3.0cm}|}{\textbf{Type}}`

### Global table settings *(canonical preamble — copy exactly)*

```latex
% ─── Table helpers ─────────────────────────────────────────────────────────────
\renewcommand{\arraystretch}{1.45}
\setlength{\tabcolsep}{6pt}
% B{w} — bold left-aligned fixed-width column, VERTICALLY CENTERED
\newcolumntype{B}[1]{>{\small\bfseries\raggedright\arraybackslash}m{#1}}

% Y — flexible-width column (tabularx X), VERTICALLY CENTERED
\newcolumntype{Y}{>{\small\raggedright\arraybackslash}X}

% Make ALL tabularx X columns vertically centered by default
% Without this, X columns use p{} (top-aligned) even if B{} uses m{}
\renewcommand{\tabularxcolumn}[1]{m{#1}}
```

> **Key:** `\renewcommand{\tabularxcolumn}[1]{m{#1}}` is the global fix. It overrides
> the default tabularx behaviour so that **every** `X`-based column (including `Y`)
> uses `m{}` (middle/vertically centered) instead of `p{}` (top-aligned).
> Without this, rows with tall fractions leave text labels hanging at the top.

### Vertical centering rules

| Situation | Rule |
|---|---|
| Any table with a fixed-width first column | Use `m{}` not `p{}` in the `B{}` column type |
| Any `tabularx` table | Ensure `\renewcommand{\tabularxcolumn}[1]{m{#1}}` is in the preamble |
| Simple text-only table | Default `\arraystretch{1.45}` is sufficient |
| Table with `\displaystyle\frac` in any cell | Wrap table with `{\renewcommand{\arraystretch}{1.9} ... }` |
| Row with complex nested fraction (`\frac{expr·(1+i)^n}{expr}`) | Add `\\[6pt]` after the row's `\\` |

### Display-math table template

When a table contains `\displaystyle\frac` expressions, wrap the entire `tabularx`
in a local group to increase row height without affecting other tables:

```latex
{\renewcommand{\arraystretch}{1.9}%
\begin{tabularx}{\linewidth}{|B{3.2cm}|Y|Y|Y|}
\hline
...
Row with simple formula  & ... \\
\hline
Row with tall fraction   & $\displaystyle\frac{i(1+i)^n}{(1+i)^n - 1}$ \\[6pt]
\hline
...
\end{tabularx}}
```

Note the `[6pt]` after `\\` on tall-fraction rows — this adds bottom padding to
prevent the fraction descenders from touching the `\hline` below.

### Wide formulas inside table cells

When a long `\dfrac` expression (e.g., describing function, transfer function) overflows its `X` column:

| Tactic | How |
|---|---|
| **Use `\displaystyle\frac` not `\dfrac`** | `$\displaystyle\frac{2K}{\pi}\!\left[...\right]$` — same display size, narrower horizontal padding. **This is the primary fix.** |
| Negative thin space | Use `\!` before/after `\left[` and `\right]`: `K\!\left[\ldots\right]` |
| Squared exponent | Replace `^2` with `^{\!2}` to pull the exponent closer |
| Break Notes cell | Use `\newline` inside the adjacent Notes cell to give the formula row more vertical room |
| Last resort | Move the formula out of the table into a `formulabox` and reference it from the table |

> **Rule:** Never use `\dfrac` inside a table cell that shares a row with other content. Always use `\displaystyle\frac` instead — it renders identically but avoids the extra horizontal padding `\dfrac` adds, preventing overflow into adjacent columns.



---

## 7. TOC Styling

```latex
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

% Wrap tableofcontents in hyperref linkcolor overrides to keep TOC text/dots black:
% \hypersetup{linkcolor=mydark}
% \tableofcontents
% \hypersetup{linkcolor=myteal}
```

---

## 8. Section & Paragraph Formatting

```latex
\titleformat{\section}
  {\large\bfseries\color{myred}}{\thesection.}{0.5em}{}
  [\vspace{1pt}{\color{myred}\rule{\linewidth}{0.8pt}}]
\titleformat{\subsection}
  {\normalsize\bfseries\color{myteal}}{\thesubsection}{0.5em}{}
\titlespacing*{\section}{0pt}{18pt}{7pt}
\titlespacing*{\subsection}{0pt}{11pt}{4pt}

\setlength{\parindent}{0pt}
\setlength{\parskip}{4pt}
```

### Math in section/subsection titles

Always wrap math with `\texorpdfstring{}{}`:

```latex
% ✅ Correct
\subsection{Response for \texorpdfstring{$\zeta < 1$}{zeta < 1}}

% ❌ Wrong — causes "Improper alphabetic constant" error
\subsection{Response for $\zeta < 1$}
```

---

## 9. Header / Footer

```latex
\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\small\color{myred}\textbf{<CODE>}\;\color{mydark}--- <Subject Name>}
\fancyhead[R]{\small\color{myteal}\textbf{Module N Notes}}
\fancyfoot[C]{\small\color{mydark}\thepage}
\fancyfoot[R]{\small\color{watermark}\textit{\copyright\ Biraj}}
\renewcommand{\headrulewidth}{0.5pt}
\renewcommand{\footrulewidth}{0.3pt}
```

Replace `<CODE>`, `<Subject Name>`, and `Module N` per file.

---

## 10. Title Page

```latex
\begin{center}
  {\LARGE\bfseries\color{myred} <CODE> --- <Full Subject Name>}\\[5pt]
  {\normalsize\color{mydark} Semester VI \quad$\bullet$\quad 3L:0T:0P \quad$\bullet$\quad 3 Credits}\\[3pt]
  {\normalsize\color{myteal}\textbf{Module N Exam Notes}}\\[3pt]
  {\small\color{mydark} CGEC \;$|$\; B.Tech ECE (2023--27) \;$|$\; \textit{Biraj Sarkar}}
\end{center}
\vspace{2pt}
\noindent{\color{myred}\rule{\linewidth}{1.5pt}}
\vspace{2pt}
\hypersetup{linkcolor=mydark}
\tableofcontents
\hypersetup{linkcolor=myteal}
\newpage
```

### Combined Notes Cover Page

For combined subject-wise notes, a full-page cover sheet is generated dynamically by the builder script using the layout from [`Combined_Notes_Cover_Page.tex`](Combined_Notes_Cover_Page.tex).

**Design Specifications:**
1. **Page Border:** Drawn using a TikZ overlay on the empty page style:
   - **Outer Border:** Line width `1.5pt` in `mgframe` color, inset by `0.6in` from the page edges.
   - **Inner Border:** Line width `0.8pt` in `myred` accent color, inset by `0.65in` from the page edges.
2. **Title Block:** Displays the Subject Code in `Huge\bfseries\color{myred}` and the Subject Name in `LARGE\bfseries\color{mydark}`, separated by a `myred` rule (`1.5pt` thick, `0.7\linewidth` wide).
3. **Course Metadata:** Subtitle "Combined Module Notes" in bold `myteal`, followed by module counts and a semester/department/credits line.
   - *Note:* The standard L-T-P parameters (e.g. `3L:0T:0P`) are dynamically replaced with `ECE` by the build script for consistency.
4. **Notice Box:** Uses a light grey `tcolorbox` (`colback=mygray`, `colframe=mgframe`, `boxrule=0.5pt`, `arc=3pt`, `width=0.85\linewidth`) to present the study guide disclaimer.
5. **Bottom Branding Block:** Positioned via `\vfill` to rest elegantly at the bottom:
   - **Author Name:** `Biraj Sarkar` in bold purple (`\large\bfseries\color{mypurple}`).
   - **Affiliation Label:** "IN ASSOCIATION WITH" in small capitals (`\footnotesize\color{watermark}\textbf`).
   - **Associations:** `MAKAUT Wingman` and `MAKAUT Future Minds` in bold dark text (`\small\bfseries\color{mydark}`).
   - **College Name:** `Cooch Behar Government Engineering College` highlighted in bold teal (`\large\bfseries\color{myteal}`).

---

## 11. Quick Revision Page

> Mandatory — must be the **last section** of every module file.

Always open with `\newpage`. Structure in this exact order:

1. **formulabox**  →  "Key Formulas at a Glance" or "Key Concepts at a Glance"
2. **defbox**      →  "One-Line Definitions"
3. **exambox**     →  "Frequently Asked / Viva Questions"
4. **tikzbox**     →  Summary comparison table or reference table

### ⚠ Critical Formatting Rules for Quick Revision

- **No Section Headings:** Do NOT use `\section{Quick Revision --- Module N}` as this generates standard numbered section headings. Always use the centered title block template below.
- **Standardized Title Block Layout:** The title block must strictly follow the two-line centered layout (Module name on line 1, topic names and subject code on line 2) with a `1.2pt` horizontal rule. Do NOT use single-line, inline headings with bullet points (such as `QUICK REVISION \quad\bullet\quad Code Module N`) or different rule thicknesses.
- **Formulas/Concepts Format:** Never use a bulleted `itemize` list inside the `formulabox` for key formulas. Always use a 2-column `tabularx` using column specifiers `B{5.0cm} X` and local row height adjustment `\renewcommand{\arraystretch}{1.35}`.
- **Exambox Title Suffix:** The `exambox` title must be exactly `Frequently Asked / Viva Questions`. Do NOT append `--- Module N` or other module suffixes to the title.
- **Bold Q-Numbering:** The list inside the `exambox` must use the bold Q-numbering format: `\begin{enumerate}[topsep=0pt, label=\textbf{Q\arabic*.}, itemsep=5pt]`. Never omit the `label=\textbf{Q\arabic*.}` configuration.

### Title block template

```latex
\newpage
\begin{center}
  {\large\bfseries\color{myred} Quick Revision --- Module N}\\[3pt]
  {\small\color{mydark} <Topic Name> $|$ <Subject Code>}
\end{center}
\noindent{\color{myred}\rule{\linewidth}{1.2pt}}
\vspace{4pt}
```

### Key Formulas / Concepts Box Template

```latex
\begin{tcolorbox}[formulabox, title={\textbf{Key Formulas and Metrics at a Glance}}]
\renewcommand{\arraystretch}{1.35}
\begin{tabularx}{\linewidth}{B{5.0cm} X}
Formula / Concept Name & $Formula = Expression$ \quad (optional description/units) \\[4pt]
Another Metric & $Metric = Expression2$ \\[4pt]
\end{tabularx}
\end{tcolorbox}
```


---

## 12. Viva Q&A Format

> **Critical:** Question on one line, answer on the next line below it.

Use the `\Q{}` macro — it bolds the question and forces a line break before the answer.

```latex
\begin{tcolorbox}[exambox, title={\textbf{Frequently Asked / Viva Questions}}]
\begin{enumerate}[topsep=0pt, label=\textbf{Q\arabic*.}, itemsep=5pt]
  \item \Q{What is the transfer function?}
    Ratio of Laplace output to Laplace input at zero initial conditions.
  \item \Q{What is the order of a system?}
    Highest power of $s$ in the denominator of $G(s)$.
  ...
  \item \Q{What if my answer is very long?}
    \begin{itemize}[leftmargin=*, itemsep=1pt, topsep=2pt]
      \item Use nested bullet points
      \item To keep it clean
    \end{itemize}
\end{enumerate}
\end{tcolorbox}
```

### Rules

- `itemsep=5pt` — breathing room between Q&A pairs (not too large; 8pt risks page-break issues)
- `\Q{}` — bold question + forced line break before answer
- **Do NOT** use `\Q{}` outside viva enumerate blocks
- 10–12 questions per module; cover definitions, formulas, comparisons, derivations
- **Multi-bullet answers:** Use a nested `\begin{itemize}...\end{itemize}`, not inline semicolons. Inline lists for long answers cause awkward wrapping.
- **Automatic splitting:** The `exambox` is configured with `breakable` and `title after break`. If it grows too long for the page, it will automatically split and append the "(contd.)" title on the next page. No manual splitting is needed!

---

## 13. TikZ Diagram Guidelines

Always wrap TikZ diagrams in a `tikzbox` with a descriptive title:

```latex
\begin{tcolorbox}[tikzbox, title={Descriptive Title Here}]
\centering
\begin{tikzpicture}[...]
  ...
\end{tikzpicture}
\end{tcolorbox}
```

### Standard TikZ node styles (define in preamble)

```latex
\tikzset{
  block/.style={rectangle, draw=myteal, fill=hdrteal,
    text width=2.4cm, align=center, minimum height=0.95cm,
    font=\small, rounded corners=3pt, line width=0.7pt},
  redblock/.style={rectangle, draw=myred, fill=hdrred,
    text width=2.4cm, align=center, minimum height=0.95cm,
    font=\small, rounded corners=3pt, line width=0.7pt},
  netnode/.style={rectangle, draw=myteal, fill=hdrteal,
    text width=1.5cm, align=center, minimum height=0.8cm,
    font=\small, rounded corners=3pt, line width=0.7pt},
  sumjunc/.style={circle, draw=myamber, fill=hdramber,
    minimum size=0.62cm, font=\small, line width=0.8pt},
  snode/.style={circle, draw=mypurple, fill=hdrpurple,
    minimum size=0.55cm, font=\footnotesize, line width=0.7pt},
  arrow/.style={-Stealth, thick, color=mydark},
  redarrow/.style={-Stealth, thick, color=myred},
  line/.style={thick, color=mydark}
  % ⚠ Do NOT define axis/.style here — conflicts with pgfplots/library keys.
  %   Use inline style instead: \draw[-Stealth, thin, color=mydark]
}
```

### TikZ libraries

```latex
\usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, fit, decorations.pathreplacing}
```

### Diagram rules

| Rule | Detail |
|---|---|
| Labels | All nodes labelled with signal/variable names |
| Font | `\small` or `\scriptsize` inside nodes and edge labels |
| Arrows | Feedback paths → `redarrow`; forward paths → `arrow` |
| Label placement | Use `node[above]` or `node[below]` — never `node[midway]` on long arrows (overlaps nodes) |
| Node labels | Use `anchor=east` for left-side labels so they don't clip |
| Topology diagrams | Labels placed with `anchor=north` well above the top node |
| Colour syntax | Always `\color{myred}` — never `\color=myred` (causes compile error) |
| Color safety | Use **ONLY** defined preamble palette colors (`myred`, `myteal`, `mydark`, `mypurple`, `myblue`, `mygreen`, `mygray`, `hdrred`, `hdrteal`, `hdrpurple`, `hdrblue`, `hdrgreen`, `mgframe`, `watermark`). Never use undefined colors like `myyellow` or `myorange`. |
| Horizontal diagrams | Keep total width ≤ 10cm inside a tikzbox to avoid overflow |
| Block count | ≤4 blocks: use global `block` style. **5+ blocks**: define a local `sblock` with `text width=1.75cm`–`1.9cm` and `right=0.6cm` spacing |
| Line breaks in nodes | `\\` requires `align=center, text width=` on the node — otherwise compile fails with "Not allowed in LR mode" |
| Grid Diagrams & Matrices | When drawing grids (e.g. Wumpus World), set unit dimensions `[x=1.8cm, y=1.3cm]` AND set `step=1` on `\draw[line, step=1] (0,0) grid (N, M);` so grid lines match unit coordinate steps rather than defaulting to 1cm physical spacing. |
| Tree / Hierarchy Distances | Always specify per-level sibling distances (`level 1/.style={sibling distance=3.6cm, level distance=1.4cm}`, `level 2/.style={sibling distance=1.6cm, level distance=1.2cm}`) to prevent child nodes of adjacent parent nodes (e.g. Minimax trees) from colliding at $x=0\text{ cm}$. |
| Custom style names | Avoid generic names like `axis` — they conflict with library keys. Prefix with `my` or use inline styles |
| Signal taps | Use distinct `\coordinate` points along the wire; do NOT route taps through other blocks |
| Text next to diagrams | Use side-by-side `minipage`s (e.g., `0.45\linewidth` and `0.5\linewidth`) inside the `tikzbox` to separate the TikZ drawing from text. Never place paragraphs using absolute coordinates inside TikZ nodes (causes overlapping on page wrapping). |

### Block diagram template (for diagrams with 5+ blocks)

```latex
\begin{tcolorbox}[tikzbox, title={Diagram Title}]
\centering
\begin{tikzpicture}[node distance=0.3cm and 0.65cm,
  sblock/.style={rectangle, draw=myteal, fill=hdrteal, text width=1.75cm,
    align=center, minimum height=0.85cm, font=\small,
    rounded corners=3pt, line width=0.7pt}]
  \node[sblock] (n1) {Block 1};
  \node[sblock, right=0.6cm of n1] (n2) {Block 2};
  \node[sblock, right=0.6cm of n2] (n3) {Block 3};
  ...
  \draw[arrow] (n1) -- (n2);
  ...
\end{tikzpicture}
\end{tcolorbox}
```

### Tree diagram template (with per-level sibling distance)

```latex
\begin{tcolorbox}[tikzbox, title={Tree Diagram Title}]
\centering
\begin{tikzpicture}[
  level 1/.style={sibling distance=3.6cm, level distance=1.4cm},
  level 2/.style={sibling distance=1.6cm, level distance=1.2cm}
]
  \node [maxnode] {MAX}
    child {node [minnode] {MIN1}
      child {node [leaf] {3}}
      child {node [leaf] {12}}
    }
    child {node [minnode] {MIN2}
      child {node [leaf] {8}}
      child {node [leaf] {2}}
    };
\end{tikzpicture}
\end{tcolorbox}
```

### Diagram types added per subject

| Subject | Diagrams |
|---|---|
| EC601 Control System | Open/closed loop block diagrams, SFG, s-plane, waveforms |
| EC602 Computer Network | Network topologies, data flow modes, OSI/TCP-IP mapping, telephone network, Stop-and-Wait ARQ, Token Ring, CSMA/CD flowchart, ARP process, TCP 3-way handshake, leaky/token bucket, DNS hierarchy, digital signature, firewall placement, Bluetooth piconet |

---

## 14. Known Issues & Fixes

### `amssymb` conflict
**Do NOT** load `\usepackage{amssymb}` — conflicts with `unicode-math` under XeLaTeX. `unicode-math` already provides all symbols.

### Table overflow (right side clipped)
- **Cause 1:** Table placed immediately after inline `\textbf{Label:}` text — `\linewidth` is measured as remaining line width, not full width.
- **Fix:** Add `\par\noindent` between the label and `\begin{tabularx}`.
- **Cause 2:** `\tabcolsep` too large — total column overhead exceeds `\linewidth`.
- **Fix:** Use `\setlength{\tabcolsep}{6pt}` (not 9pt).

### Content overflowing into footer (unbreakable boxes) & Large White Spaces
- **Cause 1:** A large `tcolorbox` (e.g., a multi-part worked example or a 12-question exambox) does not fit on the remaining page space, resulting in footer overflow or the entire box being pushed to the next page, leaving large blank areas (large white spaces).
- **Fix 1 (Global):** Add `\tcbset{breakable}` globally after the style block in all source modules. Boxes will split across pages automatically.
- **Combined PDF Builder Fix:** The combined builder script (`pdf_build_combined.ps1`) has been updated to automatically apply `\tcbset{breakable}` globally in the combined document's preamble, ensuring that all boxes (`defbox`, `formulabox`, `examplebox`, `exambox`, etc.) break across pages exactly as they do in individual modules.
- **Refinement (Unbalanced Page Splits / Pushed Boxes):** 
  When a breakable box contains tall nested environments (like list items starting with large `align*` equation blocks, tables, or TikZ diagrams) at its very beginning, the LaTeX page-builder may determine that the first unbreakable chunk cannot fit in the remaining space of the current page. As a result, the entire box is pushed to the next page, leaving a massive white space. If this box is placed immediately after a section heading, it can also cause the heading title and its horizontal red rule to split (with the rule and box orphaned on the next page).
  - **The Fix:** Insert a strategic `\newpage` or `\pagebreak` *inside* the `tcolorbox` body (e.g., before a `\textbf{Solution:}` block or immediately after the first list item like part (a)). This forces a portion of the box's content to stay on the first page, which pulls the box start to the current page. This keeps the section title and rule properly grouped with the box start and cleanly distributes the rest of the content onto the next page.
    ```latex
    \begin{tcolorbox}[examplebox, title={Fuzzy Set Operations}]
    \textbf{Problem:} ...
    \begin{itemize}[leftmargin=*]
      \item \textbf{(a) Union:}
        \begin{align*}
          ...
        \end{align*}
        \newpage % Strategic split: fits Part (a) on page 1, pushes Part (b) to page 2
      \item \textbf{(b) Intersection:}
        ...
    \end{itemize}
    \end{tcolorbox}
    ```

> [!WARNING]
> **Avoid Unnecessary/Preemptive Page Breaks:**
> Do NOT use `\newpage` or `\pagebreak` preemptively before a box, table, or TikZ diagram to push it to the next page. This creates massive unnecessary white spaces and breaks the layout flow. Let LaTeX place boxes and elements naturally. Only use `\newpage` where strictly required by the design spec:
> - Immediately before the **Quick Revision** page (mandatory).
> - Immediately after the **Table of Contents** page (mandatory).
> - Inside a `tcolorbox` body only as an absolute last resort to resolve orphaned section headings or header/box separation.


### Phantom extra column in tables
- **Cause:** Using `C{fixed-width}` column type inside `tabularx`.
- **Fix:** Use `>{\centering\arraybackslash}X` for all non-first columns.

### Invisible box title text
- **Cause:** `coltitle` defaults to black — invisible on dark backgrounds.
- **Fix:** Always set `colbacktitle=<colour>` **and** `coltitle=white` in every box style.

### Math symbols in headings
- **Cause:** `hyperref` processes headings in non-math mode.
- **Fix:** `\texorpdfstring{$\zeta < 1$}{zeta < 1}`

### Em-dash encoding
- Use `---` (three hyphens), **not** the Unicode `—` character in section titles.

### TikZ `\foreach` loop — nodes not stacking
- **Cause:** `\foreach` doesn't automatically position nodes relative to each other; all nodes land at the same origin.
- **Fix:** Use explicit `below=Xcm of <prev>` positioning for each node, or use absolute coordinates.

### TikZ node label overlap
- **Cause:** Labels placed at the same y-coordinate as diagram nodes.
- **Fix:** Place labels with `anchor=north` at a y-coordinate clearly above all nodes. Use `anchor=east` for left-side row labels so they right-align without clipping.

### TikZ path/border overlaps and text collisions
- **Cause 1:** Drawing path lines (like curve arrows or dashed rectangles) that intersect text labels or pass directly through other node boxes.
- **Fix 1 (for curves):** Route paths with sufficient spacing. For example, when routing a bypass curve around intermediate blocks, use wider control points (e.g., `(5.0, 1.8)` instead of `(4.0, 0.5)`) to guide the path around the nodes' outer bounds.
- **Fix 1 (for labels):** Position labels dynamically along the paths using specific anchors (e.g., `node[midway, left]` or `node[pos=0.15, right]`) and offset coordinates to keep text from touching line boundaries.
- **Cause 2:** Dashed boundaries or divider lines passing directly through headers or labels in multi-column layouts.
- **Fix 2:** Instead of simple dividing lines, wrap each column or section in a clean solid-colored card/box (using `fill=white, draw=mgframe, rounded corners=6pt`). Place column titles as independent nodes at the top of each card so lines never cross the text.
### TikZ reversed arrowheads
- **Cause:** Drawing an arrow between two nodes that are overlapping or too close together. If the physical distance between node boundaries is smaller than the arrowhead size (e.g., $< 8$pt), TikZ's path-drawing algorithm calculates a negative line segment length and draws the arrowhead backwards (pointing in the opposite direction).
- **Fix:** Ensure a minimum boundary gap of at least `0.5cm` between adjacent nodes. Adjust coordinates to space nodes out horizontally/vertically, or use relative positioning with sufficient distance:
  ```latex
  % ❌ Too close (overlapping boundaries, arrowhead flips)
  \node[block] (n1) at (0,0) {Block 1};
  \node[block] (n2) at (1.5,0) {Block 2}; % text width=1.4cm makes total width ~1.6cm, center distance 1.5cm is too small
  
  % ✅ Clean boundary gap
  \node[block] (n1) at (0,0) {Block 1};
  \node[block] (n2) at (2.5,0) {Block 2}; % Gap is ~0.9cm, arrows render correctly
  ```

### TikZ tree / hierarchy branching & node collisions
- **Cause 1:** Using simple `|-` or `--` connectors to draw lines from a parent node to multiple horizontally-aligned child nodes. This causes arrows to enter nodes horizontally from the side or overlap other paths.
- **Fix 1:** Use coordinate math (`calc` library) to compute a branch midpoint, and then use the `-|` operator to route lines horizontally first, then vertically straight down into the child nodes' top centers:
  ```latex
  % ✅ Clean tree branch routing
  \draw[line] (parent.south) -- ($(parent.south)!0.5!(middle_child.north)$) coordinate (branch);
  \draw[arrow] (branch) -- (middle_child.north);
  \draw[arrow] (branch) -| (left_child.north);
  \draw[arrow] (branch) -| (right_child.north);
  ```
- **Cause 2 (Tree Node Collisions):** Setting a single global `sibling distance=X.Xcm` on the root node without specifying level styles when tree depth $\ge 2$. At level 2, the right child of `MIN1` and left child of `MIN2` both land at $x = 0\text{ cm}$ directly overlapping each other.
- **Fix 2:** Always specify explicit per-level sibling distances:
  ```latex
  \begin{tikzpicture}[
    level 1/.style={sibling distance=3.6cm, level distance=1.4cm},
    level 2/.style={sibling distance=1.6cm, level distance=1.2cm}
  ]
  ```

### TikZ grid coordinate scaling vs. default 1cm grid lines
- **Cause:** Setting unit scale `[x=1.8cm, y=1.3cm]` on `tikzpicture` but writing `\draw (0,0) grid (4,4);`. In TikZ, `grid` defaults to physical 1cm spacing unless `step=1` is specified, causing grid lines to draw at 1cm physical intervals while text nodes land at coordinate positions, resulting in severe line-text collisions.
- **Fix:** Always add `step=1` to the grid command: `\draw[line, step=1] (0,0) grid (4,4);`.

### Undefined Color Error (`Package xcolor Error: Undefined color myyellow`)
- **Cause:** Using arbitrary color names like `myyellow`, `myorange`, `mycyan` inside TikZ or tcolorboxes that are not defined in the master preamble.
- **Fix:** Use only the 14 defined palette colors (`myred`, `myteal`, `mydark`, `mypurple`, `myblue`, `mygreen`, `mygray`, `hdrred`, `hdrteal`, `hdrpurple`, `hdrblue`, `hdrgreen`, `mgframe`, `watermark`). For gold/amber elements, use `mygreen!30` or `hdramber`.

### tcolorbox White Text on Light Background (`attach title to upper` bug)
- **Cause:** Using `attach title to upper` inside `basebox` or `tcolorbox` definitions. This eliminates the distinct dark header bar (`title material` with `colbacktitle`), placing the title text (`coltitle=white`) directly inside the light upper body box background (`colback=hdrgreen` / `hdrteal`), producing unreadable white-on-light-green/teal text.
- **Fix:** Never use `attach title to upper` or custom `basebox` wrappers that include it. Use standard `tcolorbox` definitions with explicit `colbacktitle=<dark_color>` and `coltitle=white` so the title resides in a distinct dark header bar:
  ```latex
  defbox/.style={
    colback=hdrgreen, colframe=mygreen, boxrule=0.8pt, arc=4pt,
    left=9pt, right=9pt, top=6pt, bottom=6pt,
    colbacktitle=mygreen, coltitle=white, fonttitle=\small\bfseries
  }
  ```

### Long Multi-step Equations Overflowing Box Margins (`multiline equals`)
- **Cause:** Writing long multi-step calculations on a single horizontal line with multiple chained equal signs (`= ... = ... = ... = ...`). Inside tcolorboxes or list environments, this causes the equation to extend past the right margin of the box and collide with the box border line.
- **Fix:** Format multi-step equations across multiple lines aligned at equal signs (`=`) using `\begin{aligned} ... \end{aligned}` inside `\begin{equation}`:
  ```latex
  % ❌ Single-line equation chaining causes right margin overflow
  \begin{equation}
    \varepsilon_{eff} = \frac{9.8 + 1}{2} + \frac{9.8 - 1}{2} [1 + 12(1)]^{-1/2} = 5.4 + 4.4 [13]^{-1/2} = 5.4 + \frac{4.4}{3.6055} = 5.4 + 1.2203 = 6.6203
  \end{equation}

  % ✅ Clean multi-line aligned equation fitting perfectly inside box
  \begin{equation}
    \begin{aligned}
      \varepsilon_{eff} &= \frac{9.8 + 1}{2} + \frac{9.8 - 1}{2} \left[ 1 + 12(1) \right]^{-1/2} \\
      &= 5.4 + 4.4 \left[ 13 \right]^{-1/2} = 5.4 + \frac{4.4}{3.6055} \\
      &= 5.4 + 1.2203 = 6.6203
    \end{aligned}
  \end{equation}
  ```

### TikZ coordinate scaling vs. node sizes
- **Cause:** Relying on `scale=X` to shrink a diagram. In TikZ, `scale=X` only scales coordinate values; it does **not** scale node dimensions, font sizes, or padding. Shrinking coordinates without shrinking nodes pushes nodes physically closer, causing text and border overlaps.
- **Fix:** Keep `scale=1.0` and space out coordinates. If scaling is necessary, also manually shrink the node styles by setting smaller `minimum size`, reducing padding with `inner sep=1.2pt` (default is `0.3333em`), and reducing font size (e.g., `font=\tiny`):
  ```latex
  % ✅ Safe compact style definition
  \tikzset{
    leaf/.style={circle, draw=mydark, fill=mygray, minimum size=0.4cm, inner sep=1.2pt, font=\tiny}
  }
  ```

### Wrong colour syntax in TikZ
- **Cause:** `\color=myred` (assignment syntax) instead of `\color{myred}` (command syntax).
- **Fix:** Always use `\color{myred}` — the `=` form causes `\iffalse` parse errors.

### TikZ block diagram overflow (too many blocks in one row)
- **Cause:** Using the global `block` style (fixed `text width=2.4cm`) or `wblock` style (fixed `text width=3.2cm`) for diagrams with 4+ blocks in a row — total width exceeds the `tikzbox` inner width (~10cm usable).
- **Width budget:** `n` blocks × `text width` + `(n-1)` × gap + input label ≤ ~10cm. Check before drawing.
- **Fix:** Define a local `sblock` style inside the `tikzpicture` with a smaller `text width` and tighter spacing:
  - 4 blocks: `text width=2.0cm`, `right=0.7cm`
  - 5–6 blocks: `text width=1.75cm`, `right=0.6cm`
  ```latex
  \begin{tikzpicture}[node distance=0.3cm and 0.65cm,
    sblock/.style={rectangle, draw=myteal, fill=hdrteal, text width=1.75cm,
      align=center, minimum height=0.85cm, font=\small,
      rounded corners=3pt, line width=0.7pt}]
    \node[sblock] (n1) {Block 1};
    \node[sblock, right=0.6cm of n1] (n2) {Block 2};
    ...
  \end{tikzpicture}
  ```
- **Rule:** Never use the global `block`, `wblock`, or `redblock` styles for diagrams with 4+ blocks in a single row. Always define a local `sblock`.

### Wide formula overflowing table cell
- **Cause:** Long `\dfrac` expressions (e.g., Describing Function formulas) exceed the `X` column width in `tabularx`. `\dfrac` adds extra horizontal padding that pushes the cell beyond its allocated width.
- **Fix (primary):** Replace `\dfrac` with `\displaystyle\frac` — renders identically but is narrower:
  ```latex
  % ❌ Overflows
  Dead Zone & $K\!\left[1 - \dfrac{2}{\pi}...\right]$ & Notes \\
  % ✅ Fits
  Dead Zone & $\displaystyle K\!\left[1 - \frac{2}{\pi}...\right]$ & Notes \\
  ```
- **Fix 2:** Tighten brackets with `\!`: `K\!\left[\ldots\right]`
- **Fix 3:** Use `\newline` inside the Notes cell to give the formula row more vertical room.
- **Fix 4 (for very long formulas — proven):** Span the formula + notes across both remaining columns using `\multicolumn` with an explicit `p{\dimexpr}` width:
  ```latex
  % 3-column table: |B{2.8cm}|X|X|
  Dead Zone & \multicolumn{2}{>{\raggedright\arraybackslash}p{\dimexpr\linewidth-2.8cm-4\tabcolsep-3\arrayrulewidth}|}{%
    $\displaystyle K\!\left[1 - \frac{2}{\pi}\sin^{-1}\!\!\left(\frac{\Delta}{A}\right)
    - \frac{2\Delta}{\pi A}\sqrt{1-\left(\frac{\Delta}{A}\right)^{\!2}}\,\right]$
    \quad {\small($\Delta$ = half-width; valid for $A>\Delta$)}} \\
  ```
  This gives the formula the full remaining width and appends the note inline.
- **Last resort:** Move the formula to a `formulabox` and reference it from the table.

### Viva Q&A list breaking mid-item across page
- **Cause:** A `tcolorbox[exambox]` with many items breaks at a page boundary, splitting a single Q&A item across two pages. `\needspace` does **NOT** work inside `breakable` tcolorbox — the box's own break logic ignores it.
- **Fix:** The `exambox` is now configured with `title after break={\textbf{Frequently Asked / Viva Questions (contd.)}}` by default. This natively handles page splits and automatically injects the continuation title at the top of the next page! You no longer need to split the box manually using `\newpage`.

### `\\` inside TikZ node label causes "Not allowed in LR mode"
- **Cause:** Using `\\` for line breaks inside a TikZ `\node[...]{text\\text}` when the node has no `align=` or `text width=` set.
- **Fix:** Either add `align=center, text width=Xcm` to the node style, or replace `\\` with a space: `{Signal Input}` instead of `{Signal\\Input}`.

### `axis` TikZ style conflicts with pgfplots/other libraries
- **Cause:** Defining `axis/.style={...}` in `\tikzset{}` conflicts with the `axis` environment key used by pgfplots or other TikZ libraries.
- **Fix:** Rename the custom style to `myaxis` or use inline style: `\draw[-Stealth, thin, color=mydark]` directly.

### Raw markdown bold / emphasis syntax (`**text**` or `*text*`)
- **Cause:** Using markdown-style `**text**` or `*text*` instead of LaTeX commands like `\textbf{text}` or `\textit{text}` in `.tex` files. This prints literal double asterisks `**` or single asterisks `*` in the compiled PDF instead of bolding/italicizing the text.
- **Fix:** Always use `\textbf{text}` for bold text and `\textit{text}` for italic/emphasized text. Never use markdown-style asterisks `**` or `*` for text styling inside LaTeX files.

### Raw markdown list points (`- ` or `* `)
- **Cause:** Starting a line with a hyphen `-` or asterisk `*` followed by a space and text in LaTeX (e.g., `- Text`). In LaTeX, consecutive lines are merged into a single paragraph during compilation. This causes multiple bullet points to concatenate into a single line (separated by literal hyphens `-`) instead of forming a vertical bulleted list.
- **Fix:** Always wrap lists inside an `itemize` or `enumerate` environment. Use `\item` for each item. Never write raw hyphens `-` or asterisks `*` at the start of a line to represent list points.
  ```latex
  % ❌ Wrong (concatenates into a single line)
  - Point A
  - Point B

  % ✅ Correct
  \begin{itemize}[leftmargin=*, itemsep=3pt]
    \item Point A
    \item Point B
  \end{itemize}
  ```

### Inline Math vs. Display Math (Avoid Inline Matrices)
- **Cause:** Writing large mathematical structures (like matrices, arrays, or tall fractions) inline using `$...$` causes extremely uneven line heights, overlaps text, and can split equations awkwardly across lines (e.g. splitting at `=`).
- **Fix:** Always use display math `\[ ... \]` or the `equation*` / `align*` environment for matrices, fractions, or long equations. Keep inline math `$...$` only for simple variables (like $x, y$) or small expressions (like $v=(0,0)$).
- **Preventing splits:** If a small equation must remain inline but should not be split across line breaks, wrap it in braces: `{$E = mc^2$}` or `\mbox{$E = mc^2$}`.

### Mathematical Layout & Derivations Elegance
- **Side-by-Side minipages:** When showing related mathematical objects (e.g., a current macroblock matrix and its reference search coordinate grid), place them side-by-side using `minipage` blocks to optimize vertical space and improve contrast:
  ```latex
  \begin{minipage}{0.42\linewidth}
    \centering
    \textbf{Current Block:}
    \[
      F_t = \begin{bmatrix} 80 & 85 \\ 70 & 75 \end{bmatrix}
    \]
  \end{minipage}
  \hfill
  \begin{minipage}{0.53\linewidth}
    \centering
    \textbf{Reference Region:}
    \par\vspace{4pt}
    \begin{tabular}{c | c c c}
      ...
    \end{tabular}
  \end{minipage}
  ```
- **Explicit Grid Separators:** Grids or coordinate tables showing search blocks must use explicit separators (like `c | c c c` and a horizontal `\hline`) so index coordinates (labels) are visually separated from coordinate values.
- **Structured Explanations:** Break down multi-part calculations or comparative steps with bold subsections (e.g., `\textbf{Alternative Candidate Analysis:}`) and clear itemized bullet points (`\begin{itemize}[leftmargin=*]`) instead of running them in a single dense paragraph. This ensures high readability.

### Missing packages (TinyTeX)
```
tlmgr install caption setspace multirow booktabs tocloft
```

---

## 15. Compile Scripts

Both scripts live at the **repo root** and are run from there.

### `pdf_compile.ps1` — compile module PDFs

```powershell
# Compile all modules across all subjects and semesters:
.\pdf_compile.ps1

# Compile one subject only:
.\pdf_compile.ps1 -Subject "EC601"

# Compile a single file:
.\pdf_compile.ps1 -Module "6th SEM\01. Control System\EC601_Module1_Notes.tex"

# Keep .log files after compilation (useful for debugging failures):
.\pdf_compile.ps1 -KeepLogs

# Clean up all auxiliary build files (does not compile):
.\pdf_compile.ps1 -Clean
```

- Runs **2 xelatex passes** automatically (for TOC sync)
- Cleans `.aux .toc .out .fls .fdb_latexmk .log` on success
- Does **not** pass `-synctex=1` — no `.synctex.gz` files generated
- On failure: prints last 25 lines of the `.log` file
- **Automatic Post-Compile Security Hook:** Automatically invokes `python pdf_secure.py --file "<compiled_pdf>"` to apply standard academic metadata and AES-256 permissions lock.

### `pdf_build_combined.ps1` — build combined PDFs

```powershell
# Build combined PDFs for all subjects:
.\pdf_build_combined.ps1

# One subject only:
.\pdf_build_combined.ps1 -Subject "EC602"

# Generate .tex only, skip compile (for inspection):
.\pdf_build_combined.ps1 -SkipCompile

# Clean up all generated combined source files and aux files (does not compile):
.\pdf_build_combined.ps1 -Clean
```

- Auto-discovers subject folders recursively (any `NN. Name/` folder with module `.tex` files)
- Runs **3 xelatex passes**
- Output PDF named `<CODE>_<Subject_Name>.pdf` (e.g. `EC601_Control_System.pdf`)
- The generated `*_Combined_Notes.tex` is auto-built — **do not hand-edit it**
- **Automatic Post-Compile Security Hook:** Automatically invokes `pdf_secure.py` upon successful generation.

### `pdf_secure.py` — PDF Permissions Protection & Academic Metadata

Automates post-processing of archive PDFs using PyMuPDF (`fitz`) and AES-256 permissions encryption.

```powershell
# Verify protection status across all PDFs in the repository:
python pdf_secure.py --check

# Secure and brand a single PDF file:
python pdf_secure.py --file "path\to\file.pdf"

# Secure and brand all 268+ PDFs across all semesters:
python pdf_secure.py --all
```

- **Permissions Policy:**
  - **Changing the Document:** `NOT Allowed` (tamper-proof against modifications)
  - **Page Extraction:** `NOT Allowed` (prevents splitting/commercial re-bundling)
  - **Content Copying:** `ALLOWED` (students can freely copy text, code, formulas)
  - **Printing:** `ALLOWED` (full high-resolution printing)
  - **Accessibility:** `ALLOWED` (screen-readers for visually impaired students)
  - **Open Password:** `None` (opens instantly in all browsers, Acrobat, phone apps)
- **Password Management:** Reads `PDF_PERMISSIONS_PASSWORD` from `.env`. Never commit `.env` (it is git-ignored; template provided in `.env.example`).
- **Academic Metadata:** Injects standardized Title, Author (`Biraj Sarkar (CGEC)`), Subject, Keywords, Creator link, and CC BY-NC-SA 4.0 license attribution. Avoids legacy replacement characters (``).

> **Direct xelatex fallback** (if scripts fail):
> ```powershell
> $dir = "6th SEM\01. Control System"
> xelatex -interaction=nonstopmode -output-directory $dir "$dir\EC601_Module1_Notes.tex"
> ```

---

## 16. Adapting for Other Subjects

To create notes for a new subject:

1. **Create folder:** `<N>th SEM/NN. Subject Name/`
2. **Copy preamble** from any existing module `.tex` file.
3. **Update only these fields:**

   | Field | Change to |
   |---|---|
   | `\fancyhead[L]` | New subject code and name |
   | `\fancyhead[R]` | New module number |
   | `\hypersetup` | New `pdftitle` |
   | Title block | New subject code, name, credits, module number |

4. **Keep identical** — all colour definitions, box styles, table settings, TikZ base styles.
5. **Add subject-specific TikZ styles** alongside the base styles — don't replace them.
6. Follow the same section structure: content sections → Quick Revision page.
7. Compile: `.\pdf_compile.ps1 -Module "<path>\File.tex"` (2 passes, from repo root).

**Adding a new semester:** Create `Nth SEM/` at repo root with subject subfolders inside. The build scripts auto-discover — no script changes needed. Update the status table in `README.md`.

---

## 17. Final Quality Checklist

Before submitting or printing the PDF:

- [ ] All box titles are visible (white text on coloured background)
- [ ] No table content clipped on the right — check all tables following inline text labels
- [ ] No formula in a table cell overflows into adjacent column (use `\!` and `\newline` to fit)
- [ ] **No table shading or row colors used:** All tables use transparent/white backgrounds with explicit horizontal borders (`\hline`) separating every row and vertical lines (`|`) surrounding all columns.
- [ ] **Table headers do not use white text:** Header text must be dark/black on transparent background.
- [ ] **Quick Revision page title block layout is correct:** Use the centered, two-line, non-section title block layout (Module on line 1, topic names and subject code on line 2) with a `1.2pt` horizontal rule. Do NOT use single-line, inline headings with bullet points.
- [ ] **Quick Revision formulas in `tabularx` format:** Never use an `itemize` list for formulas in the `formulabox` of Quick Revision; use the 2-column `tabularx` template.
- [ ] **Exambox title has no module suffix:** Must be exactly `Frequently Asked / Viva Questions` with no extra module number or subject suffix.
- [ ] **Bold Q-numbering in exambox:** Enumerate items inside `exambox` must use `[topsep=0pt, label=\textbf{Q\arabic*.}, itemsep=5pt]`.
- [ ] No TikZ block diagram extends past the `tikzbox` border (use local `sblock` style for 5+ blocks)
- [ ] No `\\` line break inside a TikZ node without `align=center` and `text width=`
- [ ] No custom `axis/.style` defined in `\tikzset{}` (use inline styles instead)
- [ ] TOC page numbers are correct (compiled twice)
- [ ] Quick Revision page starts on a new page (`\newpage` before it)
- [ ] All viva Q&A use `\Q{}` macro (question bold, answer on next line)
- [ ] Viva questions in the `exambox` break cleanly across pages (relying on `title after break` instead of manual `\newpage` box splits)
- [ ] No unnecessary or preemptive `\newpage` / `\pagebreak` commands before tables, boxes, or TikZ diagrams (let them flow naturally to avoid large blank spaces)
- [ ] Multi-bullet answers in viva use a nested `itemize`, not inline semicolons
- [ ] No raw markdown bold/emphasis syntax (**text** or *text*), or raw list points (- Point, * Point, or 1. Point) in .tex files (the compiler script now validates this and fails compile if found)
- [ ] No `\usepackage{amssymb}` in preamble
- [ ] No Unicode em-dash (`—`) in section/subsection titles (use `---`)
- [ ] Math in headings wrapped with `\texorpdfstring{}{}`
- [ ] All TikZ diagrams are inside `tikzbox` with a title
- [ ] TikZ node labels use `\color{myred}` not `\color=myred`
- [ ] TikZ labels positioned with `anchor=` to avoid overlapping nodes
- [ ] Block diagrams: signal taps cleanly separated, no overlapping wires through blocks
- [ ] No curved paths intersecting/passing through intermediate node boxes
- [ ] No layout/divider lines intersecting header text (wrap columns in clean card nodes instead)
- [ ] No content overflows into footer (`\tcbset{breakable}` is present)
- [ ] Footer shows `\copyright\ Biraj` on every page
- [ ] Aux files cleaned after compilation
- [ ] PDF security permissions and academic metadata applied (automatically handled via `pdf_secure.py` post-hook, or verified with `python pdf_secure.py --check`)