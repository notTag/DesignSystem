import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ThemeId } from '../themes/types'
import { themes, DEFAULT_THEME_ID } from '../themes'
import { resolveThemeId } from '../bootstrap'

export interface ThemeStoreOptions {
  /** Pinia store id. Default: 'theme'. */
  storeId?: string
  /** localStorage key. Default: 'nicksite-theme'. */
  storageKey?: string
}

/**
 * Pinia adapter (optional entry point: `@nicktag/themes/pinia`).
 *
 * Factory that builds a theme store preserving the nicktagportal contract:
 * confirmed id + transient preview id, localStorage persistence, and a
 * `currentTheme` computed. `pinia` and `vue` are peer dependencies.
 */
export function createThemeStore(options: ThemeStoreOptions = {}) {
  const { storeId = 'theme', storageKey = 'nicksite-theme' } = options

  return defineStore(storeId, () => {
    const themeId = ref<ThemeId>(loadThemeId())
    const previewingId = ref<ThemeId | null>(null)

    const activeThemeId = computed(() => previewingId.value ?? themeId.value)
    const currentTheme = computed(() => themes[activeThemeId.value])
    const confirmedThemeId = computed(() => themeId.value)

    function loadThemeId(): ThemeId {
      try {
        return resolveThemeId(localStorage.getItem(storageKey))
      } catch {
        // localStorage may throw in private-browsing / quota edge cases
        return DEFAULT_THEME_ID
      }
    }

    function setTheme(id: ThemeId) {
      themeId.value = id
      previewingId.value = null
      try {
        localStorage.setItem(storageKey, id)
      } catch {
        // best-effort persistence
      }
    }

    function previewTheme(id: ThemeId) {
      previewingId.value = id
    }

    function revertPreview() {
      previewingId.value = null
    }

    return {
      themeId,
      previewingId,
      currentTheme,
      confirmedThemeId,
      activeThemeId,
      setTheme,
      previewTheme,
      revertPreview,
    }
  })
}
