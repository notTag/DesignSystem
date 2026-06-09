# @nicktag/themes

One source of truth for Nick's color themes across every project — SPAs, web
apps, Electron apps, and terminal/CLI experiences. Strongly-typed semantic color
tokens, a framework-agnostic core, and optional Vue/Pinia/terminal adapters.

Ported verbatim from `nicktagportal` (`packages/types/src/themes`). 17 themes,
16 semantic color keys each, `solarized-light` as the default.

## Install

```bash
bun add @nicktag/themes
# or consume by Git URL during early integration:
bun add github:nicktag/DesignSystem
```

`vue` and `pinia` are optional peer dependencies (only needed for those adapters).

## Core usage (framework-agnostic)

```ts
import {
  themes,
  themeList,
  DEFAULT_THEME_ID,
  applyThemeToElement,
  toCssVariables,
  type Theme,
  type ThemeColors,
  type ThemeId,
} from '@nicktag/themes'

// Apply to <html> (writes --color-* vars + data-theme-type)
applyThemeToElement(themes['solarized-dark'])

// Or get a plain record for your own rendering
const vars = toCssVariables(themes['gruvbox'].colors)
// { '--color-surface': '#...', ... }
```

## First-paint bootstrap (no flash)

Inline this in `<head>` before your bundle to apply the saved theme
synchronously:

```ts
import { createBootstrapScript } from '@nicktag/themes/bootstrap'

const inline = createBootstrapScript('nicksite-theme')
// <script>${inline}</script>
```

`themeCssVariableMap` and `resolveThemeId` are also exported for custom bootstrap
logic.

## Terminal / xterm

```ts
import { toTerminalTheme } from '@nicktag/themes/terminal'

terminal.options.theme = toTerminalTheme(themes['hermes'].colors)
```

The returned shape is structurally compatible with `@xterm/xterm`'s `ITheme`
(the core package carries no xterm dependency).

## Vue + Pinia adapters

```ts
// Pinia store factory — preserves preview/confirm + localStorage persistence
import { createThemeStore } from '@nicktag/themes/pinia'
export const useThemeStore = createThemeStore({ storageKey: 'nicksite-theme' })

// Vue effect — applies the reactive theme to the DOM on change
import { useThemeEffect } from '@nicktag/themes/vue'
import { storeToRefs } from 'pinia'

const { currentTheme } = storeToRefs(useThemeStore())
useThemeEffect(currentTheme)
```

## Persistence conventions

Storage keys are documented, not forced. Override via the adapter options.

| Consumer            | Storage key          |
| ------------------- | -------------------- |
| Shell / site theme  | `nicksite-theme`     |
| CLI terminal theme  | `nicksite-cli-theme` |

## CSS variables

| Theme color key  | CSS variable             |
| ---------------- | ------------------------ |
| `surface`        | `--color-surface`        |
| `surfaceRaised`  | `--color-surface-raised` |
| `surfaceOverlay` | `--color-surface-overlay`|
| `text`           | `--color-text`           |
| `textMuted`      | `--color-text-muted`     |
| `textOnAccent`   | `--color-text-on-accent` |
| `accent`         | `--color-accent`         |
| `accentCyan`     | `--color-accent-cyan`    |
| `accentYellow`   | `--color-accent-yellow`  |
| `destructive`    | `--color-destructive`    |
| `link`           | `--color-link`           |
| `linkHover`      | `--color-link-hover`     |
| `border`         | `--color-border`         |
| `headerBg`       | `--color-header-bg`      |
| `selection`      | `--color-selection`      |
| `hover`          | `--color-hover`          |

## Scripts

```bash
bun install
bun test          # registry, css vars, terminal, bootstrap
bun run typecheck # tsc --noEmit (strict)
bun run build     # emit ESM + .d.ts to dist/
```

## Migrating nicktagportal

1. Add `@nicktag/themes` as a dependency.
2. Replace imports from `@/themes` / `@ntypes/themes` with `@nicktag/themes`.
3. Swap the local `useTheme` CSS-var application for `applyThemeToElement` /
   `useThemeEffect`, and the local stores for `createThemeStore`.
4. Replace the CLI's `toXtermTheme` with `toTerminalTheme` from
   `@nicktag/themes/terminal`.
5. Move first-paint bootstrap to `createBootstrapScript`.
6. Keep temporary re-exports in `packages/types/src/themes` if needed, then
   delete the duplicated theme files once consumers are migrated.

## Adding a theme

1. Add `src/themes/<id>.ts` exporting a `Theme` with all 16 color keys.
2. Register it in `src/themes/index.ts` (`themes`, `themeList`) and add the id
   to the `ThemeId` union in `src/themes/types.ts`.
3. `bun test` — the registry test fails if a color key is missing or ordering
   drifts.
