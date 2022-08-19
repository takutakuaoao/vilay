import * as common from './webpack.common'
import * as webpack from 'webpack'
import merge from 'webpack-merge'

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
}

const mainConfig = merge({}, common.main, config)

const getRendererEntryPoint = () => {
  const entry = common.renderer.entry as webpack.EntryObject

  if (entry == null) {
    throw new Error(
      'Unable to resolve entry point. Check webpack.common.ts and try again'
    )
  }

  return entry.renderer as string
}

const port = 3000
const webpackHotModuleReloadUrl = `webpack-hot-middleware/client?path=http://localhost:${port}/__webpack_hmr`
const publicPath = `http://localhost:${port}/build/`

const rendererConfig = merge({}, common.renderer, config, {
  entry: {
    renderer: [webpackHotModuleReloadUrl, getRendererEntryPoint()],
  },
  output: {
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  infrastructureLogging: {
    colors: true,
    level: 'error',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})

// eslint-disable-next-line no-restricted-syntax
export default [mainConfig, rendererConfig]
