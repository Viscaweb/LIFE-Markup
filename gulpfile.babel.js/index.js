const {series, src, dest} = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const concat = require('gulp-concat');
const Filter = require('gulp-filter');
const autoprefixer = require('autoprefixer');
const splitCSS = require('gulp-bless');
const rename = require('gulp-rename');
const urlRebase = require('postcss-url');
const cssnano = require('cssnano')({
    preset: ['default', {
        discardComments: {
            removeAll: true,
        },
    }]
});

const urlRebaseOptions = [
    {filter: '**/*.eot', url: 'rebase'},
    {filter: '**/*.ttf', url: 'rebase'},
    {filter: '**/*.woff', url: 'rebase'},
    {filter: '**/js/lsicons/fonts/*.svg', url: 'rebase'},
];

const plugins = [
    autoprefixer({
        browsers: [
            "Android >= 4",
            "Chrome >= 20",
            "Firefox >= 24",
            "Explorer >= 8",
            "iOS >= 6",
            "Opera >= 12",
            "Safari >= 6"
        ]
    }),
    urlRebase(urlRebaseOptions),
    cssnano
];


function mainCSS(cb) {
    const filter = Filter('**/*.less', {restore: true});

    return src([
        'src/css/style.less',
        'compiled/js/lsicons/style.css',
        // 'compiled/js/owl.carousel/assets/owl.carousel.css',
        'compiled/js/toastr/toastr.min.css',
        'src/css/comments.css'
    ])
        .pipe(filter)
        .pipe(less())
        .pipe(filter.restore)
        .pipe(concat('style.css'))
        .pipe(postcss(plugins, {
            from: './compiled/js/lsicons/style.css',
            to: './compiled/css/style.css'
        }))
        .pipe(dest('./compiled/css'));
}

function cssMatchCommentsIFrame(cb) {
    return src(['src/css/less/match-comments-iframe.less'])
        .pipe(less())
        .pipe(postcss(plugins, {
            from: './compiled/js/lsicons/fonts/style.css',
            to: './compiled/css/style.css'
        }))
        .pipe(dest('./compiled/css'));
}

function splitForIE10(cb) {
    return src('./compiled/css/style.css')
        .pipe(rename('style_ie10.css'))
        .pipe(splitCSS({
            imports: false,
            suffix: '-'
        }))
        .pipe(postcss(plugins, {
            from: './compiled/js/lsicons/fonts/style.css',
            to: './compiled/css/style.css'
        }))
        .pipe(dest('./compiled/css'));
}


exports.css = mainCSS;
exports.cssMatchIFrame = cssMatchCommentsIFrame;
exports.default = series(cssMatchCommentsIFrame, mainCSS, splitForIE10);