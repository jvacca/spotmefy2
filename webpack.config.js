const path = require("path");

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: path.join(__dirname, "/build/js"),
    filename: "app_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};