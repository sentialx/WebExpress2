const remote = require('electron').remote;

var mainWindow = remote.getCurrentWindow();
$(document).ready(function() {
  var tab = new Tab();
  addTab(new TabWindow(tab, "webexpress://newtab"), tab);
});
window.onresize = function(event) {
    calcSizes(false,false);
};

$('.windowbutton-close').click(function() {
  mainWindow.close();
});
$('.windowbutton-maximize').click(function() {
  if (mainWindow.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow.maximize();
  }

});
$('.windowbutton-minimize').click(function() {
  mainWindow.minimize();
});
