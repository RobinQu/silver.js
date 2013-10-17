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
              mountFolder(connect, "test")
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
      dist: ["dist"],
      server: [".tmp"]
    }

  });
  
  grunt.registerTask("server", ["clean", "jshint", "connect:liveload", "open", "watch"]);
  
  grunt.registerTask("dist", ["clean:dist", "jshint", "concat:dist", "copy:dist"]);
  
  grunt.registerTask("test", ["clean:server", "jshint", "connect:test", "watch"]);
  
  grunt.registerTask("default", ["server"]);
  
};