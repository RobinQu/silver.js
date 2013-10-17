define(["core", "views", "controller"], function (Core, Views, Controller) {
  
  "use strict";
  
  var Ag = Core.mixin({
    
    version: "0.0.1"
    
  }, Core);
  
  Ag.mixin(Ag, Views);
  Ag.Controller = Controller;
  if((typeof window !== "undefined") && !window.Ag) {
    window.Ag = Ag;
  }
  return Ag;
  
});