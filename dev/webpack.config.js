var path = require("path");
var webpack = require("webpack");

module.exports = function (production, hotReload) {
    if (production) {
        hotReload = false; //production cannot have hot reload
    }

    var config = {
        cache: true,
        entry: ["./src/js/app"],
        output: {
            path: path.join(__dirname, "../asset/js"),
            filename: "app.min.js",
            publicPath: "asset/js/",
            chunkFilename: "[chunkhash].js"
        },
        module: {
            loaders: []
        },
        plugins: []
    };

    // Prepare loader
    var babel_loader = {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel?presets[]=react,presets[]=es2015']
    };

    config.module.loaders.push(babel_loader);

    // Prepare plugins
    if (production) {
        config.plugins.push(new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }));
        config.plugins.push(new webpack.optimize.DedupePlugin());
        config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    } else {
        config.debug = true;
        config.devtool = "sourcemap";
    }

    if (hotReload) {
        config.devtool = "eval";
        babel_loader.loaders.unshift('react-hot');
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.entry.unshift('webpack-dev-server/client?http://0.0.0.0:8080'); // WebpackDevServer host and port
        config.entry.unshift('webpack/hot/only-dev-server'); // "only" prevents reload on syntax errors
    }

    return config;
};




