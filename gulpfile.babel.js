import gulp from 'gulp'
import plumber from 'gulp-plumber'
import sourceMaps from 'gulp-sourcemaps'
import notify from 'gulp-notify'
import rename from 'gulp-rename'
import browserSync from 'browser-sync'

import sass from 'gulp-sass'
import cmq from 'gulp-combine-media-queries'
import autoprefix from 'gulp-autoprefixer'
import uglifycss from 'gulp-uglifycss'

import uglify from 'gulp-uglify'



const paths = {
	dev: {
		ejs: './public/*.ejs',
		sass: './public/static/sass/main.sass',
		sass2: './public/static/sass/**/*.sass',
		images: './public/static/images/*',
		js: './dist/main.js'
	},

	prod: {
		css: './dist/styles',
		js: './dist/scripts'
	}
};

gulp.task('browserSync', () => {
	browserSync.init(null, {
		proxy: 'http://localhost:3000',
		files: ["public/**/*.*"],
		port: 7000
	});
});

gulp.task('styles', () => {
	gulp.src(paths.dev.sass)
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sourceMaps.init())
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compact',
			precision: 10
		}))
		.pipe(autoprefix({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: true
		}))
		.pipe(uglifycss({
			maxLineLne: 80
		}))
		.pipe(sourceMaps.write('.'))
		.pipe(rename((path) => {
			path.extname = '.min.css'
		}))
		.pipe(gulp.dest(paths.prod.css))
		.pipe(notify('Styles complete'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', () => {
	gulp.src(paths.dev.js)
		.pipe(plumber({
			errorHandler: function(err) {
				console.log(err);
				this.emit(end);
			}
		}))
		.pipe(sourceMaps.init())
		.pipe(uglify())
		.pipe(rename((path) => {
			path.extname = '.min.js'
		}))
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest(paths.prod.js))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('ejs', () => {
	gulp.src(paths.dev.ejs)
		.pipe(plumber())
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('default', ['browserSync', 'styles', 'ejs'], () => {
	gulp.watch([paths.dev.sass, paths.dev.sass2], ['styles']);
	gulp.watch(paths.dev.ejs, ['ejs']);
	gulp.watch(paths.dev.js, ['scripts']);
});