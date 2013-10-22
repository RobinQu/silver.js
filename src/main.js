require.config({
  packages: [
    "views",
    "utils"
  ],
  paths: {
    backbone: "bower_components/backbone/backbone",
    jquery: "bower_components/jquery/jquery",
    underscore: "bower_components/underscore/underscore",
    requirejs: "bower_components/requirejs/require"
  },
  shim: {
    backbone: {
      deps: [
        "jquery",
        "underscore"
      ],
      exports: "Backbone"
    },
    underscore: {
      exports: "_"
    }
  }
});


define(["./ag"], function (Ag) {
  "use strict";
  if((typeof window !== "undefined") && !window.Ag) {
    window.Ag = Ag;
  }
  console.log("Silver.js is loaded as window.Ag!");
});