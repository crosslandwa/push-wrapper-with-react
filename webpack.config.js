const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.ejs'
  })],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  }
};
