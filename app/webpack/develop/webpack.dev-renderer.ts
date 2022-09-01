import webpack from 'webpack'
import path from 'path'
import merge from 'webpack-merge'
import { commonConfig } from './webpack.dev-common'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const rendererConfig: webpack.Configuration = merge({}, commonConfig, {
  entry: {
    renderer: path.resolve(__dirname, '..', '..', 'src/workspace/index'),
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: ['file?name=[path][name].[ext]'],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
          'postcss-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', '..', 'static', 'index.html'),
      chunks: ['renderer'],
    }),
    new webpack.DefinePlugin(
      Object.assign(
        {},
        {
          __PROCESS_KIND__: JSON.stringify('renderer'),
        }
      )
    ),
  ],
})

// eslint-disable-next-line no-restricted-syntax
export default [rendererConfig]
