import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import { commonConfig } from './webpack.dev-common'

const mainConfig: webpack.Configuration = merge({}, commonConfig, {
  entry: {
    main: path.resolve(__dirname, '..', '..', 'src/main-process/main'),
  },
  target: 'electron-main',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign(
        {},
        {
          __PROCESS_TYPE__: JSON.stringify('main'),
        }
      )
    ),
  ],
})

// eslint-disable-next-line no-restricted-syntax
export default [mainConfig]
