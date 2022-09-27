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

  test('^superscript^ の入力', async () => {
    const app = await Application.factory()
    await app.doType('^superscript^')
    await app.hasClass('.cm-superscript')
    await app.hasClass('.cm-token-mark')
  })

  test('~subscript~ の入力', async () => {
    const app = await Application.factory()
    await app.doType('~subscript~')
    await app.hasClass('.cm-subscript')
    await app.hasClass('.cm-token-mark')
  })
})

test.describe('既存のファイルを開くテスト', () => {
  test('メニューバーのFileにOpen Fileの文字列があるかのテスト', async () => {
    const app = await Application.factory()
    await app.hasMenuLabel(['File', 'Open File'])
  })

  test('Open Fileをクリックしたらエディター内に「= Click Open File!」が表示される', async () => {
    const app = await Application.factory()
    await app.doType('')
    await app.clickMenuItemById('open-file')
    await app.hasText('= Click Open File!')
  })
})
