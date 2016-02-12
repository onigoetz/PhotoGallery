var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");

var statsConfig = {colors: true};

var webpackProductionConfig = webpackConfig(true);
var webpackDevConfig = webpackConfig(false);
var webpackHotReloadConfig = webpackConfig(false, true);

// create a single instance of the compiler to allow caching
var devCompiler = webpack(webpackDevConfig);

module.exports = function (gulp) {
    // Production build
    gulp.task("scripts", function (callback) {
        webpack(webpackProductionConfig, function (err, stats) {
            if (err) throw new gutil.PluginError("webpack:build", err);
            gutil.log("[webpack:build]", stats.toString(statsConfig));
            callback();
        });
    });

    // Dev build
    gulp.task("scripts-dev", function (callback) {
        // run webpack
        devCompiler.run(function (err, stats) {
            if (err) throw new gutil.PluginError("webpack:build-dev", err);
            gutil.log("[webpack:build-dev]", stats.toString(statsConfig));
            callback();
        });
    });

    // Start a webpack-dev-server
    gulp.task("webpack-dev-server", function () {
        new WebpackDevServer(webpack(webpackHotReloadConfig), {
            publicPath: "/" + webpackHotReloadConfig.output.publicPath,
            stats: statsConfig,
            hot: true,
            filename: "app.min.js",
            historyApiFallback: true,
            proxy: {
                "*": "http://localhost:8081"
            }
        }).listen(8080, "localhost", function (err) {
            if (err) throw new gutil.PluginError("webpack-dev-server", err);
            gutil.log("[webpack-dev-server]", "open http://localhost:8080/webpack-dev-server/index.html for debug");
            require('opn')("http://localhost:8080/index.html");
        });
    });
};
