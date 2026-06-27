# AGENTS.md — Agentic Context

> Read this before working on any file in this repository.
> It tells you what the project is, how it's structured, what tools exist, and the rules you must follow.

---

## Project overview

This is a LaTeX note-writing project for **MAKAUT B.Tech ECE (2023–27)** by Biraj Sarkar (CGEC).

The goal is exam-ready, module-wise PDF notes for every subject across all 8 semesters. Currently **6th SEM, 7th SEM and portions of 8th SEM are complete**. Earlier semesters (1st–5th) are planned but empty.

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
│   └── 03. Economics for Engineers/ # HS-HU601 — 4 modules (All complete)
│       ├── HS-HU601_Module1_Notes.tex / .pdf
│       ├── HS-HU601_Module2_Notes.tex / .pdf
│       ├── HS-HU601_Module3_Notes.tex / .pdf
│       ├── HS-HU601_Module4_Notes.tex / .pdf
│       ├── HS-HU601_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── HS-HU601_Economics_for_Engineers.pdf
│   └── 04. Information Theory and Coding/ # PE-EC603D — 3 modules (All complete)
│       ├── PE-EC603D_Module1_Notes.tex / .pdf
│       ├── PE-EC603D_Module2_Notes.tex / .pdf
│       ├── PE-EC603D_Module3_Notes.tex / .pdf
│       ├── PE-EC603D_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC603D_Information_Theory_and_Coding.pdf
│   └── 05. Object Oriented Programming/ # OE-EC604C — 9 modules (All complete)
│       ├── OE-EC604C_Module1_Notes.tex / .pdf
│       ├── ...
│       └── OE-EC604C_Module9_Notes.tex / .pdf
│   └── 06. Introduction to MEMS/       # PE-EC603A — 4 modules (All complete)
│       ├── PE-EC603A_Module1_Notes.tex / .pdf
│       ├── ...
│       └── PE-EC603A_Module4_Notes.tex / .pdf
│   └── 10. CMOS VLSI Design/           # PE-EC603C — 6 modules (All complete)
│       ├── PE-EC603C_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC603C_Module6_Notes.tex / .pdf
│       ├── PE-EC603C_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC603C_CMOS_VLSI_Design.pdf
├── 7th SEM/
│   ├── 01. Principles of Management/   # HS-HU701 — 4 modules (All complete)
│   │   ├── HS-HU701_Module1_Notes.tex / .pdf
│   │   ├── ...
│   │   ├── HS-HU701_Combined_Notes.tex  (auto-generated — do not hand-edit)
│   │   └── HS-HU701_Principles_of_Management.pdf
│   └── 02. Microwave Theory and Technique/ # PE-EC701A — 9 modules (All complete)
│       ├── PE-EC701A_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC701A_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC701A_Microwave_Theory_and_Technique.pdf
│   └── 03. Satellite Communication/       # PE-EC701B — 6 modules (All complete)
│       ├── PE-EC701B_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC701B_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC701B_Satellite_Communication.pdf
│   └── 05. Adaptive Signal Processing/ # PE-EC702A — 5 modules (All complete)
│       ├── PE-EC702A_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC702A_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC702A_Adaptive_Signal_Processing.pdf
│   └── 06. Digital Image and Video Processing/ # PE-EC702B — 8 modules (All complete)
│       ├── PE-EC702B_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC702B_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC702B_Digital_Image_and_Video_Processing.pdf
│   └── 07. Neural Network and Fuzzy Logic Control/ # PE-EC702C — 5 modules (All complete)
│   │   ├── PE-EC702C_Module1_Notes.tex / .pdf
│   │   ├── ...
│   │   ├── PE-EC702C_Combined_Notes.tex  (auto-generated — do not hand-edit)
│   │   └── PE-EC702C_Neural_Network_and_Fuzzy_Logic_Control.pdf
│   └── 08. Embedded System/       # PE-EC703A — 5 modules (All complete)
│       ├── PE-EC703A_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC703A_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC703A_Embedded_System.pdf
│   └── 09. Wireless Sensor Networks/ # PE-EC703B — 5 modules (All complete)
│       ├── PE-EC703B_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC703B_Module5_Notes.tex / .pdf
│       ├── PE-EC703B_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC703B_Wireless_Sensor_Networks.pdf
│   └── 10. Web Technology/         # OE-EC704A — 10 modules (All complete)
│       ├── OE-EC704A_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── OE-EC704A_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── OE-EC704A_Web_Technology.pdf
│   └── 11. Wavelet Transforms/     # PE-EC703C — 7 modules (All complete)
│       ├── PE-EC703C_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC703C_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC703C_Wavelet_Transforms.pdf
│   └── 12. Entrepreneurship/       # OE-EC704C — 4 modules (All complete)
│       ├── OE-EC704C_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── OE-EC704C_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── OE-EC704C_Entrepreneurship.pdf
│   └── 13. Optimization Technique/ # OE-EC704B — 6 modules (All complete)
│       ├── OE-EC704B_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── OE-EC704B_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── OE-EC704B_Optimization_Technique.pdf
├── 8th SEM/
│   ├── 01. Antennas and Propagation/ # PE-EC801A — 7 modules (All complete)
│   │   ├── PE-EC801A_Module1_Notes.tex / .pdf
│   │   ├── ...
│   │   ├── PE-EC801A_Combined_Notes.tex  (auto-generated — do not hand-edit)
│   │   └── PE-EC801A_Antennas_and_Propagation.pdf
│   ├── 02. Fiber Optic Communication/ # PE-EC801B — 5 modules (All complete)
│   │   ├── PE-EC801B_Module1_Notes.tex / .pdf
│   │   ├── ...
│   │   ├── PE-EC801B_Combined_Notes.tex  (auto-generated — do not hand-edit)
│   │   └── PE-EC801B_Fiber_Optic_Communication.pdf
│   └── 03. Error Correcting Codes/    # PE-EC801C — 5 modules (All complete)
│       ├── PE-EC801C_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC801C_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC801C_Error_Correcting_Codes.pdf
│   └── 04. Mixed Signal Design/       # PE-EC802A — 5 modules (All complete)
│       ├── PE-EC802A_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC802A_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC802A_Mixed_Signal_Design.pdf
│   └── 05. Industrial Automation and Control/ # PE-EC802B — 5 modules (All complete)
│       ├── PE-EC802B_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC802B_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC802B_Industrial_Automation_and_Control.pdf
│   └── 06. VLSI Design Automation/       # PE-EC802C — 5 modules (All complete)
│       ├── PE-EC802C_Module1_Notes.tex / .pdf
│       ├── ...
│       ├── PE-EC802C_Combined_Notes.tex  (auto-generated — do not hand-edit)
│       └── PE-EC802C_VLSI_Design_Automation.pdf
├── LONG_BOOK/                      # Parallel textbook-style notes folder (EXCLUDED)
├── pdf_compile.ps1                 # Compile module PDFs
├── pdf_build_combined.ps1          # Build combined PDFs
├── Notes_Build_Guide.md            # THE authoritative style & content spec
├── AGENTS.md                       # This file
├── CLAUDE.md                       # LLM behaviour guidelines
└── README.md
```

---

## Folder exclusions (Critical)

- **LONG_BOOK/ directory:** This folder contains parallel textbook-style long notes. It is **always excluded** from all compilation, building, automated scripts, file edits, and scanning operations by default. Do not process, modify, or reference any files in `LONG_BOOK/` unless the user explicitly requests it.

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
| §12 Viva Q&A Format | `\Q{}` macro, automatic exambox splitting |
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
- Load `\usepackage{xcolor}` without the `[table]` option.
- TikZ library must include `decorations.pathreplacing` (used for braces in diagrams).
- Use `\hyphenpenalty=10000`, `\exhyphenpenalty=10000`, and `\sloppy` to globally disable word-breaking/hyphenation across lines.

### Colours
- All colours are defined in §4 of the spec. **Do not change RGB values.**
- In TikZ: always `\color{myred}` — never `\color=myred`.

### Tables
- Always `\begin{tabularx}{\linewidth}{...}`.
- Add `\par\noindent` before any table that immediately follows inline text.
- Never use `C{fixed-width}` inside `tabularx` — use `>{\centering\arraybackslash}X`.
- Never use `\dfrac` inside table cells — use `\displaystyle\frac`.
- For `\multirow` blocks: do NOT use `\hline` inside the multirow span. Use `\cline{start-end}` (e.g. `\cline{2-3}`) for inner rows to avoid cutting through the group text.
- Header text color: never leave/use `\color{white}` inside table headers after removing background colors, as it causes white-on-white invisible text. All headers should be black/dark text.

### TikZ diagrams
- Always wrap in `\begin{tcolorbox}[tikzbox, title={...}]`.
- For 5+ blocks in a row: define a local `sblock` style, never use the global `block`.
- `\\` inside a node requires `align=center, text width=Xcm` on that node.
- Never define `axis/.style` in `\tikzset{}` — conflicts with pgfplots. Use `myaxis` or inline.

### Boxes
- All 6 styles (`tikzbox`, `defbox`, `formulabox`, `examplebox`, `masonbox`, `exambox`) must be present in every file.
- Always set both `colbacktitle` and `coltitle=white` — missing `coltitle` makes title text invisible.
- Add `\tcbset{breakable}` after the style block.
- **Strategic page splits:** If a breakable box is pushed entirely to the next page (due to starting with tall list items or unbreakable display math blocks) and leaves a large blank space or orphans a section heading/rule, insert a strategic `\newpage` inside the box body (e.g. after the first item) to force it to start on the current page and break cleanly.

### Math in headings
```latex
% Correct
\subsection{Response for \texorpdfstring{$\zeta < 1$}{zeta < 1}}
% Wrong — causes compile error
\subsection{Response for $\zeta < 1$}
```

### Viva Q&A
- Use `\Q{}` macro inside `exambox` enumerate only.
- The `exambox` is configured with `title after break`, so it will automatically split across pages and reprint the title if it becomes too long. Do NOT manually split the box or use `\newpage`.

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
| Breakable box pushed to next page leaving empty space / orphaned rule | Insert a strategic `\newpage` or `\pagebreak` inside the `tcolorbox` body (e.g. after the first item) to force it to start on the current page. |

---

## Current state (as of May 2026)

**6th SEM — complete and compiled:**

| Subject | Modules | Module PDFs | Combined PDF | Pages |
|---|---|---|---|---|
| EC601 Control System | 7 | ✅ All compiled | `EC601_Control_System.pdf` | 89 |
| EC602 Computer Network | 4 | ✅ All compiled | `EC602_Computer_Network.pdf` | 48 |
| HS-HU601 Economics for Engineers | 4 | ✅ All compiled | `HS-HU601_Economics_for_Engineers.pdf` | 39 |
| PE-EC603D Information Theory and Coding | 3 | ✅ All compiled | `PE-EC603D_Information_Theory_and_Coding.pdf` | 37 |
| OE-EC604C Object Oriented Programming | 9 | ✅ All compiled | `OE-EC604C_Object_Oriented_Programming.pdf` | 69 |
| PE-EC603A Introduction to MEMS | 4 | ✅ All compiled | `PE-EC603A_Introduction_to_MEMS.pdf` | 35 |
| PE-EC603B Bio-Medical Electronics | 4 | ✅ All compiled | `PE-EC603B_BioMedical_Electronics.pdf` | 45 |
| OE-EC604B Operating System | 9 | ✅ All compiled | `OE-EC604B_Operating_System.pdf` | 58 |
| OE-EC604A Electronic Measurement and Measuring Instruments | 5 | ✅ All compiled | `OE-EC604A_Electronic_Measurement_and_Measuring_Instruments.pdf` | 43 |
| PE-EC603C CMOS VLSI Design | 6 | ✅ All compiled | `PE-EC603C_CMOS_VLSI_Design.pdf` | 44 |

**7th SEM — complete and compiled:**

| Subject | Modules | Module PDFs | Combined PDF | Pages |
|---|---|---|---|---|
| HS-HU701 Principles of Management | 4 | ✅ All compiled | `HS-HU701_Principles_of_Management.pdf` | 45 |
| PE-EC701A Microwave Theory and Technique | 9 | ✅ All compiled | `PE-EC701A_Microwave_Theory_and_Technique.pdf` | 71 |
| PE-EC701B Satellite Communication | 6 | ✅ All compiled | `PE-EC701B_Satellite_Communication.pdf` | 42 |
| PE-EC701C Mobile Communication and Networks | 6 | ✅ All compiled | `PE-EC701C_Mobile_Communication_and_Networks.pdf` | 51 |
| PE-EC702A Adaptive Signal Processing | 5 | ✅ All compiled | `PE-EC702A_Adaptive_Signal_Processing.pdf` | 36 |
| PE-EC702B Digital Image and Video Processing | 8 | ✅ All compiled | `PE-EC702B_Digital_Image_and_Video_Processing.pdf` | 54 |
| PE-EC702C Neural Network and Fuzzy Logic Control | 5 | ✅ All compiled | `PE-EC702C_Neural_Network_and_Fuzzy_Logic_Control.pdf` | 40 |
| PE-EC703A Embedded System | 5 | ✅ All compiled | `PE-EC703A_Embedded_System.pdf` | 52 |
| PE-EC703B Wireless Sensor Networks | 5 | ✅ All compiled | `PE-EC703B_Wireless_Sensor_Networks.pdf` | 56 |
| PE-EC703C Wavelet Transforms | 7 | ✅ All compiled | `PE-EC703C_Wavelet_Transforms.pdf` | 42 |
| OE-EC704A Web Technology | 10 | ✅ All compiled | `OE-EC704A_Web_Technology.pdf` | 70 |
| OE-EC704C Entrepreneurship | 4 | ✅ All compiled | `OE-EC704C_Entrepreneurship.pdf` | 33 |
| OE-EC704B Optimization Technique | 6 | ✅ All compiled | `OE-EC704B_Optimization_Technique.pdf` | 36 |

**8th SEM — complete and compiled:**

| Subject | Modules | Module PDFs | Combined PDF | Pages |
|---|---|---|---|---|
| PE-EC801A Antennas and Propagation | 7 | ✅ All compiled | `PE-EC801A_Antennas_and_Propagation.pdf` | 58 |
| PE-EC801B Fiber Optic Communication | 5 | ✅ All compiled | `PE-EC801B_Fiber_Optic_Communication.pdf` | 46 |
| PE-EC801C Error Correcting Codes | 5 | ✅ All compiled | `PE-EC801C_Error_Correcting_Codes.pdf` | 49 |
| PE-EC802A Mixed Signal Design | 5 | ✅ All compiled | `PE-EC802A_Mixed_Signal_Design.pdf` | 35 |
| PE-EC802B Industrial Automation and Control | 5 | ✅ All compiled | `PE-EC802B_Industrial_Automation_and_Control.pdf` | 38 |
| PE-EC802C VLSI Design Automation | 5 | ✅ All compiled | `PE-EC802C_VLSI_Design_Automation.pdf` | 44 |

**1st SEM:** Chemistry-I is complete (7 modules + combined PDF). 2nd–5th SEM are planned but empty.
**8th SEM:** Antennas and Propagation (PE-EC801A), Fiber Optic Communication (PE-EC801B), Error Correcting Codes (PE-EC801C), Mixed Signal Design (PE-EC802A), Industrial Automation and Control (PE-EC802B) and VLSI Design Automation (PE-EC802C) are complete.
