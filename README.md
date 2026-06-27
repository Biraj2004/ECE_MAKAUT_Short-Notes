# ECE MAKAUT Short Notes

Exam-ready, module-wise PDF notes for **MAKAUT B.Tech ECE (2023–27)**  
Biraj Sarkar · CGEC · Built with XeLaTeX

Every topic follows: **Definition → Concept → Working → Formula → Diagram → Advantages/Disadvantages → Applications → Exam Points**

---

## Status

| Semester | Status | Subjects |
|---|---|---|
| 1st SEM | 🟡 In progress | BS-CH101 Chemistry-I (7 modules) |
| 2nd – 5th SEM | 🔲 Planned | — |
| 6th SEM | ✅ Complete | 10 subjects |
| 7th SEM | ✅ Complete | 13 subjects |
| 8th SEM | ✅ Complete | 6 subjects |

---

## 1st Semester

| Code | Subject | Modules |
|---|---|---|
| BS-CH101 | Chemistry-I | 7 |

---

## 6th Semester

| Code | Subject | Modules |
|---|---|---|
| EC601 | Control System | 7 |
| EC602 | Computer Network | 4 |
| HS-HU601 | Economics for Engineers | 4 |
| PE-EC603A | Introduction to MEMS | 4 |
| PE-EC603B | Bio-Medical Electronics | 4 |
| PE-EC603C | CMOS VLSI Design | 6 |
| PE-EC603D | Information Theory and Coding | 3 |
| OE-EC604A | Electronic Measurement and Measuring Instruments | 5 |
| OE-EC604B | Operating System | 9 |
| OE-EC604C | Object Oriented Programming | 9 |

---

## 7th Semester

| Code | Subject | Modules |
|---|---|---|
| HS-HU701 | Principles of Management | 4 |
| PE-EC701A | Microwave Theory and Technique | 9 |
| PE-EC701B | Satellite Communication | 6 |
| PE-EC701C | Mobile Communication and Networks | 6 |
| PE-EC702A | Adaptive Signal Processing | 5 |
| PE-EC702B | Digital Image and Video Processing | 8 |
| PE-EC702C | Neural Network and Fuzzy Logic Control | 5 |
| PE-EC703A | Embedded System | 5 |
| PE-EC703B | Wireless Sensor Networks | 5 |
| PE-EC703C | Wavelet Transforms | 7 |
| OE-EC704A | Web Technology | 10 |
| OE-EC704B | Optimization Technique | 6 |
| OE-EC704C | Entrepreneurship | 4 |

---

## 8th Semester

| Code | Subject | Modules |
|---|---|---|
| PE-EC801A | Antennas and Propagation | 7 |
| PE-EC801B | Fiber Optic Communication | 5 |
| PE-EC801C | Error Correcting Codes | 5 |
| PE-EC802A | Mixed Signal Design | 5 |
| PE-EC802B | Industrial Automation and Control | 5 |
| PE-EC802C | VLSI Design Automation | 5 |

---

## Building PDFs

Requires **XeLaTeX** (TeX Live or MiKTeX) with fonts: `TeX Gyre Pagella`, `TeX Gyre Cursor`, `Latin Modern Math`.

```powershell
# Compile all module PDFs
.\pdf_compile.ps1

# Compile one subject
.\pdf_compile.ps1 -Subject "EC601"

# Compile a single file
.\pdf_compile.ps1 -Module "6th SEM\01. Control System\EC601_Module1_Notes.tex"

# Build combined PDFs (all subjects)
.\pdf_build_combined.ps1

# Build combined for one subject
.\pdf_build_combined.ps1 -Subject "EC602"
```

### Cover Page Template

- [`Combined_Notes_Cover_Page.tex`](Combined_Notes_Cover_Page.tex): Standalone template used by `pdf_build_combined.ps1` to dynamically generate uniform cover pages for combined subject PDFs. It incorporates an elegant double-frame border, dynamic credit/department formatting (using `ECE`), and institutional association details. Preview available at [`Combined_Notes_Cover_Page.pdf`](Combined_Notes_Cover_Page.pdf).

---

## Tech stack

- **Compiler:** XeLaTeX
- **Diagrams:** TikZ
- **Boxes:** tcolorbox (`defbox`, `formulabox`, `examplebox`, `exambox`, `tikzbox`, `masonbox`)
- **Tables:** tabularx + booktabs
- **Build:** PowerShell (`pdf_compile.ps1`, `pdf_build_combined.ps1`)

See [`Notes_Build_Guide.md`](Notes_Build_Guide.md) for the full authoring spec.

---

*Cooch Behar Government Engineering College · B.Tech ECE (2023–27) · MAKAUT*
