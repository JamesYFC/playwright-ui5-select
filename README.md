# playwright-ui5-select

[![PyPI - Version](https://img.shields.io/pypi/v/playwright-ui5-select)](https://pypi.org/project/playwright-ui5-select/)

A mirror of the [playwright-ui5](https://github.com/DetachHead/playwright-ui5) custom selector engine, to streamline its use in python.

This package:

- mirrors the relevant distribution files `css.js` and `xpath.js`
- reads file contents and [exports it](https://github.com/microsoft/playwright/issues/16705) in a manner can be passed straight into the [playwright api](https://playwright.dev/python/docs/extensibility#custom-selector-engines)
- also provides the raw data if needed

## Installation

uv:

```
uv add playwright-ui5-select
```

pip:

```
pip install playwright-ui5-select
```

## Usage

Given a `Playwright` instance, register one or both selector engines with `.selectors.register()`.

```py
from playwright_ui5_select import css, xpath

# name can be changed here from "ui5_css" to whatever you like
playwright.selectors.register("ui5_css", css)
playwright.selectors.register("ui5_xpath", xpath)
```

You can use the [fixture](https://playwright.dev/python/docs/test-runners#fixtures) supplied by `playwright-python` to register your selectors with the session-scoped `Playwright` instance:

```python
# in conftest.py

@fixture(scope="session", autouse=True)
def _(playwright: Playwright):
    playwright.selectors.register("ui5_css", css)
```

The registered selector will now be available.

```python
def test_basic(page: Page):
    page.goto("https://ui5.sap.com")
    page.click("ui5_css=sap.m.Button[text='Get Started with UI5']")
```

See the full api [here](https://github.com/DetachHead/playwright-ui5?tab=readme-ov-file#usage).

### Other uses

The package also exports `*_raw` variables for you to consume as you see fit:

```python
from playwright_ui5_select import css_raw, xpath_raw

print(css_raw)
print(xpath_raw)
```

These do not include the extra [IIFE code](https://github.com/microsoft/playwright/issues/16705) that returns the default exports as an expression.

You can also access the raw files directly with `importlib.resources` at `import/ui5`:

```python
from importlib.resources import files

import playwright_ui5_select

data = files(playwright_ui5_select).joinpath("import").joinpath("ui5")

csspath = data.joinpath("css.js")

print("csspath", csspath)

print("css", csspath.read_text())
```
