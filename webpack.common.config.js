const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonConfig = {
  /*入口*/
  entry: {
    app: ["babel-polyfill", path.join(__dirname, "src/index.js")],
    // vendor: ["react", "react-router-dom", "redux", "react-dom", "react-redux",'redux-thunk','axios',"@babel/runtime","@loadable/component"]
  },
  /*输出到dist文件夹，输出文件名字为bundle.js*/
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "js/[name].[hash].js",
    chunkFilename: "js/[name].[chunkhash].js",
    publicPath: "/"
    // filename: "bundle.js",
    // chunkFilename:'[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader?cacheDirectory=true",
            options: {
              plugins: []
            }
          }
        ],
        include: path.join(__dirname, "src")
      },
      
      //   {
      //     test: /\.css$/,
      //     use: [{
      //         loader: MiniCssExtractPlugin.loader,
      //         options: {
      //             publicPath: '../'                   //同extract-text-webpack-plugin一样,与url-loader里的outputPath对应
      //         }
      //     }, {
      //         loader: 'css-loader'
      //     }]
      //   },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     hmr: process.env.NODE_ENV === 'development',
          //   },
          // },
          {
            loader: devMode ? 'style-loader' :MiniCssExtractPlugin.loader,
            // options: {
            //   // 这里可以指定一个 publicPath
            //   // 默认使用 webpackOptions.output中的publicPath
            //   // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
            //   // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
            //   // publicPath: './',  
            //   // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
            //   hmr: devMode, // 仅dev环境启用HMR功能
            // },
          },
          // 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name:'images/[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },

  // optimization: {
  //   runtimeChunk: "single",
  //   splitChunks: {
  //     chunks: 'all',   // initial、async和all
  //     minSize: 30000,   // 形成一个新代码块最小的体积
  //     maxAsyncRequests: 5,   // 按需加载时候最大的并行请求数
  //     maxInitialRequests: 3,   // 最大初始化请求数
  //     automaticNameDelimiter: '~',   // 打包分割符
  //     name: true,
  //     cacheGroups: {
  //       vendors: { // 打包两个页面的公共代码
  //         minChunks: 1, // 引入两次及以上被打包
  //         name: 'vendors', // 分离包的名字
  //         chunks: 'all'
  //       },
  //     }
  //   },

  // },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "initial",
          minChunks: 1
        }
      }
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css"
    }),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "src/index.html"),
      inject: 'body'
    }),
     // 复制src/static
     new CopyWebpackPlugin([
      {
          from: "src/static",
          to: "static"
      },
      // new AddAssetHtmlPlugin({
      //   filepath: require.resolve(path.resolve(__dirname, './src/static/dll/vendor_library.js')), // 这个路径是你的dll文件路径 
      //   includeSourcemap: false ,// 这里是因为我开启了sourcemap。 不这么写会报错。
      //   // 文件输出目录
      //   outputPath: 'vendor_library',
      //   // 脚本或链接标记的公共路径
      //   publicPath: 'vendor_library'
      // })
  ])
  ],
  resolve: {
    alias: {
      pages: path.join(__dirname, "src/pages"),
      component: path.join(__dirname, "src/component"),
      router: path.join(__dirname, "src/router"),
      actions: path.join(__dirname, "src/redux/actions"),
      reducers: path.join(__dirname, "src/redux/reducers"),
      // 'react-dom': '@hot-loader/react-dom',
      // redux: path.join(__dirname, 'src/redux')
    }
  }
};
module.exports = commonConfig;
