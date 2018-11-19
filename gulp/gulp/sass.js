var gulp = require('gulp'),
	sass = require('gulp-sass'),
  gulpif = require('gulp-if'),
  rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
  output_style = (release) ? 'compressed':'expanded';

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

module.exports = gulp.task('sass', function() {
  return gulp.src(config.src.mainscss)
    .pipe(sass({
      outputStyle: output_style
    }).on('error', handleError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulpif(release, rename(config.dest.release.appstyle), rename(config.dest.build.appstyle)))
    .pipe(gulpif(release, gulp.dest(config.dest.release.styles), gulp.dest(config.dest.build.styles)));
});