const path = require("path")
const webpack = require("webpack")
const nodeExternals = require("webpack-node-externals")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: "production",
  target: "node",
  externals: [nodeExternals()],
  entry: {
    "index": path.resolve(__dirname, "../../src/views/partials/dashboard/dashboardWidget.jsx")
  },
  output: {
    path: path.resolve(__dirname, "./../../dist-ssr"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.(scss|css)$/, loader: "ignore-loader" }
    ]
  },

  plugins: [
    new CleanWebpackPlugin()
  ]

}

module.exports = config