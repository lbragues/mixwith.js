'use strict';

const babel = require('gulp-babel');
const es = require('event-stream');
const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('default', ['test', 'buildES6', 'buildES5']);

gulp.task('buildES5', () =>
    gulp.src('src/mixwith.js')
        .pipe(babel({
          "presets": [
            [
              "@babel/preset-env",
              {
                "targets": {
                  "ie": "11",
                }
              }
            ]
          ],
          "plugins": [
            "@babel/plugin-transform-modules-umd"
          ]
        }))
        .pipe(concat('mixwith_es5.js'))
        .pipe(gulp.dest('.'))
        .pipe(gulp.dest('build')));

gulp.task('buildES6', () =>
        gulp.src('src/mixwith.js')
            .pipe(babel({
              "plugins": [
                "@babel/plugin-transform-modules-umd"
              ]
            }))
            .pipe(concat('mixwith_es6.js'))
            .pipe(gulp.dest('.'))
            .pipe(gulp.dest('build')));

gulp.task('test', () =>
    es.merge(
        gulp.src('test/*.js').pipe(babel()),
        gulp.src(['test/mocha.opts']))
    .pipe(gulp.dest('build/test')));