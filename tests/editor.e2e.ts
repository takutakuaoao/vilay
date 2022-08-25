import { test } from '@playwright/test'
import { Application } from './pages/application'

test('Editor is focused when first view', async () => {
  const app = await Application.factory()
  await app.isFocus()
})

test('input text', async () => {
  const app = await Application.factory()
  await app.doType('input')
  await app.hasText('input')
})

test('type Entry', async () => {
  const app = await Application.factory()
  await app.doType(['first input', 'second input'])
  await app.hasText(['first input', 'second input'])
})

test('delete text', async () => {
  const app = await Application.factory()
  await app.doType('input')
  await app.doPressBackSpace()
  await app.hasText('inpu')
})

test.describe('Number Lane', () => {
  test('show 1 number when first view', async () => {
    const app = await Application.factory()
    await app.expectShowRowNumberLane([1])
  })
})

test.describe('Scroll', () => {
  test('Can scroll to y direction when text is over width of pane.', async () => {
    const app = await Application.factory({ width: 100, height: 400 })
    await app.doType('over editor width string text..............')
    await app.canScroll('right')
  })
})

test.describe('Selection', () => {
  test.skip('Add current-row-id to row of current cursor', async () => {
    const app = await Application.factory()
    await app.doPressEnter()
    await app.hasMarkCursorRow(2)

    await app.doPressBackSpace()
    await app.hasNotMarkCursorRow(2)
  })
})
