const merge = require("webpack-merge");
const path = require("path");
const commonConfig = require("./webpack.common.config.js");
// var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const devConfig = {
  // mode: 'none', 
  /*入口*/
  entry: {
    app: ['babel-polyfill',"react-hot-loader/patch", path.join(__dirname, "src/index.js")],
    // vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux"]
  },

  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    // path: path.join(__dirname, "./dist"),
    filename: "[name].[hash].js"
    // chunkFilename: "[name].[chunkhash].js",
    // publicPath : '/'
    // filename: "bundle.js",
    // chunkFilename:'[name].js'
  },
  plugins: [
    // new webpack.hotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor"
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: path.join(__dirname, "src/index.html")
    // }),
  ],
  //   optimization: {
  //     runtimeChunk: 'single',
  //     splitChunks: {
  //         cacheGroups: {
  //           vendor: {
  //                 test: /[\\/]node_modules[\\/]/,
  //                 name: "vendor",
  //                 chunks: "initial",
  //                 minChunks: 2
  //             }
  //         }
  //     }
  // },
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速 babel-loader?cacheDirectory=true*/
  module: {
    // rules: [
    //   {
    //     test: /\.(sa|sc|c)ss$/,
    //     use: [
    //       'style-loader',
    //       'css-loader',
    //       'postcss-loader',
    //       'sass-loader',
    //     ],
    //   },
    // ]
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: [
    //       {
    //         loader: "babel-loader",
    //         options: {
    //           plugins: []
    //         }
    //       }
    //     ],
    //     include: path.join(__dirname, "src")
    //   },
    //   {
    //     test: /\.css$/,
    //     use: ExtractTextPlugin.extract({
    //       fallback: "style-loader",
    //       use: "css-loader"
    //     })
    //   },
    //   {
    //     test: /\.(png|jpg|gif)$/,
    //     use: [
    //       {
    //         loader: "url-loader",
    //         options: {
    //           limit: 8192
    //         }
    //       }
    //     ]
    //   }
    // ]
  },
  devServer: {
    port: 9200,
    contentBase: path.join(__dirname, "./dist"),
    historyApiFallback: true,
    host: "127.0.0.1",
    clientLogLevel: "error",
    overlay: true,
    compress: true
    // quiet: true
  },
  // resolve: {
  //   alias: {
  //     pages: path.join(__dirname, "src/pages"),
  //     component: path.join(__dirname, "src/component"),
  //     router: path.join(__dirname, "src/router"),
  //     actions: path.join(__dirname, "src/redux/actions"),
  //     reducers: path.join(__dirname, "src/redux/reducers")
  //     // redux: path.join(__dirname, 'src/redux')
  //   }
  // },
  devtool: "inline-source-map"
};
module.exports = merge({
  customizeArray(a, b, key) {
    /*entry.app不合并，全替换*/
    if (key === "entry.app") {
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);
