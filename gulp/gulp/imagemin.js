var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	imagemin = require('gulp-imagemin');

// Images
module.export = gulp.task('images', function() {
  return gulp.src(config.src.images)
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulpif(release, gulp.dest(config.dest.release.images), gulp.dest(config.dest.build.images)));
});