from pathlib import Path


_parent = Path(__file__).parent / "import" / "ui5"


def _get_file(name: str) -> str:
    f"""Get the content of a file in {_parent}."""
    p = _parent / name
    if not p.exists():
        raise FileNotFoundError(f"File {name} not found in {p}.")
    try:
        return p.read_text("utf-8")
    except UnicodeDecodeError:
        raise ValueError(f"File {name} is not a valid utf-8 text file.")


import_version: str = _get_file(".version")

# unabridged file contents
css_raw: str = _get_file("css.js")
xpath_raw: str = _get_file("xpath.js")

# see https://github.com/microsoft/playwright/issues/16705
css: str = f"(() => {{{css_raw};return module.exports.default}})()"
xpath: str = f"(() => {{{xpath_raw};return module.exports.default}})()"

__all__ = [
    "import_version",
    "css",
    "xpath",
    "css_raw",
    "xpath_raw",
]
