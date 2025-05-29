set shell := ["uv", "run", "bash", "-euxo", "pipefail", "-c"]
set positional-arguments

build *args:
    uv build "$@"

test *args:
    pytest "$@"

lint *args:
    uv "$@"

type *args:
    basedpyright "$@"

clean:
    rm -rf dist

postpub:
    uv run --isolated --with playwright-ui5-select --index https://test.pypi.org/simple/ --index-strategy unsafe-first-match --refresh-package playwright-ui5-select python -c \
    "import playwright_ui5_select"

