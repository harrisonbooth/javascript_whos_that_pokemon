module.exports = {
    entry: __dirname + "src/app.js",
    output: {
        path: __dirname + "/public/js/",
        filename: "bundle.js"
    },
    devtool: "source-map",
    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"]
        }
      }
    ]
  }
}