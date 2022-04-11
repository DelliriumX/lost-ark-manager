const environment = require('dotenv').config()
const path = require('path')
const fs = require('fs')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VirtualModulesPlugin = require('webpack-virtual-modules')
const { ApplicationManifest } = require('./src/core/core.generator.js')
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const DefinePlugin = require('webpack').DefinePlugin
const ProvidePlugin = require('webpack').ProvidePlugin
const Dotenv = require('dotenv-webpack')

if (environment.error) {
  throw environment.error
}

module.exports = env => {
  console.log('Environment variables: ', env)

  // const manifest = ApplicationManifest(env.app);

  // const manifest = { application: 'lostark-manager', path: './src/app' }
  const manifest = ApplicationManifest(env.app)
  const app_codename = manifest.application.toLowerCase().split(' ').join('-')

  function recursiveIssuer(m) {
    if (m.issuer) {
      return recursiveIssuer(m.issuer)
    }
    if (m.name) {
      return m.name
    }
    return false
  }

  const config = {
    mode: 'development',
    stats: 'errors-only',
    entry: {
      [app_codename]: path.resolve(__dirname, './src/app'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new NodePolyfillPlugin({
        excludeAliases: ['console'],
      }),
      new Dotenv(),
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false,
        cleanOnceBeforeBuildPatterns: ['**/*'],
      }),
      new HtmlWebpackPlugin({
        title: '',
        // favicon: './favicon.ico',
        cache: true,
        template: 'index.template.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].alpha.css',
      }),
      new VirtualModulesPlugin({
        'src/core/index.js': manifest.coreScript,
      }),
      // new ErrorOverlayPlugin(),
      new DefinePlugin({
        VERSION: JSON.stringify(require('./package.json').version),
        APP: JSON.stringify(manifest.application),
      }),
      new ProvidePlugin({
        React: 'react',
      }),
    ],
    devtool: 'inline-source-map',
    devServer: {
      static: path.resolve(__dirname, 'dist'),
      watchFiles: 'src/**/*.jsx',
      hot: false,
      https: true,
      host: 'localhost',
      port: process.env.PORT || 8001,
      open: `https://localhost:${process.env.PORT || 8001}`,
      historyApiFallback: true,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 3000000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '.',
        name: false,
        name: (module, chunks, cacheGroup) => {
          const allChunksNames = chunks.map(item => item.name).join('-')
          return `${cacheGroup}-${allChunksNames}`
        },
        cacheGroups: {
          core: {
            test: /[\\/]core[\\/]/,
            priority: 100,
            enforce: true,
          },
          externals: {
            test: /[\\/]node_modules[\\/]/,
            priority: 100,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          [`${manifest.application}Style`]: {
            name: manifest.application,
            test: (m, c, entry = manifest.application) =>
              m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        libs: path.resolve(__dirname, './libs/'),
        root: path.resolve(__dirname, './src/'),
        pages: path.resolve(__dirname, './src/pages/'),
        style: path.resolve(__dirname, './src/style/'),
        // 'popper.js': path.resolve(
        //   __dirname,
        //   './node_modules/popper.js/dist/esm/popper'
        // ),
      },
      modules: ['./', 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: path.resolve(__dirname, './style-imports-rewrite-loader.js'),
            },
          ],
        },
        {
          test: /\.(css|scss)$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true, // true outputs JSX tags
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 65536,
                fallback: 'file-loader',
              },
            },
          ],
          // type: 'asset',
          // parser: {
          //   dataUrlCondition: {
          //     maxSize: 65536
          //   }
          // }
        },
        // {
        //   test: /\.(csv|tsv)$/,
        //   use: ['csv-loader']
        // },
        // {
        //   test: /\.xml$/,
        //   use: ['xml-loader'],
        // },
      ],
    },
  }

  return config
}
