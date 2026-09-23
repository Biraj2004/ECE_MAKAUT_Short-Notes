#!/usr/bin/env python3
"""
pdf_secure.py — Apply Permissions & Security Restrictions to PDFs
ECE MAKAUT Short Notes

Restrictions applied:
  - Printing: Allowed (High Quality)
  - Changing the Document: NOT Allowed (No editing/modifications)
  - Page Extraction: NOT Allowed
  - Content Copying: NOT Allowed
  - Content Copying for Accessibility: Allowed
  - Commenting: Allowed
  - Filling Form Fields & Signing: Allowed
  - Document Assembly: Allowed

No password required to open/read/print the PDF (user_pw is empty).
Owner password is required only to remove restrictions or edit content.
Password is read from .env (PDF_PERMISSIONS_PASSWORD or PDF_OWNER_PASSWORD).
"""

import os
import sys
import argparse
import tempfile
from pathlib import Path
import pymupdf

# Target permissions bitmask
PERMISSIONS = (
    pymupdf.PDF_PERM_PRINT
    | pymupdf.PDF_PERM_PRINT_HQ
    | pymupdf.PDF_PERM_ANNOTATE
    | pymupdf.PDF_PERM_FORM
    | pymupdf.PDF_PERM_ACCESSIBILITY
    | pymupdf.PDF_PERM_ASSEMBLE
)


def load_env_password():
    """Load the permissions password from .env or environment variables."""
    # Check environment variable first
    pw = os.getenv("PDF_PERMISSIONS_PASSWORD") or os.getenv("PDF_OWNER_PASSWORD")
    if pw:
        return pw.strip()

    # Search for .env file in script dir or parent dirs
    script_dir = Path(__file__).resolve().parent
    candidates = [
        script_dir / ".env",
        script_dir.parent / ".env",
        Path.cwd() / ".env",
    ]

    for env_path in candidates:
        if env_path.is_file():
            try:
                with open(env_path, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith("#") or not line or "=" not in line:
                            continue
                        key, val = line.split("=", 1)
                        key = key.strip()
                        val = val.strip().strip("\"'")
                        if key in ("PDF_PERMISSIONS_PASSWORD", "PDF_OWNER_PASSWORD"):
                            return val
            except Exception as e:
                print(f"[WARN] Error reading {env_path}: {e}", file=sys.stderr)

    return None


def is_pdf_secured(pdf_path, owner_pw):
    """
    Check if the PDF is already protected with our permissions and password.
    Returns: (is_protected, is_correct_owner_pw)
    """
    try:
        doc = pymupdf.open(pdf_path)
        is_enc = bool(doc.metadata.get("encryption"))
        perms = doc.permissions
        if not is_enc:
            doc.close()
            return False, False

        # Authenticate with owner password
        auth = doc.authenticate(owner_pw) if owner_pw else 0
        doc.close()
        # auth == 4 means authenticated as owner
        return True, (auth == 4)
    except Exception:
        return False, False


def secure_single_pdf(pdf_path, owner_pw, force=False, verbose=True):
    """
    Secure a single PDF in-place using PyMuPDF AES-256 encryption.
    """
    pdf_path = Path(pdf_path).resolve()
    if not pdf_path.is_file():
        if verbose:
            print(f"[FAIL] File not found: {pdf_path}")
        return False

    already_secured, has_correct_key = is_pdf_secured(pdf_path, owner_pw)
    if already_secured and has_correct_key and not force:
        if verbose:
            print(f"[SKIP] Already secured: {pdf_path.name}")
        return True

    try:
        doc = pymupdf.open(str(pdf_path))
        
        # If already encrypted, authenticate first
        if doc.metadata.get("encryption") and owner_pw:
            doc.authenticate(owner_pw)

        # Encrypt with AES-256, owner password, empty user password
        secured_bytes = doc.tobytes(
            encryption=pymupdf.PDF_ENCRYPT_AES_256,
            owner_pw=owner_pw,
            user_pw="",
            permissions=PERMISSIONS,
            deflate=True,
        )
        doc.close()

        # Atomic file write
        temp_file = pdf_path.with_suffix(".tmp_sec")
        with open(temp_file, "wb") as f:
            f.write(secured_bytes)

        os.replace(temp_file, pdf_path)
        if verbose:
            size_kb = round(len(secured_bytes) / 1024, 1)
            print(f"[OK]   Secured: {pdf_path.name} ({size_kb} KB)")
        return True
    except Exception as e:
        if verbose:
            print(f"[FAIL] Error securing {pdf_path.name}: {e}")
        return False


def find_all_pdfs(root_dir):
    """Recursively find all .pdf files, excluding temporary or build files."""
    root = Path(root_dir).resolve()
    pdf_files = []
    for p in root.rglob("*.pdf"):
        name = p.name.lower()
        if name.startswith(("_tmp", "temp", "test_")):
            continue
        pdf_files.append(p)
    return sorted(pdf_files)


def main():
    parser = argparse.ArgumentParser(
        description="Secure PDFs with permissions restrictions using PyMuPDF."
    )
    parser.add_argument("file", nargs="?", help="Path to a single PDF to secure.")
    parser.add_argument("--all", action="store_true", help="Secure all PDFs in repository.")
    parser.add_argument("--check", action="store_true", help="Check security status of PDFs without modifying.")
    parser.add_argument("--force", action="store_true", help="Re-encrypt even if already secured.")
    parser.add_argument("--password", help="Override password instead of reading .env")
    args = parser.parse_args()

    owner_pw = args.password or load_env_password()
    if not owner_pw:
        print("[ERROR] Permissions password not found!", file=sys.stderr)
        print("Please define PDF_PERMISSIONS_PASSWORD in your .env file or pass --password.", file=sys.stderr)
        sys.exit(1)

    repo_root = Path(__file__).resolve().parent

    # Mode 1: Check security status
    if args.check:
        pdfs = find_all_pdfs(repo_root)
        print(f"Checking security status for {len(pdfs)} PDFs in {repo_root}...\n")
        secured_count = 0
        unprotected_count = 0
        for p in pdfs:
            is_sec, correct_pw = is_pdf_secured(p, owner_pw)
            rel_path = p.relative_to(repo_root)
            if is_sec and correct_pw:
                print(f"  [SECURED]      {rel_path}")
                secured_count += 1
            elif is_sec:
                print(f"  [OTHER_PASS]   {rel_path}")
            else:
                print(f"  [UNPROTECTED]  {rel_path}")
                unprotected_count += 1
        print(f"\nSummary: {secured_count} secured, {unprotected_count} unprotected out of {len(pdfs)} total.")
        return

    # Mode 2: Single PDF
    if args.file:
        success = secure_single_pdf(args.file, owner_pw, force=args.force, verbose=True)
        sys.exit(0 if success else 1)

    # Mode 3: All PDFs
    if args.all:
        pdfs = find_all_pdfs(repo_root)
        print(f"Found {len(pdfs)} PDFs to secure in {repo_root}...")
        success_count = 0
        fail_count = 0
        skip_count = 0

        for p in pdfs:
            already, correct = is_pdf_secured(p, owner_pw)
            if already and correct and not args.force:
                skip_count += 1
                continue
            ok = secure_single_pdf(p, owner_pw, force=args.force, verbose=True)
            if ok:
                success_count += 1
            else:
                fail_count += 1

        print(f"\nSummary:")
        print(f"  Secured : {success_count}")
        print(f"  Skipped : {skip_count} (already secured)")
        print(f"  Failed  : {fail_count}")
        return

    parser.print_help()


if __name__ == "__main__":
    main()
