var LIVERELOAD_PORT = 35730;
var lrSnippet = require("connect-livereload")({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
  "use strict";
  return connect.static(require("path").resolve(dir));
};

module.exports = function (grunt) {
  "use strict";
    
  // show elapsed time at the end
  require("time-grunt")(grunt);
  // load all grunt tasks
  require("load-grunt-tasks")(grunt);
  
  grunt.initConfig({
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: "./src",
          dest: ".tmp",
          src: ["ag/**/*"]
        }// , 
//         {
//           expand: true,
//           dot: true,
//           cwd: "./public",
//           dest: ".tmp/ag",
//           src: ["bower_components/**/*"]
//         }
        ]
      }
    },
    
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["jshint"]
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          "app/test/**/*.html",
          "app/src/**/*.js"
        ]
      }
    },
    
    open: {
      server: {
        path: "http://localhost:<%= connect.options.port %>"
      }
    },

    connect: {
      options: {
        port: 9001,
        hostname: "0.0.0.0"
      },
      liveload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, "public"),
              mountFolder(connect, "src")
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, "test")
            ];
          }
        }
      }
    },
    
    jshint: {
      files: [
        "Gruntfile.js",
        "src/**/*.js"
      ],
      options: {
        jshintrc: ".jshintrc",
        ignores: []
      }
    },
    
    clean: {
      dist: [".tmp", "dist"],
      server: [".tmp"]
    },
    
    requirejs: {
      dist: {
        // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        options: {
          name: "ag",
          baseUrl: ".tmp/ag",
          mainConfigFile: ".tmp/ag/main.js",
          paths: {
            backbone: "empty:",
            jquery: "empty:",
            underscore: "empty:"
          },
          out: "dist/ag.js",
          optimize: "none",
          generateSourceMaps: false,
          // required to support SourceMaps
          // http://requirejs.org/docs/errors.html#sourcemapcomments
          preserveLicenseComments: false,
          useStrict: true,
          wrap: true,
          // https://github.com/mishoo/UglifyJS2
          // uglify2: {
          //   output: {
          //     beautify: true,
          //     "indent_level": 2
          //   },
          //   compress: {
          //     sequences: false,
          //     "global_defs": {
          //       DEBUG: false
          //     }
          //   },
          //   warnings: true,
          //   mangle: false
          // }
        }
      }
    },
    
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          "dist/ag.min.js": ["dist/ag.js"]
        },
        options: {
          sourceMappingURL: "ag.map.js",
          sourceMap: "dist/ag.map.js"
        }
      }
    }
  });
  
  grunt.registerTask("server", ["clean:server", "jshint", "connect:liveload", "open", "watch"]);
  
  grunt.registerTask("build", ["clean:dist", "jshint", "copy:dist", "requirejs:dist", "uglify:dist"]);
  
  grunt.registerTask("test", ["clean:server", "jshint", "connect:test", "watch"]);
  
  grunt.registerTask("default", ["server"]);
  
};