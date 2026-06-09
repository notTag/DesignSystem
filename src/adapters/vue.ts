import { watch, type Ref } from 'vue'
import type { Theme } from '../themes/types'
import { applyThemeToElement } from '../css/applyTheme'

/**
 * Vue adapter (optional entry point: `@nick_tag_tech/themes/vue`).
 *
 * Watches a reactive `Theme` source and applies it to the DOM (CSS variables
 * + `data-theme-type`) immediately and on every change. Persistence is left
 * to the caller — pair this with the Pinia store or your own state.
 *
 * `vue` is a peer dependency.
 */
export function useThemeEffect(
  theme: Ref<Theme>,
  element?: HTMLElement,
): void {
  applyThemeToElement(theme.value, element)
  watch(theme, (next) => applyThemeToElement(next, element))
}
