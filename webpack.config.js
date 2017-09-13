var
    path = require("path"),
    webpack = require("webpack");

module.exports = {
    entry: {
        bundle: "entry.jsx",
        test: "mocha!test.js"
    },
    output: {
        path: path.join(__dirname, "release"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            { test: /\.sass$/, loader: "style!css!sass?indentedSyntax" },
            { test: /\.html/, loader: 'file?name=[name].[ext]' },
            { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    resolve: {
        modulesDirectories: [
            "node_modules", "source", "test"
        ],
        extensions: [
            "", ".js", ".json", ".jsx", ".min.js"
        ]
    },
    devServer: {
        inline:true,
        port: 3000
    },
};
