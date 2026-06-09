import type { ThemeId } from '../themes/types'
import { themes, themeList, DEFAULT_THEME_ID } from '../themes'
import { toCssVariables } from '../css/variables'

/**
 * Serializable map of theme id -> CSS custom property record. Dependency-free
 * and JSON-safe, so it can be `JSON.stringify`'d and inlined into an HTML
 * <script> before app hydration to prevent theme flash (FOUC).
 */
export const themeCssVariableMap: Record<ThemeId, Record<string, string>> =
  Object.fromEntries(
    themeList.map((theme) => [theme.id, toCssVariables(theme.colors)]),
  ) as Record<ThemeId, Record<string, string>>

/**
 * Resolve a possibly-unknown stored id to a valid ThemeId, falling back to
 * DEFAULT_THEME_ID. Safe to run before any app code loads.
 */
export function resolveThemeId(storedId: string | null | undefined): ThemeId {
  if (storedId && storedId in themes) return storedId as ThemeId
  return DEFAULT_THEME_ID
}

/**
 * Produce a minimal, self-contained inline bootstrap script. Reads the saved
 * theme id from localStorage (under `storageKey`), falls back to the default,
 * and writes CSS variables + `data-theme-type` onto <html> synchronously.
 *
 * Inline the returned string inside a <script> in <head> before your bundle.
 */
export function createBootstrapScript(storageKey: string): string {
  const payload = JSON.stringify({
    map: themeCssVariableMap,
    types: Object.fromEntries(themeList.map((t) => [t.id, t.type])),
    fallback: DEFAULT_THEME_ID,
    key: storageKey,
  })
  return `(function(){var d=${payload};var id;try{id=localStorage.getItem(d.key)}catch(e){}if(!id||!d.map[id])id=d.fallback;var v=d.map[id],s=document.documentElement.style;for(var k in v)s.setProperty(k,v[k]);document.documentElement.setAttribute('data-theme-type',d.types[id])})();`
}
