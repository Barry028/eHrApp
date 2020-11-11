// gulpfile.js
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');

const del = require('del');
// 合併檔案
const concat = require('gulp-concat');
// Sass
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require("cssnano");
const autoprefixer = require('autoprefixer');
// const  autoprefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync").create();

// const paths = {
//     src: '',
//     dest: 'dist/'
// };

// //每次編譯前先移除原有檔案
// function clean() {
//     return del();
// }

// 將編譯器調整為 Dart Sass
sass.compiler = require('dart-sass'); 

// Sass 編譯
gulp.task('sass', () => {
    return gulp
        .src('scss/*.scss')
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sass({
                outputStyle: 'compressed'
            })
            .on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.', {
            includedContent: false,
            sourceRoot: '../scss'
        }))
        .pipe(gulp.dest('dist/css'))
        // .pipe(browserSync.stream())
});

gulp.task('watch', () => {
  gulp.watch('scss/*.scss', gulp.series('sass'));
});


// function sass() {
//     return (
//         gulp.src('scss/*.scss')
//         .pipe(sourcemaps.init({
//             loadMaps: true
//         }))
//         // Initialize sourcemaps before compilation starts
//         .pipe(sass({
//             outputStyle: 'expanded' //nested expanded compact compressed
//         }))
//         .on("error", sass.logError)
//         // Use postcss with autoprefixer and compress the compiled file using cssnano
//         .pipe(postcss([autoprefixer(), cssnano()]))
//         // Now add/write the sourcemaps
//         .pipe(sourcemaps.write('.', {
//             includedContent: false,
//             sourceRoot: '../scss'
//         }))
//         .pipe(gulp.dest('dist/css'))
//         .pipe(browserSync.stream())
//     );
// }


// We don't have to expose the reload function
// It's currently only useful in other functions

// function scripts() {
//     return gulp.src(paths.src, {
//             sourcemaps: true
//         })
//         .pipe(babel()) // 使用babel轉成瀏覽器所看的懂的JavaScript
//         .pipe(uglify()) // 將程式碼壓縮成一行
//         //.pipe(concat('index.min.js')) // 合併所有檔案
//         .pipe(gulp.dest(paths.dest)); // 編譯後產出到指定資料夾中
// }



// function nodemons(done) {
//     nodemon({
//         script: 'dist/index.js' // 使用nodemon監聽指定的程式碼
//             ,
//         ext: 'js' // 監聽JavaScript
//             ,
//         watch: paths.src // watch ES2015 code
//             ,
//         tasks: ['default'] // compile synchronously onChange
//             ,
//         env: {
//             'NODE_ENV': 'development'
//         }
//     })
//     done();
// }



// const build = gulp.series(clean, gulp.parallel(scripts));
// const serve = gulp.series(clean, scripts, nodemons);

// // deploy product
// gulp.task('default', build);
// // development 開發模式
// gulp.task('serve', serve);


// gulp.task('watch', function() {
//     gulp.watch('scss/*.scss', gulp.series('sass'));

// });

