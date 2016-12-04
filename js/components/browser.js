(function ($) {

    $.fn.browser = function (params) {
        var settings = $.extend({
                url: "",
                tab: null
            }, params),
            browser = $('<div class="tabWindow">').appendTo($(this)),
            bar = $('<div class="bar">').appendTo(browser),
            content = $('<div class="content">').appendTo(browser),
            t = this,
            extensionsMenu = $('<div class="ext-menu">').appendTo(bar),
            menu = $('<div class="menu" style="z-index: 9999;">').appendTo(content)

        t.menu = menu.menu({
            tab: settings.tab
        })
        t.extensionsMenu = extensionsMenu.extensionsMenu({
            tab: settings.tab
        })



        checkFiles()
        settings.tab.tabWindow = browser

        $(settings.tab).on('ready', function (e, tab) {
            settings.tab = tab
            t.extensions = new Extensions()
            t.webview = content.webview({
                tab: settings.tab,
                url: settings.url
            })
            t.bar = bar.bar({
                tab: settings.tab
            })
            t.colors = new Colors(t.webview.webview)

            t.refreshExtensions = function () {
                t.extensions.deleteExtensions();
                t.extensionsMenu.resetExtMenu()
                t.loadExtensions()
            }

            t.loadExtensions = function () {
                t.extensions.loadExtensions(tabCollection.indexOf(settings.tab), function (jsonData) {
                    t.extensionsMenu.addExtension(extensionsPath + "/" + jsonData.folder + "/" + jsonData.icon, function () {})
                })
            }
            t.loadExtensions()
            setInterval(function () {
                t.colors.getColor(function (data) {
                    if (settings.tab.selected) {
                        settings.tab.Color = data.background
                        settings.tab.Tab.css('background-color', data.background)
                        t.bar.css('background-color', data.background)
                        changeForeground(data.foreground, data.foreground == 'white' ? '#fff' : '#444')
                    }
                })

            }, 200)

            function changeForeground(color, ripple) {
                if (settings.tab.selected) {
                    if (color == 'white') {
                        settings.tab.Title.css('color', '#fff')
                        settings.tab.Preloader.attr('color', '#fff')
                    } else if (color == 'black') {
                        settings.tab.Title.css('color', '#444')
                        settings.tab.Preloader.attr('color', '#3F51B5')
                    }

                    settings.tab.closeBtn.css('color', color)
                }

                settings.tab.Foreground = color
                if (color == 'white') {
                    t.bar.searchBox.css({
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        color: '#fff'
                    })
                    t.bar.searchInput.css('color', '#fff')
                } else if (color == 'black') {
                    t.bar.searchBox.css({
                        backgroundColor: 'white',
                        color: '#212121'
                    })
                    t.bar.searchInput.css('color', '#212121')
                }
                t.bar.refreshBtn.attr('data-ripple-color', ripple).css('color', color)
                t.bar.backBtn.attr('data-ripple-color', ripple).css('color', color)
                t.bar.forwardBtn.attr('data-ripple-color', ripple).css('color', color)
                t.bar.menuBtn.attr('data-ripple-color', ripple).css('color', color)
                t.bar.extBtn.attr('data-ripple-color', ripple).css('color', color)
            }



        })

        return this
    }


}(jQuery))