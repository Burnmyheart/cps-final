const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// const { extendDefaultPlugins } = require("svgo");

const json = require("./package.json");
const project_name = json.name;
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    configObj.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "removeViewBox",
                      active: false,
                    },
                    {
                      name: "addAttributesToSVGElement",
                      params: {
                        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ];
  }
  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename("css")}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "app/assets"),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "src/fonts"),
          to: path.resolve(__dirname, "app/fonts"),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, "src/img"),
          to: path.resolve(__dirname, "app/img"),
          noErrorOnMissing: true,
        },
      ],
    }),
  ];

  return basePlugins;
};

module.exports = {
  mode: isDev ? "development" : "production",
  context: path.resolve(__dirname, "src"),
  entry: "./js/main.js",
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "app"),
    clean: true,
    publicPath: isDev ? "/" : "./",
    assetModuleFilename: (pathData) => {
      const filepath = path.normalize(pathData.filename);
      const paths = filepath.split(path.sep);
      const index = paths.findIndex((p) => p === "img");
      if (index !== -1) {
        return `img/${paths.slice(index + 1).join("/")}`;
      }
      return isDev ? "img/[name][ext]" : "img/[name].[contenthash][ext]";
    },
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
    static: {
      directory: path.join(__dirname, "app"),
    },
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + "/";
              },
            },
          },
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, "src"),
                  path.resolve(__dirname, "src/styles"),
                  path.resolve(__dirname, "src/components"),
                ],
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(?:|jpe?g|png|gif|svg|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
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
