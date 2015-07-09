var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    notify = require('gulp-notify');


gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('sass', function() {
    return sass('assets/scss/style.scss', { style: 'compressed' })
    .on('error', notify.onError())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9'))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({stream: true}))
    .pipe(notify({ message: 'You are good to go!' }));
});


gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/js/dist'))
    .pipe(reload({stream:true}));
});


gulp.task('watch', ['sass', 'js', 'browser-sync'], function() {
    gulp.watch('assets/scss/*.scss', ['sass']);
    gulp.watch('assets/js/*.js', ['js']);
});
