import { test, expect, describe } from 'bun:test'
import { toTerminalTheme } from '../src/terminal/terminalTheme'
import { themes, themeList } from '../src/themes'

describe('toTerminalTheme', () => {
  test('derives background/foreground from surface/text', () => {
    const c = themes['synthwave-84'].colors
    const t = toTerminalTheme(c)
    expect(t.background).toBe(c.surface)
    expect(t.foreground).toBe(c.text)
    expect(t.cursor).toBe(c.accentYellow)
    expect(t.brightWhite).toBe(c.textOnAccent)
  })

  test('emits all 22 xterm slots as non-empty strings for every theme', () => {
    for (const theme of themeList) {
      const t = toTerminalTheme(theme.colors)
      const values = Object.values(t)
      expect(values).toHaveLength(22)
      for (const v of values) {
        expect(typeof v).toBe('string')
        expect(v.length).toBeGreaterThan(0)
      }
    }
  })
})
