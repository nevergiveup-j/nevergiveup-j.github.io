var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');
var livereload = require('gulp-livereload');

var webpackConfig = require('./webpack.config');

gulp.task('connect', function() {
    connect.server({
        root: [__dirname],
        port: 8002,
        livereload: true
    });
});

gulp.task("webpack", function() {
    return gulp.src('./app.js')
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['js/**/*', 'sass/**/*.scss', 'images/**/*'], ['webpack']);
});

gulp.task('default', [
    'connect',
    'webpack',
    'watch'
]);
