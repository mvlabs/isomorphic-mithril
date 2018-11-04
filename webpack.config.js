const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const path = require('path')
const precss = require('precss')
const webpack = require('webpack')

const config = {
  entry: {
    app: path.resolve(__dirname, 'src/app.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
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
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        include: path.resolve(__dirname, 'src/img'),
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify('true')
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    })
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    index: '',
    compress: false,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 4000,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      target: 'http://127.0.0.1:3000',
      secure: false
    }
  },
  performance: { hints: false }
}

module.exports = config
