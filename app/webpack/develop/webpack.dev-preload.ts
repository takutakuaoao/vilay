import webpack from 'webpack'
import path from 'path'

const preloadConfig: webpack.Configuration = {
  entry: {
    preload: path.resolve(__dirname, '..', '..', 'src/main-process/preload'),
  },
  mode: 'development',
  devtool: 'source-map',
  target: 'electron-preload',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', '..', '..', 'out'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, '..', '..', 'src'),
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
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
}

// eslint-disable-next-line no-restricted-syntax
export default [preloadConfig]
