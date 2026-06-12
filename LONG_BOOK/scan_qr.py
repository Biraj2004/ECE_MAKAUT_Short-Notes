import subprocess, sys

result = subprocess.run(
    ['pdftotext', '-layout', 'BS-CH101_LongBook_Combined.pdf', '-'],
    capture_output=True, text=True, encoding='utf-8', errors='replace'
)
pages = result.stdout.split('\x0c')

keywords = ['Quick Revision', 'Key Formulas', 'One-Line Def', 'Frequently Asked']

for i, page in enumerate(pages, 1):
    for kw in keywords:
        if kw in page:
            # Print page number and first 10 content lines
            lines = [l for l in page.split('\n') if l.strip()]
            sys.stdout.write(f'\n=== Page {i} contains "{kw}" ===\n')
            for l in lines[:12]:
                sys.stdout.write(l + '\n')
            break
