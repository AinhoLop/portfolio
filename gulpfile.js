var gulp = require('gulp')
var sass = require('gulp-sass');
var ghPages = require('gulp-gh-pages');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
	return gulp.src('./src/scss/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function(){
	gulp.watch('./sass/*.scss', ['sass']); 
});

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('default', ['sass', 'watch']); 

gulp.task('css', ['sass'], function() {
  return gulp.src('src/assets/css/*.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
   .pipe(uncss({
     html: ['src/*.html']
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/assets/css'));
});