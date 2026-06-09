import type { Theme, ThemeId } from './types.js'
import { synthwave84 } from './synthwave-84.js'
import { darkModern } from './dark-modern.js'
import { darkPlus } from './dark-plus.js'
import { monokaiDimmed } from './monokai-dimmed.js'
import { red } from './red.js'
import { solarizedDark } from './solarized-dark.js'
import { solarizedLight } from './solarized-light.js'
import { hcDark } from './hc-dark.js'
import { hcLight } from './hc-light.js'
import { noctis } from './noctis.js'
import { gruvbox } from './gruvbox.js'
import { bear } from './bear.js'
import { lunarPink } from './lunar-pink.js'
import { themePlus } from './theme-plus.js'
import { claudeCode } from './claude-code.js'
import { codex } from './codex.js'
import { hermes } from './hermes.js'

export type { Theme, ThemeColors, ThemeId } from './types.js'

export const DEFAULT_THEME_ID: ThemeId = 'solarized-light'

export const themes: Record<ThemeId, Theme> = {
  'synthwave-84': synthwave84,
  'dark-modern': darkModern,
  'dark-plus': darkPlus,
  'monokai-dimmed': monokaiDimmed,
  red: red,
  'solarized-dark': solarizedDark,
  'solarized-light': solarizedLight,
  'hc-dark': hcDark,
  'hc-light': hcLight,
  noctis: noctis,
  gruvbox: gruvbox,
  bear: bear,
  'lunar-pink': lunarPink,
  'theme-plus': themePlus,
  'claude-code': claudeCode,
  codex: codex,
  hermes: hermes,
}

// Ordered list for dropdown display (per D-11 / UI-SPEC ordering)
export const themeList: Theme[] = [
  synthwave84,
  darkModern,
  darkPlus,
  monokaiDimmed,
  red,
  solarizedDark,
  hcDark,
  solarizedLight,
  hcLight,
  noctis,
  gruvbox,
  bear,
  lunarPink,
  themePlus,
  claudeCode,
  codex,
  hermes,
]
