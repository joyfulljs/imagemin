const gulp = require("gulp");
const ts = require("gulp-typescript");
const rename = require('gulp-rename');

exports.es5 = function () {
  return gulp.src("./index.ts")
    .pipe(ts({
      target: 'es5',
      moduleResolution: 'node',
      removeComments: true
    })).js
    .pipe(gulp.dest("./dist"));
}

exports.es6 = function () {
  return gulp.src("./index.ts")
    .pipe(ts({
      target: 'es6',
      moduleResolution: 'node'
    })).js
    .pipe(rename('index.esm.js'))
    .pipe(gulp.dest("./dist"));
}

exports.umd = function () {
  return gulp.src("./index.ts")
    .pipe(ts({
      target: 'es6',
      module: 'umd',
      moduleResolution: 'node',
      removeComments: true
    })).js
    .pipe(rename('imagemin.umd.js'))
    .pipe(gulp.dest("./dist"));
}