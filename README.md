<p align="center">
  <img src="assets/logo.png" alt="NameOps" width="360" />
</p>

Name clearance orchestrator for the [clearance-opinion-engine](https://github.com/mcp-tool-shop-org/clearance-opinion-engine).

Turns a canonical name list into batch clearance runs, published artifacts, and human-readable PR summaries.

## How it works

1. `data/names.txt` holds the canonical list of names to check
2. `data/profile.json` holds default COE CLI flags (channels, risk, concurrency, etc.)
3. `src/run.mjs` orchestrates: COE batch, publish, validate
4. `src/build-pr-body.mjs` generates a Markdown PR body with tier summaries, collision cards, and cost stats
5. The marketing repo's scheduled workflow calls this logic and opens PRs with ingested artifacts

## Usage

```bash
# Install the clearance engine
npm install -g @mcptoolshop/clearance-opinion-engine

# Run the pipeline
node src/run.mjs --out artifacts --profile data/profile.json --names data/names.txt

# Build a PR body from the output
node src/build-pr-body.mjs artifacts
```

## Configuration

### `data/names.txt`

One name per line. Lines starting with `#` are comments. Max 500 names.

### `data/profile.json`

| Field | COE Flag | Default |
|-------|----------|---------|
| `channels` | `--channels` | `all` |
| `org` | `--org` | `mcp-tool-shop-org` |
| `dockerNamespace` | `--dockerNamespace` | `mcptoolshop` |
| `hfOwner` | `--hfOwner` | `mcptoolshop` |
| `risk` | `--risk` | `conservative` |
| `radar` | `--radar` | `true` |
| `concurrency` | `--concurrency` | `3` |
| `maxAgeHours` | `--max-age-hours` | `168` (7 days) |
| `variantBudget` | `--variantBudget` | `12` |
| `fuzzyQueryMode` | `--fuzzyQueryMode` | `registries` |
| `cacheDir` | `--cache-dir` | `.coe-cache` |
| `maxRuntimeMinutes` | workflow timeout | `15` |

## Output

```
artifacts/
  metadata.json           # Run metadata (date, duration, counts)
  pr-body.md              # Markdown PR body
  batch/                  # Raw COE batch output
  published/              # Published artifacts (for marketing site)
    runs.json             # Index of all runs
    <slug>/
      report.html
      summary.json
      clearance-index.json
      run.json
```

## Architecture

NameOps is an orchestrator, not a service. It owns no data model and has no runtime dependencies beyond the COE CLI. The marketing repo owns the schedule (per CLAUDE.md rules); nameops owns the logic.

## Tests

```bash
npm test
```

## License

MIT
