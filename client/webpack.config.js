const path = require('path')
const webpack = require('webpack')

module.exports = {
  // where code source starts
  entry: {
    app: './src/app.js'
  },
  watch: true,
  // where code is going
  output:{
    path: __dirname + '/public/build',
    filename: 'public/build/bundle.js',
    sourceMapFilename: 'public/build/bundle.map'
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env']
        }
      }
    ]
  }

}
