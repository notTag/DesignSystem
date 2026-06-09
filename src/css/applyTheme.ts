import type { Theme } from '../themes/types.js'
import { toCssVariables } from './variables.js'

/**
 * Apply a theme to a DOM element by writing CSS custom properties and a
 * `data-theme-type` attribute. Defaults to `document.documentElement`.
 *
 * This helper does NOT own persistence. Consumers decide how to store the
 * selected theme id (see persistence conventions in the README).
 */
export function applyThemeToElement(theme: Theme, element?: HTMLElement): void {
  const target =
    element ??
    (typeof document !== 'undefined' ? document.documentElement : undefined)
  if (!target) {
    throw new Error(
      'applyThemeToElement: no target element and no document available',
    )
  }

  const vars = toCssVariables(theme.colors)
  for (const [name, value] of Object.entries(vars)) {
    target.style.setProperty(name, value)
  }
  target.setAttribute('data-theme-type', theme.type)
}
