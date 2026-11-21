#!/usr/bin/env python3
"""
pdf_secure.py — Apply Academic Branding Metadata & Permissions Restrictions to PDFs
ECE MAKAUT Short Notes

Restrictions & Permissions:
  - Changing the Document: NOT Allowed (No editing/modifications)
  - Page Extraction: NOT Allowed (No page extraction / splitting)
  - Content Copying: ALLOWED (Students can freely select and copy text, formulas, and definitions)
  - Printing: Allowed (High Quality printing for study)
  - Content Copying for Accessibility: Allowed (Screen readers permitted)
  - Commenting: Allowed (Highlighting and annotation permitted)
  - Filling Form Fields & Signing: Allowed

Metadata applied:
  - Title: Formatted with Subject Code, Name & Module Topic
  - Author: Biraj Sarkar (CGEC) - Department of Electronics & Communication Engineering
  - Subject: MAKAUT B.Tech ECE (Batch 2023-27) Exam-Ready Revision Notes & Syllabus
  - Keywords: Subject, Semester, Topic, Formulas, Derivations, CGEC, MAKAUT tags
  - Creator: ECE MAKAUT Short Notes (https://biraj2004.github.io/ECE_MAKAUT_Short-Notes/)
  - Producer: XeLaTeX, TikZ & PyMuPDF (CC BY-NC-SA 4.0)

No password required to open/read/copy/print the PDF (user_pw is empty).
PDF viewers that honor permissions require the owner password for restricted actions.
A document-level XMP notice requests that automated tools respect the same restrictions.
The notice is advisory and does not prevent tools from recreating content they can read.
Password is read from .env (PDF_PERMISSIONS_PASSWORD or PDF_OWNER_PASSWORD).
"""

import os
import sys
import re
import argparse
from pathlib import Path
from tempfile import NamedTemporaryFile
from xml.etree import ElementTree as ET
import subprocess
from datetime import datetime
import pymupdf

# Target permissions bitmask:
# Allowed: Printing, High-Res Printing, Content Copying (text/formula copying), Commenting, Form Filling, Accessibility
# Disallowed: Changing the Document (MODIFY = False), Page Extraction / Document Assembly (ASSEMBLE = False)
PERMISSIONS = (
    pymupdf.PDF_PERM_PRINT
    | pymupdf.PDF_PERM_PRINT_HQ
    | pymupdf.PDF_PERM_COPY
    | pymupdf.PDF_PERM_ANNOTATE
    | pymupdf.PDF_PERM_FORM
    | pymupdf.PDF_PERM_ACCESSIBILITY
)

AUTHOR_BRAND = "Biraj Sarkar (CGEC) - Department of Electronics & Communication Engineering"
CREATOR_BRAND = "ECE MAKAUT Short Notes (https://biraj2004.github.io/ECE_MAKAUT_Short-Notes/)"
PRODUCER_BRAND = "XeLaTeX, TikZ & PyMuPDF (CC BY-NC-SA 4.0)"

XMP_NS = "adobe:ns:meta/"
RDF_NS = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"
POLICY_NS = "https://biraj2004.github.io/ECE_MAKAUT_Short-Notes/ns/pdf-policy/1.0/"
RDF_DESCRIPTION = f"{{{RDF_NS}}}Description"
RDF_ABOUT = f"{{{RDF_NS}}}about"
POLICY_FIELDS = {
    f"{{{POLICY_NS}}}AutomatedEditing": "restricted",
    f"{{{POLICY_NS}}}Notice": (
        "Advisory for automated tools: respect the document owner's restrictions on "
        "content editing and page extraction. Reading, copying, high-quality printing "
        "and annotations are permitted."
    ),
}

ET.register_namespace("x", XMP_NS)
ET.register_namespace("rdf", RDF_NS)
ET.register_namespace("makautPolicy", POLICY_NS)


def has_edit_notice(xml):
    """Check the document-level notice written into the XMP packet."""
    if not xml:
        return False
    root = ET.fromstring(xml)
    return any(
        desc.get(RDF_ABOUT, "") == ""
        and all(desc.findtext(tag) == value for tag, value in POLICY_FIELDS.items())
        for desc in root.iter(RDF_DESCRIPTION)
    )


