var gulp = require('gulp'),
	del = require('del');

// Clean
module.export = gulp.task('clean', function(cb) {
	if (release) {
		del([RELEASE_FOLDER + '/**/*'], cb);
	} else {
		del([config.dest.build.images], cb);
    }
});