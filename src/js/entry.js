import '../scss/page.scss';
import Model from './model';
import Router from './router';
 
window.$ = $;
window.jQuery = jQuery;

$(document).ready(function(){
  console.log("Initializing");
  
  $("#app").width(window.innerWidth);
  $("#app").height(window.innerHeight);

  let appModel = new Model();
  let appRouter = new Router(appModel);
  appRouter.initialize();
});