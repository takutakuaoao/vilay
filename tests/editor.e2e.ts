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
})
