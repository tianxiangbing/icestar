var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var EXAMPLES_DIR = path.resolve(__dirname, "examples");

var extractCSS = new ExtractTextPlugin("index.css");
var modulesDirectories = ["web_modules", "node_modules", "bower_components","src"];
module.exports = {
  entry:{app:['./src/_index.less']},
  output: {
    filename: "index.css",
    // chunkFilename: "index.chunk.js",
    path: "lib"
  },
  resolve: {
      modulesDirectories: modulesDirectories,
      extensions: ['', '.js', '.jsx', '.css','.less']
  },
  module: {
    loaders: [
      {
        test: /\.(eot|woff|ttf|svg)/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|bower_components)/,
        loader: extractCSS.extract('style-loader', 'css?!less?&includePaths[]=' + path.resolve(__dirname, 'src'))
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract(
          "style-loader",
          "css?includePaths[]=" + path.resolve(__dirname, "src")
        )
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.png$/,
        loader: "file-loader?name=[name].[ext]"
      }
    ]
  },
  plugins: [extractCSS,new webpack.optimize.DedupePlugin()]
};
