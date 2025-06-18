const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`);

module.exports = {
  mode: isDev ? "development" : "production",
  context: path.resolve(__dirname, "src"),
  entry: "./js/main.js",
  output: {
    filename: `js/${filename("js")}`,
    path: path.resolve(__dirname, "dist"),
    clean: true,
    publicPath: isDev ? "/" : "./",
  },
  devtool: isProd ? false : "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    compress: true,
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: isProd,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
    splitChunks: { chunks: "all" },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      minify: { collapseWhitespace: isProd },
    }),
    new MiniCssExtractPlugin({
      filename: `css/${filename("css")}`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: { outputStyle: isProd ? "compressed" : "expanded" },
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][hash][ext][query]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      fonts: path.resolve(__dirname, "src/fonts"),
      styles: path.resolve(__dirname, "src/styles"),
    },
  },
};
