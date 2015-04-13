module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    //paths: ["css"]
                },
                files: {
                    "../compiled/css/style.css": "css/style.less"
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
                    "../compiled/css/style.css": "css/style.less"
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    '../compiled/css/style.min.css': ['css/style.css']
                }
            }
        },
        csssplit: {
		    split: {
		      src: ['../compiled/css/style.css'],
		      dest: '../compiled/css/',
		      options: {
		          maxSelectors: 4095,
		          maxPages: 2,
		          suffix: '_split_'
		      }
		    },
		},
        watch: {
            files: "**/*.less",
            tasks: ["less:development","csssplit:split"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csssplit');

    grunt.registerTask('default', ['less:development']);
    grunt.registerTask('build', ['less:production', 'cssmin']);
};