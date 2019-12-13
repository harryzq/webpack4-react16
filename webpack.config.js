// const path = require("path");
// var HtmlWebpackPlugin = require("html-webpack-plugin");
// var webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const commonConfig = require("./webpack.common.config.js");
const merge = require("webpack-merge");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const publicConfig = {
  mode: "production",
  /*入口*/
  // entry: {
  //   app: ["react-hot-loader/patch", path.join(__dirname, "src/index.js")],
  //   vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux"]
  // },

  // /*输出到dist文件夹，输出文件名字为bundle.js*/
  // output: {
  //   path: path.join(__dirname, "./dist"),
  //   filename: "[name].[chunkhash].js",
  //   chunkFilename: "[name].[chunkhash].js",
  //   publicPath : '/'
  //   // filename: "bundle.js",
  //   // chunkFilename:'[name].js'
  // },
  plugins: [
    new webpack.DefinePlugin({
      MOCK: false
    }),
    new CleanWebpackPlugin(),
    new CompressionWebpackPlugin({
      //gzip 压缩
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new BundleAnalyzerPlugin({
      analyzerHost: "localhost",
      analyzerPort: 9000
      // defaultSizes:"gzip",
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor"
    // }),
    // new ExtractTextPlugin({
    //     filename: 'css/[name].[md5:contenthash:hex:20].css',
    //     allChunks: true
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: path.join(__dirname, "src/index.html")
    // }),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         'NODE_ENV': JSON.stringify('production')
    //      }
    //  }),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].[contenthash].css",
    //   chunkFilename: "css/[name].[contenthash].css"
    // }),
    // new UglifyJsPlugin({
    //   sourceMap: true,
    //   parallel: true
    // }),
  ],
  optimization: {
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJsPlugin({
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: true,
        extractComments: true, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            drop_console: true,
            drop_debugger: true
          },
          output: {
            beautify: false,
            comments: false
          }
        }
      }),
      // 用于优化css文件
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: { disable: true }, // 这里是个大坑，稍后会提到
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ]
  },
  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速 babel-loader?cacheDirectory=true*/
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {
      //         plugins: []
      //       }
      //     }
      //   ],
      //   include: path.join(__dirname, "src")
      // },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       options: {
      //         publicPath: "../" //同extract-text-webpack-plugin一样,与url-loader里的outputPath对应
      //       }
      //     },
      //     {loader:'style-loader'},
      //     {
      //       loader:'css-loader',
      //       options:{
      //         importLoaders:1,
      //         url: true,
      //         import: true
      //       }
      //     },
      //     {loader:'postcss-loader'}
      //   ]
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'postcss-loader',
      //   ]
      // },
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: [
      //     // {
      //     //   loader: MiniCssExtractPlugin.loader,
      //     //   options: {
      //     //     hmr: process.env.NODE_ENV === 'development',
      //     //   },
      //     // },
      //     MiniCssExtractPlugin.loader,
      //     // 'style-loader',
      //     'css-loader',
      //     'postcss-loader',
      //     'sass-loader',
      //   ],
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192
      //       }
      //     }
      //   ]
      // }
    ]
  },
  // devServer: {
  //   port: 8080,
  //   contentBase: path.join(__dirname, "./dist"),
  //   historyApiFallback: true,
  //   host: "0.0.0.0",
  //   clientLogLevel: "error"
  //   // quiet: true
  // },
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
  devtool: "cheap-module-source-map"
};
module.exports = merge(commonConfig, publicConfig);
