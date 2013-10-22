/*global requirejs */
var tests = [];
var file;
for (file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

tests.push("ag");

requirejs.config({
  // Karma serves files from "/base"
  baseUrl: "/base/src",
  
  packages: ["utils", "views"],
  
  paths: {
    backbone: "../lib/bower_components/backbone/backbone",
    jquery: "../lib/bower_components/jquery/jquery",
    underscore: "../lib/bower_components/underscore/underscore"
  },

  shim: {
    "underscore": {
        exports: "_"
    },
    
    backbone: {
      deps: [
        "jquery",
        "underscore"
      ],
      exports: "Backbone"
    } 
  },

  // ask Require.js to load these files (all our tests)
  deps: tests,

  // start test run, once Require.js is done
  callback: window.__karma__.start
});