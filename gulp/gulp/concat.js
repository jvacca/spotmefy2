var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

module.export = gulp.task('concat', function() {
	return gulp.src(config.src.scripts)
    .pipe(concat(config.dest.build.bundle))
    .pipe(gulpif(release, gulp.dest(config.dest.release.scripts), gulp.dest(config.dest.build.scripts)));
});