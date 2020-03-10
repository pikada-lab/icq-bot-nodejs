const path = require('path');

module.exports = {
  entry: './src/bot.ts',
  output: {
    filename: './server/bundle.js'
  },
  resolve: {
    extensions: ['.ts'],
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};