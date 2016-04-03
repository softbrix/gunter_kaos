var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('js', function () {
  gulp.src([
    'node_modules/bootstrap/dist/bootstrap.js',
    'node_modules/lodash/lodash.min.js',
    'node_modules/angular/angular.js',
    'node_modules/jquery-bar-rating/dist/jquery.barrating.min.js'
    ])
    .pipe(concat('app/js/thirdParty.js'))
    .pipe(gulp.dest('.'));
});

gulp.task('css', function () {
  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/jquery-bar-rating/dist/themes/bars-square.css'
    ])
    .pipe(concat('app/css/thirdParty.css'))
    .pipe(gulp.dest('.'));
});
