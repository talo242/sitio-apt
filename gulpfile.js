// /////////////////////////////////////////////
// Required
// /////////////////////////////////////////////

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var jade = require('gulp-jade');
var htmlmin = require('gulp-html-minifier');
// Minificar SVG
var svgmin = require('gulp-svgmin');

// /////////////////////////////////////////////
// Log Errors
// /////////////////////////////////////////////
function errorlog(err){
	console.error(err.message);
	this.emit('end');
}

// /////////////////////////////////////////////
// Scripts Task
// /////////////////////////////////////////////
gulp.task('scripts', function() {
  gulp.src(['assets/js/**/*.js', '!assets/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(reload({stream:true}));
});

//  .pipe(reload) se pone de último para actualizar el navegador con cada cambio
// /////////////////////////////////////////////
// Compass / Sass Task
// /////////////////////////////////////////////
gulp.task('sass', function(){
  gulp.src('assets/scss/style.scss')
      .pipe(plumber())
      .pipe(compass({
      config_file: './config.rb',
      css: 'build/css',
      sass: 'assets/scss',
      require: ['susy']
  }))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream:true}));
});

// /////////////////////////////////////////////
// HTML Task
// /////////////////////////////////////////////
// gulp.task('html', function() {
//  gulp.src('assets/**/*.html')
//  .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
//  .pipe(gulp.dest('build/'))
//  .pipe(reload({stream:true}));
// })
gulp.task('html', function(){
	return gulp.src(['assets/jade/*.jade', '!assets/jade/partials/*.jade'])
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream:true}));
});

// /////////////////////////////////////////////
// Browser-Sync Task
// /////////////////////////////////////////////
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./build"
        }
    });
});

// /////////////////////////////////////////////
// Watch Task
// /////////////////////////////////////////////
gulp.task('watch', function() {
	gulp.watch('assets/scss/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['scripts']);
  gulp.watch('assets/jade/**/*.jade', ['html']);
});

// /////////////////////////////////////////////
// SVG Optimizer
// /////////////////////////////////////////////
gulp.task('svg', function() {
	return gulp.src('assets/img/*.svg')
	.pipe(svgmin())
	.pipe(gulp.dest('build/img/'));
});

gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);
