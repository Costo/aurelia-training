var gulp = require('gulp');
var bs = require("browser-sync").create();
var typescript = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var appRoot = 'src/';
var outputRoot = 'wwwroot/dist/';

var paths = {
    source: appRoot + '**/*.ts',
    dtsSource: [
      'custom_typings/**/*.d.ts',
      'typings/globals/**/*.d.ts',
      'wwwroot/jspm_packages/**/*.d.ts'
    ],
    html: appRoot + '**/*.html',
    output: outputRoot
};


var tsCompilerConfig = typescript.createProject('tsconfig.json');
gulp.task('build-system', function () {
    return gulp.src(paths.dtsSource.concat(paths.source))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(typescript(tsCompilerConfig))
      .pipe(sourcemaps.write('.', { includeContent: true, sourceRoot: 'src', debug: true }))
      .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
    return gulp.src(paths.html)
      .pipe(gulp.dest(paths.output));
});

gulp.task('build', ['build-html', 'build-system']);

gulp.task('reload', function () {
    bs.reload();
});

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.source, ['build-system', 'reload']);
    gulp.watch(paths.html, ['build-html', 'reload']);
});

// this task utilizes the browsersync plugin
// to create a dev server instance
// at http://localhost:9000
gulp.task('serve', function(done) {
  //bs.watch("wwwroot/dist/**/*.html").on("change", bs.reload);
  //bs.watch("wwwroot/dist/**/*.js").on("change", bs.reload);
   
  // Now init the Browsersync server
  bs.init({
      server: {
        baseDir: ['wwwroot/'],
        middleware: function(req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            next();
      
        }
      }
  }, done);
});

gulp.task('dev', ["watch", "serve"]);