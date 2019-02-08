var gulp = require('gulp');
var concat = require('gulp-concat');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');

gulp.task('js', function (done) {
  gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/lodash/lodash.min.js',
    'node_modules/angular/angular.js',
    'node_modules/jquery-bar-rating/dist/jquery.barrating.min.js'
    ])
    .pipe(concat('app/js/thirdParty.js'))
    
    .pipe(uglify())
    .pipe(gulp.dest('.'))
    .end(done);
});

gulp.task('css', function (done) {
  gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/jquery-bar-rating/dist/themes/bars-square.css'
    ])
    .pipe(concat('app/css/thirdParty.css'))
    .pipe(csso())
    .pipe(gulp.dest('.'))
    .end(done);
});

gulp.task('default', gulp.series('js','css', function(done) {
  // default task code here
  done();
}));
