module.exports = {
    entry: __dirname + "src/app.js",
    output: {
        path: __dirname + "/public/js/",
        filename: "bundle.js"
    },
    devtool: "source-map"
}