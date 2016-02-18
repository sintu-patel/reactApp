var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');

// compiles sass files and makes .css file
gulp.task('compileSASS', function() {
	gulp.src('dev/sass/style.scss')
		.pipe(compass({
			css: 'public/stylesheets',
			sass: 'dev/sass/'
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public/stylesheets'));
});


// Concat and minify java script files
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Developer java script files
gulp.task('concatJS', function() {
	return gulp.src('dev/javascripts/components/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('public/javascripts'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts'));
});

// Vendor Java Script files
gulp.task('concatVendorJS', function() {
	return gulp.src('dev/javascripts/vendor/angular.js')
		.pipe(concat('angular.js'))
		.pipe(gulp.dest('public/javascripts/vendor'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts/vendor'));
});

// Copy images from dev folder to public folder
gulp.task('copyImageFolder', function() {
	gulp.src('dev/images/*.{jpg,png,gif}')
		.pipe(gulp.dest('public/images'));
});

// Copy images from dev folder to public folder
gulp.task('copyVendorJS', function() {
	gulp.src('dev/javascripts/vendor/*.js')
		.pipe(gulp.dest('public/javascripts/vendor'));
});

// Copy bootstrap from bower componets folder
gulp.task('copyBootstrap', function() {
	gulp.src('bower_components/bootstrap-sass/assets/stylesheets/**/*')
		.pipe(gulp.dest('dev/sass/vendor'));
});

// Copy angularjs from bower componets folder
gulp.task('copyAngular', function() {
	gulp.src('bower_components/angular/angular.js')
		.pipe(gulp.dest('dev/javascripts/vendor/'));
});


// Scslint task
var scsslint = require('gulp-scss-lint');
gulp.task('scssLint', function() {
	return gulp.src('dev/components/**/*.scss')
		.pipe(scsslint({
			'config': 'scss-lint.yml'
		}));
});

// Js hint task
var jshint = require('gulp-jshint');
var jsFileArray = ['*.js', 'dev/javascripts/components/*.js', 'routes/*.js'];
// jshint
gulp.task('jsHint', function() {
	return gulp.src(jsFileArray)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter());
});

// JSCS task
var jscs = require('gulp-jscs');
gulp.task('jscs', function() {
	return gulp.src(jsFileArray)
		.pipe(jscs({
			'config': '.jscsrc'
		}))
		.pipe(jscs.reporter());
});

// Add bower with gulp
var bower = require('gulp-bower');
gulp.task('bower', function() {
	return bower({ cmd: 'install' });
});

gulp.task('watch', function() {
	gulp.watch(['dev/**/*'], ['scssLint',
		'jscs',
		'jsHint',
		'copyBootstrap',
		'compileSASS',
		'concatJS',
		'copyVendorJS',
		'copyImageFolder']);
});

gulp.task('default', ['bower',
	'scssLint',
	'jscs',
	'jsHint',
	'copyBootstrap',
	'compileSASS',
	'concatJS',
	'copyVendorJS',
	'copyImageFolder']);
