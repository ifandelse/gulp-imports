var gulp = require('gulp');
var gulpImports = require('../index');

gulp.task('fileimport', function() {
    gulp.src(['file1.js'])
        .pipe(gulpImports())
        .pipe(gulp.dest('./result'));
});

gulp.task('default', function() {
    gulp.run('fileimport');
});
