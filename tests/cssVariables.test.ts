import { test, expect, describe } from 'bun:test'
import { toCssVariables, CSS_VAR_MAP } from '../src/css/variables'
import { themes, themeList } from '../src/themes'

describe('toCssVariables', () => {
  test('maps every semantic key to its canonical CSS variable', () => {
    const vars = toCssVariables(themes['synthwave-84'].colors)
    expect(vars['--color-surface']).toBe('#262335')
    expect(vars['--color-accent']).toBe('#ff7edb')
    expect(vars['--color-hover']).toBe('#37294d99')
  })

  test('produces exactly 16 variables for every theme', () => {
    for (const theme of themeList) {
      const vars = toCssVariables(theme.colors)
      expect(Object.keys(vars)).toHaveLength(16)
      expect(Object.keys(vars).sort()).toEqual(
        Object.values(CSS_VAR_MAP).sort(),
      )
    }
  })

  test('all variable names start with --color-', () => {
    for (const name of Object.values(CSS_VAR_MAP)) {
      expect(name.startsWith('--color-')).toBe(true)
    }
  })
})
