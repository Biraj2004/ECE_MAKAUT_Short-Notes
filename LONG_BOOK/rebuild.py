import sys, re

def get_body(path):
    text = open(path, 'r', encoding='utf-8', errors='replace').read()
    toc_pos = text.find('\\tableofcontents')
    if toc_pos < 0: toc_pos = 0
    np_pos = text.find('\\newpage', toc_pos)
    if np_pos < 0: np_pos = toc_pos
    np_pos += len('\\newpage')
    end_pos = text.rfind('\\end{document}')
    if end_pos < 0: end_pos = len(text)
    return text[np_pos:end_pos].strip()

b2 = get_body('Module2_Long_Notes.tex')
b3 = get_body('Module3_Long_Notes.tex')
b4 = get_body('Module4_Long_Notes.tex')
b5 = get_body('Module5_Long_Notes.tex')

sys.stdout.write(f'M2={len(b2)} M3={len(b3)} M4={len(b4)} M5={len(b5)}\n')

# Read the combined file header (everything up to \pagenumbering{arabic})
header_text = open('BS-CH101_LongBook_Combined.tex','r',encoding='utf-8').read()
split_marker = '\\pagenumbering{arabic}    % Arabic from Module 2 onwards\n\\setcounter{page}{1}'
header_end = header_text.find(split_marker)
if header_end < 0:
    sys.stdout.write('ERROR: split marker not found\n'); sys.exit(1)
header = header_text[:header_end + len(split_marker)]

body = r"""

% ============================================================================
\renewcommand{\moduletitle}{Module 2 --- Spectroscopic Techniques}
\part{Module 2: Spectroscopic Techniques and Applications}
\setcounter{section}{0}
% ============================================================================

""" + b2 + r"""

\newpage
% ============================================================================
\renewcommand{\moduletitle}{Module 3 --- Intermolecular Forces}
\part{Module 3: Intermolecular Forces, Real Gases and Critical Phenomena}
\setcounter{section}{0}
% ============================================================================

""" + b3 + r"""

\newpage
% ============================================================================
\renewcommand{\moduletitle}{Module 4 --- Free Energy and Equilibria}
\part{Module 4: Free Energy and Chemical Equilibria}
\setcounter{section}{0}
% ============================================================================

""" + b4 + r"""

\newpage
% ============================================================================
\renewcommand{\moduletitle}{Module 5 --- Periodic Properties}
\part{Module 5: Periodic Properties}
\setcounter{section}{0}
% ============================================================================

""" + b5 + r"""

\end{document}
"""

with open('BS-CH101_LongBook_Combined.tex','w',encoding='utf-8') as f:
    f.write(header + body)

sys.stdout.write('Combined file rebuilt.\n')

