define(["core", "views", "controller"], function (Core, Views, Controller) {
  
  "use strict";
  
  var Ag = Core.mixin({
    
    version: "0.0.1"
    
  }, Core);
  
  Ag.mixin(Ag, Views);
  Ag.Controller = Controller;

  return Ag;
  
});