// const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ReloadServerPlugin = require('reload-server-webpack-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const path = require('path')
const precss = require('precss')
const rimraf = require('rimraf')
const webpack = require('webpack')

// const isProduction = process.argv.indexOf('-p') !== -1

const config = {
  mode: 'production',
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                useBuiltIns: 'usage'
              }]],
              plugins: ['@babel/transform-object-assign']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins () {
                return [
                  precss,
                  autoprefixer,
                  cssnano
                ]
              }
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify('true')
      }
    }),
    function () {
      rimraf.sync('./dist')
    },
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4000,
    host: '0.0.0.0',
    disableHostCheck: true
  },
  performance: { hints: false }
}

// Development mode
// if (!isProduction) {
//   config.plugins.push(new ReloadServerPlugin({
//     script: './server.js'
//   }))
//   config.plugins.push(new BrowserSyncPlugin({
//     host: 'localhost',
//     port: 4000,
//     proxy: 'http://localhost:3000/'
//   }))
// }

module.exports = config
