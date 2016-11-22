import gulp from 'gulp'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import cmq from 'gulp-combine-media-queries'

const paths = {
	dev: {
		mainSass: './app/static/sass/main.sass',
		sass: './app/static/sass/**/*.sass',
		css: './app/static'
	}
};

gulp.task('styles', () => {
	gulp.src(paths.dev.mainSass)
		.pipe(plumber({
			errorHandler: (err) => {
				notify("Error <%= err");
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'compact',
			precision: 10
		}))
		.pipe(autoprefixer({
			browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
			cascade: true
		}))
		.pipe(gulp.dest(paths.dev.css))
		.pipe(notify('Styles task completed'))
})

gulp.task('sass', () => {
	gulp.watch([paths.dev.mainSass, paths.dev.sass], ['styles']);
});