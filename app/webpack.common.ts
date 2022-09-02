import HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import { getReplacements } from './app-info'

const outputDir = 'out'

export const replacements = getReplacements()
export const externals: string[] = []

const commonConfig: webpack.Configuration = {
  optimization: {
    emitOnErrors: true,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', outputDir),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        loader: 'awesome-node-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
}

export const main = merge({}, commonConfig, {
  entry: { main: path.resolve(__dirname, 'src/main-process/main') },
  target: 'electron-main',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('main'),
      })
    ),
  ],
})

export const renderer = merge({}, commonConfig, {
  entry: { renderer: path.resolve(__dirname, 'src/workspace/index') },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|ico)$/,
        use: ['file?name=[path][name].[ext]'],
      },
      {
        test: /\.cmd$/,
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'static', 'index.html'),
      chunks: ['renderer'],
    }),
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('renderer'),
      })
    ),
  ],
})

export const preload = merge({}, commonConfig, {
  entry: {
    preload: path.resolve(__dirname, 'src/main-process/preload'),
  },
  target: 'electron-preload',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({}, replacements, {
        __PROCESS_KIND__: JSON.stringify('preload'),
      })
    ),
  ],
})
