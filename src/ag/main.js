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
  console.log(Ag.version);
});