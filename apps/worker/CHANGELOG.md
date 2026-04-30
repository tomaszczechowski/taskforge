# Changelog — @taskforge-ai/worker

All notable changes to this package are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.4] - 2026-04-30

### Changed

- PR created log now includes the URL inline and a 🚀 prefix for easier scanning: `[key] 🚀 PR created: <url>`
- Ticket transition log clarified from `Moved to REVIEW` to `↗️ Moved ticket to "IN REVIEW"`

---

## [0.1.3] - 2026-04-30

### Changed

- `CHANGELOG.md` added to `"files"` in `package.json` so the changelog is included in the published npm tarball

---

## [0.1.2] - 2026-04-29

### Fixed

- Added `"files": ["dist", "README.md"]` to `package.json` so `README.md` is reliably included in the published npm tarball

---

## [0.1.1] - 2026-04-29

### Added

- `README.md` with FSM flow description and link to the main repository README

---

## [0.1.0] - 2026-04-27

### Added

- Polling loop that watches Jira for tickets assigned to the configured agent user
- FSM-style ticket processing: spec clarification → approval gate → implementation → PR → review
- `Promise.allSettled`-based parallel processing of multiple tickets per poll cycle

---

[0.1.4]: https://github.com/tomaszczechowski/taskforge/compare/@taskforge-ai/worker@0.1.3...@taskforge-ai/worker@0.1.4
[0.1.3]: https://github.com/tomaszczechowski/taskforge/compare/@taskforge-ai/worker@0.1.2...@taskforge-ai/worker@0.1.3
[0.1.2]: https://github.com/tomaszczechowski/taskforge/compare/@taskforge-ai/worker@0.1.1...@taskforge-ai/worker@0.1.2
[0.1.1]: https://github.com/tomaszczechowski/taskforge/compare/@taskforge-ai/worker@0.1.0...@taskforge-ai/worker@0.1.1
[0.1.0]: https://github.com/tomaszczechowski/taskforge/releases/tag/@taskforge-ai/worker@0.1.0
