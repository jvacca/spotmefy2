var gulp = require('gulp'),
	chai = require('chai'),
	mocha = require('gulp-mocha');

module.export = gulp.task('test', function() {
  return gulp.src(config.test.src)
    .pipe(mocha());
});