/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
  mode: "production",
  entry: "./src/init.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      /* style and css loader */
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },
    ]
  },
  plugins: [
    /* HTML Webpack Plugin */
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    /* Copy Webpack Plugin */
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname, "src/img"),
          to: path.resolve(__dirname, "dist/img")
        },
        { 
          from: path.resolve(__dirname, "src/views"),
          to: path.resolve(__dirname, "dist/views")
        },
        { 
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, "dist/manifest.json")
        },
      ],
    }),
    /* Clean Webpack Plugin */
    new CleanWebpackPlugin(),
    /* Inject Manifest */
    new InjectManifest({
      swSrc: './src/sw.js',
      swDest: './sw.js',
      exclude: [
        /manifest$/,
        /sw\.js$/,
      ],
    }),
  ],
};