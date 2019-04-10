function defaultTask(cb) {
    const gulp = require('gulp');
    const postcss = require('gulp-postcss');
    const sourcemaps = require('gulp-sourcemaps');
    const less = require('gulp-less');
    const cssnano = require('cssnano')({
        preset: ['default', {
            discardComments: {
                removeAll: true,
            },
        }]
    });

    const autoprefixer = require('autoprefixer');

    var processors = [
        autoprefixer,
        cssnano
    ];

    return gulp.src([
        'src/css/style.less',
        'src/css/less/match-comments-iframe.less'
    ])
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest('./compiled/css'));
}


exports.default = defaultTask;