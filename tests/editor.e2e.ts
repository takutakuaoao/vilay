import { test } from '@playwright/test'
import { Application } from './pages/application'

test('Editor is focused when first view', async () => {
  const app = await Application.factory()
  await app.isFocus()
})

test('input text', async () => {
  const app = await Application.factory()
  await app.type('input')
})

test('type Entry', async () => {
  const app = await Application.factory()
  await app.pressEnter('first input', 'second input')
})

test('delete text', async () => {
  const app = await Application.factory()
  await app.pressBackSpace('input')
})
