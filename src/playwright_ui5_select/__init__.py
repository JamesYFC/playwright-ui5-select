from pathlib import Path


_parent = Path(__file__).parent / "imported" / "playwright-ui5"


def _get_file(name: str) -> str:
    """Get the content of a file in the `imported/playwright-ui5` directory."""
    p = _parent / name
    if not p.exists():
        raise FileNotFoundError(f"File {name} not found in {p}.")
    try:
        return p.read_text("utf-8")
    except UnicodeDecodeError:
        raise ValueError(f"File {name} is not a valid utf-8 text file.")


css_raw: str = _get_file("css.js")
xpath_raw: str = _get_file("xpath.js")
import_version: str = _get_file("_version.txt")

__all__ = [
    "import_version",
    "css_raw",
    "xpath_raw",
]
