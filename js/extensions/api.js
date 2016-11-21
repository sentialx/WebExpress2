class API {
  constructor(tab, parent) {
    var t = this
    var instance = tab.instance;
    var webview = tab.instance.webView;
    t.webview = webview;
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
      if (colorBrightness(color) < 125) {
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
          parent.tabCollection[i].Tab.css('border-left', '1px solid rgba(255,255,255,0.1)')
          parent.tabCollection[i].Tab.css('border-right', '1px solid rgba(255,255,255,0.1)')
          parent.tabCollection[i].Tab.css('border-bottom', '1px solid rgba(255,255,255,0.1)')
          //parent.find('.border5').css('background-color', 'rgba(255,255,255,0.1)');
        } else {
          parent.borderColor = "rgba(0,0,0,0.2)";
          parent.tabCollection[i].Tab.css('border-left', '1px solid rgba(0,0,0,0.1)')
          parent.tabCollection[i].Tab.css('border-right', '1px solid rgba(0,0,0,0.1)')
          parent.tabCollection[i].Tab.css('border-bottom', '1px solid rgba(0,0,0,0.1)')
          //parent.find('.border5').css('background-color', 'rgba(0,0,0,0.1)');
        }

        if (!parent.tabCollection[i].selected) {
          parent.normalColor = color
          parent.tabCollection[i].Tab.css('background-color', parent.normalColor)
          if (parent.Foreground == "#fff") {
            parent.tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close-white.png")')
          } else {
            parent.tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")')
          }
          parent.tabCollection[i].Title.css('color', parent.Foreground)
        }
      }
    }
    t.getTabColor = function () {
      return $(tab.Tab).css('background-color')
    }
    t.setTabColor = function () {

    }
    t.getBarColor = function () {
      return tab.tabWindow.find('.bar').css('background-color')
    }
    //history
    t.history = function () { }

    t.history.getHistory = function () {
      return JSON.parse(parent.fs.readFileSync(parent.historyPath))
    }
    //webview methods
    t.webview.loadURL = webview.loadURL;
    t.webview.getURL = webview.getURL;
    t.webview.getTitle = webview.getTitle;
    t.webview.isLoading = webview.isLoading;
    t.webview.isWaitingForResponse = webview.isWaitingForResponse;
    t.webview.stop = webview.stop;
    t.webview.reload = webview.reload;
    t.webview.reloadIgnoringCache = webview.reloadIgnoringCache;
    t.webview.canGoBack = webview.canGoBack;
    t.webview.canGoForward = webview.canGoForward;
    t.webview.canGoToOffset = webview.canGoToOffset;
    t.webview.clearHistory = webview.clearHistory;
    t.webview.goBack = webview.goBack;
    t.webview.goForward = webview.goForward;
    t.webview.goToIndex = webview.goToIndex;
    t.webview.goToOffset = webview.goToOffset;
    t.webview.isCrashed = webview.isCrashed;
    t.webview.setUserAgent = webview.setUserAgent;
    t.webview.getUserAgent = webview.getUserAgent;
    t.webview.insertCSS = webview.insertCSS;
    t.webview.executeJavaScript = webview.executeJavaScript;
    t.webview.openDevTools = webview.openDevTools;
    t.webview.closeDevTools = webview.closeDevTools;
    t.webview.isDevToolsOpened = webview.isDevToolsOpened;
    t.webview.isDevToolsFocused = webview.isDevToolsFocused;
    t.webview.inspectElement = webview.inspectElement;
    t.webview.inspectServiceWorker = webview.inspectServiceWorker;
    t.webview.setAudioMuted = webview.setAudioMuted;
    t.webview.isAudioMuted = webview.isAudioMuted;
    t.webview.undo = webview.redo;
    t.webview.redo = webview.cut;
    t.webview.cut = webview.copy;
    t.webview.copy = webview.paste;
    t.webview.pasteAndMatchStyle = webview.pasteAndMatchStyle;
    t.webview.delete = webview.delete;
    t.webview.selectAll = webview.selectAll;
    t.webview.unselect = webview.unselect;
    t.webview.replace = webview.replace;
    t.webview.replaceMisspelling = webview.replaceMisspelling;
    t.webview.insertText = webview.insertText;
    t.webview.findInPage = webview.findInPage;
    t.webview.stopFindInPage = webview.stopFindInPage;
    t.webview.print = webview.print;
    t.webview.printToPDF = webview.printToPDF;
    t.webview.capturePage = webview.capturePage;
    t.webview.send = webview.send;
    t.webview.sendInputEvent = webview.sendInputEvent;
    t.webview.setZoomFactor = webview.setZoomFactor;
    t.webview.setZoomLevel = webview.setZoomLevel;
    t.webview.showDefinitionForSelection = webview.showDefinitionForSelection;
    t.webview.getWebContents = webview.getWebContents;

    //webview events
    function frameFinishLoadRaise(isMain) {
      $(t).triggerHandler('load-finish', { url: webview.getURL(), title: webview.getTitle(), isFrameMain: isMain })
    }
    function startLoadRaise() {
      $(t).triggerHandler('load-start', { url: webview.getURL(), title: webview.getTitle() })
    }
    function titleUpdatedRaise(s) {
      $(t).triggerHandler('title-updated', { title: s.title })
    }
    function faviconUpdatedRaise(s) {
      $(t).triggerHandler('favicon-updated', { favicons: s.favicons })
    }
    function loadCommitRaise(u, isMain) {
      $(t).triggerHandler('load-commit', { url: u, isFrameMain: isMain })
    }
    function loadFailRaise(ec, ed, vu, isMain) {
      $(t).triggerHandler('load-fail', { errorCode: ec, errorDescription: ed, validatedURL: vu, isFrameMain: isMain })
    }
    function loadStopRaise() {
      $(t).triggerHandler('load-stop')
    }
    function gotResponseDetailsRaise(s) {
      $(t).triggerHandler('got-response-details', s)
    }
    function gotRedirectRequestRaise(ou, nu, isMain) {
      $(t).triggerHandler('got-redirect-request', { oldURL: ou, newURL: nu, isFrameMain: isMain })
    }
    function domReadyRaise() {
      $(t).triggerHandler('dom-ready')
    }
    function enterHTMLFullscreenRaise() {
      $(t).triggerHandler('enter-html-fullscreen')
    }
    function leaveHTMLFullscreenRaise() {
      $(t).triggerHandler('leave-html-fullscreen')
    }
    function consoleMessageRaise(le, m, li, si) {
      $(t).triggerHandler('console-message', { level: le, message: m, line: li, sourceId: si })
    }
    function foundInPageRaise(r) {
      $(t).triggerHandler('found-in-page', { result: result })
    }
    function newWindowRaise(u, fn, d, o) {
      $(t).triggerHandler('new-window', { url: u, frameName: fn, disposition: d, options: o })
    }
    function willNavigateRaise(u) {
      $(t).triggerHandler('will-navigate', { url: u })
    }
    function navigatedRaise(u) {
      $(t).triggerHandler('navigated', { url: u })
    }
    function navigatedInPageRaise(isMain, u) {
      $(t).triggerHandler('navigated-in-page', { isFrameMain: isMain, url: u })
    }
    function closedRaise() {
      $(t).triggerHandler('closed')
    }
    function crashedRaise() {
      $(t).triggerHandler('crashed')
    }
    function gpuCrashedRaise() {
      $(t).triggerHandler('gpu-crashed')
    }
    function pluginCrashedRaise() {
      $(t).triggerHandler('plugin-crashed')
    }
    function destroyedRaise() {
      $(t).triggerHandler('destroyed')
    }
    function mediaStartedPlayingRaise() {
      $(t).triggerHandler('media-started-playing')
    }
    function mediaPausedRaise() {
      $(t).triggerHandler('media-paused')
    }
    function updateTargetUrlRaise(u) {
      $(t).triggerHandler('update-target-url', { url: u })
    }
    function devtoolsOpenedRaise() {
      $(t).triggerHandler('devtools-opened')
    }
    function devtoolsClosedRaise() {
      $(t).triggerHandler('devtools-closed')
    }
    function devtoolsFocusedRaise() {
      $(t).triggerHandler('devtools-focused')
    }
    var lastColor = "";
    setInterval(function() {
      if (lastColor != instance.actualColor) {
         $(t).triggerHandler('got-color', {color: instance.actualColor})
         lastColor = instance.actualColor
      }
      
    }, 1)
    function removeHandlers() {
      tab.instance.webView.removeEventListener('did-frame-finish-load', frameFinishLoadRaise)
      tab.instance.webView.removeEventListener('did-start-loading', startLoadRaise)
      tab.instance.webView.removeEventListener('page-title-updated', titleUpdatedRaise)
      tab.instance.webView.removeEventListener('page-favicon-updated', faviconUpdatedRaise)
      tab.instance.webView.removeEventListener('load-commit', loadCommitRaise)
      tab.instance.webView.removeEventListener('did-fail-load', loadFailRaise)
      tab.instance.webView.removeEventListener('did-stop-loading', loadStopRaise)
      tab.instance.webView.removeEventListener('did-get-response-details', gotResponseDetailsRaise)
      tab.instance.webView.removeEventListener('did-get-redirect-request', gotRedirectRequestRaise)
      tab.instance.webView.removeEventListener('dom-ready', domReadyRaise)
      tab.instance.webView.removeEventListener('enter-html-full-screen', enterHTMLFullscreenRaise)
      tab.instance.webView.removeEventListener('leave-html-full-screen', leaveHTMLFullscreenRaise)
      tab.instance.webView.removeEventListener('console-message', consoleMessageRaise)
      tab.instance.webView.removeEventListener('found-in-page', foundInPageRaise)
      tab.instance.webView.removeEventListener('new-window', newWindowRaise)
      tab.instance.webView.removeEventListener('will-navigate', willNavigateRaise)
      tab.instance.webView.removeEventListener('did-navigate', navigatedRaise)
      tab.instance.webView.removeEventListener('did-navigate-in-page', navigatedInPageRaise)
      tab.instance.webView.removeEventListener('close', closedRaise)
      tab.instance.webView.removeEventListener('crashed', crashedRaise)
      tab.instance.webView.removeEventListener('gpu-crashed', gpuCrashedRaise)
      tab.instance.webView.removeEventListener('plugin-crashed', pluginCrashedRaise)
      tab.instance.webView.removeEventListener('destroyed', destroyedRaise)
      tab.instance.webView.removeEventListener('media-started-playing', mediaStartedPlayingRaise)
      tab.instance.webView.removeEventListener('media-paused', mediaPausedRaise)
      tab.instance.webView.removeEventListener('update-target-url', updateTargetUrlRaise)
      tab.instance.webView.removeEventListener('devtools-opened', devtoolsOpenedRaise)
      tab.instance.webView.removeEventListener('devtools-closed', devtoolsClosedRaise)
      tab.instance.webView.removeEventListener('devtools-focused', devtoolsFocusedRaise)
    }
    tab.instance.webView.addEventListener('did-frame-finish-load', frameFinishLoadRaise)
    tab.instance.webView.addEventListener('did-start-loading', startLoadRaise)
    tab.instance.webView.addEventListener('page-title-updated', titleUpdatedRaise)
    tab.instance.webView.addEventListener('page-favicon-updated', faviconUpdatedRaise)
    tab.instance.webView.addEventListener('load-commit', loadCommitRaise)
    tab.instance.webView.addEventListener('did-fail-load', loadFailRaise)
    tab.instance.webView.addEventListener('did-stop-loading', loadStopRaise)
    tab.instance.webView.addEventListener('did-get-response-details', gotResponseDetailsRaise)
    tab.instance.webView.addEventListener('did-get-redirect-request', gotRedirectRequestRaise)
    tab.instance.webView.addEventListener('dom-ready', domReadyRaise)
    tab.instance.webView.addEventListener('enter-html-full-screen', enterHTMLFullscreenRaise)
    tab.instance.webView.addEventListener('leave-html-full-screen', leaveHTMLFullscreenRaise)
    tab.instance.webView.addEventListener('console-message', consoleMessageRaise)
    tab.instance.webView.addEventListener('found-in-page', foundInPageRaise)
    tab.instance.webView.addEventListener('new-window', newWindowRaise)
    tab.instance.webView.addEventListener('will-navigate', willNavigateRaise)
    tab.instance.webView.addEventListener('did-navigate', navigatedRaise)
    tab.instance.webView.addEventListener('did-navigate-in-page', navigatedInPageRaise)
    tab.instance.webView.addEventListener('close', closedRaise)
    tab.instance.webView.addEventListener('crashed', crashedRaise)
    tab.instance.webView.addEventListener('gpu-crashed', gpuCrashedRaise)
    tab.instance.webView.addEventListener('plugin-crashed', pluginCrashedRaise)
    tab.instance.webView.addEventListener('destroyed', destroyedRaise)
    tab.instance.webView.addEventListener('media-started-playing', mediaStartedPlayingRaise)
    tab.instance.webView.addEventListener('media-paused', mediaPausedRaise)
    tab.instance.webView.addEventListener('update-target-url', updateTargetUrlRaise)
    tab.instance.webView.addEventListener('devtools-opened', devtoolsOpenedRaise)
    tab.instance.webView.addEventListener('devtools-closed', devtoolsClosedRaise)
    tab.instance.webView.addEventListener('devtools-focused', devtoolsFocusedRaise)


    function getColor(callback) {
      webview.executeJavaScript("function s() {var markup = document.documentElement.innerHTML; return markup} s();", false, function (result) {
        var regexp = /<meta name='?.theme-color'?.*>/;
        if (regexp.test(result)) {
          //getting color from <meta name="theme-color" content="...">
          var regex = result.match(regexp).toString();
          var color = regex.match(/content="(.*?)"/)[1];
          callback(color, true)
        } else {
          //getting color from top of a website
          if (webview != null && webview.getWebContents() != null) {
            try {
              webview.capturePage({ x: 0, y: 0, width: 2, height: 2 }, function (image) {
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                var img = new Image();
                img.onload = function () {
                  context.drawImage(img, 0, 0);
                  var myData = context.getImageData(1, 1, 2, 2);
                  if (myData != null) {
                    callback(rgbToHex(myData.data[0], myData.data[1], myData.data[2]), false)
                  }
                };

                img.src = image.toDataURL();
                canvas.width = 0;
                canvas.height = 0;
              });
            } catch (e) {

            }

          }
        }
      });
    }

    //dispose API
    t.dispose = function () {
      removeHandlers();

      $(t).trigger('api-dispose')
      $(t).off();
    }
  }
}
