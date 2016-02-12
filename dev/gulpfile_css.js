var plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    concat = require('gulp-concat');

function getProcessors() {
    // All processors used to make the CSS readable by a browser
    var processors = [];

    // Handle @import
    processors.push(require('postcss-import')());

    // Rebase urls after import
    processors.push(require('postcss-url')({url: "rebase"}));

    // Handle @imports, mixins, variables, nested code and other sass goodies
    var precss_options = {
        // Disable all plugins that will already be executed by CSSNext
        selectors: {disable: true},
        media: {disable: true},
        minmax: {disable: true},
        matches: {disable: true},
        not: {disable: true},
        color: {disable: true},
        properties: {disable: true},

        // Disable Extend, introduces way more problems than solutions
        extend: {disable: true},

        // Disable import plugin as we need to call url rebasing after it
        import: {disable: true}
    };
    processors.push(require('precss')(precss_options));

    // Handle next generation features
    var cssnext_options = {
        features: {
            autoprefixer: false // Disable autoprefixer, will be done by cssnano
        },
        compress: false       // Do not run cssnano twice ...
    };
    processors.push(require('postcss-cssnext')(cssnext_options));

    // CSSNano :: Optimize and deduplicate code
    var nano_options = {
        safe: true,           // Disable dangerous optimisations
        filterPlugins: false, // Kill this thing with fire !#@!!**
        autoprefixer: {
            add: true,                // Add needed prefixes
            remove: true             // Remove unnecessary prefixes
        }
    };
    processors.push(require('cssnano')(nano_options));

    // Report problems encountered during build
    var reporter_options = {
        clearMessages: true
    };
    processors.push(require('postcss-reporter')(reporter_options));

    return processors;
}

function styles_generator(gulp, filename, destination) {
    return gulp.src(filename)
        .pipe(plumber())
        .pipe(rename({suffix: ".min", extname: ".css"}))
        .pipe(postcss(getProcessors()))
        .pipe(gulp.dest('asset/css'));
}

module.exports = function (gulp) {
    gulp.task('styles', ['styles-base']);

    gulp.task('styles-base', function() {
        return styles_generator(gulp, 'src/css/app.scss', 'app');
    });
};

