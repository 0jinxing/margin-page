const path = require("path");
const merge = require("webpack-merge");
const WriteFilePlugin = require("write-file-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const base = require("./webpack.base");

module.exports = merge(base, {
  entry: {
    options: ["react-hot-loader/patch", path.resolve("src", "index.ts")]
  },
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve("template", "manifest.dev.json"),
        to: path.resolve("dist", "dev", "manifest.json")
      }
    ]),
    new WriteFilePlugin()
  ],
  devServer: {
    contentBase: path.resolve("dist", "dev"),
    hot: true,
    disableHostCheck: true,
    host: "127.0.0.1",
    port: 8080,
    headers: { "Access-Control-Allow-Headers": "*" }
  }
});