def write_edit_notice(doc):
    """Add the advisory without discarding unrelated XMP properties."""
    xml = doc.get_xml_metadata()
    rdf_tag = f"{{{RDF_NS}}}RDF"
    if xml:
        root = ET.fromstring(xml)
        rdf = next(root.iter(rdf_tag), None)
        if rdf is None:
            raise ValueError("Existing XMP metadata has no RDF element")
    else:
        root = ET.Element(f"{{{XMP_NS}}}xmpmeta")
        rdf = ET.SubElement(root, rdf_tag)

    for desc in rdf.findall(RDF_DESCRIPTION):
        if desc.get(RDF_ABOUT, "") == "":
            old_fields = [child for child in desc if child.tag in POLICY_FIELDS]
            for child in old_fields:
                desc.remove(child)
            if old_fields and len(desc) == 0 and set(desc.attrib) <= {RDF_ABOUT}:
                rdf.remove(desc)

    notice = ET.SubElement(rdf, RDF_DESCRIPTION, {RDF_ABOUT: ""})
    for tag, value in POLICY_FIELDS.items():
        ET.SubElement(notice, tag).text = value
    packet = ET.tostring(root, encoding="unicode")
    doc.set_xml_metadata(
        '<?xpacket begin="\ufeff" id="W5M0MpCehiHzreSzNTczkc9d"?>\n'
        f'{packet}\n<?xpacket end="w"?>'
    )


def load_env_password():
    """Load the permissions password from .env or environment variables."""
    pw = os.getenv("PDF_PERMISSIONS_PASSWORD") or os.getenv("PDF_OWNER_PASSWORD")
    if pw:
        return pw.strip()

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


def load_catalog_mappings(repo_root):
    """Parse module and subject names from docs/js/data.js for accurate titling."""
    data_js = repo_root / "docs" / "js" / "data.js"
    mod_dict = {}
    if data_js.is_file():
        try:
            with open(data_js, "r", encoding="utf-8") as f:
                content = f.read()
            matches = re.findall(
                r"name:\s*['\"]([^'\"]+)['\"],\s*file:\s*['\"]([^'\"]+)['\"]", content
            )
            for mod_name, mod_file in matches:
                mod_dict[mod_file] = mod_name
        except Exception:
            pass
    return mod_dict


def generate_metadata(pdf_path, mod_dict=None):
    """
    Generate rich branding metadata for any PDF in the repository.
    """
    p = Path(pdf_path)
    name = p.stem
    parent_folder = p.parent.name
    sem_folder = p.parent.parent.name if len(p.parents) > 1 else ""

    clean_subj = re.sub(r"^\d+\.\s*", "", parent_folder) if parent_folder else ""
    clean_sem = sem_folder.replace("SEM", "Semester").strip() if "SEM" in sem_folder else ""

    if name == "Combined_Notes_Cover_Page":
        title = "ECE MAKAUT Short Notes - Standalone Cover Page Template"
        subject = "MAKAUT B.Tech ECE (Batch 2023-27) Exam-Ready Archive Cover Template"
        keywords = "MAKAUT, B.Tech, ECE, Cover Page, Template, Biraj Sarkar, CGEC, Engineering"
    elif "_Module" in name:
        m = re.match(r"^([A-Z0-9-]+)_Module(\d+)_Notes$", name)
        code = m.group(1) if m else ""
        mod_num = m.group(2) if m else ""
        mod_name = mod_dict.get(p.name, "") if mod_dict else ""
        topic_suffix = f" - {mod_name}" if mod_name else ""
        title = f"{code} - {clean_subj}: Module {mod_num}{topic_suffix}"
        subject = f"MAKAUT B.Tech ECE {clean_sem} Notes | {clean_subj}"
        keywords = f"MAKAUT, B.Tech, ECE, {clean_sem}, {code}, {clean_subj}, Module {mod_num}, {mod_name}, Short Notes, Revision Notes, Exam Prep, Formulas, Derivations, Biraj Sarkar, CGEC, 2023-2027"
    elif "Combined" in name or ("_" in name and not name.lower().startswith("sem")):
        code = name.split("_")[0]
        title = f"{code} - {clean_subj}: Complete Exam Revision Notes"
        subject = f"MAKAUT B.Tech ECE {clean_sem} Comprehensive Exam Notes & Official Syllabus"
        keywords = f"MAKAUT, B.Tech, ECE, {clean_sem}, {code}, {clean_subj}, Combined Notes, Full Subject Notes, Revision Notes, Formulas, Derivations, Biraj Sarkar, CGEC, 2023-2027"
    elif name.lower().startswith("sem"):
        sem_label = clean_sem or name
        title = f"MAKAUT B.Tech ECE - {sem_label} Official Syllabus"
        subject = "MAKAUT B.Tech Electronics & Communication Engineering Official Syllabus"
        keywords = f"MAKAUT, B.Tech, ECE, {sem_label}, Syllabus, Curriculum, Electronics & Communication Engineering, Biraj Sarkar, CGEC"
    else:
        clean_name = name.replace("_", " ")
        title = f"ECE MAKAUT Short Notes - {clean_name}"
        subject = "MAKAUT B.Tech ECE (Batch 2023-27) Exam-Ready Archive"
        keywords = "MAKAUT, B.Tech, ECE, Engineering Notes, Revision, Biraj Sarkar, CGEC"

    return {
        "title": title,
        "author": AUTHOR_BRAND,
        "subject": subject,
        "keywords": keywords,
        "creator": CREATOR_BRAND,
        "producer": PRODUCER_BRAND,
    }


