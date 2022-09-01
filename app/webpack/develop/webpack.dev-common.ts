import webpack from 'webpack'
import path from 'path'

export const commonConfig: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', '..', '..', 'out'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
}
