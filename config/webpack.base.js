const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    options: path.resolve("src", "index.ts"),
    background: path.resolve("src", "scripts", "background.ts"),
    content: path.resolve("src", "scripts", "content.ts")
  },
  output: {
    filename: chunkData => {
      return ["background", "content"].includes(chunkData.chunk.name)
        ? "[name].js"
        : "[name].[hash:8].js";
    },
    path: path.resolve("dist", "dev"),
    publicPath: "http://127.0.0.1:8080/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve("src")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.jsx?$/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          { loader: "css-loader" },
          {
            loader: "sass-loader",
            options: { implementation: require("sass") }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: "url-loader",
          options: { limit: 4096 }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[ext]"
        }
      }
    ]
  },

  plugins: [
    new CopyPlugin([
      {
        from: path.resolve("public")
      }
    ]),
    new HtmlPlugin({
      template: path.resolve("template/index.html"),
      filename: "options.html",
      chunks: ["options"],
      hash: true,
      title: "OPTIONS"
    })
  ]
};
