# Codex P0 presets (rápidos)

Usa estos ejemplos para arrancar sin editar mucho.

## Python (uv)

```bash
make check \
  LINT_CMD='uv run ruff check .' \
  TYPECHECK_CMD='uv run pyright' \
  TEST_CMD='uv run pytest -q' \
  BUILD_CMD='uv run python -m build'
```

## Python (poetry)

```bash
make check \
  LINT_CMD='poetry run ruff check .' \
  TYPECHECK_CMD='poetry run pyright' \
  TEST_CMD='poetry run pytest -q' \
  BUILD_CMD='poetry run python -m build'
```

## Node (pnpm)

```bash
make check \
  LINT_CMD='pnpm lint' \
  TYPECHECK_CMD='pnpm typecheck' \
  TEST_CMD='pnpm test' \
  BUILD_CMD='pnpm build'
```

## Swift / Xcode (+ xcbeautify)

```bash
make check \
  LINT_CMD='swiftlint' \
  TYPECHECK_CMD='xcodebuild -scheme MyApp -configuration Debug -destination "platform=iOS Simulator,name=iPhone 16" build | xcbeautify' \
  TEST_CMD='xcodebuild -scheme MyApp -configuration Debug -destination "platform=iOS Simulator,name=iPhone 16" test | xcbeautify' \
  BUILD_CMD='xcodebuild -scheme MyApp -configuration Release -destination "generic/platform=iOS" build | xcbeautify'
```

> Tip: en Swift, si quieres loops más rápidos, usa una destination de simulador fija y caché de DerivedData por workspace.