def is_pdf_secured_and_branded(pdf_path, owner_pw):
    """Check the current permissions, branding and advisory notice."""
    try:
        with pymupdf.open(pdf_path) as doc:
            if doc.needs_pass:
                return False, False
            metadata = doc.metadata
            restricted = pymupdf.PDF_PERM_MODIFY | pymupdf.PDF_PERM_ASSEMBLE
            matches_policy = (
                "256-bit AES" in (metadata.get("encryption") or "")
                and metadata.get("author") == AUTHOR_BRAND
                and metadata.get("creator") == CREATOR_BRAND
                and doc.permissions & PERMISSIONS == PERMISSIONS
                and not doc.permissions & restricted
                and has_edit_notice(doc.get_xml_metadata())
            )
            if not matches_policy:
                return False, False
            return True, bool(owner_pw and doc.authenticate(owner_pw) == 4)
    except Exception:
        return False, False


def secure_single_pdf(pdf_path, owner_pw, mod_dict=None, force=False, verbose=True):
    """
    Apply branding metadata and secure a single PDF in-place using PyMuPDF AES-256 encryption.
    """
    pdf_path = Path(pdf_path).resolve()
    if not pdf_path.is_file():
        if verbose:
            print(f"[FAIL] File not found: {pdf_path}")
        return False

    already_done, has_correct_key = is_pdf_secured_and_branded(pdf_path, owner_pw)
    if already_done and has_correct_key and not force:
        if verbose:
            print(f"[SKIP] Already branded & secured: {pdf_path.name}")
        return True

    temp_file = None
    try:
        with pymupdf.open(pdf_path) as doc:
            if doc.needs_pass or doc.metadata.get("encryption"):
                doc.authenticate(owner_pw)
            if doc.is_encrypted:
                raise ValueError("Unable to open PDF with the configured owner password")

            doc.set_metadata(generate_metadata(pdf_path, mod_dict))
            write_edit_notice(doc)
            with NamedTemporaryFile(
                dir=pdf_path.parent, prefix=f".{pdf_path.stem}-", suffix=".tmp_sec", delete=False
            ) as output:
                temp_file = Path(output.name)
            doc.save(
                temp_file,
                encryption=pymupdf.PDF_ENCRYPT_AES_256,
                owner_pw=owner_pw,
                user_pw="",
                permissions=PERMISSIONS,
                deflate=True,
            )

        os.replace(temp_file, pdf_path)
        if verbose:
            size_kb = round(pdf_path.stat().st_size / 1024, 1)
            print(f"[OK]   Secured & Branded: {pdf_path.name} ({size_kb} KB)")
        return True
    except Exception as e:
        if verbose:
            print(f"[FAIL] Error securing {pdf_path.name}: {e}")
        return False
    finally:
        if temp_file is not None:
            temp_file.unlink(missing_ok=True)


TRACKER_FILENAME = "PDF_SECURITY_TRACKER.local.md"


