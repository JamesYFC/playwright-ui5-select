set shell := ["uv", "run", "bash", "-euxo", "pipefail", "-c"]
set positional-arguments

pkg-name := "playwright-ui5-select"
pkg-name-py := "playwright_ui5_select"
npm-name := "playwright-ui5"
version-file := "src" / pkg-name-py / "import/ui5/.version"

init *pwargs:
    uv sync --locked --all-extras --dev
    playwright install --with-deps "$@" chromium
    pre-commit install

build *args:
    uv build "$@"
    unzip -l dist/*.whl

test *args:
    pytest --tracing on "$@"

lint:
    uvx ruff check --fix
    uvx ruff format

type *args:
    basedpyright "$@"

clean:
    rm -rf dist

precheck: test type lint

rebuild: clean build

localsmoke: 
    uv run --isolated --with {{pkg-name}} \
    --refresh-package {{pkg-name}} \
    python -c "import {{pkg-name-py}}"

testsmoke:
    uv run --isolated --with {{pkg-name}} \
    --index https://test.pypi.org/simple/ \
    --refresh-package {{pkg-name}} \
    python -c "import {{pkg-name-py}}"

smoke:
    uv run --isolated --with {{pkg-name}} \
    --index https://pypi.org/simple/ \
    --refresh-package {{pkg-name}} \
    python -c "import {{pkg-name-py}}"

mirror:
    ./mirror-check.sh

publish: precheck rebuild
    uv publish
    smoke