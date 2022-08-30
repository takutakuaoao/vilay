/**
 * preload.js
 * process や Electron を windowオブジェクト に保存する処理
 */

process.once('loaded', () => {
  global.process = process
  global.module = module
})
