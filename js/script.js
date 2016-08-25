const remote = require('electron').remote;
var window = remote.getCurrentWindow();

  $('.windowbutton-close').click(function() {
    window.close();
  });
  $('.windowbutton-maximize').click(function() {
    window.maximize();
  });
  $('.windowbutton-minimize').click(function() {

  });




  /*    var remote = require('remote');
      var BrowserWindow = remote.require('browser-window');

     function init() {
          document.getElementByClassName("windowbutton-close").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.minimize();
               alert("z");
          });

          document.getElementByClassName("windowbutton-maximaze").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.maximize();
          });

          document.getElementByClassName("windowbutton-minimaze").addEventListener("click", function (e) {
               var window = BrowserWindow.getFocusedWindow();
               window.close();
          });
     };

     document.onreadystatechange = function () {
          if (document.readyState == "complete") {
               init();
          }
     };
*/
