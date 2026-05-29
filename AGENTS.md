# AGENTS.md — Agentic Context

> Read this before working on any file in this repository.
> It tells you what the project is, how it's structured, what tools exist, and the rules you must follow.

---

## Project overview

This is a LaTeX note-writing project for **MAKAUT B.Tech ECE (2023–27)** by Biraj Sarkar (CGEC).

The goal is exam-ready, module-wise PDF notes for every subject across all 8 semesters. Currently **6th SEM is in progress**. Earlier semesters (1st–5th) are planned but empty. 7th and 8th are future work.

Each subject is broken into modules matching the MAKAUT syllabus. Every module is a **self-contained `.tex` file** that compiles to a PDF. A combined PDF per subject is also generated automatically.

---

## Repository layout

```
ECE_MAKAUT_Short-Notes/
├── 1st SEM/ … 5th SEM/            # Empty — planned
├── 6th SEM/
│   ├── 01. Control System/         # EC601 — 7 modules
│   │   ├── EC601_Module1_Notes.tex / .pdf
│   │   ├── ...
│   │   ├── EC601_Module7_Notes.tex / .pdf
│   │   ├── EC601_Combined_Notes.tex  (auto-generated — do not hand-edit)
│   │   └── EC601_Control_System.pdf  (combined output)
│   └── 02. Computer Network/       # EC602 — 4 modules
│       ├── EC602_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── EC602_Module4_Notes.tex / .pdf
│       ├── EC602_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── EC602_Computer_Network.pdf
├── pdf_compile.ps1                 # Compile module PDFs
├── pdf_build_combined.ps1          # Build combined PDFs
├── Notes_Build_Guide.md            # THE authoritative style & content spec
├── AGENTS.md                       # This file
├── CLAUDE.md                       # LLM behaviour guidelines
└── README.md
```

---

## The authoritative spec

**`Notes_Build_Guide.md` is the single source of truth** for everything LaTeX-related in this project. Before writing or editing any `.tex` file, read the relevant sections:

| Section | What it covers |
|---|---|
| §1 Content Philosophy | Target audience, topic structure, what every topic must include |
| §2 File Naming | Naming convention, compile command, self-contained rule |
| §3 LaTeX Preamble | Exact package list, font setup, compiler (XeLaTeX only) |
| §4 Colour Palette | All colour definitions — fixed, never change |
| §5 tcolorbox Styles | All 6 box styles — copy exactly |
| §6 Table Rules | tabularx rules, column types, overflow fixes |
| §7 TOC Styling | tocloft settings |
| §8 Section Formatting | titleformat, math in headings |
| §9 Header/Footer | fancyhdr template |
| §10 Title Page | Exact title block template |
| §11 Quick Revision Page | Mandatory last section — structure and order |
| §12 Viva Q&A Format | `\Q{}` macro, exambox split rules |
| §13 TikZ Guidelines | Node styles, diagram rules, block diagram template |
| §14 Known Issues & Fixes | Critical — read before debugging any compile error |
| §15 Compile Script | How to use `pdf_compile.ps1` |
| §16 Adapting for New Subjects | Steps to create a new subject folder |

---

## Build system

### `pdf_compile.ps1` — compile module PDFs

Runs from repo root. Auto-discovers all `*_Module*_Notes.tex` files recursively. Skips `_*.tex` and `*_Combined_Notes.tex`.

```powershell
# All modules across all subjects
.\pdf_compile.ps1

# One subject
.\pdf_compile.ps1 -Subject "EC601"

# One file
.\pdf_compile.ps1 -Module "6th SEM\01. Control System\EC601_Module3_Notes.tex"

# Keep logs on failure
.\pdf_compile.ps1 -KeepLogs
```

- Runs **2 xelatex passes** (for TOC sync)
- Cleans `.aux .toc .out .fls .fdb_latexmk .log` on success
- Does **not** generate `.synctex.gz` (flag removed intentionally)

### `pdf_build_combined.ps1` — build combined PDFs

Runs from repo root. Auto-discovers subject folders (any subfolder under a `NN. Name/` folder containing `*_Module*_Notes.tex` files).

```powershell
# All subjects
.\pdf_build_combined.ps1

# One subject
.\pdf_build_combined.ps1 -Subject "EC602"

# Generate .tex only, skip compile
.\pdf_build_combined.ps1 -SkipCompile
```

- Reads preamble, colours, tcbset, tikzset from source modules
- Merges tikzset styles across all modules (deduplicates by name)
- Generates `<CODE>_Combined_Notes.tex` then renames output PDF to `<CODE>_<Subject_Name>.pdf`
- Runs **3 xelatex passes**
- All `Get-Content` calls use `-Encoding UTF8` — required for em-dash handling

**Combined PDF naming:** `ECxxx_Subject_Name.pdf`
Examples: `EC601_Control_System.pdf`, `EC602_Computer_Network.pdf`

---

## LaTeX rules (critical)

These are non-negotiable. Violating them causes compile errors or broken output.

### Compiler
- **XeLaTeX only.** Never pdfLaTeX or LuaLaTeX.
- Run twice for correct TOC page numbers.

