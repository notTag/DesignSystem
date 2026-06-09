// Core theme catalog
export type { Theme, ThemeColors, ThemeId } from './themes/types'
export { themes, themeList, DEFAULT_THEME_ID } from './themes'

// CSS variable adapter (framework-agnostic)
export { CSS_VAR_MAP, toCssVariables } from './css/variables'
export { applyThemeToElement } from './css/applyTheme'

// First-paint bootstrap support
export {
  themeCssVariableMap,
  resolveThemeId,
  createBootstrapScript,
} from './bootstrap'

// Terminal / xterm adapter
export { toTerminalTheme, type TerminalTheme } from './terminal/terminalTheme'
