set shell := ["uv", "run", "bash", "-euxo", "pipefail", "-c"]
set positional-arguments

build *args:
    uv build "$@"
    unzip -l dist/*.whl

test *args:
    pytest "$@"

lint *args:
    uvx ruff check --fix
    uvx ruff format

type *args:
    basedpyright "$@"

clean:
    rm -rf dist

precheck: test type lint

rebuild: clean build

localsmoke: 
    uv run --isolated --with playwright-ui5-select \
    --refresh-package playwright-ui5-select \
    python -c "import playwright_ui5_select"

testsmoke:
    uv run --isolated --with playwright-ui5-select \
    --index https://test.pypi.org/simple/ \
    --refresh-package playwright-ui5-select \
    python -c "import playwright_ui5_select"