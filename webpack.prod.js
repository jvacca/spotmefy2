const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    main: `./src/js/app.js`
  },
  mode: "development",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `public/assets`),
    publicPath: `public/assets`,
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: `/public/assets`,
          },
        }, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader'
      },
      { 
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          partialDirs: path.resolve(__dirname, `src/templates/partials`),
          helperDirs: path.resolve(__dirname, `src/js`),
          precompileOptions: {
            knownHelpersOnly: false,
          }
        }
      },
      {
        test: /\.svg$/,
        loader: ['svg-inline-loader', 'svg-url-loader']
    }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    port: 1111,
    publicPath: "/assets/"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new MinifyPlugin(),
    new OptimizeCSSAssetsPlugin()
  ]
}