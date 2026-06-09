# LONG_BOOK Build Guide
**MAKAUT B.Tech — Long-Form, Book-Level Module Notes**
> Author: Biraj Sarkar | CGEC | B.Tech ECE (2023–27) | Last updated: June 2026

---

## What is LONG_BOOK?

`LONG_BOOK/` is a **parallel** project to the main `ECE_MAKAUT_Short-Notes` repository.

| | Short-Notes (root repo) | LONG_BOOK |
|---|---|---|
| Goal | Exam-revision, viva, last-minute prep | Full textbook-style coverage of each module |
| Depth | 2/5/10/15-mark answers | 40-50 page book chapters per module |
| Length | ~5–10 pages per module | ~40–50 pages per module |
| Audience | Student writing exams next week | Student learning the subject from scratch |
| Tone | Concise, direct, formula-first | Conceptual narrative + derivations + worked examples |
| File naming | `<CODE>_Module<N>_Notes.tex` | `Module<N>_Long_Notes.tex` |
| Build script | `pdf_compile.ps1` (auto-discovers) | Manual `xelatex` (see §6 below) |

The two projects **share the same LaTeX preamble, colour palette, and box styles** (see `Notes_Build_Guide.md` at repo root). LONG_BOOK only extends the content philosophy.

This guide lives at the **repo root** alongside `Notes_Build_Guide.md` so the two are easy to compare.

---

## Table of Contents

