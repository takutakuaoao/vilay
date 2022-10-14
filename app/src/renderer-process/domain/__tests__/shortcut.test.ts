import { Shortcut } from '../shortcut/shortcut'

test('ofNewFileShortcut', () => {
  const shortcut = Shortcut.ofNewFileShortcut()

  expect(shortcut.toString()).toBe('ctrl + N')
})

test('ofOpenFileShortcut', () => {
  const shortcut = Shortcut.ofOpenFileShortcut()

  expect(shortcut.toString()).toBe('cmd + O')
})

test('ofSaveFileShortcut', () => {
  const shortcut = Shortcut.ofSaveFileShortcut()

  expect(shortcut.toString()).toBe('ctrl + S')
})

test('accelerator', () => {
  const shortcut = Shortcut.ofNewFileShortcut()

  expect(shortcut.accelerator()).toBe('Ctrl+N')
})
