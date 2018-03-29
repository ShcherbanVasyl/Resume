const gulp = require('gulp');
const imagemin = require('gulp-imagemin')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const autoprefixer = require('gulp-autoprefixer');
const watch = require('gulp-watch')

// Logs Message
/*gulp.task('message', function(){
  return console.log('Gulp is runnig...');
});
*/

// Optimize Images
gulp.task('imagemin', function(){
  gulp.src('src/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('img'))
});

// Css Minify
gulp.task('cssmin', function(){
  gulp.src('src/scss/*.css')
      .pipe(cssmin())
      .pipe(rename({
        suffix: '.min'}))
      .pipe(gulp.dest('css'))
});

// Sass Compile
gulp.task('sass', function(){
  gulp.src(['src/scss/*.scss', 'src/scss/_components/*.scss'])
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('css'))
});

// JS Optimize
gulp.task('minify', function(){
  gulp.src('src/js/*.js')
      .pipe(uglify())
      .pipe(rename({
        suffix: ".min"}))
      .pipe(babel({
        presets: ['env']}))
      .pipe(gulp.dest('js'))
});

// Gulp All Comands
gulp.task('default', ['imagemin', 'cssmin', 'sass', 'minify']);

// Watching
gulp.task('watch', function(){
  gulp.watch('src/img/*', ['imagemin']);
  gulp.watch('src/scss/*.css', ['cssmin']);
  gulp.watch('src/scss/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['minify']);
});
