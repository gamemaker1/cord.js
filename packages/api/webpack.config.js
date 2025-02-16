/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  // build two different bundles from the transpiled js
  entry: {
    'cord-api': './lib/index.js',
    'cord-api.min': './lib/index.js',
  },
  output: {
    filename: '[name].umd.js',
    path: path.resolve(__dirname, 'dist/'),
    libraryTarget: 'umd',
    library: 'cord',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.d.ts', '.mjs', '.json'],
    symlinks: false,
    // Explicit fallbacks to include these in bundle
    alias: {
      buffer: 'buffer',
      process: 'process',
    },
    fallback: {
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  },
  stats: {
    errorDetails: true,
  },
  optimization: {
    minimize: true,
    // only minimize the *.min* bundle output
    minimizer: [new TerserPlugin({ extractComments: false, terserOptions: {
        format: {
          comments: false,
        },
      },include: /\.min\.umd\.js$/ })],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
}
