



const autoprefixer = require('autoprefixer');
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
    {filter: 'fonts/*.svg', url: 'rebase'},
];




module.exports = [
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
    //urlRebase(urlRebaseOptions),
    cssnano
];