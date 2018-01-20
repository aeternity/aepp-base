// This is the webpack config used for unit tests.

const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const additionalRules = []
const {resolve} = require('path')

var webpackConfig = merge(baseConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  module: {
    rules:[
      ...utils.styleLoaders(),
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/abi-decoder'),
          resolve('node_modules/dom7'),
          resolve('node_modules/eth-sig-util'),
          resolve('node_modules/ethereumjs-util'),
          resolve('node_modules/pngjs'),
          resolve('node_modules/swiper'),
          resolve('node_modules/web3-provider-engine')
        ]
      },
    ]
  },
  devtool: '#inline-source-map',
  resolveLoader: {
    alias: {
      // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
      // see discussion at https://github.com/vuejs/vue-loader/issues/724
      'scss-loader': 'sass-loader'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/test.env')
    })
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
