import { test } from '@playwright/test'
import { Application } from './pages/application'

test.describe('asciidoc記法に沿ったテキストを入力すると対応するCSSクラスが割り当てられる', () => {
  test('= headerの入力', async () => {
    const app = await Application.factory()
    await app.doType('= header')
    await app.hasClass('.cm-header1')
    await app.hasClass('.cm-token-mark')
  })

  test('**bold** の入力', async () => {
    const app = await Application.factory()
    await app.doType('**bold**')
    await app.hasClass('.cm-bold')
    await app.hasClass('.cm-token-mark')
  })

  test('__italic__ の入力', async () => {
    const app = await Application.factory()
    await app.doType('__italic__')
    await app.hasClass('.cm-italic')
    await app.hasClass('.cm-token-mark')
  })

  test('``monospace`` の入力', async () => {
    const app = await Application.factory()
    await app.doType('``monospace``')
    await app.hasClass('.cm-monospace')
    await app.hasClass('.cm-token-mark')
  })
})
