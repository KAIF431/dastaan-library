import os
import re
import json

AMARBAIL_DIR = r"D:\novels\Amarbail"
NAMAL_DIR = r"D:\novels\Namal"

OUT_AMARBAIL_JS = r"D:\amar-bail\chapters_data.js"
OUT_NAMAL_JS = r"D:\namal\chapters_data.js"
OUT_THIRD_JS = r"D:\third-novel\chapters_data.js"

def clean_text(raw_text):
    lines = raw_text.splitlines()
    cleaned_lines = []
    
    spam_patterns = [
        r"http[s]?://\S+",
        r"www\.\S+",
        r"join our telegram",
        r"whatsapp group",
        r"downloaded from",
        r"uploaded by",
        r"posted on",
        r"read more novels at",
        r"copyright",
        r"all rights reserved",
        r"page \d+ of \d+",
        r"===+.*===+",
    ]
    
    combined_spam_regex = re.compile("|".join(spam_patterns), re.IGNORECASE)

    for line in lines:
        stripped = line.strip()
        if not stripped:
            cleaned_lines.append("")
            continue
        
        if combined_spam_regex.search(stripped):
            continue
        
        if re.match(r"^\d+$", stripped):
            continue
            
        cleaned_lines.append(stripped)

    text = "\n".join(cleaned_lines)
    text = re.sub(r"\n{3,}", "\n\n", text).strip()
    return text

def get_chapter_title_and_body(raw_text, file_num, novel_name):
    lines = raw_text.strip().splitlines()
    title = f"Chapter {file_num}"
    
    non_empty = [l.strip() for l in lines if l.strip()]
    if non_empty:
        first_line = non_empty[0]
        m = re.match(r"===+\s*.*:\s*(.*?)\s*===+", first_line, re.IGNORECASE)
        if m:
            title_part = m.group(1).strip()
            if title_part:
                title = f"Chapter {file_num} — {title_part}"
        elif first_line.lower().startswith("baab") or "chapter" in first_line.lower():
            title = f"Chapter {file_num} — {first_line}"
            
    cleaned_body = clean_text(raw_text)
    return title, cleaned_body

def process_novel_dir(novel_dir, novel_name):
    chapters = []
    def sort_key(filename):
        m = re.search(r"\d+", filename)
        return int(m.group(0)) if m else 0

    files = [f for f in os.listdir(novel_dir) if f.endswith(".txt")]
    files.sort(key=sort_key)

    for idx, fname in enumerate(files, start=1):
        fpath = os.path.join(novel_dir, fname)
        with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
        
        ch_title, ch_body = get_chapter_title_and_body(content, idx, novel_name)
        
        chapters.append({
            "id": idx,
            "number": idx,
            "title": ch_title,
            "text": ch_body
        })
    return chapters

def main():
    print("Processing Amar Bail...")
    amarbail_chapters = process_novel_dir(AMARBAIL_DIR, "Amar Bail")
    print(f"Amar Bail: {len(amarbail_chapters)} chapters processed.")

    print("Processing Namal...")
    namal_chapters = process_novel_dir(NAMAL_DIR, "Namal")
    print(f"Namal: {len(namal_chapters)} chapters processed.")

    os.makedirs(os.path.dirname(OUT_AMARBAIL_JS), exist_ok=True)
    os.makedirs(os.path.dirname(OUT_NAMAL_JS), exist_ok=True)
    os.makedirs(os.path.dirname(OUT_THIRD_JS), exist_ok=True)

    with open(OUT_AMARBAIL_JS, "w", encoding="utf-8") as f:
        f.write("window.AMARBAIL_CHAPTERS = " + json.dumps(amarbail_chapters, ensure_ascii=False, indent=2) + ";\n")

    with open(OUT_NAMAL_JS, "w", encoding="utf-8") as f:
        f.write("window.NAMAL_CHAPTERS = " + json.dumps(namal_chapters, ensure_ascii=False, indent=2) + ";\n")

    third_chapters = [
        {
            "id": 1,
            "number": 1,
            "title": "Chapter 1 — Ibtida",
            "text": "Yeh dastaan ek naye safar ki ibtida hai. Parda aur mijaaz ke gehre pehloo, insani rooh ki tabdeeli aur haya ke safar ki kahani..."
        }
    ]
    with open(OUT_THIRD_JS, "w", encoding="utf-8") as f:
        f.write("window.THIRD_CHAPTERS = " + json.dumps(third_chapters, ensure_ascii=False, indent=2) + ";\n")

    print("Chapter JS datasets created successfully in D drive!")

if __name__ == "__main__":
    main()
