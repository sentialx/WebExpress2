class TabWindow {
  constructor (tab){
  tab.tabWindow = $("<div>").load("browser.html", function() {

    var webview = tab.tabWindow.find('.webview')[0];
    var searchInput = $(tab.tabWindow.find('.searchInput')[0]);

    setInterval(function(){
      $(webview).css('width', tab.tabWindow.find('#webviewcontainer').width());
      $(webview).css('height', tab.tabWindow.find('#webviewcontainer').height());
    }, 1);
    searchInput.keypress(function (e) {
      if (e.which == 13) {
        if (searchInput.val().indexOf("http://") > -1 || searchInput.val().indexOf("https://") > -1) {
          webview.loadURL(searchInput.val());
        } else {
          webview.loadURL("http://" + searchInput.val());
        }
        console.log(searchInput.val());
        return false;
      }
    });
  }).appendTo('#instances');
}
}
function Tab() {

}
