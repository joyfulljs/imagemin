const gulp = require("gulp");
const ts = require("gulp-typescript");
const rename = require('gulp-rename');

exports.es5 = function () {
  return gulp.src("./index.ts")
    .pipe(ts({ target: 'es5' }))
    .js
    .pipe(gulp.dest("./"));
}

exports.es6 = function () {
  return gulp.src("./index.ts")
    .pipe(ts({ target: 'es6' }))
    .js
    .pipe(rename('index.esm.js'))
    .pipe(gulp.dest("./"));
}