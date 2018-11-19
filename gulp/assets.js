var gulp = require('gulp');

module.export = gulp.task('assets', function() {
	gulp.src(BUILD_FOLDER + '/js/lib/**/*')
		.pipe(gulp.dest(RELEASE_FOLDER + '/js/lib/'));
	gulp.src(BUILD_FOLDER + '/fonts/**/*')
		.pipe(gulp.dest(RELEASE_FOLDER + '/fonts/'));
	gulp.src(BUILD_FOLDER + '/css/bootstrap.css')
		.pipe(gulp.dest(RELEASE_FOLDER + '/css/'));
});