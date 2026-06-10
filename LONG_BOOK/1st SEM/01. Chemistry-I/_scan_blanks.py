import subprocess, sys

result = subprocess.run(
    ['pdftotext', '-layout', 'BS-CH101_LongBook_Combined.pdf', '-'],
    capture_output=True, text=True, encoding='utf-8', errors='replace'
)
pages = result.stdout.split('\x0c')  # form feed = page separator

for i, page in enumerate(pages, 1):
    stripped = page.strip()
    words = stripped.split()
    # A "problem" page has very few words (mostly blank)
    if len(words) < 15 and stripped:
        sys.stdout.write(f'Page {i}: NEAR-BLANK ({len(words)} words): {repr(stripped[:120])}\n')
    elif len(words) == 0:
        sys.stdout.write(f'Page {i}: EMPTY\n')

sys.stdout.write(f'\nTotal pages scanned: {len(pages)}\n')
