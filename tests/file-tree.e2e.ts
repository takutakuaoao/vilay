import test from '@playwright/test'
import { Application } from './pages/application'

test.describe('First view', () => {
  test('Show Project text in file-tree view part', async () => {
    const app = await Application.factory()
    await app.fileTree.showProjectText()
  })
})
