# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server (browser)
npm start               # ng serve → http://localhost:4200

# Mock API server (must run alongside dev server)
npm run server          # json-server on port 3000, routes prefixed /api/*

# Build
npm run build           # production build → www/

# Tests
npm test                # Karma/Jasmine in Chrome (headless)
ng test --include='**/issue.service.spec.ts'  # single spec file

# Lint
npm run lint

# Native (Capacitor)
npx cap sync            # sync www/ to ios/ and android/
npx cap open ios        # open Xcode
npx cap open android    # open Android Studio
```

## Architecture

**Bercy** is an Ionic/Angular 19 mobile SOC (Security Operations Center) dashboard app, deployable to iOS and Android via Capacitor.

### Data flow

All domain data is currently served from **static JSON files** at `src/app/data/*.json` — there is no live backend in use. Services read these files directly:

- `IssueService` / `ContractService` / `AssetService` / `EventService` — each loads its JSON once into an in-memory array; no HTTP calls.
- The OpenAPI-generated services at `src/app/api/` (ContractsService, IssuesService, UserService) and `ApiModule` exist but are **not currently wired up**. The `openapi-bercy.yaml` and `server/` mock (json-server) are infrastructure scaffolding for future API integration.

### Page structure

All pages live under a single `TabsPage` shell (`src/app/tabs/`). Routes follow the pattern `/tabs/<page>`. Each page is a lazy-loaded NgModule:

| Tab | Path | Purpose |
|-----|------|---------|
| Home | `/tabs/home` | SOC dashboard — KPI tiles + 3 Chart.js charts |
| Events | `/tabs/events` | SIEM events list with severity filter |
| Issues | `/tabs/issues` | Ticket list; detail at `/tabs/issue-detail/:id` |
| Assets | `/tabs/assets` | Asset inventory with risk scores |
| Contracts | `/tabs/contracts` | Contract list; detail at `/tabs/contract-detail/:id` |
| Settings | `/tabs/settings` | UI + security settings persisted in localStorage |

### Key shared services

- **`SettingsService`** — reactive `BehaviorSubject<AppSettings>` persisted to `localStorage` under key `bercy_settings`. Applies dark/light theme, font size, and compact mode directly to `document.body` classes on save. Default language is French (`fr`).
- **`I18nService`** — simple FR/EN dictionary keyed off `SettingsService.current.ui.language`. No external i18n library — all strings are typed via the `Translations` interface in `src/app/shared/services/i18n.service.ts`.
- **`AssetService` / `EventService`** — follow the same pattern as IssueService/ContractService.

### Models

Auto-generated from OpenAPI in `src/app/model/`. Do not hand-edit — regenerate from `openapi-bercy.yaml` if the spec changes. Exports are re-exported via `src/app/model/models.ts`.

### Charts

The `HomePage` renders three Chart.js charts (doughnut + 2 horizontal bars). Charts are destroyed and rebuilt on `ionViewWillEnter` to pick up theme changes. The `chartjs-plugin-datalabels` plugin is registered globally in `home.page.ts`.

### Theming

Dark mode is the default (`darkMode: true`). Theme is applied via `document.body` class toggling (`dark`/`light`/`compact`). Ionic CSS variables are in `src/theme/variables.scss`; global styles in `src/global.scss`.
