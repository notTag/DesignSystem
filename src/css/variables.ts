import type { ThemeColors } from '../themes/types.js'

/**
 * Canonical mapping of semantic color keys to CSS custom property names.
 * This must stay in sync with the table in the PRD and with every consumer.
 */
export const CSS_VAR_MAP: Record<keyof ThemeColors, string> = {
  surface: '--color-surface',
  surfaceRaised: '--color-surface-raised',
  surfaceOverlay: '--color-surface-overlay',
  text: '--color-text',
  textMuted: '--color-text-muted',
  textOnAccent: '--color-text-on-accent',
  accent: '--color-accent',
  accentCyan: '--color-accent-cyan',
  accentYellow: '--color-accent-yellow',
  destructive: '--color-destructive',
  link: '--color-link',
  linkHover: '--color-link-hover',
  border: '--color-border',
  headerBg: '--color-header-bg',
  selection: '--color-selection',
  hover: '--color-hover',
}

/**
 * Framework-agnostic conversion from a ThemeColors object into a flat
 * record of CSS custom property name -> value. No DOM access.
 */
export function toCssVariables(colors: ThemeColors): Record<string, string> {
  const out: Record<string, string> = {}
  for (const key of Object.keys(CSS_VAR_MAP) as Array<keyof ThemeColors>) {
    out[CSS_VAR_MAP[key]] = colors[key]
  }
  return out
}