def get_git_info(repo_root):
    """Retrieve the latest commit hash, date, message, and branch from git."""
    try:
        commit_hash = subprocess.check_output(
            ["git", "rev-parse", "HEAD"], cwd=repo_root, text=True, stderr=subprocess.DEVNULL
        ).strip()
        commit_short = commit_hash[:7]
        commit_msg = subprocess.check_output(
            ["git", "log", "-1", "--pretty=%s"], cwd=repo_root, text=True, stderr=subprocess.DEVNULL
        ).strip()
        commit_date = subprocess.check_output(
            ["git", "log", "-1", "--pretty=%cd", "--date=iso-strict"], cwd=repo_root, text=True, stderr=subprocess.DEVNULL
        ).strip()
        branch = subprocess.check_output(
            ["git", "rev-parse", "--abbrev-ref", "HEAD"], cwd=repo_root, text=True, stderr=subprocess.DEVNULL
        ).strip()
        return {
            "hash": commit_hash,
            "short": commit_short,
            "message": commit_msg,
            "date": commit_date,
            "branch": branch,
        }
    except Exception:
        return {
            "hash": "unknown",
            "short": "unknown",
            "message": "N/A",
            "date": datetime.now().isoformat(),
            "branch": "main",
        }


def sync_tracker_file(repo_root, owner_pw, mod_dict=None, auto_secure=True, force=False, verbose=True):
    """
    Audit all PDFs, automatically secure any that need updating (if auto_secure=True),
    and generate/update the git-ignored PDF_SECURITY_TRACKER.local.md file with latest commit info.
    """
    repo_root = Path(repo_root).resolve()
    tracker_path = repo_root / TRACKER_FILENAME
    pdfs = find_all_pdfs(repo_root)
    git_info = get_git_info(repo_root)
    now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    if verbose:
        print(f"Auditing and syncing security tracker for {len(pdfs)} PDFs...")

    secured_items = []
    unsecured_items = []
    auto_secured_count = 0

    for p in pdfs:
        is_sec, correct_pw = is_pdf_secured_and_branded(p, owner_pw)
        if (not is_sec or not correct_pw) and auto_secure:
            ok = secure_single_pdf(p, owner_pw, mod_dict=mod_dict, force=force, verbose=verbose)
            if ok:
                auto_secured_count += 1
                is_sec, correct_pw = is_pdf_secured_and_branded(p, owner_pw)

        rel = p.relative_to(repo_root)
        size_kb = round(p.stat().st_size / 1024, 1)
        item_data = {
            "path": p,
            "rel": str(rel),
            "name": p.name,
            "size_kb": size_kb,
            "is_secured": (is_sec and correct_pw),
        }
        if is_sec and correct_pw:
            secured_items.append(item_data)
        else:
            unsecured_items.append(item_data)

    # Group items by folder category
    categories = {}
    for item in secured_items + unsecured_items:
        rel = Path(item["rel"])
        parts = rel.parts
        if len(parts) > 1 and "SEM" in parts[0]:
            cat = parts[0]
            if len(parts) > 2:
                subcat = parts[1]
            else:
                subcat = "Syllabus / Overview"
        else:
            cat = "Templates & Standalone PDFs"
            subcat = "Templates"

        categories.setdefault(cat, {}).setdefault(subcat, []).append(item)

    lines = []
    lines.append(f"# PDF Security Status & Tracking Matrix (`{TRACKER_FILENAME}`)")
    lines.append("")
    lines.append("> **Notice:** This document is dynamically managed and git-ignored via `*.local.md`. It tracks the encryption status, academic branding, and permissions policy for all compiled PDFs based on repository commits.")
    lines.append("")
    lines.append("## 📌 Git Commit & Repository State")
    lines.append("")
    lines.append(f"- **Tracked Git Commit**: `{git_info['short']}` (`{git_info['hash']}`)")
    lines.append(f"- **Commit Message**: {git_info['message']}")
    lines.append(f"- **Git Branch**: `{git_info['branch']}`")
    lines.append(f"- **Last Verified / Synced**: `{now_str}`")
    lines.append(f"- **Total PDFs Monitored**: **{len(pdfs)}**")
    lines.append(f"- **Fully Secured & Branded**: **{len(secured_items)}** ({(len(secured_items)/len(pdfs)*100 if pdfs else 0):.1f}%)")
    lines.append(f"- **Pending / Needing Update**: **{len(unsecured_items)}**")
    if auto_secured_count > 0:
        lines.append(f"- **Newly Secured During This Sync**: **{auto_secured_count}**")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## ⚠️ Mandatory Pre-Commit & Pre-Push Security Instructions")
    lines.append("")
    lines.append("To ensure that only protected PDFs with proper academic branding, permissions locking, and advisory notices are committed to GitHub, follow these mandatory instructions:")
    lines.append("")
    lines.append("### 1. Audit & Synchronize Command")
    lines.append("Run the tracker sync command before `git add` or `git commit`:")
    lines.append("```powershell")
    lines.append("# Audit all PDFs, auto-secure any updated/new ones, and refresh this tracker:")
    lines.append("python pdf_secure.py --sync-tracker")
    lines.append("```")
    lines.append("")
    lines.append("### 2. Verification Command")
    lines.append("Ensure 100% of PDFs report `[BRANDED & SECURED]`:")
    lines.append("```powershell")
    lines.append("python pdf_secure.py --check")
    lines.append("```")
    lines.append("Expected output: `Summary: <N> complete, 0 needing update out of <N> total.`")
    lines.append("")
    lines.append("### 3. Git Staging, Commit & Push Workflow")
    lines.append("Once verification passes:")
    lines.append("```powershell")
    lines.append("git add .")
    lines.append('git commit -m "docs: update notes and ensure all PDFs are secured"')
    lines.append("git push origin main")
    lines.append("```")
    lines.append("")
    lines.append("### 4. Git Pre-Commit Hook (Automated Safety Net)")
    lines.append("To prevent accidental commits of unencrypted PDFs, create `.git/hooks/pre-commit`:")
    lines.append("```bash")
    lines.append("#!/bin/sh")
    lines.append("# .git/hooks/pre-commit")
    lines.append('python pdf_secure.py --check || {')
    lines.append('    echo "[ERROR] Unsecured PDFs detected! Run \'python pdf_secure.py --sync-tracker\' before committing."')
    lines.append('    exit 1')
    lines.append('}')
    lines.append("```")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## 🔒 Active Permissions & Protection Policy")
    lines.append("")
    lines.append("| Property | Policy Setting | Purpose |")
    lines.append("|---|---|---|")
    lines.append("| **Encryption Engine** | PyMuPDF (`fitz`) AES-256 (`PDF_ENCRYPT_AES_256`) | Industry standard strong document encryption |")
    lines.append("| **User Password** | None (empty string) | Allows instant reading in browser, Acrobat, mobile apps without entering password |")
    lines.append("| **Owner Password** | Loaded from `.env` (`PDF_PERMISSIONS_PASSWORD`) | Required for administrative permission overrides |")
    lines.append("| **Modifications** | ❌ **NOT Allowed** | Prevents modifying notes, tampering with derivations or diagrams |")
    lines.append("| **Page Extraction** | ❌ **NOT Allowed** | Prevents page splitting, extracting, and unauthorized bundling |")
    lines.append("| **Content Copying** | ✅ **ALLOWED** | Students can freely select and copy text, code, and math formulas |")
    lines.append("| **High-Quality Print**| ✅ **ALLOWED** | Enables full 1200+ DPI printing for physical revision and study |")
    lines.append("| **Annotations & Forms**| ✅ **ALLOWED** | Students can highlight text, add sticky notes, and fill forms |")
    lines.append("| **Accessibility** | ✅ **ALLOWED** | Screen-readers supported for visually impaired students |")
    lines.append(f"| **Author Branding** | `{AUTHOR_BRAND}` | Academic attribution across all metadata fields |")
    lines.append(f"| **Creator Branding**| `{CREATOR_BRAND}` | Portal repository source attribution |")
    lines.append(f"| **XMP Policy Notice**| `{POLICY_FIELDS[f'{{{POLICY_NS}}}Notice']}` | Advisory notice embedded in document XML metadata packet |")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## 📑 Monitored PDF Inventory Matrix")
    lines.append("")

    for cat_name in sorted(categories.keys()):
        lines.append(f"### 📂 {cat_name}")
        lines.append("")
        for subcat_name in sorted(categories[cat_name].keys()):
            items = categories[cat_name][subcat_name]
            lines.append(f"#### {subcat_name} ({len(items)} PDFs)")
            lines.append("")
            lines.append("| Status | PDF File | Size | Encryption | XMP Policy Notice | File Path |")
            lines.append("|:---:|---|:---:|:---:|:---:|---|")
            for it in sorted(items, key=lambda x: x["name"]):
                st = "✅ Secured" if it["is_secured"] else "❌ Needs Update"
                enc = "AES-256" if it["is_secured"] else "Unsecured"
                xmp = "Embedded" if it["is_secured"] else "Missing"
                rel_posix = it["rel"].replace("\\", "/")
                lines.append(f"| {st} | `{it['name']}` | {it['size_kb']} KB | {enc} | {xmp} | `{rel_posix}` |")
            lines.append("")

    with open(tracker_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

    if verbose:
        print(f"[OK]   Synced security tracker: {tracker_path.name} ({len(secured_items)}/{len(pdfs)} secured)")
    return tracker_path


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
        description="Apply Academic Branding Metadata & Permissions Restrictions to PDFs."
    )
    parser.add_argument("file", nargs="?", help="Path to a single PDF to secure.")
    parser.add_argument("--file", dest="file_flag", help="Path to a single PDF to secure (flag alias).")
    parser.add_argument("--all", action="store_true", help="Secure & brand all PDFs in repository.")
    parser.add_argument("--check", action="store_true", help="Check security & branding status without modifying.")
    parser.add_argument(
        "--sync-tracker",
        "--track",
        dest="track",
        action="store_true",
        help="Audit, auto-secure any unsecured/updated PDFs, and update the local tracker (.local.md).",
    )
    parser.add_argument("--force", action="store_true", help="Re-apply metadata & encryption even if already done.")
    parser.add_argument("--password", help="Override password instead of reading .env")
    args = parser.parse_args()

    owner_pw = args.password or load_env_password()
    if not owner_pw:
        print("[ERROR] Permissions password not found!", file=sys.stderr)
        print("Please define PDF_PERMISSIONS_PASSWORD in your .env file or pass --password.", file=sys.stderr)
        sys.exit(1)

    repo_root = Path(__file__).resolve().parent
    mod_dict = load_catalog_mappings(repo_root)

    # Mode 1: Check status
    if args.check:
        pdfs = find_all_pdfs(repo_root)
        print(f"Checking status for {len(pdfs)} PDFs in {repo_root}...\n")
        ok_count = 0
        unprotected_count = 0
        for p in pdfs:
            is_sec, correct_pw = is_pdf_secured_and_branded(p, owner_pw)
            rel_path = p.relative_to(repo_root)
            if is_sec and correct_pw:
                print(f"  [BRANDED & SECURED] {rel_path}")
                ok_count += 1
            else:
                print(f"  [NEEDS UPDATE]      {rel_path}")
                unprotected_count += 1
        print(f"\nSummary: {ok_count} complete, {unprotected_count} needing update out of {len(pdfs)} total.")
        return

    # Mode 2: Single PDF
    target_file = args.file or args.file_flag
    if target_file:
        success = secure_single_pdf(target_file, owner_pw, mod_dict=mod_dict, force=args.force, verbose=True)
        sys.exit(0 if success else 1)

    # Mode 3: All PDFs
    if args.all:
        pdfs = find_all_pdfs(repo_root)
        print(f"Applying Branding Metadata & Security to {len(pdfs)} PDFs...")
        success_count = 0
        fail_count = 0
        skip_count = 0

        for p in pdfs:
            already, correct = is_pdf_secured_and_branded(p, owner_pw)
            if already and correct and not args.force:
                skip_count += 1
                continue
            ok = secure_single_pdf(p, owner_pw, mod_dict=mod_dict, force=args.force, verbose=True)
            if ok:
                success_count += 1
            else:
                fail_count += 1

        print(f"\nSummary:")
        print(f"  Secured & Branded : {success_count}")
        print(f"  Skipped           : {skip_count} (already branded & secured)")
        print(f"  Failed            : {fail_count}")

        # Sync local tracker file
        sync_tracker_file(repo_root, owner_pw, mod_dict=mod_dict, auto_secure=False, verbose=True)
        sys.exit(1 if fail_count else 0)

    # Mode 4: Sync tracker & auto-secure
    if args.track:
        sync_tracker_file(repo_root, owner_pw, mod_dict=mod_dict, auto_secure=True, force=args.force, verbose=True)
        return

    parser.print_help()


if __name__ == "__main__":
    main()
