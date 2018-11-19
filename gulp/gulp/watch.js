var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload');
    //livereloadServer = livereload(config.ports.livereloadServer);

// Watch
module.exports = gulp.task('watch', function() {
  // Watch .css files
  gulp.watch(config.src.styles, ['sass']);

  // Watch .html files
  gulp.watch(config.src.index, ['index']);

  // Watch image files
  gulp.watch(config.src.images, ['images']);

  //Watch js files
  gulp.watch(config.src.scripts, ['concat']);

  // Create LiveReload server
  livereload.listen();

  gulp.watch([BUILD_FOLDER + '/**/*']).on('change', livereload.changed);

});