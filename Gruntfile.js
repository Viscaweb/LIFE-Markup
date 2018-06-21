module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        less: {
            development: {
                options: {
                    //paths: ["css"]
                    // sourceMap: false,
                    // sourceMapFilename: "compiled/css/style-map.css",
                    // sourceMapURL: "style-map.css",
                    //modifyVars: {
                    //   'brand-primary': 'red'
                    //}

                },
                files: {
                    "compiled/css/style.css": "src/css/style.less",
                    "compiled/css/match-comments-iframe.css": "src/css/less/match-comments-iframe.less"
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
                    'compiled/css/style.min.css': ['compiled/css/style.css'],
                    'compiled/css/match-comments-iframe.min.css': ['compiled/css/match-comments-iframe.css']
                }
            }
        },
        csssplit: {
		    split: {
		      src: ['compiled/css/style.css'],
		      dest: 'compiled/css/style.css',
		      options: {
		          maxSelectors: 4095,
		          maxPages: 2,
		          suffix: '_split_'
		      }
		    },
		},

		csscss: {
		   dist: {
		    options: {
		      outputJson: true
		    },
		    files: {
		      'output.json': ['compiled/css/style.css']
		    }
		  }
		},

        postcss: {
          options: {
            // map: true,
            processors: [
              require('autoprefixer-core')({browsers: ['last 1 version']})
            ]
          },
          dist: {
            src: ['compiled/css/style.css']
          }
        },

        compress: {
          main: {
            options: {
              mode: 'gzip'
            },
            expand: true,
            src: ['compiled/css/style.css'],
            dest: 'compiled/css/style.css.gzip',
          }
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
              // map: true
            },
            src: [
              "compiled/css/style.css",
              "compiled/css/match-comments-iframe.css"
            ]
          }
        },
        watch: {
            files: "**/*.less",
            tasks: ["less:development", "autoprefixer", "csssplit:split", "cssmin"]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csssplit');
    grunt.loadNpmTasks('grunt-csscss');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-compress');
    //grunt.loadNpmTasks('grunt-uncss');

    grunt.registerTask('default', ["less:development", "autoprefixer", "csssplit:split", "cssmin"]);
    grunt.registerTask('build', ['less:production', 'cssmin']);
};