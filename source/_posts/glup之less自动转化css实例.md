---
title: glup之less自动转化css实例
date: 2017-11-27 14:28:22
tags:
    - glup
---

这是一个用glup自动监视less文件是否修改，若修改则会自动的转化为对应的css文件。
<!--more-->
```
var gulp = require('gulp')
    less = require('gulp-less')
    cssmin = require('gulp-minify-css');
    sourcemaps = require('gulp-sourcemaps');
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber');

var paths = {
    less: ['./pagesDemo/less/*.less']
}

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write('./map'))
        .pipe(cssmin())
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(gulp.dest('./pagesDemo/css'))
})

gulp.task('watch', function() {
    gulp.watch(paths.less, ['less'])
    console.log('********您已开启watch*********');
})

```