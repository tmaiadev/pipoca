var gulp = require('gulp');
var serve = require('gulp-serve');
var del = require('del');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');
var babelify = require('babelify');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
let cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');

gulp.task('serve', serve('./'));

gulp.task('clear', function () {
  return del(['dist/**/**']);
});

gulp.task('styles:dev', function() {
    return gulp.src('src/**/**.css')
    .pipe(sourcemaps.init())
    .pipe(concatCss("pipoca.css"))
    .pipe(autoprefixer({
        browsers: ['> 5%'],
        cascade: false
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('styles:dist', function() {
    return gulp.src('src/**/**.css')
    .pipe(concatCss("pipoca.css"))
    .pipe(autoprefixer({
        browsers: ['> 5%'],
        cascade: false
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/'));
});

gulp.task('js:dev', function () {
    var bundler = browserify({
        entries: 'src/main.js',
        debug: true
    });
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('pipoca.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('js:dist', function () {
    var bundler = browserify({
        entries: 'src/main.js',
        debug: true
    });
    bundler.transform(babelify);

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('scripts.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('dev', function(callback) {
    runSequence('clear',
                ['styles:dev', 'js:dev'],
                callback);
});

gulp.task('dist', function(callback) {
    runSequence('clear',
                ['styles:dist', 'js:dist'],
                callback);
});

gulp.task('default', ['serve', 'dev'], function () {
    gulp.watch('src/**/*.*', ['dev']);
});