1. [Folder Structure](#1-folder-structure)
2. [File Naming Convention](#2-file-naming-convention)
3. [Content Philosophy — Long-Book Depth](#3-content-philosophy--long-book-depth)
4. [Mandatory Module Skeleton](#4-mandatory-module-skeleton)
5. [LaTeX Preamble Differences](#5-latex-preamble-differences)
6. [How to Build a Long-Book PDF](#6-how-to-build-a-long-book-pdf)
7. [Known Issues & Fixes (LONG_BOOK specific)](#7-known-issues--fixes-long_book-specific)
8. [Syllabus Coverage Audit (mandatory before locking a module)](#8-syllabus-coverage-audit-mandatory-before-locking-a-module)
9. [Adding a New Long-Book Module](#9-adding-a-new-long-book-module)
10. [Adding a New Subject](#10-adding-a-new-subject)
11. [Current State](#11-current-state)
12. [Final Quality Checklist](#12-final-quality-checklist)

---

## 1. Folder Structure

```
ECE_MAKAUT_Short-Notes/
├── LONG_BOOK_Build_Guide.md              # ← this file (lives at repo root)
└── LONG_BOOK/
    ├── 1st SEM/
    │   └── 01. Chemistry-I/
    │       ├── Module1_Long_Notes.tex / .pdf
    │       ├── Module2_Long_Notes.tex / .pdf
    │       └── ...
    │   └── 02. Physics-I/                # planned
    ├── 2nd SEM/                          # planned
    ├── 3rd SEM/                          # planned
    ├── 4th SEM/                          # planned
    ├── 5th SEM/                          # planned
    ├── 6th SEM/
    │   ├── 01. Control System/           # planned (long versions of EC601)
    │   ├── 02. Computer Network/         # planned (long versions of EC602)
    │   └── ...
    ├── 7th SEM/                          # future
    └── 8th SEM/                          # future
```

### Rules

- One subject = one folder, named `NN. Subject Name/`.
- Subject folders mirror the short-notes layout (`6th SEM/01. Control System/`, etc.). This makes cross-referencing painless.
- Each module is **one self-contained `.tex` file** that compiles to one PDF. No `\input` / `\include`.
- Combined-subject PDFs are **not** auto-generated for long-books (yet). If you need one, run `xelatex` on a manually written `<Subject>_Combined.tex` that `\include`s each module — but the default workflow is per-module.

---

## 2. File Naming Convention

```
Module<N>_Long_Notes.tex   →   Module<N>_Long_Notes.pdf
```

Examples:
```
Module1_Long_Notes.tex    →    Module1_Long_Notes.pdf
Module2_Long_Notes.tex    →    Module2_Long_Notes.pdf
Module7_Long_Notes.tex    →    Module7_Long_Notes.pdf
```

### Why no subject code in the filename?

The subject is already encoded by the **folder path** (`1st SEM/01. Chemistry-I/`). Keeping filenames short lets the same name-pattern repeat across subjects without collision (because they live in different folders).

The subject code (`BS-CH101`, `EC601`, etc.) appears inside the file:

- the `\fancyhead[L]` running header (`BS-CH101 — Chemistry-I`)
- the `\hypersetup{pdftitle=...}` line
- the centred title block on page 1

### Combined-PDF naming (if you build one)

```
<SubjectCode>_<Subject_Name>_LongBook.pdf
```
Example: `BS-CH101_Chemistry-I_LongBook.pdf`. Reserved for future use; not required.

---

## 3. Content Philosophy — Long-Book Depth

A LONG_BOOK module is **not** a longer short-notes file. It is a textbook chapter.

### Depth targets

| Element | Short-Notes target | LONG_BOOK target |
|---|---|---|
| Sections per module | 2–4 | 6–10 |
| Subsections | 4–8 | 20–30 |
| Pages per module | 5–10 | **40–50** |
| Worked examples | 1–3 | 8–15 |
| TikZ diagrams | 3–5 | 10–18 |
| Comparison tables | 2–4 | 8–14 |
| Quick-revision Q&A | 10 | **25–30** |
| Quick-revision formulas | 6 | 20–25 |
| Quick-revision definitions | 7 | 25–35 |
| Quick-revision page | mandatory (1) | mandatory (1) |

### Per-topic skeleton (use for every numbered topic in a module)

> **Definition → Concept → Working principle → Formula derivation → Diagram → Comparison → Solved example → Applications → Exam Points**

Compared to short-notes, the differences are:

1. **Always derive a formula step-by-step.** Do not just state $E_n = n^2 h^2 / 8mL^2$; show the boundary-condition argument.
2. **Always include a worked numerical example** with units carried through.
3. **Diagrams should explain, not decorate.** Label every node, add a caption inside `tikzbox` title, and follow with 2-3 lines of prose explaining the figure.
4. **Comparison tables wherever two or more concepts are contrasted** (techniques, regimes, isomers, etc.).
5. **Cross-reference earlier sections** when a formula reappears, so the reader sees the chapter as one connected story.
6. **Each section ends with an `exambox`** listing 4–6 specific exam-ready bullet points for that section. When you extend a section, **also extend that section's exam-points box** to include the new material.

### Tone

- Simple English, standard Indian engineering terminology.
- Conceptual narrative — explain *why*, not just *what*.
- No filler history, no research-paper digressions, no marketing language.
- Use bold (`\textbf{}`) for emphasis sparingly; don't bold every other word.

---

## 4. Mandatory Module Skeleton

Every `Module<N>_Long_Notes.tex` follows this exact macro structure:

```
\documentclass + preamble (copy from any existing module)
\begin{document}

  Title block (centred, with subject code, semester, credits, module name)
  \tableofcontents
  \newpage

  \section{Topic 1}            % ← 6–10 sections per module
    \subsection{...}            %   each with definition, derivation,
    \subsection{...}            %   diagram, table, example, exam points
    ...
  \section{Topic 2}
    ...
  ...
  \section{Topic N}
    ...

  \newpage
  Quick Revision title block
  formulabox  → "Key Formulas at a Glance"          (2-col tabularx of ALL module formulas, 20–25 rows)
  defbox      → "One-Line Definitions"               (25–35 bullet items)
  exambox     → "Frequently Asked / Viva Questions"  (25–30 Q&A pairs using \Q{})
  tikzbox     → "Summary Reference Table"            (4-col tabularx covering every topic)

\end{document}
```

The Quick Revision page is **non-negotiable** and always appears as the last section, opened with `\newpage`.

---

## 5. LaTeX Preamble Differences

The base preamble is **identical** to short-notes. Copy it verbatim from any existing `Module<N>_Long_Notes.tex` (or from the short-notes `Notes_Build_Guide.md` §3).

### LONG_BOOK-specific additions

Two additions to the standard preamble are required for long-book content:

```latex
% Required for Jablonski diagrams (snake-arrow IC/ISC), curly braces, etc.
\usetikzlibrary{shapes.geometric, arrows.meta, positioning, calc, fit,
                decorations.pathreplacing, decorations.pathmorphing}

% Pages end at natural content height — long modules with many tcolorboxes
% get visibly cleaner page breaks. Without this, \flushbottom forces
% awkward stretching on pages dominated by a single box.
\raggedbottom
```

Note the extra `decorations.pathmorphing` — short-notes modules can sometimes get away without it; LONG_BOOK modules almost always need it for the richer diagrams.

### Header text update

```latex
\fancyhead[L]{\small\color{myred}\textbf{<CODE>}\;\color{mydark}--- <Subject Name>}
\fancyhead[R]{\small\color{myteal}\textbf{Module N Notes}}
\hypersetup{pdftitle={<CODE> --- Module N Long Notes: <Topic>}}
```

That `Long Notes:` token in `pdftitle` is the **only** way to distinguish a LONG_BOOK PDF from a short-notes PDF when both are open in a viewer.

### Title block template

```latex
\begin{center}
  {\LARGE\bfseries\color{myred} <CODE> --- <Full Subject Name>}\\[5pt]
  {\normalsize\color{mydark} Semester I/II \quad$\bullet$\quad 3L:1T:0P \quad$\bullet$\quad 4 Credits}\\[3pt]
  {\normalsize\color{myteal}\textbf{Module N Exam Notes: <Topic Name>}}\\[3pt]
  {\small\color{mydark} CGEC \;$|$\; B.Tech ECE (2023--27) \;$|$\; \textit{Biraj Sarkar}}
\end{center}
```

Everything else (colour palette, six box styles, table column types `B{}` and `Y`, TOC styling, footer) is **bit-identical** to the short-notes preamble. Refer to `Notes_Build_Guide.md` at repo root.

---

## 6. How to Build a Long-Book PDF

The repo-root `pdf_compile.ps1` script auto-discovers files matching `*_Module<N>_Notes.tex` and **does not pick up** `Module<N>_Long_Notes.tex`. That is intentional — short-notes and long-books are kept separate.

### Manual build (recommended for now)

From PowerShell at the LONG_BOOK module folder:

```powershell
# Two passes for correct TOC page numbers
xelatex -interaction=nonstopmode "Module2_Long_Notes.tex"
xelatex -interaction=nonstopmode "Module2_Long_Notes.tex"
```

Or one-line cleanup + double-pass (run from the module folder):

```powershell
Get-ChildItem -Include *.aux,*.toc,*.out,*.log,*.fls,*.fdb_latexmk,*.synctex.gz -Recurse |
  Remove-Item -Force -ErrorAction SilentlyContinue
xelatex -interaction=nonstopmode "Module2_Long_Notes.tex" | Out-Null
xelatex -interaction=nonstopmode "Module2_Long_Notes.tex" | Select-Object -Last 6
```

The last-line tail will print `Output written on Module2_Long_Notes.pdf (NN pages).` — that's your final page-count check.

### Compile rules

- **XeLaTeX only.** Same as the rest of the repo (`unicode-math` requires it).
- Run **twice** for correct TOC page numbers.
- After a successful build, clean these aux files:
  ```
  .aux  .toc  .out  .log  .fls  .fdb_latexmk  .synctex.gz
  ```
- The `.pdf` is the only artefact that should be committed.

### Re-compiling after extending a module

When you add new subsections to an existing long-book module (for example after a syllabus-coverage audit), follow this exact sequence:

1. Edit `Module<N>_Long_Notes.tex` — insert new subsections **before** that section's `exambox`.
2. Extend that section's `exambox` bullet list with the new material.
3. Add new formulas, definitions, and viva Q&As to the Quick Revision page (one per new subsection minimum).
4. From the module folder, run the cleanup + double-pass one-liner above.
5. Read the last line of output: `Output written on ... (NN pages).` Confirm `NN` matches the depth target (40–50 pages).
6. Open the PDF and spot-check: TOC has the new entries, `(contd.)` continuation header appears on long Q&A boxes, no overflow into footer.
7. Commit the `.tex` and `.pdf` together.

### Future: `pdf_long_compile.ps1`

A dedicated PowerShell script could be added at the repo root that mirrors `pdf_compile.ps1` but globs `LONG_BOOK/**/Module*_Long_Notes.tex`. Suggested skeleton:

```powershell
param(
  [string]$Subject,                  # e.g. "Chemistry-I"  (matches folder name)
  [string]$Module,                   # e.g. "LONG_BOOK\1st SEM\01. Chemistry-I\Module2_Long_Notes.tex"
  [switch]$KeepLogs
)
$pattern = if ($Module) { $Module } else { 'LONG_BOOK\**\Module*_Long_Notes.tex' }
$files = Get-ChildItem -Path $pattern -Recurse -ErrorAction SilentlyContinue
if ($Subject) { $files = $files | Where-Object { $_.Directory.Name -like "*$Subject*" } }
foreach ($f in $files) {
    Push-Location $f.Directory
    xelatex -interaction=nonstopmode $f.Name | Out-Null
    xelatex -interaction=nonstopmode $f.Name | Out-Null
    if (-not $KeepLogs) {
        Get-ChildItem -Include *.aux,*.toc,*.out,*.log,*.fls,*.fdb_latexmk,*.synctex.gz |
          Remove-Item -Force
    }
    Pop-Location
}
```

(Not yet committed — the manual approach is enough for the current single-module state.)

---

## 7. Known Issues & Fixes (LONG_BOOK specific)

These are issues that surfaced during the Module 2 build and **must** be avoided. The general issues from `Notes_Build_Guide.md` §14 still apply on top of these.

### Missing `decorations.pathmorphing` library
- **Symptom:** `! Package pgfkeys Error: I do not know the key '/pgf/decoration/snake'`
- **Cause:** Jablonski-style snake (wavy) arrows for IC/ISC require this library.
- **Fix:** Always include `decorations.pathmorphing` in `\usetikzlibrary{...}` for LONG_BOOK files. Snake decorations are common (Jablonski, polymer chains, vibration arrows).

### `\AA` in math mode breaks under `unicode-math`
- **Symptom:** `LaTeX Warning: Command \r invalid in math mode on input line ...`
- **Cause:** `unicode-math` redefines `\AA` and it does not survive inside a `$...$` block.
- **Fix:** Use `\,\text{\AA}` instead of `\ \mathrm{\AA}` for the angstrom unit:
  ```latex
  % ❌ Wrong
  $\lambda = 1.5418\ \mathrm{\AA}$
  % ✅ Right
  $\lambda = 1.5418\,\text{\AA}$
  ```

### `\texorpdfstring{}` requires TWO arguments
- **Symptom:** `! Extra }, or forgotten \endgroup.` from line `\begin{document}`.
- **Cause:** Used `\texorpdfstring{$x$}` with only one argument inside a `tcolorbox` title — `hyperref` then tries to consume a second argument from elsewhere and chokes.
- **Fix:** ALWAYS supply both arguments:
  ```latex
  % ❌ Wrong
  title={Solved Example: NMR of Ethanol (\texorpdfstring{$\mathrm{CH_3CH_2OH}$})}
  % ✅ Right
  title={Solved Example: NMR of Ethanol (\texorpdfstring{$\mathrm{CH_3CH_2OH}$}{CH3CH2OH})}
  ```

### Stale `.aux` from a failed run causes corrupt rebuild
- **Symptom:** `Runaway argument? ! File ended while scanning use of \@writefile.`
- **Cause:** The previous failed compile left a half-written `.aux` file. The next pass tries to read it.
- **Fix:** When a previous build failed, **always** delete `.aux .toc .out` before retrying. The cleanup one-liner in §6 handles this.

### Long modules → 30+ page exam-box overflow
- **Symptom:** Viva Q&A box runs past the footer on the last page.
- **Cause:** With 25+ Q&A items the `exambox` is taller than one page.
- **Fix:** The shared `\tcbset{breakable}` already handles this — the box auto-splits with a "(contd.)" header. **Do not** insert manual `\newpage` inside the box.

### `\dfrac` overflows the formula table in the Quick Revision page
- **Symptom:** Right-hand column clipped on the Quick Revision formula table.
- **Cause:** Long fractions in the 2-column formula table.
- **Fix:** Use `\displaystyle\frac{...}{...}` instead of `\dfrac{...}{...}` inside `tabularx` cells. (Same rule as short-notes — see `Notes_Build_Guide.md` §6.)

### Quick Revision title leaves a near-blank page
- **Symptom:** The "Quick Revision --- Module N" title appears alone on a page; the formulabox is pushed to the next page, leaving a mostly empty page.
- **Cause:** The Quick Revision formulabox is now ~25 rows tall. After the manual `\newpage` and the title block, the remaining space on the new page is not enough for the breakable `tcolorbox` to start, so it gets entirely deferred to the next page.
- **Fix:** Add `\enlargethispage{2\baselineskip}` immediately after the `\newpage` that begins the Quick Revision section. This gives that single page about two extra lines of room — enough for the formulabox top to land there. Pattern:
  ```latex
  \newpage
  \enlargethispage{2\baselineskip}
  \begin{center}
    {\large\bfseries\color{myred} Quick Revision --- Module N}\\[3pt]
    {\small\color{mydark} <Topic> $|$ <Code>}
  \end{center}
  \noindent{\color{myred}\rule{\linewidth}{1.2pt}}
  \vspace{4pt}

  \begin{tcolorbox}[formulabox, title={Key Formulas at a Glance}]
  ...
  ```

### `\raggedbottom` to prevent stretched white-space on short pages
- **Symptom:** Pages with one or two `tcolorbox` units get visibly stretched, forcing flush-bottom alignment with the footer.
- **Cause:** Default `\flushbottom` glues content to the footer regardless of natural height.
- **Fix:** Add `\raggedbottom` to the preamble (already present in the canonical LONG_BOOK preamble). Pages end at natural content height; visually cleaner for chapter-style notes.

### Anchor a `str_replace` on text that's actually unique
- **Symptom:** When you ask the editor to swap a single line that appears in many places (e.g. `\end{itemize}\n\end{tcolorbox}`), the replace either fails or applies in the wrong place.
- **Fix:** Always anchor on a 2–3 line block that includes the *closest preceding bullet* of that specific section. Each section's `Exam Points` box has different bullet text, so quote one of those bullets in the `oldStr` so the match is unambiguous.

---

## 8. Syllabus Coverage Audit (mandatory before locking a module)

A module is not "done" the moment it compiles. Before declaring it complete, you must run a **syllabus coverage audit** — the most common reason a long-book module sits at 30 pages instead of 45 is that the first draft skipped MAKAUT exam favourites that the syllabus only hints at.

### Audit procedure

1. Open the module's syllabus block (e.g. the relevant page of the MAKAUT curriculum PDF).
2. Make a small table of every keyword/phrase in the syllabus block (e.g. *fluorescence*, *MRI*, *surface characterisation*, *diffraction*).
3. For each keyword, list:
   - Which subsections in the module cover it.
   - What standard MAKAUT 5- and 10-mark questions exist on that keyword (use last-3-years' question papers as the reference).
4. Cross-check against the depth targets in §3. If any of the following are missing, the module is too thin:

| Pattern | Standard high-yield additions to look for |
|---|---|
| Any spectroscopy mentioned | Selection rules (gross + specific), block diagram, sample prep, one numerical |
| Quantum / electronic topic | Kasha-style "gotcha" rule, Franck–Condon-style geometric argument, Einstein-coefficient comparison |
| UV-Vis chapter | Woodward–Fieser increment table, isosbestic point, cuvette materials |
| Fluorescence | Jablonski, Stern–Volmer, FRET, quantum-yield/lifetime link, $\geq 5$ medical apps |
| IR / vibrational | Reduced mass, isotope effect (D vs H), fingerprint-vs-functional region, sample prep, IR-vs-Raman table |
| NMR | Three shielding mechanisms, $J$ values for cis/trans, integration as 4th piece of info, ethanol/cumene example |
| MRI | Gradient encoding, $T_1/T_2/PD$ contrast, contrast agents (Gd-DTPA, SPIONs), safety note |
| Surface techniques | TEM-vs-SEM table, STM tunnelling formula, BET surface area, contact angle (Young's eqn) |
| Diffraction | Bragg derivation with diagram, Scherrer for nanoparticle size, three classical methods (Laue / rotating / Debye–Scherrer) |
| Scattering | $1/\lambda^4$ Rayleigh law with sky-blue worked example, Stokes/anti-Stokes ratio, SERS apps |
| Crystal field / orbitals | $\Delta_o$ vs $P$ pairing, CFSE formula, magnetic moment $\sqrt{n(n+2)}$ BM |
| Thermodynamics | Both signs convention, $\Delta G = \Delta H - T\Delta S$ table for spontaneity, Hess' law worked example |
| Stereochemistry | R/S assignment worked example, Fischer/Newman/Sawhorse comparison, optical rotation calc |
| Organic synthesis | Mechanism arrows, energy diagram, kinetic-vs-thermodynamic product table |

### What to do when an audit finds gaps

5. List the missing topics in priority order (MAKAUT-5-mark question favourites first).
6. Insert each as a **new `\subsection`** *before* the section's existing `exambox`. Do not re-shuffle existing material.
7. Extend the section's `exambox` with a bullet for each new subsection.
8. Add the corresponding new entries to all four Quick Revision boxes:
   - Formula → 1 row in `Key Formulas at a Glance`.
   - Definition → 1 bullet in `One-Line Definitions`.
   - Q&A → 1 entry in `Frequently Asked / Viva Questions`.
   - Topic → 1 row in `Summary Reference Table` (only if the new topic warrants its own table row).
9. Recompile (§6) and confirm the new page count is within the 40–50 page band.

### Example: Module 2 audit history

The first draft of `1st SEM/01. Chemistry-I/Module2_Long_Notes.tex` was 32 pages. A syllabus audit identified gaps: Franck–Condon, Einstein A/B, Woodward–Fieser, isosbestic, Kasha, FRET, isotope effect, IR sample prep, IR-vs-Raman table, three shielding mechanisms, $J$-values, MRI contrast agents, TEM-vs-SEM, STM, BET, contact angle, Laue method, Stokes/anti-Stokes ratio, sky-blue Rayleigh worked example. After insertion the module compiled at **46 pages** — well within the target band — without disturbing any of the original structure. This is the canonical workflow.

---

## 9. Adding a New Long-Book Module

1. Navigate to the subject folder, e.g. `LONG_BOOK/1st SEM/01. Chemistry-I/`.
2. Copy the closest existing `Module<N>_Long_Notes.tex` as the new file.
3. Update only:
   - Title block: module number, topic name.
   - `\fancyhead[R]{... Module N Notes}`.
   - `\hypersetup{pdftitle={... Module N Long Notes: ...}}`.
4. Replace the body sections with the new module content, following §3 and §4 above.
5. Ensure the Quick Revision page is the **last** section, with all four boxes in order: `formulabox → defbox → exambox → tikzbox`.
6. Build with the commands in §6.
7. Run the syllabus coverage audit (§8).
8. Visually inspect the PDF for: TOC page numbers correct, no overflow, all diagrams rendered, exambox split title appears if Q&A spans pages.

---

## 10. Adding a New Subject

1. Create folder: `LONG_BOOK/<SEM>/NN. Subject Name/` — match the short-notes folder name exactly so the two trees stay aligned.
2. Inside it, create `Module1_Long_Notes.tex` for the first module.
3. Copy the preamble from the closest existing long-book module (e.g. Chemistry-I Module 2 is the canonical reference until more land).
4. Update only the subject-specific lines: `\fancyhead[L]`, `\hypersetup{pdftitle}`, title block, semester/credits.
5. Keep all colour definitions, box styles, table settings, base TikZ styles **identical**. Add subject-specific TikZ styles alongside, never replacing the base ones.
6. Build with the commands in §6.

---

## 11. Current State

| Semester | Subject | Module | Pages | Status |
|---|---|---|---|---|
| 1st SEM | 01. Chemistry-I | Module 2 — Spectroscopic Techniques and Applications | **46** | ✅ Audited, locked |
| 1st SEM | 01. Chemistry-I | Modules 1, 3, 4, 5, 6, 7 | — | Planned |
| 1st SEM | All other subjects | — | — | Planned |
| 2nd–5th SEM | All | — | — | Planned |
| 6th SEM | All | — | — | Planned (long versions of completed short-notes) |
| 7th–8th SEM | All | — | — | Future |

### Next planned work

- 1st SEM Chemistry-I: Modules 1, 3, 4, 5, 6, 7 (long versions).
- 6th SEM Control System: Modules 1–7 (long versions of EC601).

---

## 12. Final Quality Checklist

Before considering a long-book module "done", confirm:

- [ ] PDF compiles cleanly with **two** `xelatex` passes, no fatal errors.
- [ ] TOC page numbers correct (the second pass settled them).
- [ ] All `\section` and `\subsection` headings render in correct colours (red / teal).
- [ ] Every formula appears inside a `formulabox` with units stated.
- [ ] Every key term has a `defbox` somewhere in the chapter.
- [ ] At least one TikZ diagram per major topic, all wrapped in `tikzbox`.
- [ ] Comparison tables present wherever two or more concepts are contrasted.
- [ ] At least one worked numerical `examplebox` per major topic.
- [ ] `exambox` ending each section with 4–6 specific exam tips.
- [ ] Quick Revision page is the last section, contains all 4 mandatory boxes in the correct order.
- [ ] No `\AA` inside math mode — used `\text{\AA}` instead.
- [ ] All `\texorpdfstring{}` calls have both arguments.
- [ ] No raw markdown `**bold**` syntax — used `\textbf{}`.
- [ ] No literal Unicode `—` em-dash — used `---`.
- [ ] No `\dfrac` in `tabularx` cells — used `\displaystyle\frac`.
- [ ] No leftover aux files (`.aux .toc .out .log .fls .fdb_latexmk`).
- [ ] **Syllabus coverage audit (§8) completed and all gaps closed.**
- [ ] PDF page count is within the 40–50 page target band.
- [ ] Quick Revision has 20+ formulas, 25+ definitions, 25+ Q&A pairs.

When all 19 boxes are ticked, commit the `.tex` and `.pdf` together.
