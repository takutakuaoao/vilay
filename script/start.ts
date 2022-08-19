import express from 'express'
import { webpack } from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import configs from '../app/webpack.development'
import { run } from './run'

const rendererConfig = configs[1]

const server = express()
const compiler = webpack(rendererConfig)
const port = getPort()

server.use(
  devMiddleware(compiler, {
    publicPath: rendererConfig.output?.publicPath,
  })
)

server.use(hotMiddleware(compiler))

server.listen(port, 'localhost', () => {
  console.log(`Server running at http://localhost:${port}`)
  startApp()
})

function startApp() {
  const runningApp = run({ stdio: 'inherit' })
  if (runningApp == null) {
    console.error(
      "Couldn't launch the app. You probably need to build it first. Run `yarn build:dev`"
    )
    process.exit(1)
  }

  runningApp.on('close', () => {
    process.exit(0)
  })
}

function getPort(): number {
  const port = process.env.PORT

  if (port != null) {
    const result = parseInt(port)
    if (isNaN(result)) {
      throw new Error(`Unable to parse ${port} into valid number`)
    }

    return result
  }

  return 3000
}
