class API {
  constructor(tab, parent) {
    var t = this
    var instance = tab.instance;
    var webview = tab.instance.webview.webview;
    
    t.webviews = []
      //global variables
    t.tab = new Tab(tab, t)
    t.instance = new Instance(tab.instance, t)
    t.webview = new WebView(webview, t)

    //window methods
    t.getTitlebarColor = function () {
      return $('#titlebar').css('background-color')
    }
    t.setTitlebarColor = function (color) {
      $(parent.document.body).css('background-color', color)
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
        $(parent.document.body).find(".addTabBtn").css('color', '#fff')
      } else {
        $(parent.document.body).find(".windowbutton-close").css('background-image', 'url(img/WindowButtons/close.png)')
        $(parent.document.body).find(".windowbutton-minimize").css('background-image', 'url(img/WindowButtons/minimize.png)')
        $(parent.document.body).find(".windowbutton-maximize").css('background-image', 'url(img/WindowButtons/maximize.png)')
        $(parent.document.body).find(".addTabBtn").css('color', '#444')
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

    //tabs object
    t.tabs = {
        getSelectedTab: function () {
          for (var i = 0; i < parent.tabCollection.length; i++) {
            if (parent.tabCollection[i].selected) {
              var itab = parent.tabCollection[i]
              var tab = new Tab(itab, t)
              return tab
            }
          }
        },
      }
      //history
    t.history = {
      getHistory: function () {
        return JSON.parse(parent.fs.readFileSync(parent.historyPath))
      }
    }


    //dispose API
    t.dispose = function () {
      for (var i = 0; i < t.webviews.length; i++) {
        t.webviews[i].destroy()
      }
      $(t).trigger('api-dispose')
      $(t).off()
    }
  }
}
class WebView {
  constructor(webview, api) {
    api.webviews.push(this)
    var t = this;
    //methods    
    t.destroy = function () {
      t.removeHandlers()
      $(t).off()
    }
    t.loadURL = function (url, options) {
      webview.loadURL(url, options)
    }
    t.loadURL = function (url) {
      webview.loadURL(url)
    }
    t.getURL = function () {
      return webview.getURL()
    }
    t.getTitle = function () {
      return webview.getTitle()
    }
    t.isLoading = function () {
      return webview.isLoading()
    }
    t.isWaitingForResponse = function () {
      return webview.isWaitingForResponse()
    }
    t.stop = function () {
      webview.stop()
    }
    t.reload = function () {
      webview.reload()
    }
    t.reloadIgnoringCache = function () {
      webview.reloadIgnoringCache()
    }
    t.canGoBack = function () {
      return webview.canGoBack()
    }
    t.canGoForward = function () {
      return webview.canGoForward()
    }
    t.canGoToOffset = function (offset) {
      return webview.canGoToOffset(offset)
    }
    t.clearHistory = function () {
      webview.clearHistory()
    }
    t.goBack = function () {
      webview.goBack()
    }
    t.canGoForward = function () {
      webview.canGoForward()
    }
    t.goToIndex = function (index) {
      webview.goToIndex(index)
    }
    t.goToOffset = function (offset) {
      webview.goToOffset(offset)
    }
    t.isCrashed = function () {
      return webview.isCrashed()
    }
    t.setUserAgent = function (userAgent) {
      webview.setUserAgent(userAgent)
    }
    t.getUserAgent = function () {
      return webview.getUserAgent()
    }
    t.insertCSS = function (css) {
      webview.insertCSS(css)
    }
    t.executeJavaScript = function (code, userGesture, callback) {
      webview.executeJavaScript(code, userGesture, callback)
    }
    t.executeJavaScript = function (code, userGesture) {
      webview.executeJavaScript(code, userGesture)
    }
    t.executeJavaScript = function (code, callback) {
      webview.executeJavaScript(code, false, callback)
    }
    t.openDevTools = function () {
      webview.openDevTools()
    }
    t.closeDevTools = function () {
      webview.closeDevTools()
    }
    t.isDevToolsOpened = function () {
      return webview.isDevToolsOpened()
    }
    t.isDevToolsFocused = function () {
      return webview.isDevToolsFocused()
    }
    t.inspectElement = function (x, y) {
      webview.inspectElement(x, y)
    }
    t.inspectServiceWorker = function () {
      webview.inspectServiceWorker()
    }
    t.setAudioMuted = function (muted) {
      webview.setAudioMuted(muted)
    }
    t.isAudioMuted = function () {
      return webview.isAudioMuted()
    }
    t.undo = function () {
      webview.undo()
    }
    t.redo = function () {
      webview.redo()
    }
    t.cut = function () {
      webview.cut()
    }
    t.copy = function () {
      webview.copy()
    }
    t.paste = function () {
      webview.paste()
    }
    t.pasteAndMatchStyle = function () {
      webview.pasteAndMatchStyle()
    }
    t.delete = function () {
      webview.delete()
    }
    t.selectAll = function () {
      webview.selectAll()
    }
    t.unselect = function () {
      webview.unselect()
    }
    t.replace = function (text) {
      webview.replace(text)
    }
    t.replaceMisspelling = function (text) {
      webview.replaceMisspelling(text)
    }
    t.insertText = function (text) {
      webview.insertText(text)
    }
    t.findInPage = function (text, options) {
      return webview.findInPage(text, options)
    }
    t.findInPage = function (text) {
      return webview.findInPage(text)
    }
    t.stopFindInPage = function (action) {
      webview.stopFindInPage(action)
    }
    t.print = function (options) {
      webview.print(options)
    }
    t.printToPDF = function (options, callback) {
      webview.printToPDF(options, callback)
    }
    t.printToPDF = function (options) {
      webview.printToPDF(options)
    }
    t.capturePage = function (rect, callback) {
      webview.capturePage(rect, callback)
    }
    t.capturePage = function (callback) {
      webview.capturePage(callback)
    }
    t.sendInputEvent = function (event) {
      webview.sendInputEvent(event)
    }
    t.setZoomFactor = function (factor) {
      webview.setZoomFactor(factor)
    }
    t.setZoomLevel = function (level) {
      webview.setZoomLevel(level)
    }
    t.showDefinitionForSelection = function () {
      webview.showDefinitionForSelection()
    }
    t.getWebContents = function () {
        return webview.getWebContents()
      }
      //events
    t.removeHandlers = function () {
      webview.removeEventListener('did-frame-finish-load', frameFinishLoadRaise)
      webview.removeEventListener('did-start-loading', startLoadRaise)
      webview.removeEventListener('page-title-updated', titleUpdatedRaise)
      webview.removeEventListener('page-favicon-updated', faviconUpdatedRaise)
      webview.removeEventListener('load-commit', loadCommitRaise)
      webview.removeEventListener('did-fail-load', loadFailRaise)
      webview.removeEventListener('did-stop-loading', loadStopRaise)
      webview.removeEventListener('did-get-response-details', gotResponseDetailsRaise)
      webview.removeEventListener('did-get-redirect-request', gotRedirectRequestRaise)
      webview.removeEventListener('dom-ready', domReadyRaise)
      webview.removeEventListener('enter-html-full-screen', enterHTMLFullscreenRaise)
      webview.removeEventListener('leave-html-full-screen', leaveHTMLFullscreenRaise)
      webview.removeEventListener('console-message', consoleMessageRaise)
      webview.removeEventListener('found-in-page', foundInPageRaise)
      webview.removeEventListener('new-window', newWindowRaise)
      webview.removeEventListener('will-navigate', willNavigateRaise)
      webview.removeEventListener('did-navigate', navigatedRaise)
      webview.removeEventListener('did-navigate-in-page', navigatedInPageRaise)
      webview.removeEventListener('close', closedRaise)
      webview.removeEventListener('crashed', crashedRaise)
      webview.removeEventListener('gpu-crashed', gpuCrashedRaise)
      webview.removeEventListener('plugin-crashed', pluginCrashedRaise)
      webview.removeEventListener('destroyed', destroyedRaise)
      webview.removeEventListener('media-started-playing', mediaStartedPlayingRaise)
      webview.removeEventListener('media-paused', mediaPausedRaise)
      webview.removeEventListener('update-target-url', updateTargetUrlRaise)
      webview.removeEventListener('devtools-opened', devtoolsOpenedRaise)
      webview.removeEventListener('devtools-closed', devtoolsClosedRaise)
      webview.removeEventListener('devtools-focused', devtoolsFocusedRaise)
    }
    webview.addEventListener('did-frame-finish-load', frameFinishLoadRaise)
    webview.addEventListener('did-start-loading', startLoadRaise)
    webview.addEventListener('page-title-updated', titleUpdatedRaise)
    webview.addEventListener('page-favicon-updated', faviconUpdatedRaise)
    webview.addEventListener('load-commit', loadCommitRaise)
    webview.addEventListener('did-fail-load', loadFailRaise)
    webview.addEventListener('did-stop-loading', loadStopRaise)
    webview.addEventListener('did-get-response-details', gotResponseDetailsRaise)
    webview.addEventListener('did-get-redirect-request', gotRedirectRequestRaise)
    webview.addEventListener('dom-ready', domReadyRaise)
    webview.addEventListener('enter-html-full-screen', enterHTMLFullscreenRaise)
    webview.addEventListener('leave-html-full-screen', leaveHTMLFullscreenRaise)
    webview.addEventListener('console-message', consoleMessageRaise)
    webview.addEventListener('found-in-page', foundInPageRaise)
    webview.addEventListener('new-window', newWindowRaise)
    webview.addEventListener('will-navigate', willNavigateRaise)
    webview.addEventListener('did-navigate', navigatedRaise)
    webview.addEventListener('did-navigate-in-page', navigatedInPageRaise)
    webview.addEventListener('close', closedRaise)
    webview.addEventListener('crashed', crashedRaise)
    webview.addEventListener('gpu-crashed', gpuCrashedRaise)
    webview.addEventListener('plugin-crashed', pluginCrashedRaise)
    webview.addEventListener('destroyed', destroyedRaise)
    webview.addEventListener('media-started-playing', mediaStartedPlayingRaise)
    webview.addEventListener('media-paused', mediaPausedRaise)
    webview.addEventListener('update-target-url', updateTargetUrlRaise)
    webview.addEventListener('devtools-opened', devtoolsOpenedRaise)
    webview.addEventListener('devtools-closed', devtoolsClosedRaise)
    webview.addEventListener('devtools-focused', devtoolsFocusedRaise)

    function frameFinishLoadRaise(isMain) {
      $(t).triggerHandler('load-finish', {
        url: webview.getURL(),
        title: webview.getTitle(),
        isFrameMain: isMain
      })
    }

    function startLoadRaise() {
      $(t).triggerHandler('load-start', {
        url: webview.getURL(),
        title: webview.getTitle()
      })
    }

    function titleUpdatedRaise(s) {
      $(t).triggerHandler('title-updated', {
        title: s.title
      })
    }

    function faviconUpdatedRaise(s) {
      $(t).triggerHandler('favicon-updated', {
        favicons: s.favicons
      })
    }

    function loadCommitRaise(u, isMain) {
      $(t).triggerHandler('load-commit', {
        url: u,
        isFrameMain: isMain
      })
    }

    function loadFailRaise(ec, ed, vu, isMain) {
      $(t).triggerHandler('load-fail', {
        errorCode: ec,
        errorDescription: ed,
        validatedURL: vu,
        isFrameMain: isMain
      })
    }

    function loadStopRaise() {
      $(t).triggerHandler('load-stop')
    }

    function gotResponseDetailsRaise(s) {
      $(t).triggerHandler('got-response-details', s)
    }

    function gotRedirectRequestRaise(ou, nu, isMain) {
      $(t).triggerHandler('got-redirect-request', {
        oldURL: ou,
        newURL: nu,
        isFrameMain: isMain
      })
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
      $(t).triggerHandler('console-message', {
        level: le,
        message: m,
        line: li,
        sourceId: si
      })
    }

    function foundInPageRaise(r) {
      $(t).triggerHandler('found-in-page', {
        result: result
      })
    }

    function newWindowRaise(u, fn, d, o) {
      $(t).triggerHandler('new-window', {
        url: u,
        frameName: fn,
        disposition: d,
        options: o
      })
    }

    function willNavigateRaise(u) {
      $(t).triggerHandler('will-navigate', {
        url: u
      })
    }

    function navigatedRaise(u) {
      $(t).triggerHandler('navigated', {
        url: u
      })
    }

    function navigatedInPageRaise(isMain, u) {
      $(t).triggerHandler('navigated-in-page', {
        isFrameMain: isMain,
        url: u
      })
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
      $(t).triggerHandler('update-target-url', {
        url: u
      })
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
  }
}
class Instance {
  constructor(instance, api) {
    var t = this;
    var webview = new WebView(instance.webview.webview, api)
    t.getBarColor = function () {
      return tab.tabWindow.find('.bar').css('background-color')
    }
    t.getWebView = function () {
      return webview
    }
  }
}
class Tab {
  constructor(tab, api) {
    var t = this
    t.getTabColor = function () {
      return $(tab.Tab).css('background-color')
    }
    t.setTabColor = function (color) {

    }
    t.getTabForegroundColor = function () {
      return tab.Foreground
    }
    t.instance = new Instance(tab.instance, api)
  }
}