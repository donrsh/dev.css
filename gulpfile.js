var gulp = require('gulp')
var sass = require('gulp-sass')
var server = require('gulp-server-livereload')

gulp.task('index-style', function () {
  return gulp.src('src/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'))
})

gulp.task('demo-style', function () {
  return gulp.src('src/demo.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build'))
})

gulp.task('html', function () {
  return gulp.src('src/demo.html')
    .pipe(gulp.dest('build'))
})

gulp.task('webserver', ['index-style', 'demo-style', 'html'], function () {
  gulp.src('build')
    .pipe(server({
      livereload: true,
      open: true,
      defaultFile: 'demo.html'
    }))
})

gulp.task('watch', function () {
  gulp.watch('(src/index.scss|src/dev-styles/*.scss)', ['index-style'])
  gulp.watch('src/demo.scss', ['demo-style'])
  gulp.watch('src/demo.html', ['html'])
})

gulp.task('dev', ['webserver', 'watch'])
gulp.task('build', ['index-style', 'demo-style', 'html'])
