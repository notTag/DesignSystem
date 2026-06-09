// Core theme catalog
export type { Theme, ThemeColors, ThemeId } from './themes/types.js'
export { themes, themeList, DEFAULT_THEME_ID } from './themes/index.js'

// CSS variable adapter (framework-agnostic)
export { CSS_VAR_MAP, toCssVariables } from './css/variables.js'
export { applyThemeToElement } from './css/applyTheme.js'

// First-paint bootstrap support
export {
  themeCssVariableMap,
  resolveThemeId,
  createBootstrapScript,
} from './bootstrap/index.js'

// Terminal / xterm adapter
export { toTerminalTheme, type TerminalTheme } from './terminal/terminalTheme.js'
