const gulp = require('gulp');
const connect = require('gulp-connect');

const jsSources = ['p5.js', 'public/sketch.js'];

const htmlSources = ['public/index.html'];

gulp.task('js', () => {
  gulp.src(jsSources).pipe(connect.reload());
});

gulp.task('html', () => {
  gulp.src(htmlSources).pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(jsSources, ['js']);
  gulp.watch(htmlSources, ['html']);
});

gulp.task('connect', () => {
  connect.server({
    root: '',
    livereload: true
  });
});

gulp.task('default', ['js', 'html', 'watch', 'connect']);
