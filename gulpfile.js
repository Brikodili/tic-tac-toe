const { series, src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const gzip = require('gulp-gzip');
const webserver = require('gulp-webserver');
const sourcemaps = require('gulp-sourcemaps');

sass.compiler = require('node-sass');

function ws () {
    return src('./public').pipe(webserver({
        fallback: './app/index.html',
        directoryListing: false,
        compression: true,
        livereload: true,
        open: true
    }));
}

function html () {
    return src(['./app/*.html', './app/*.js']).pipe(dest('./public'));
}

function assets () {
    return src('./app/assets/**/*')
        .pipe(dest('./public/assets'));
}

function buildHtml () {
    src('./app/*.html')
        .pipe(gzip({
            compLevel: 9
        }))
        .pipe(dest('./public'));

    src('./app/assets/**/*.js')
        .pipe(gzip({
            compLevel: 9
        }))
        .pipe(dest('./public/assets'));

    return src('./app/assets/**/*.svg')
        .pipe(gzip({
            compLevel: 9
        }))
        .pipe(dest('./public/assets'));
}

function buildCss () {
    return src('./app/assets/styles/*.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(gzip({
            compLevel: 9
        }))
        .pipe(dest('./public/assets/styles'));
}

function sassCompile () {
    return src('./app/assets/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(csso())
        .pipe(dest('./public/assets/styles'));
}

function sassWatcher () {
    return watch('./app/assets/styles/**/*.scss', sassCompile);
}

function assetsWatcher () {
    return watch('./app/assets/**/*', assets);
}

function htmlWatcher () {
    return watch('./app/*.html', html);
}

exports.watchers = parallel(sassWatcher, htmlWatcher, assetsWatcher);
exports.build = parallel(buildHtml, buildCss, assets);
exports.default = parallel(html, sassCompile, assets, ws, sassWatcher, htmlWatcher, assetsWatcher);
