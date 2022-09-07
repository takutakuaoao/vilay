import { test } from '@playwright/test'
import { Application } from './pages/application'

test.describe('ヘッダー形式のテキストを入力するとヘッダーレベルにあったCSSクラスが適用される', () => {
  test('= headerの入力', async () => {
    const app = await Application.factory()
    await app.doType('= header')
    await app.hasClass('.cm-header1')
    await app.hasClass('.cm-token-mark')
  })
})
