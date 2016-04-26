var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');

var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

// Styles
gulp.task('styles', function(){
  // fonts
  // gulp.src('css/fonts/**.*')
  //   .pipe(gulp.dest('dist/css/fonts'))

  // css
  gulp.src('less/main.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream:true}))
});

// Images
gulp.task('images', function(){
  gulp.src('img/**')
    .pipe(gulp.dest('./dist/img'))
});

// Audio
gulp.task('audio', function(){
  gulp.src('audio/**')
    .pipe(gulp.dest('./dist/audio'))
});

// Browser Sync
gulp.task('browser-sync', function() {
  browserSync({
    server : {},
    middleware : [ historyApiFallback() ],
    ghostMode: false
  });
});

// Helpers
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {

  var props = {
    entries: ['./scripts/' + file],
    debug : true,
    transform:  [babelify.configure({stage : 0 })]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./dist/'))
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

// Scripts
gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

// Default
gulp.task('default', ['images', 'audio', 'styles','scripts','browser-sync'], function() {
  gulp.watch('css/**/*', ['styles']); // gulp watch for css changes
  gulp.watch('**.html', ['images', 'audio', 'styles','scripts','browser-sync']);
  return buildScript('main.js', true); // browserify watch for JS changes
});
