module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    //paths: ["css"]
                },
                files: {
                    "css/style.css": "css/style.less"
                }
            },
            production: {
                options: {
                    //paths: ["css"],
                    cleancss: true
                    //modifyVars: {
                    //    imgPath: '"http://mycdn.com/path/to/images"',
                    //    bgColor: 'red'
                    //}
                },
                files: {
                    "css/style.css": "css/style.less"
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'css/style.min.css': ['css/style.css']
                }
            }
        },
        watch: {
            files: "**/*.less",
            tasks: ["less:development"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['less:development']);
    grunt.registerTask('build', ['less:production', 'cssmin']);
};