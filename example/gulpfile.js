var gulp = require('gulp');
var gulpImports = require('../index');
var prettify = require('gulp-prettify');

gulp.task('html', function() {
    gulp.src(['html/index.html'])
        .pipe(gulpImports())
    	.pipe(prettify({indent_size: 4}))
        .pipe(gulp.dest('./result'));
});

gulp.task('js', function() {
    gulp.src(['js/file1.js'])
        .pipe(gulpImports())
        .pipe(gulp.dest('./result'));
});

gulp.task('default', ["js", "html"]);
