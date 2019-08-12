'use strict';

const gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    del = require("del"),
    jsonminify = require('gulp-jsonminify');
//  rimraf = require('rimraf'),
//  browserSync = require("browser-sync"),
//  reload = browserSync.reload;
const path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        json: 'build/json/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'src/style/main.sass',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        json: 'src/json/*.json',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        json: 'src/json/*.json'
    },
    clean: './build'
};

function html() {
    return gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html));
}

function js() {
    return gulp.src(path.src.js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)); //Выплюнем готовый файл в build
    //.pipe(reload({stream: true}));
}

function style() {
    return gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)); //И в build
    // .pipe(reload({stream: true}));
}

function images() {
    return gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
}

function json() {
    return gulp.src(path.src.json)
        .pipe(jsonminify())
        .pipe(gulp.dest(path.build.json));
}

function clean() {
    return del([path.clean]);
}

function watchFiles() {
    gulp.watch(path.watch.style, style);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.img, images);
    gulp.watch(path.watch.json, json)
}

const build = gulp.series(clean, gulp.parallel(html, style, js, images, json));

exports.html = html;
exports.json = json;
exports.js = js;
exports.style = style;
exports.images = images;
exports.build = build
exports.watch = watchFiles;