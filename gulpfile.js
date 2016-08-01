var gulp = require('gulp')
, autoprefixer = require('gulp-autoprefixer')
, sass = require('gulp-sass');
 
gulp.task('sass', function () {
  var autoprefixerOpts = {
    browsers: [
      'last 1 versions'
    ],
    cascade: false
  };

  return gulp.src('./app/sass/styles.sass')
    .pipe(sass())
    // .pipe(sass({outputStyle: 'compressed'}))
    .on('error', function(err){
      console.error(err.message);
    })
    .pipe(autoprefixer(autoprefixerOpts))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('watch', function() {
  gulp.watch([ './app/sass/**/*.sass'], ['sass']);
});

gulp.task('build', ['sass']);













