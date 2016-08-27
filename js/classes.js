class TabWindow {
  constructor (tab){
  tab.tabWindow = $("<div>").load("browser.html", function() {

    var webview = tab.tabWindow.find('.webview')[0];
    var searchInput = $(tab.tabWindow.find('.searchInput')[0]);
    var bar = $(tab.tabWindow.find('.bar')[0]);
    var searchBox = $(tab.tabWindow.find('.searchBox')[0]);
    var refreshBtn = $(tab.tabWindow.find('.refreshBtn')[0]);
    var backBtn = $(tab.tabWindow.find('.backBtn')[0]);
    var forwardBtn = $(tab.tabWindow.find('.forwardBtn')[0]);
    var menuBtn = $(tab.tabWindow.find('.menuBtn')[0]);
    var refreshBtnIcon = $(refreshBtn.find('.refreshBtnIcon')[0]);
    var backBtnIcon = $(backBtn.find('.backBtnIcon')[0]);
    var forwardBtnIcon = $(forwardBtn.find('.forwardBtnIcon')[0]);
    var menuBtnIcon = $(menuBtn.find('.menuBtnIcon')[0]);

    setInterval(function(){
      $(webview).css('width', tab.tabWindow.find('#webviewcontainer').width());
      $(webview).css('height', tab.tabWindow.find('#webviewcontainer').height());
    }, 1);
    webview.addEventListener('did-finish-load', function() {
      getColor();
      tab.Title.empty();
      tab.Title.append("<p style='display: inline; width:50%;'>" + webview.getTitle() + "</p>");
    });
    webview.addEventListener('page-favicon-updated', function(favicon) {
      console.log(favicon.favicons[0]);
      tab.Favicon.empty();
      tab.Favicon.append("<div class='favicon' style='background-image: url(\"" + favicon.favicons[0] + "\");'></div>");
    });
    backBtn.click(function(){
      if (webview.canGoBack()) {
        webview.goBack();
      }
      Ripple.makeRipple(backBtn, backBtn.width() / 2, backBtn.height() / 2, (backBtn.width() - 8) / 2, (backBtn.height() - 8) / 2, 400, 0);
    });
    forwardBtn.click(function(){
      if (webview.canGoForward()) {
        webview.goForward();
      }
      Ripple.makeRipple(forwardBtn, forwardBtn.width() / 2, forwardBtn.height() / 2, (forwardBtn.width() - 8) / 2, (forwardBtn.height() - 8) / 2, 400, 0);
    });
    refreshBtn.click(function(){
      webview.reload();
      Ripple.makeRipple(refreshBtn, refreshBtn.width() / 2, refreshBtn.height() / 2, (refreshBtn.width() - 8) / 2, (refreshBtn.height() - 8)/ 2, 400, 0);
    });
    menuBtn.click(function(){
      Ripple.makeRipple(menuBtn, menuBtn.width() / 2, menuBtn.height() / 2, (menuBtn.width() - 8) / 2, (menuBtn.height() - 8)/ 2, 400, 0);
    });

    function getColor() {
      webview.capturePage(function(image){
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        var img = new Image();
        img.onload = function() {
          context.drawImage(img, 0, 0);
          var myData = context.getImageData(2, 2, img.width, img.height);
          if (myData != null) {
            tab.Color = rgbToHex(myData.data[0], myData.data[1], myData.data[2]);
            tab.Tab.css('background-color',tab.Color);
            bar.css('background-color', tab.Color);
            var brightness = colorBrightness(tab.Color);
            if (brightness < 125) {
              //white
              tab.Title.removeClass('light').addClass('dark');
              tab.closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close-white.png")');
              searchBox.css('background-color', 'rgba(255,255,255,0.2) ');
              searchInput.css('color', '#fff');
              tab.Foreground = 'white';
              forwardBtnIcon.css('background-image', 'url("img/forward-white.png")');
              backBtnIcon.css('background-image', 'url("img/back-white.png")');
              refreshBtnIcon.css('background-image', 'url("img/refresh-white.png")');
              menuBtnIcon.css('background-image', 'url("img/menu-white.png")');
              refreshBtn.attr('data-ripple-color', '#fff');
              backBtn.attr('data-ripple-color', '#fff');
              forwardBtn.attr('data-ripple-color', '#fff');
              menuBtn.attr('data-ripple-color', '#fff');
            } else {
              //black
              tab.Title.removeClass('dark').addClass('light');
              tab.closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")');
              searchInput.css('color', '#444');
              searchBox.css('background-color', '#fff');
              tab.Foreground = 'black';
              forwardBtnIcon.css('background-image', 'url("img/forward.png")');
              backBtnIcon.css('background-image', 'url("img/back.png")');
              refreshBtnIcon.css('background-image', 'url("img/refresh.png")');
              menuBtnIcon.css('background-image', 'url("img/menu.png")');
              refreshBtn.attr('data-ripple-color', '#444');
              backBtn.attr('data-ripple-color', '#444');
              forwardBtn.attr('data-ripple-color', '#444');
              menuBtn.attr('data-ripple-color', '#444');
            }
        }
        };
        img.src = image.toDataURL();
        canvas.width = img.width;
        canvas.height = img.height;
      });
    }

    searchInput.keypress(function (e) {
      if (e.which == 13) {
        if (isURL(searchInput.val())) {
          if (searchInput.val().indexOf("http://") > -1 || searchInput.val().indexOf("https://") > -1 || searchInput.val().indexOf("www.") > -1) {
            webview.loadURL(searchInput.val());
          } else {
            webview.loadURL("http://" + searchInput.val());
          }
        } else {
          webview.loadURL("http://www.google.com/search?q=" + searchInput.val());
        }
        return false;
      }
    });
  }).appendTo('#instances');
}

}
function isURL(s) {
    var regexp = /[a-zA-Z-0-9]+\.[a-zA-Z-0-9]{2,3}/;
    return regexp.test(s);
 }
 function rgbToHex(r, g, b) {
     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
 }
 function componentToHex(c) {
     var hex = c.toString(16);
     return hex.length == 1 ? "0" + hex : hex;
 }
function Tab() {

}
