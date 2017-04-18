// gulpfile.js
'use strict';

//node模块
var path = require('path');
var gulp = require('gulp');


//html
var minifyHtml = require('gulp-minify-html');
var htmlmin = require('gulp-htmlmin');

// css
var less = require('gulp-less');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer'); //补全前缀
var csscomb = require('gulp-csscomb'); //格式css样式，排序
var minifycss = require('gulp-minify-css'); //压缩css文件
var cssbeautify = require('gulp-cssbeautify'); //美化css样式
var rename = require('gulp-rename'); //重命名

// js
var jshint = require('gulp-jshint'); //监测 js 语法
var uglify = require('gulp-uglify'); //uglify 组件（用于压缩 JS）
var concat = require('gulp-concat'); //合并


// 自动刷新
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var foreach = require('gulp-foreach');


//html
gulp.task('htmlTest', function() {
  var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  };
  gulp.src('./*.html') // 要压缩的html文件
    .pipe(htmlmin(options))
    .pipe(gulp.dest('bulid/html'))
})

//编译sass
gulp.task('cssTest', function() {
  return gulp.src('dist/style/*.{less,sass,scss}')
    .pipe(sass())
    // .pipe(foreach(function(stream, file) {
    //   return stream
    //     .pipe(path.extname(file.relative) == '.less' ? less() : sass().on('error', sass.logError));
    // }))   //问题==>可以编译但不能自动刷新
    .pipe(autoprefixer({
      browsers: ['Firefox >= 10', 'iOS >= 4', 'Chrome >= 10'],
      cascade: true, //是否美化属性值 默认：true
      remove: true //是否去掉不必要的前缀 默认：true
    }))
    .pipe(csscomb())
    .pipe(minifycss({
      aggressiveMerging: false,
      advanced: false, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
      compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
      keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
      keepSpecialComments: '*' //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
    }))
    .pipe(gulp.dest('bulid/css'))
})

//合并js
gulp.task('concatjs', function() {
  gulp.src('dist/js/*.js') //输入
    .pipe(jshint())
    .pipe(concat('main.js')) //合并
    .pipe(uglify())
    .pipe(gulp.dest('bulid/js')) //输出
})

//压缩js
gulp.task('libjs', function() {
  gulp.src('dist/js/lib/*.js') //输入
    .pipe(uglify())
    .pipe(gulp.dest('bulid/js/lib'))
})


// 静态服务 设置要监听的目录文件
gulp.task('server', function() {
  var files = [
    './bulid/**/*.html',
    './bulid/**/*.css',
    './bulid/js/*.js', //'./dist/**/*.js'
    './bulid/js/lib/*.js' //'./dist/js/**/*.js'
  ]
  browserSync.init(files, {
    server: {
      baseDir: './'
    }
  })
  gulp.watch('*.html').on('change', reload); // html刷新
})

//监听任务
gulp.task('watch', function() {
  gulp.watch('./*.html', ['htmlTest']);
  gulp.watch('dist/style/*.scss', ['cssTest']);
  gulp.watch('dist/js/*.js', ['concatjs']);
  gulp.watch('dist/js/lib/*.js', ['libjs']);
})

//默认执行
gulp.task('default', function() {
  gulp.run('server', 'htmlTest', 'cssTest', 'concatjs', 'libjs', 'watch')
})
