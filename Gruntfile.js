module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    //paths: ["css"]
                    sourceMap: true,
                    sourceMapFilename: "compiled/css/style-map.css",
                    sourceMapURL: "style-map.css"
                },
                files: {
                    "compiled/css/style.css": "src/css/style.less"
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
                    "compiled/css/style.css": "src/css/style.less"
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'compiled/css/style.min.css': ['compiled/css/style.css']
                }
            }
        },
        csssplit: {
		    split: {
		      src: ['compiled/css/style.css'],
		      dest: 'compiled/css/',
		      options: {
		          maxSelectors: 4095,
		          maxPages: 2,
		          suffix: '_split_'
		      }
		    },
		},
        autoprefixer: {
          options: {
            browsers: [
              "Android >= 4",
              "Chrome >= 20",
              "Firefox >= 24",
              "Explorer >= 8",
              "iOS >= 6",
              "Opera >= 12",
              "Safari >= 6"
            ]
          },
          dev: {
            options: {
              map: true
            },
            src: "compiled/css/style.css"
          }
        },
        watch: {
            files: "**/*.less",
            tasks: ["less:development", "autoprefixer", "csssplit:split", "cssmin"]
        }
    });

    grunt.registerTask('default', ["less:development", "autoprefixer", "csssplit:split", "cssmin"]);
    grunt.registerTask('build', ['less:production', 'cssmin']);
};