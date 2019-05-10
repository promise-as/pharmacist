//引入gulp模块
const gulp = require('gulp')
/*
const jshint = require('gulp-jshint');//js语法检查模块
const concat = require('gulp-concat');//合并文件模块
const uglify = require('gulp-uglify');//js文件压缩模块
const rename = require("gulp-rename");//文件重命名模块

// const less = require('gulp-less');//less编译模块
// const cleanCSS = require('gulp-clean-css');//css压缩模块，可以解决兼容性
// const cssmin = require('gulp-cssmin');//css压缩模块，可以解决兼容性
// const htmlmin = require('gulp-htmlmin');//html压缩模块
const livereload = require('gulp-livereload');//监视文件模块

const sass = require('gulp-sass'); //sass编译模块

const connect = require('gulp-connect');//热加载库
*/


// 神来之笔：其他(上面)的插件不用再引入了
const $ = require('gulp-load-plugins')() // !!!引入的插件是个方法，必须记住调用

// 编译自动添加前缀
const prefix = require("gulp-autoprefixer");

// 自动打开网页
const open = require('open')

// 检查语法错误 -- 进行语法转换 -- 合并js文件 -- 压缩js文件
gulp.task('minifyjs', function () {
  return gulp.src('./src/js/*.js') // 将指定目录下的文件以数据流的方式导入到gulp内存中
    .pipe($.jshint({esversion: 6})) // 检查js语法错误
    .pipe($.jshint.reporter('default')) // 使用默认的错误提示
    .pipe($.babel({ // 语法转换 es6->es5
      presets: ['es2015']
    }))
    // .pipe(gulp.dest('build/js'))// 将gulp内存中的数据流输出指定目录下
    // .pipe($.concat('built.js'))
    // .pipe(gulp.dest('./build/js'))
    // .pipe($.uglify())  // 压缩js代码
    // .pipe($.rename('dist.min.js')) // 重命名js文件
    .pipe(gulp.dest('./dist/js'))
    .pipe($.livereload()) // 热更新/热加载
})

gulp.task('minifycss', function () {
  return gulp.src('src/sass/*.scss')
    .pipe($.sass(
      {
        outputStyle: 'expanded',  // 编译成css的标准格式
      },
    ))
    // 前缀兼容最新两个版本的浏览器
    .pipe(prefix(["last 2 versions"], { cascade: true }))

    // .pipe(gulp.dest('build/css'))
    // .pipe($.concat('built.css')) // 合并css
    // .pipe(gulp.dest('build/css'))
    // .pipe($.cssmin())
    // .pipe($.rename('dist.min.css'))
    .pipe(gulp.dest('dist/css/'))
    .pipe($.livereload())
})

gulp.task('minifyhtml', function () {
  return gulp.src('src/*.html')
    // .pipe($.htmlmin({
    //     removeComments: true, // 去除注释
    //     collapseWhitespace: true  // 去除空格
    // }))
    .pipe(gulp.dest('dist'))
    .pipe($.livereload())
})

gulp.task('watch', ['default'], function () {
  $.livereload.listen();
  // 配置热更新/热加载
  $.connect.server({
    root: 'dist',  // 访问的目录
    livereload: true,
    // port: 4000,

    host: '192.168.30.76', // 公司ip地址
    // host: '192.168.123.74', // 宿舍ip地址
    port: 5000,
  });
  // 打开网页
  // open("http://localhost:4000");
  open("192.168.30.76:5000");
  // open("http://192.168.123.74:5000");
  // 配置监视任务
  gulp.watch('./src/js/*.js', ['minifyjs']);
  gulp.watch('./src/sass/*.scss', ['minifycss']);
  gulp.watch('./src/*.html', ['minifyhtml']);
});

/*暂时还没用到js*/
gulp.task('default', ['minifyjs', 'minifycss', 'minifyhtml']) //异步执行
