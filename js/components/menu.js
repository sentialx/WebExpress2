(function ($) {
    $.fn.menu = function (params) {
        var settings = $.extend({
                tab: null
            }, params),
            t = this

        t.toggled = false
        $(t).css({
            opacity: 0,
            display: 'none'
        })
        t.menuItems = $('<ul class="menu-items" style="z-index: 9999;background-color: #fff;">').appendTo($(t))
        t.settings = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.history = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.bookmarks = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.downloads = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.extensions = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.newWindow = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.fullscreen = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.devTools = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.screenshot = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)
        t.private = $('<li data-ripple-color="#444" class="menu-item ripple">').appendTo(t.menuItems)

        t.settings.append('<i class="material-icons">settings</i>')
        t.settings.append('<p class="menu-text">Settings</p>')

        t.history.append('<i class="material-icons">history</i>')
        t.history.append('<p class="menu-text">History</p>')

        t.bookmarks.append('<i class="material-icons">collections_bookmark</i>')
        t.bookmarks.append('<p class="menu-text">Bookmarks</p>')

        t.downloads.append('<i class="material-icons">file_download</i>')
        t.downloads.append('<p class="menu-text">Downloads</p>')

        t.extensions.append('<i class="material-icons">extension</i>')
        t.extensions.append('<p class="menu-text">Extensions</p>')

        t.newWindow.append('<i class="material-icons">desktop_windows</i>')
        t.newWindow.append('<p class="menu-text">New window</p>')

        t.fullscreen.append('<i class="material-icons">fullscreen</i>')
        t.fullscreen.append('<p class="menu-text">Fullscreen</p>')

        t.devTools.append('<i class="material-icons">code</i>')
        t.devTools.append('<p class="menu-text">Developer tools</p>')

        t.screenshot.append('<i class="material-icons">photo</i>')
        t.screenshot.append('<p class="menu-text">Take screenshot</p>')

        t.private.append('<i class="material-icons">vpn_lock</i>')
        t.private.append('<p class="menu-text">Private mode</p>')

        $(t).find('.menu-item').mousedown(function (e) {
            makeRippleMenuItem(this, e);
        })

        $(window).on('click', function () {
            t.hide()
        })
        t.history.click(function (e) {
            var tab = new Tab(),
                instance = $('#instances').browser({
                    tab: tab,
                    url: 'webexpress://history'
                })
            addTab(instance, tab);
        });

        t.devTools.mousedown(function (e) {
            settings.tab.instance.webview.webview.openDevTools({
                mode: 'right'
            });
        });


        t.show = function () {
            //menu fade in animation
            $(t).css('display', 'block');
            $(t).css('opacity', 0).animate({
                opacity: 1
            }, 200, function () {
                t.toggled = true
            }).css('top', -32).animate({
                top: 8
            }, {
                queue: false,
                duration: 200
            });
        }

        t.hide = function () {
            //menu fade out animation
            $(t).css('opacity', 1).animate({
                opacity: 0
            }, 200).css('top', 8).animate({
                top: -32
            }, {
                queue: false,
                complete: function () {
                    $(t).css('display', 'none');
                },
                duration: 200
            });
            t.toggled = false;
        }

        return this
    }

}(jQuery))