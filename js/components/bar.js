(function ($) {
    $.fn.bar = function (params) {
        var settings = $.extend({
                tab: null
            }, params),
            t = this,
            webview = settings.tab.instance.webview.webview,
            extMenu = settings.tab.instance.extensionsMenu,
            menu = settings.tab.instance.menu

        $(settings.tab).on('ready', function () {
            extMenu = settings.tab.instance.extensionsMenu
            menu = settings.tab.instance.menu
        })

        this.menuBtn = $('<div class="ripple-icon menuBtn">').appendTo($(this))
        this.backBtn = $('<div class="ripple-icon backBtn">').appendTo($(this))
        this.forwardBtn = $('<div class="ripple-icon forwardBtn">').appendTo($(this))
        this.refreshBtn = $('<div class="ripple-icon refreshBtn">').appendTo($(this))
        this.searchBox = $('<div class="searchBox">').appendTo($(this))
        var searchInput = $('<input class="searchInput">').appendTo(this.searchBox)
        this.extBtn = $('<div class="ripple-icon extBtn">').appendTo($(this))
        var suggestions = $('<div class="suggestions">').appendTo($(this))
        this.extMenu = $('<div class="ext-menu">').appendTo($(this))
        this.searchInput = searchInput.searchInput({
            tab: settings.tab
        })
        this.suggestions = suggestions.suggestions({
            tab: settings.tab,
            searchInput: this.searchInput
        })
        var menuIcon = $('<i class="material-icons btn-icon" style="font-size: 22px">menu</i>').appendTo(this.menuBtn),
            backIcon = $('<i class="material-icons btn-icon" style="font-size: 22px">arrow_back</i>').appendTo(this.backBtn),
            forwardIcon = $('<i class="material-icons btn-icon" style="font-size: 22px">arrow_forward</i>').appendTo(this.forwardBtn),
            refreshIcon = $('<i class="material-icons btn-icon" style="font-size: 22px">refresh</i>').appendTo(this.refreshBtn),
            searchIcon = $('<i class="material-icons">search</i>').appendTo(this.searchBox),
            extIcon = $('<i class="material-icons btn-icon" style="font-size: 22px;">more_vert</i>').appendTo(this.extBtn)

        $('.ripple-icon').mousedown(function () {
            makeRippleIconButton($(this))
        })
        this.backBtn.click(function () {
            if (webview.canGoBack()) {
                webview.goBack();
            }
        });
        this.forwardBtn.click(function () {
            if (webview.canGoForward()) {
                webview.goForward();
            }
        });
        this.refreshBtn.click(function () {
            webview.reload();
            settings.tab.instance.refreshExtensions();
        });
        this.extBtn.click(function (e) {
            e.stopPropagation()
            if (!extMenu.toggled) {
                extMenu.show()
            } else {
                extMenu.hide()
            }

        });
        this.menuBtn.click(function (e) {
            e.stopPropagation()
            if (!menu.toggled) {
                menu.show()
            } else {
                menu.hide()
            }

        });
        return this
    }

}(jQuery))