### Packages
- Do **not** load `\usepackage{amssymb}` — conflicts with `unicode-math`.
- Load `\usepackage{xcolor}` **before** `colortbl` and without `[table]` option.
- TikZ library must include `decorations.pathreplacing` (used for braces in diagrams).

### Colours
- All colours are defined in §4 of the spec. **Do not change RGB values.**
- In TikZ: always `\color{myred}` — never `\color=myred`.

### Tables
- Always `\begin{tabularx}{\linewidth}{...}`.
- Add `\par\noindent` before any table that immediately follows inline text.
- Never use `C{fixed-width}` inside `tabularx` — use `>{\centering\arraybackslash}X`.
- Never use `\dfrac` inside table cells — use `\displaystyle\frac`.

### TikZ diagrams
- Always wrap in `\begin{tcolorbox}[tikzbox, title={...}]`.
- For 5+ blocks in a row: define a local `sblock` style, never use the global `block`.
- `\\` inside a node requires `align=center, text width=Xcm` on that node.
- Never define `axis/.style` in `\tikzset{}` — conflicts with pgfplots. Use `myaxis` or inline.

### Boxes
- All 6 styles (`tikzbox`, `defbox`, `formulabox`, `examplebox`, `masonbox`, `exambox`) must be present in every file.
- Always set both `colbacktitle` and `coltitle=white` — missing `coltitle` makes title text invisible.
- Add `\tcbset{breakable}` after the style block.

### Math in headings
```latex
% Correct
\subsection{Response for \texorpdfstring{$\zeta < 1$}{zeta < 1}}
% Wrong — causes compile error
\subsection{Response for $\zeta < 1$}
```

### Viva Q&A
- Use `\Q{}` macro inside `exambox` enumerate only.
- If 12+ questions or last 2–3 have multi-line answers: split into two `exambox` blocks with `\newpage` between, use `start=N` on the second enumerate.

---

## Content rules

From §1 of the spec:

- **Audience:** MAKAUT B.Tech ECE students, exam/viva prep.
- **Depth:** Moderate — suitable for 2, 5, 10, 15-mark questions.
- **Language:** Simple English, standard Indian engineering terminology.
- **No:** unnecessary history, research discussions, textbook-style prose.
- **Every topic must have:** definition (defbox), formulas with units, derivations (no skipped steps), comparison tables, TikZ diagram, exam tips (exambox).

**Topic order:**
> Definition → Concept → Working → Formula → Diagram → Advantages/Disadvantages → Applications → Exam Points

**Quick Revision page** (mandatory last section, starts with `\newpage`):
1. `formulabox` — Key Formulas at a Glance
2. `defbox` — One-Line Definitions
3. `exambox` — Frequently Asked / Viva Questions (10–12 Q&As)
4. `tikzbox` — Summary comparison table

---

## File naming convention

```
<SubjectCode>_Module<N>_Notes.tex   →   <SubjectCode>_Module<N>_Notes.pdf
```

Examples:
```
EC601_Module1_Notes.tex  →  EC601_Module1_Notes.pdf
EC602_Module4_Notes.tex  →  EC602_Module4_Notes.pdf
```

Subject folder naming:
```
NN. Subject Name/
```
Examples: `01. Control System/`, `02. Computer Network/`

---

## Adding a new subject

1. Create folder: `<SEM>/NN. Subject Name/`
2. Copy preamble from any existing module `.tex`.
3. Update only: `\fancyhead[L]`, `\fancyhead[R]`, `\hypersetup{pdftitle}`, title block.
4. Keep identical: all colour definitions, box styles, table settings, base TikZ styles.
5. Add subject-specific TikZ styles alongside the base ones — don't replace them.
6. Compile: `.\pdf_compile.ps1 -Module "path\to\file.tex"`

---

## Adding a new semester

1. Create folder: `Nth SEM/`
2. Inside it, create subject subfolders: `01. Subject Name/`, `02. Subject Name/`, etc.
3. The build scripts auto-discover — no script changes needed.
4. Update the status table in `README.md`.

---

## Known gotchas

| Problem | Fix |
|---|---|
| `synctex.gz` files left behind | `pdf_compile.ps1` does not pass `-synctex=1` — these shouldn't appear. Delete manually if they do. |
| `EC601_Combined_Notes.tex` is auto-generated | Never hand-edit it. Re-run `pdf_build_combined.ps1` to regenerate. |
| `_combined_preamble.tex` in subject folders | Legacy reference files. Not used by current build scripts. |
| PowerShell `1KB` parse error in strings | Use a separate variable: `$sizeKB = ...; $sizeStr = "$sizeKB KB"` |
| `Get-Content` mangling em-dash | Always use `-Encoding UTF8` when reading `.tex` files in PowerShell |
| tikzset extraction in combined builder | Regex must match `name/.style=` (with slash), not `name.style=` |

---

## Current state (as of May 2026)

**6th SEM — complete and compiled:**

| Subject | Modules | Module PDFs | Combined PDF | Pages |
|---|---|---|---|---|
| EC601 Control System | 7 | ✅ All compiled | `EC601_Control_System.pdf` | 87 |
| EC602 Computer Network | 4 | ✅ All compiled | `EC602_Computer_Network.pdf` | 48 |

**1st–5th SEM:** Folders exist, no content yet.
**7th–8th SEM:** Not started.
