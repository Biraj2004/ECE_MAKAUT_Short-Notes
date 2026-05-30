# ECE MAKAUT Short Notes

**Exam-ready module notes for MAKAUT B.Tech ECE (2023–27)**
Biraj Sarkar · CGEC · Semester-wise, module-wise PDF notes built with XeLaTeX.

---

## What this is

Concise, structured notes for every subject across all 8 semesters of the MAKAUT B.Tech ECE curriculum. Each module is a standalone PDF — definitions, formulas, derivations, diagrams, comparison tables, and viva Q&A — designed for last-minute revision and university exam prep.

**Not** textbook-style theory. Every topic follows:
> Definition → Concept → Working → Formula → Diagram → Advantages/Disadvantages → Applications → Exam Points

---

## Status

| Semester | Status | Subjects |
|---|---|---|
| 1st SEM | 🔲 Planned | — |
| 2nd SEM | 🔲 Planned | — |
| 3rd SEM | 🔲 Planned | — |
| 4th SEM | 🔲 Planned | — |
| 5th SEM | 🔲 Planned | — |
| 6th SEM | ✅ Complete | EC601 Control System (7 modules), EC602 Computer Network (4 modules), HS-HU601 Economics for Engineers (4 modules) |
| 7th SEM | 🔲 Planned | — |
| 8th SEM | 🔲 Planned | — |

---

## 6th Semester

### EC601 — Control System

| File | Topics |
|---|---|
| `EC601_Module1_Notes.pdf` | Transfer Function, Block Diagram Reduction, SFG & Mason's Formula |
| `EC601_Module2_Notes.pdf` | Stability, Steady-State Error, PID Controllers |
| `EC601_Module3_Notes.pdf` | Time Response, Root Locus, Compensators |
| `EC601_Module4_Notes.pdf` | Frequency Response, Bode Plot, Nyquist Criterion |
| `EC601_Module5_Notes.pdf` | State Space Analysis, Controllability, Observability |
| `EC601_Module6_Notes.pdf` | Nonlinear Control, Describing Functions, Optimal Control |
| `EC601_Module7_Notes.pdf` | Instrumentation: CRO, Analyzers, Transducers, Actuators |
| `EC601_Control_System.pdf` | **Combined** — all 7 modules, 87 pages |

### EC602 — Computer Network

| File | Topics |
|---|---|
| `EC602_Module1_Notes.pdf` | Data Communication, OSI & TCP/IP, Topologies, Physical Layer, Circuit Switching, FDM/TDM/WDM |
| `EC602_Module2_Notes.pdf` | Data Link Layer, Framing, CRC, Hamming, ARQ, HDLC, ALOHA, CSMA/CD, Token Ring |
| `EC602_Module3_Notes.pdf` | Network Layer, IP, Subnetting, Routing, ARP, Transport Layer, TCP/UDP, Congestion Control |
| `EC602_Module4_Notes.pdf` | Application Layer, DNS, HTTP, Cryptography, Firewalls, ISDN, ATM, Bluetooth |
| `EC602_Computer_Network.pdf` | **Combined** — all 4 modules, 48 pages |

### HS-HU601 — Economics for Engineers

| File | Topics |
|---|---|
| `HS-HU601_Module1_Notes.pdf` | Economic Decision Making, Engineering Costs & Estimations, Cost Estimation Models (Per-Unit, Segmenting, Cost Index, Power-Sizing, Learning Curve) |
| `HS-HU601_Module2_Notes.pdf` | Cash Flow, Interest Formulas, Equivalence, Debt Repayment, Rate of Return Analysis (AW, FW, PW, IRR, BCR, Sensitivity) |
| `HS-HU601_Module3_Notes.pdf` | Inflation (Fisher's Equation), Present Worth Analysis with Unequal Lives (LCM), Uncertainty, Decision Trees, Risk |
| `HS-HU601_Module4_Notes.pdf` | Depreciation (Straight-Line & Double Declining Balance), Economic Service Life, Defender/Challenger Replacement, Accounting & Cost Allocation |
| `HS-HU601_Economics_for_Engineers.pdf` | **Combined** — all 4 modules, 39 pages |

---

## Repository structure

```
ECE_MAKAUT_Short-Notes/
├── 1st SEM/                        # Planned
├── 2nd SEM/                        # Planned
├── ...
├── 6th SEM/
│   ├── 01. Control System/
│   │   ├── EC601_Module1_Notes.tex / .pdf
│   │   ├── ...
│   │   ├── EC601_Module7_Notes.tex / .pdf
│   │   ├── EC601_Combined_Notes.tex
│   │   └── EC601_Control_System.pdf
│   ├── 02. Computer Network/
│   │   ├── EC602_Module1_Notes.tex / .pdf
│   │   ├── ...
│   │   ├── EC602_Module4_Notes.tex / .pdf
│   │   ├── EC602_Combined_Notes.tex
│   │   └── EC602_Computer_Network.pdf
│   ├── 03. Economics for Engineers/
│   │   ├── HS-HU601_Module1_Notes.tex / .pdf
│   │   ├── HS-HU601_Module2_Notes.tex / .pdf
│   │   ├── HS-HU601_Module3_Notes.tex / .pdf
│   │   ├── HS-HU601_Module4_Notes.tex / .pdf
│   │   ├── HS-HU601_Combined_Notes.tex
│   │   └── HS-HU601_Economics_for_Engineers.pdf
│   ├── sem6 - syllabus.pdf
│   └── ECE 6th SEM YT Playlist.pdf
├── pdf_compile.ps1                 # Compile all module PDFs
├── pdf_build_combined.ps1          # Build combined PDFs per subject
├── Notes_Build_Guide.md            # Full authoring guide & style spec
├── AGENTS.md                       # Agentic context for AI assistants
└── CLAUDE.md                       # LLM coding behaviour guidelines
```

---

## Building PDFs

Requires **XeLaTeX** (TeX Live or MiKTeX) with fonts: `TeX Gyre Pagella`, `TeX Gyre Cursor`, `Latin Modern Math`.

**Compile all module PDFs:**
```powershell
.\pdf_compile.ps1
```

**Compile one subject only:**
```powershell
.\pdf_compile.ps1 -Subject "EC601"
```

**Compile a single file:**
```powershell
.\pdf_compile.ps1 -Module "6th SEM\01. Control System\EC601_Module1_Notes.tex"
```

**Build combined PDFs (all subjects):**
```powershell
.\pdf_build_combined.ps1
```

**Build combined for one subject:**
```powershell
.\pdf_build_combined.ps1 -Subject "EC602"
```

Both scripts run 2 passes (3 for combined) automatically and clean aux files on success.

---

## Authoring guide

See [`Notes_Build_Guide.md`](Notes_Build_Guide.md) for the complete spec:
- LaTeX preamble (copy-exact)
- Colour palette & tcolorbox styles
- Table rules, TikZ diagram guidelines
- Known issues & fixes
- File naming conventions

---

## Tech stack

- **Compiler:** XeLaTeX (unicode-math, fontspec)
- **Fonts:** TeX Gyre Pagella (body), Latin Modern Math (math)
- **Diagrams:** TikZ with `shapes.geometric`, `arrows.meta`, `positioning`, `decorations.pathreplacing`
- **Boxes:** tcolorbox with custom `defbox`, `formulabox`, `examplebox`, `exambox`, `tikzbox`, `masonbox`
- **Tables:** tabularx + booktabs + colortbl
- **Build:** PowerShell scripts (`pdf_compile.ps1`, `pdf_build_combined.ps1`)

---

*Cooch Behar Government Engineering College · B.Tech ECE (2023–27) · MAKAUT*
