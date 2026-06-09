import { test, expect, describe } from 'bun:test'
import { themes, themeList, DEFAULT_THEME_ID } from '../src/themes'
import type { ThemeColors, ThemeId } from '../src/themes/types'

const REQUIRED_COLOR_KEYS: Array<keyof ThemeColors> = [
  'surface',
  'surfaceRaised',
  'surfaceOverlay',
  'text',
  'textMuted',
  'textOnAccent',
  'accent',
  'accentCyan',
  'accentYellow',
  'destructive',
  'link',
  'linkHover',
  'border',
  'headerBg',
  'selection',
  'hover',
]

// Locks the exact id ordering from the PRD theme inventory.
const EXPECTED_ORDER: ThemeId[] = [
  'synthwave-84',
  'dark-modern',
  'dark-plus',
  'monokai-dimmed',
  'red',
  'solarized-dark',
  'hc-dark',
  'solarized-light',
  'hc-light',
  'noctis',
  'gruvbox',
  'bear',
  'lunar-pink',
  'theme-plus',
  'claude-code',
  'codex',
  'hermes',
]

describe('theme registry integrity', () => {
  test('contains all 17 themes', () => {
    expect(Object.keys(themes)).toHaveLength(17)
    expect(themeList).toHaveLength(17)
  })

  test('default theme is solarized-light and exists', () => {
    expect(DEFAULT_THEME_ID).toBe('solarized-light')
    expect(themes[DEFAULT_THEME_ID]).toBeDefined()
  })

  test('themeList preserves the canonical ordering', () => {
    expect(themeList.map((t) => t.id)).toEqual(EXPECTED_ORDER)
  })

  test('every registry key matches its theme id', () => {
    for (const [key, theme] of Object.entries(themes)) {
      expect(theme.id).toBe(key as ThemeId)
    }
  })

  test('theme ids are non-empty kebab-case', () => {
    for (const id of Object.keys(themes)) {
      expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/)
    }
  })

  test('every theme defines all 16 semantic color keys with non-empty values', () => {
    for (const theme of themeList) {
      for (const key of REQUIRED_COLOR_KEYS) {
        const value = theme.colors[key]
        expect(typeof value).toBe('string')
        expect(value.length).toBeGreaterThan(0)
      }
      // No extra/unknown color keys leak in.
      expect(Object.keys(theme.colors).sort()).toEqual(
        [...REQUIRED_COLOR_KEYS].sort(),
      )
    }
  })

  test('theme type is dark or light', () => {
    for (const theme of themeList) {
      expect(['dark', 'light']).toContain(theme.type)
    }
  })
})
