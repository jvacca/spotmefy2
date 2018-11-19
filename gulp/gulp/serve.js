var gulp = require('gulp'),
	connect = require('gulp-connect');

// Serve
module.export = gulp.task('serve', function() {
	connect.server({
		root: global.BUILD_FOLDER,
		port: 8080,
		livereload: true,
		fallback: config.dest.build.index
	});
});