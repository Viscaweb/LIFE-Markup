const {series, src, dest} = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const concat = require('gulp-concat');
const Filter = require('gulp-filter');
const splitCSS = require('gulp-bless');
const rename = require('gulp-rename');
const plugins = require('./postcss.plugins');
const urlRebase = require('postcss-url');

function mainCSS(cb) {
    const filter = Filter('**/*.less', {restore: true});

    return src([
        'src/css/style.less',
        // 'compiled/js/lsicons/style.css',
        'compiled/js/toastr/toastr.min.css',
        // 'src/css/comments.css'
    ])
        .pipe(filter)
        .pipe(less({
           // rootpath: './dist',
           //rewriteUrls: 'all'
        }))
        .pipe(filter.restore)
        .pipe(concat('style.css', {
            inlineImports: false,
            rebaseUrls: true
        }))
        .pipe(postcss(plugins))
        .pipe(dest('./dist'));
}

function cssMatchCommentsIFrame(cb) {
    return src(['src/css/match-comments-iframe.less'])
        .pipe(less())
        .pipe(postcss(plugins))
        .pipe(dest('./dist'));
}

function splitForIE10(cb) {
    return src('./compiled/css/style.css')
        .pipe(rename('style_ie10.css'))
        .pipe(splitCSS({
            imports: false,
            suffix: '-'
        }))
        .pipe(postcss(plugins))
        .pipe(dest('./dist'));
}

function copyFonts(cb) {
    return src([
        './compiled/js/lsicons/fonts/*',
        './compiled/js/bootstrap/fonts/*'
    ])
        .pipe(dest('./dist/fonts'))
}


exports.css = mainCSS;
exports.cssMatchIFrame = cssMatchCommentsIFrame;
exports.copyAssets = series(copyFonts);
exports.default = series(cssMatchCommentsIFrame, mainCSS, splitForIE10, copyFonts);