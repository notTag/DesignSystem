import type { ThemeColors } from '../themes/types'

/**
 * xterm.js-compatible theme shape. Structurally matches `@xterm/xterm`'s
 * `ITheme`, but declared locally so the core package carries no xterm
 * dependency. Consumers can pass the result straight to an xterm Terminal.
 */
export interface TerminalTheme {
  background: string
  foreground: string
  cursor: string
  cursorAccent: string
  selectionBackground: string
  selectionForeground: string
  black: string
  red: string
  green: string
  yellow: string
  blue: string
  magenta: string
  cyan: string
  white: string
  brightBlack: string
  brightRed: string
  brightGreen: string
  brightYellow: string
  brightBlue: string
  brightMagenta: string
  brightCyan: string
  brightWhite: string
}

/**
 * Derive an xterm-compatible terminal palette from semantic theme colors.
 * Preserves the ANSI approximations used by the nicktagportal CLI so a site
 * theme change can drive a matching terminal theme.
 */
export function toTerminalTheme(colors: ThemeColors): TerminalTheme {
  return {
    background: colors.surface,
    foreground: colors.text,
    cursor: colors.accentYellow,
    cursorAccent: colors.surface,
    selectionBackground: colors.selection,
    selectionForeground: colors.text,
    black: colors.surface,
    red: colors.destructive,
    green: colors.accentCyan,
    yellow: colors.accentYellow,
    blue: colors.accent,
    magenta: colors.link,
    cyan: colors.accentCyan,
    white: colors.text,
    brightBlack: colors.textMuted,
    brightRed: colors.destructive,
    brightGreen: colors.accentCyan,
    brightYellow: colors.accentYellow,
    brightBlue: colors.accent,
    brightMagenta: colors.link,
    brightCyan: colors.accentCyan,
    brightWhite: colors.textOnAccent,
  }
}
