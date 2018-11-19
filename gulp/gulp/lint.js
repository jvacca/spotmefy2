var gulp = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src(config.src.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});