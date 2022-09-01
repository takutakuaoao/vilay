import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import { commonConfig } from './webpack.dev-common'

const preloadConfig: webpack.Configuration = merge({}, commonConfig, {
  entry: {
    preload: path.resolve(__dirname, '..', '..', 'src/main-process/preload'),
  },
  target: 'electron-preload',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign(
        {},
        {
          __PROCESS_TYPE__: JSON.stringify('preload'),
        }
      )
    ),
  ],
})

// eslint-disable-next-line no-restricted-syntax
export default [preloadConfig]
