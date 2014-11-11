module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            options: {
                sourceMap: true,
                outputSourceFiles: true
            },
            lessFiles: {
                expand: true,
                flatten: false,
                src: ['css/style.less'],
                dest: '',
                ext: '.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
};