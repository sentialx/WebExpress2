(function ($) {
    $.fn.webview = function (params) {
        var settings = $.extend({
                url: "",
                tab: null
            }, params),
            t = this,
            lastUrl = ''

        t.webview = $('<webview class="webview" preload="js/extensions/preload.js" autosize="on" src="webexpress://newtab">').appendTo($(this))[0]
        t.storage = new Storage()
        t.contextMenu = new ContextMenu(t.webview)
        t.fitToParent = function () {
            $(t.webview).css({
                width: window.innerWidth,
                height: window.innerHeight - 79
            })
        }
        t.fitToParent()

        $(window).resize(function () {
            t.fitToParent()
        })

        t.webview.addEventListener('ipc-message', function (e) {
            if (e.channel == 'clicked') {
                settings.tab.instance.bar.suggestions.css('display', 'none')
                settings.tab.instance.extensionsMenu.hide()
                settings.tab.instance.menu.hide()
            }
        })

        //webview ready event
        $(t.webview).ready(function () {
            var ses = t.webview.getWebContents().session

            settings.tab.instance.bar.searchInput.focus()
            settings.tab.Favicon.css('opacity', "0")
            settings.tab.Preloader.css('opacity', "0")

            ses.on('will-download', (event, item, webContents) => {
                console.log("handled download") //TODO make download
            })

            /*if (fileToStart != null) {
                url = fileToStart;
                fileToStart = null;
            }*/

            if (settings.url != null || settings.url != "")
                t.webview.loadURL(settings.url)
        });
        //webview newwindow event
        t.webview.addEventListener('new-window', (e) => {
            const protocol = require('url').parse(e.url).protocol
            if (protocol === 'http:' || protocol === 'https:') {
                var tab = new Tab(),
                    instance = $('#instances').browser({
                        tab: tab,
                        url: e.url
                    })
                addTab(instance, tab);
            }
        })

        //webview page load end event
        t.webview.addEventListener('did-frame-finish-load', function () {

            settings.tab.Favicon.css('opacity', "1");
            settings.tab.Preloader.css('opacity', "0");

            if (lastUrl != t.webview.getURL()) {
                t.storage.saveHistory(t.webview.getTitle(), t.webview.getURL())
                lastUrl = t.webview.getURL()
            }
            if (!t.webview.getURL().startsWith("webexpress://newtab") && t.webview.getURL() != "about:blank") {
                settings.tab.instance.bar.searchInput.val(t.webview.getURL());
            }
        });
        //webview start loading event
        t.webview.addEventListener('did-start-loading', function () {
            settings.tab.instance.bar.suggestions.css('display', 'none');

            settings.tab.Favicon.css('opacity', "0");
            settings.tab.Preloader.css('opacity', "1");
        });
        //webview page title changed event
        t.webview.addEventListener('page-title-updated', function (title) {
            settings.tab.Title.html("<p style='display: inline; width:50%;'>" + t.webview.getTitle() + "</p>");
            if (lastUrl != t.webview.getURL()) {
                t.storage.saveHistory(t.webview.getTitle(), t.webview.getURL())
                lastUrl = t.webview.getURL()
            }
            if (!t.webview.getURL().startsWith("webexpress://newtab") && t.webview.getURL() != "about:blank") {
                settings.tab.instance.bar.searchInput.val(t.webview.getURL());
            }
        });
        //webview load commit event
        t.webview.addEventListener('load-commit', function (url, isMain) {
            settings.tab.instance.bar.suggestions.css('display', 'none');
        });
        //webview page favicon updated event
        t.webview.addEventListener('page-favicon-updated', function (favicon) {
            settings.tab.Favicon.html("<div class='favicon' style='background-image: url(\"" + favicon.favicons[0] + "\");'></div>");
            settings.tab.Favicon.css('opacity', "1");
            settings.tab.Preloader.css('opacity', "0");
        });

        return this
    }
}(jQuery))