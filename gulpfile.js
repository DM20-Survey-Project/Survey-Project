//1. Make gulpfile
//2. npm i all dependencies
//3. check all folder paths used in gulpfile
//4. Update index.html
//5. Run gulp watch

// Gulp.js configuration
var gulp = require('gulp');
var sass = require('gulp-sass');



	gulp.task('build-css', function(){
    return gulp.src('./styles/*')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/'));
})

gulp.task('clean', function (cb) {
    del([
        'dist'
    ], cb);
});

gulp.task('build-js', function() {
  return gulp.src(['js/**/*.js', 'app.js'])
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
    //   .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', [ 'clean', 'build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./index.html', './public/styles/*.*css', './js/**/*.js'],['build']);
});
