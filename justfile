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

test-command:
    uv run --isolated --with ./ --refresh-package playwright_ui5_select python -c \
    "import playwright_ui5_select; print(playwright_ui5_select.import_version)"

