import os
import re
import json

def test_file_existence():
    required_files = [
        r"d:\dastaan-library-main\css\peer-kamil-theme.css",
        r"d:\dastaan-library-main\js\peer-kamil-core.js",
        r"d:\dastaan-library-main\amar-bail\index.html",
        r"d:\dastaan-library-main\amar-bail\home.html",
        r"d:\dastaan-library-main\amar-bail\chapter.html",
        r"d:\dastaan-library-main\amar-bail\js\amar_data.js",
        r"d:\dastaan-library-main\amar-bail\js\chapters_data.js",
        r"d:\dastaan-library-main\namal\index.html",
        r"d:\dastaan-library-main\namal\home.html",
        r"d:\dastaan-library-main\namal\chapter.html",
        r"d:\dastaan-library-main\namal\js\namal_data.js",
        r"d:\dastaan-library-main\namal\js\chapters_data.js",
        r"d:\dastaan-library-main\third-novel\index.html",
        r"d:\dastaan-library-main\third-novel\home.html",
        r"d:\dastaan-library-main\third-novel\chapter.html",
        r"d:\dastaan-library-main\third-novel\js\novel_data.js",
        r"d:\dastaan-library-main\third-novel\js\chapters_data.js"
    ]
    for f in required_files:
        assert os.path.exists(f), f"Missing required file: {f}"
    print("[OK] File existence check passed.")

def test_datasets():
    # Test Amar Bail
    with open(r"d:\dastaan-library-main\amar-bail\js\chapters_data.js", "r", encoding="utf-8") as f:
        content = f.read()
    json_str = content.replace("window.AMARBAIL_CHAPTERS = ", "").strip().rstrip(";")
    amar_chs = json.loads(json_str)
    assert len(amar_chs) == 41, f"Expected 41 chapters for Amar Bail, got {len(amar_chs)}"
    print("[OK] Amar Bail dataset check passed (41 chapters).")

    # Test Namal
    with open(r"d:\dastaan-library-main\namal\js\chapters_data.js", "r", encoding="utf-8") as f:
        content = f.read()
    json_str = content.replace("window.NAMAL_CHAPTERS = ", "").strip().rstrip(";")
    namal_chs = json.loads(json_str)
    assert len(namal_chs) == 174, f"Expected 174 chapters for Namal, got {len(namal_chs)}"
    print("[OK] Namal dataset check passed (174 chapters).")

def test_content_leakage():
    # Ensure Amar Bail meta does not contain Salar or Imama
    with open(r"d:\dastaan-library-main\amar-bail\js\amar_data.js", "r", encoding="utf-8") as f:
        content = f.read().lower()
        assert "salar" not in content, "Found Salar in Amar Bail meta!"
        assert "imama" not in content, "Found Imama in Amar Bail meta!"

    # Ensure Namal meta does not contain Salar or Imama
    with open(r"d:\dastaan-library-main\namal\js\namal_data.js", "r", encoding="utf-8") as f:
        content = f.read().lower()
        assert "salar" not in content, "Found Salar in Namal meta!"
        assert "imama" not in content, "Found Imama in Namal meta!"
    print("[OK] Content leakage check passed.")

def test_relative_paths():
    html_files = [
        r"d:\dastaan-library-main\amar-bail\index.html",
        r"d:\dastaan-library-main\amar-bail\home.html",
        r"d:\dastaan-library-main\amar-bail\chapter.html",
        r"d:\dastaan-library-main\namal\index.html",
        r"d:\dastaan-library-main\namal\home.html",
        r"d:\dastaan-library-main\namal\chapter.html",
        r"d:\dastaan-library-main\third-novel\index.html",
        r"d:\dastaan-library-main\third-novel\home.html",
        r"d:\dastaan-library-main\third-novel\chapter.html"
    ]
    for h in html_files:
        with open(h, "r", encoding="utf-8") as f:
            text = f.read()
            assert "C:\\" not in text, f"Absolute path C:\\ found in {h}"
            assert "localhost" not in text, f"Localhost found in {h}"
    print("[OK] Relative path check passed.")

if __name__ == "__main__":
    test_file_existence()
    test_datasets()
    test_content_leakage()
    test_relative_paths()
    print("\nALL VERIFICATION TESTS PASSED SUCCESSFULLY!")
