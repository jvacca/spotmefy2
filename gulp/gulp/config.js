global.SRC_FOLDER = './src';
global.BUILD_FOLDER = './build';
global.RELEASE_FOLDER = './release';
global.TMP_FOLDER = './tmp';

global.config = {
	src: {
    index: SRC_FOLDER + '/index.html',
    styles: SRC_FOLDER + '/css/**/*.scss',
    scripts: SRC_FOLDER + '/app/**/*.js',
		images: SRC_FOLDER + '/images/**/*',
		mainjs: SRC_FOLDER + '/app/main.js',
    mainscss: SRC_FOLDER + '/css/main.scss'
	},
  dest: {
    build: {
      index: BUILD_FOLDER + '/index.html',
      styles: BUILD_FOLDER + '/css/',
      scripts: BUILD_FOLDER + '/js/',
      images: BUILD_FOLDER + '/images/',
      bundle: 'app.js',
      appstyle: 'appstyle.css'
    },
    release: {
      index: RELEASE_FOLDER + '/index.html',
      styles: RELEASE_FOLDER + '/css/',
      scripts: RELEASE_FOLDER + '/js/',
      images: RELEASE_FOLDER + '/images/',
      bundle: 'app.min.js',
      appstyle: 'appstyle.min.css'
    }
  },
  test: {
    src: 'test/spec/test.js'
  },
  ports: {
    staticServer: 8080,
    livereloadServer: 35729
  }
};