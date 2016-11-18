class API {
  constructor(tab, parent) {
    var t = this
    var instance = tab.instance;
    //layout
    t.getTitlebarColor = function () {
      return $('#titlebar').css('background-color')
    }
    t.getSelectedTab = function () {
      for (var i = 0; i < parent.tabCollection.length; i++) {
        if (parent.tabCollection[i].selected) {
          return parent.tabCollection[i]
        }
      }
    }
    t.setTitlebarColor = function (color) {
      $(parent.document.body).find('#titlebar').css('background-color', color)
      if (parent.colorBrightness(color) < 125) {
        //white
        parent.Foreground = "#fff";
      } else {
        //black
        parent.Foreground = "#444";
      }
      if (parent.Foreground == "#fff") {
        $(parent.document.body).find(".windowbutton-close").css('background-image', 'url(img/WindowButtons/close-white.png)')
        $(parent.document.body).find(".windowbutton-minimize").css('background-image', 'url(img/WindowButtons/minimize-white.png)')
        $(parent.document.body).find(".windowbutton-maximize").css('background-image', 'url(img/WindowButtons/maximize-white.png)')
        $(parent.document.body).find(".addTabImg").css('background-image', 'url(img/add-white.png)')
      } else {
        $(parent.document.body).find(".windowbutton-close").css('background-image', 'url(img/WindowButtons/close.png)')
        $(parent.document.body).find(".windowbutton-minimize").css('background-image', 'url(img/WindowButtons/minimize.png)')
        $(parent.document.body).find(".windowbutton-maximize").css('background-image', 'url(img/WindowButtons/maximize.png)')
        $(parent.document.body).find(".addTabImg").css('background-image', 'url(img/add.png)')
      }
      for (var i = 0; i < parent.tabCollection.length; i++) {
        if (parent.Foreground == "#fff") {
          parent.borderColor = "rgba(255,255,255,0.2)";
          parent.tabCollection[i].Tab.css('border-left', '1px solid rgba(255,255,255,0.1)');
          parent.tabCollection[i].Tab.css('border-right', '1px solid rgba(255,255,255,0.1)');
          parent.tabCollection[i].Tab.css('border-bottom', '1px solid rgba(255,255,255,0.1)');
          //parent.find('.border5').css('background-color', 'rgba(255,255,255,0.1)');
        } else {
          parent.borderColor = "rgba(0,0,0,0.2)";
          parent.tabCollection[i].Tab.css('border-left', '1px solid rgba(0,0,0,0.1)');
          parent.tabCollection[i].Tab.css('border-right', '1px solid rgba(0,0,0,0.1)');
          parent.tabCollection[i].Tab.css('border-bottom', '1px solid rgba(0,0,0,0.1)');
          //parent.find('.border5').css('background-color', 'rgba(0,0,0,0.1)');
        }

        if (!parent.tabCollection[i].selected) {
          parent.normalColor = color;
          parent.tabCollection[i].Tab.css('background-color', parent.normalColor);
          if (parent.Foreground == "#fff") {
            parent.tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close-white.png")');
          } else {
            parent.tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")');
          }
          parent.tabCollection[i].Title.css('color', parent.Foreground);
        }
      }
    }
    t.getTabColor = function () {
      return $(tab.Tab).css('background-color');
    }
    t.getBarColor = function () {
      return tab.tabWindow.find('.bar').css('background-color');
    }
    //history
    t.history = function () { }

    t.history.getHistory = function () {
      return JSON.parse(parent.fs.readFileSync(parent.historyPath));
    }
    t.webview = function() {}
    function pageLoadEndEvent() {
      t.webview.pageLoadEnd()
    }
    t.webview.pageLoadEnd = function() {

    }
    tab.instance.webView.addEventListener('did-finish-load', pageLoadEndEvent)
    //dispose API
    t.dispose = function() {
       tab.instance.webView.removeEventListener('did-finish-load', pageLoadEndEvent)
    }
  }
}
