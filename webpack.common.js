const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'docs'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp|mp4)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|otf|woff|woff2|eot)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    // HTML pages with viewport meta
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      meta: { viewport: 'width=device-width, initial-scale=1' },
      favicon: './src/images/favicon.ico'
    }),

    new HtmlWebpackPlugin({
      template: './src/documentation.html',
      filename: './documentation.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    new HtmlWebpackPlugin({
      template: './src/gallery.html',
      filename: './gallery.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    new HtmlWebpackPlugin({
      template: './src/articles.html',
      filename: './articles.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    // new HtmlWebpackPlugin({
    //   template: './src/article.html',
    //   filename: './article.html',
    //   meta: { viewport: 'width=device-width, initial-scale=1' }
    // }),

    // new HtmlWebpackPlugin({
    //   template: './src/articles/article-item.html',
    //   filename: './articles/article-item.html',
    //   meta: { viewport: 'width=device-width, initial-scale=1' }
    // }),

    // new HtmlWebpackPlugin({
    //   template: '/src/articles.html',
    //   filename: '/articles.html',
    //   meta: { viewport: 'width=device-width, initial-scale=1' }
    // }),


    new HtmlWebpackPlugin({
      template: './src/cards/card-item.html',
      filename: './cards/card-item.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    new HtmlWebpackPlugin({
      template: './src/interviews/interview-item.html',
      filename: './interviews/interview-item.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    new HtmlWebpackPlugin({
      template: '/src/interviews.html',
      filename: '/interviews.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    new HtmlWebpackPlugin({
      template: './src/tutorials/tutorial-item.html',
      filename: './tutorials/tutorial-item.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    new HtmlWebpackPlugin({
      template: '/src/tutorials.html',
      filename: '/tutorials.html',
      meta: { viewport: 'width=device-width, initial-scale=1' }
    }),

    // Partials
    new HtmlWebpackPartialsPlugin([
      {
        path: path.join(__dirname, './src/partials/analytics.html'),
        location: 'analytics',
        template_filename: '*',
        priority: 'replace'
      }
    ])
  ],
  optimization: {
    // Минификация CSS - раскомментируйте, если хотите использовать
    // minimizer: [new CssMinimizerPlugin()]
  },
  devtool: 'source-map', // для отладки CSS и JS
  resolve: {
    extensions: ['.js', '.jsx'] // Упрощает импорт JS и JSX файлов
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'docs')
    },
    compress: true,
    port: 9000,
    open: true
  }
}
