var gulp = require('gulp'),
    php = require('gulp-connect-php');

require('./dev/gulpfile_css')(gulp);
require('./dev/gulpfile_js')(gulp);

gulp.task('default', ['styles', 'scripts']);

gulp.task('watch', ["scripts-dev"], function() {
    // Watch .scss files
    gulp.watch('src/css/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts-dev']);
});

gulp.task('php', function() {
    php.server({
        keepalive: true,
        port: 8081,
        router: "index.php"
    });
});

gulp.task('dev', ["webpack-dev-server", "php"]);
