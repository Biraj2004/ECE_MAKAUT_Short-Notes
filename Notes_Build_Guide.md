# Exam-Ready Module Notes Instruction
**MAKAUT B.Tech — Build Guide**
> Author: Biraj Sarkar | CGEC | B.Tech ECE (2023–27) | Last updated: May 2026

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
\definecolor{hdrgray}{RGB}{238,240,245}   % comparison table headers only
\definecolor{rowalt}{RGB}{250,251,253}    % alternate row shading
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
| `hdrgray` | Comparison table headers **only** (neutral grey) |
| `hdrteal` | Topic-specific table headers (formulas, properties) |
| `hdrgreen` | Definition/terminology table headers |
| `hdrpurple` | SFG/Mason table headers |

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

---

## 6. Table Rules

> Follow exactly — these rules prevent broken/phantom column layouts.

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
| ✅ Correct | `>{\centering\arraybackslash}X` | Stretch column — use for all non-first columns |
| ✅ Correct | `>{\small\bfseries\raggedright\arraybackslash}m{3.2cm}` | Bold-left fixed — first column only (use `m{}` not `p{}`) |
| ❌ Wrong | `C{2.6cm}` inside tabularx | Causes phantom extra column on right edge |
| ❌ Wrong | `p{...}` in any column | Top-aligns text — use `m{...}` for vertical centering |

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

---

## 11. Quick Revision Page

> Mandatory — must be the **last section** of every module file.

Always open with `\newpage`. Structure in this exact order:

```
1. formulabox  →  "Key Formulas at a Glance"          (2-col tabularx of all module formulas)
2. defbox      →  "One-Line Definitions"               (bullet list of every key term)
3. exambox     →  "Frequently Asked / Viva Questions"  (10–12 Q&A pairs using \Q{})
4. tikzbox     →  Summary comparison table or reference table
```

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
| Horizontal diagrams | Keep total width ≤ 10cm inside a tikzbox to avoid overflow |
| Block count | ≤4 blocks: use global `block` style. **5+ blocks**: define a local `sblock` with `text width=1.75cm`–`1.9cm` and `right=0.6cm` spacing |
| Line breaks in nodes | `\\` requires `align=center, text width=` on the node — otherwise compile fails with "Not allowed in LR mode" |
| Custom style names | Avoid generic names like `axis` — they conflict with library keys. Prefix with `my` or use inline styles |
| Signal taps | Use distinct `\coordinate` points along the wire; do NOT route taps through other blocks |

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

### Content overflowing into footer
- **Cause:** Large `tcolorbox` (e.g., 12-question exambox) doesn't fit on remaining page space and overflows the footer.
- **Fix:** Add `\tcbset{breakable}` globally after the style block. Boxes will split across pages automatically.

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

### Raw markdown bold syntax (`**`)
- **Cause:** Using markdown-style `**text**` instead of LaTeX command `\textbf{text}` in `.tex` files. This prints literal double asterisks `**` in the compiled PDF instead of bolding the text.
- **Fix:** Always use `\textbf{text}` for bold text. Never use markdown-style `**` inside LaTeX files.

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
```

- Runs **2 xelatex passes** automatically (for TOC sync)
- Cleans `.aux .toc .out .fls .fdb_latexmk .log` on success
- Does **not** pass `-synctex=1` — no `.synctex.gz` files generated
- On failure: prints last 25 lines of the `.log` file

### `pdf_build_combined.ps1` — build combined PDFs

```powershell
# Build combined PDFs for all subjects:
.\pdf_build_combined.ps1

# One subject only:
.\pdf_build_combined.ps1 -Subject "EC602"

# Generate .tex only, skip compile (for inspection):
.\pdf_build_combined.ps1 -SkipCompile
```

- Auto-discovers subject folders recursively (any `NN. Name/` folder with module `.tex` files)
- Runs **3 xelatex passes**
- Output PDF named `<CODE>_<Subject_Name>.pdf` (e.g. `EC601_Control_System.pdf`)
- The generated `*_Combined_Notes.tex` is auto-built — **do not hand-edit it**

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
- [ ] No TikZ block diagram extends past the `tikzbox` border (use local `sblock` style for 5+ blocks)
- [ ] No `\\` line break inside a TikZ node without `align=center` and `text width=`
- [ ] No custom `axis/.style` defined in `\tikzset{}` (use inline styles instead)
- [ ] TOC page numbers are correct (compiled twice)
- [ ] Quick Revision page starts on a new page (`\newpage` before it)
- [ ] All viva Q&A use `\Q{}` macro (question bold, answer on next line)
- [ ] Last 2–3 viva items either fit on the same page OR the viva is split into two `exambox` blocks with `\newpage` between (use `start=N` on the second `enumerate`)
- [ ] Multi-bullet answers in viva use a nested `itemize`, not inline semicolons
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
