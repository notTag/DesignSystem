import { test, expect, describe } from 'bun:test'
import {
  themeCssVariableMap,
  resolveThemeId,
  createBootstrapScript,
} from '../src/bootstrap'
import { DEFAULT_THEME_ID, themeList } from '../src/themes'

describe('bootstrap support', () => {
  test('themeCssVariableMap covers every theme and is JSON-serializable', () => {
    expect(Object.keys(themeCssVariableMap)).toHaveLength(17)
    expect(() => JSON.stringify(themeCssVariableMap)).not.toThrow()
    for (const theme of themeList) {
      expect(themeCssVariableMap[theme.id]['--color-surface']).toBe(
        theme.colors.surface,
      )
    }
  })

  test('resolveThemeId returns the stored id when valid', () => {
    expect(resolveThemeId('gruvbox')).toBe('gruvbox')
  })

  test('resolveThemeId falls back to the default for unknown/null ids', () => {
    expect(resolveThemeId('does-not-exist')).toBe(DEFAULT_THEME_ID)
    expect(resolveThemeId(null)).toBe(DEFAULT_THEME_ID)
    expect(resolveThemeId(undefined)).toBe(DEFAULT_THEME_ID)
  })

  test('createBootstrapScript embeds the storage key and is self-contained', () => {
    const script = createBootstrapScript('nicksite-theme')
    expect(script).toContain('nicksite-theme')
    expect(script).toContain('data-theme-type')
    expect(script).toContain(DEFAULT_THEME_ID)
    expect(script.startsWith('(function(){')).toBe(true)
  })
})
