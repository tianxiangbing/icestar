var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextPlugin("[name].css");
var modulesDirectories = ["web_modules", "node_modules", "bower_components", "src"];
module.exports = {
  entry: {
    app: [path.resolve(__dirname, "dev/app.js")],
    vendor: ["react", "react-dom"]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].js",
    publicPath: "/js/"
  },
  resolve: {
    modulesDirectories: modulesDirectories,
    extensions: ['', '.js', '.jsx', '.css', ".less"]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel"
      },
      {
        test: /\.(eot|woff|ttf|svg)/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        loader: extractCSS.extract("style-loader", "css-loader?sourceMap!less-loader")
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract(
          "style-loader",
          "css?sourceMap"
        )
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.png$/,
        loader: "file-loader?name=[hash:8].[name].[ext]"
      }
    ]
  },
  plugins: [extractCSS, new webpack.optimize.CommonsChunkPlugin("vendor","base.js"), new webpack.optimize.DedupePlugin()]
};