var gulp = require('gulp'),
    gulpif = require('gulp-if'),
    replace = require('gulp-replace');

module.exports = gulp.task('index', function () {
  return gulp.src(config.src.index)
    .pipe(gulpif(release,
      replace('<!--styles-->', '<link href="css/' + config.dest.release.appstyle + '" rel="stylesheet">'),
      replace('<!--styles-->', '<link href="css/' + config.dest.build.appstyle + '" rel="stylesheet">')
    ))
    .pipe(gulpif(release,
      replace('<!--scripts-->', '<script src="js/' + config.dest.release.bundle + '"></script>'),
      replace('<!--scripts-->', '<script src="js/' + config.dest.build.bundle + '"></script>')
    ))
    .pipe(gulpif(release, gulp.dest(RELEASE_FOLDER), gulp.dest(BUILD_FOLDER)));
});
