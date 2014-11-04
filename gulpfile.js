var gulp = require('gulp');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');

gulp.task('watch', function () {
    gulp.watch(['./app/*.js','./*.html'], ['html']);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: '.',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./*.html')
        .pipe(connect.reload());
});

gulp.task('hint', function () {
    gulp.src('./app/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

//运行Gulp时，默认的Task
gulp.task('default', ['hint','connect', 'watch']);
