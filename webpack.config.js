const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const production = process.env.ENVIRONMENT === 'production'

const productionPlugins = production ? [new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
})] : []

module.exports = {
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js'
  },
  plugins: productionPlugins.concat([
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.ejs'
    }),
    new CopyWebpackPlugin([{ from: 'audio' }])
  ]),
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, './index.js'),
          path.resolve(__dirname, 'app/'),
          path.resolve(__dirname, 'node_modules/push-wrapper/')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};
