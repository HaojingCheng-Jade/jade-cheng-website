#!/usr/bin/env python3
"""Scan profile/, cat/, life/, and resume/ folders and write content.json."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
COVER_NAMES = {"cover", "fengmian"}


def scan_images(folder: str) -> dict:
    path = ROOT / folder
    result = {"cover": None, "images": []}
    if not path.is_dir():
        return result

    files = sorted(
        f for f in path.iterdir()
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
    )

    gallery = []
    cover = None
    for f in files:
        rel = f"{folder}/{f.name}"
        if f.stem.lower() in COVER_NAMES:
            cover = rel
        else:
            gallery.append(rel)

    if cover is None and gallery:
        cover = gallery[0]

    result["cover"] = cover
    result["images"] = gallery
    return result


def scan_profile() -> str | None:
    path = ROOT / "profile"
    if not path.is_dir():
        return None

    preferred = ("avatar.jpg", "avatar.jpeg", "avatar.png", "cover.jpg")
    files = sorted(
        f for f in path.iterdir()
        if f.is_file() and f.suffix.lower() in IMAGE_EXTENSIONS
    )

    for name in preferred:
        for f in files:
            if f.name.lower() == name:
                return f"profile/{f.name}"

    return f"profile/{files[0].name}" if files else None


def scan_resumes() -> list:
    path = ROOT / "resume"
    resumes = []
    if not path.is_dir():
        return resumes
    for f in sorted(path.iterdir()):
        if f.is_file() and f.suffix.lower() == ".pdf":
            resumes.append({
                "name": f.name,
                "path": f"resume/{f.name}"
            })
    return resumes


def main():
    content = {
        "profile": scan_profile(),
        "cat": scan_images("cat"),
        "life": scan_images("life"),
        "resumes": scan_resumes()
    }

    json_out = ROOT / "content.json"
    json_out.write_text(json.dumps(content, indent=2, ensure_ascii=False) + "\n")

    js_out = ROOT / "content.js"
    js_content = "window.SITE_CONTENT = " + json.dumps(content, indent=2, ensure_ascii=False) + ";\n"
    js_out.write_text(js_content)

    print(f"Wrote {json_out} and {js_out}")


if __name__ == "__main__":
    main()
