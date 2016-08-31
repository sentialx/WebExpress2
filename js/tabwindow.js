class TabWindow {
    constructor(tab, url) {
        var s = this;
        this.searchInput = null;
        tab.tabWindow = $("<div>").load("browser.html", function() {
            var webview = tab.tabWindow.find('.webview')[0];
            var searchInput = $(tab.tabWindow.find('.searchInput')[0]);
            var bar = $(tab.tabWindow.find('.bar')[0]);
            var searchBox = $(tab.tabWindow.find('.searchBox')[0]);
            var refreshBtn = $(tab.tabWindow.find('.refreshBtn')[0]);
            var backBtn = $(tab.tabWindow.find('.backBtn')[0]);
            var forwardBtn = $(tab.tabWindow.find('.forwardBtn')[0]);
            var menuBtn = $(tab.tabWindow.find('.menuBtn')[0]);
            var refreshBtnIcon = $(tab.tabWindow.find('.refreshBtnIcon')[0]);
            var backBtnIcon = $(tab.tabWindow.find('.backBtnIcon')[0]);
            var forwardBtnIcon = $(tab.tabWindow.find('.forwardBtnIcon')[0]);
            var menuBtnIcon = $(tab.tabWindow.find('.menuBtnIcon')[0]);
            var suggestions_ul = $(tab.tabWindow.find('.suggestions-ul')[0]);
            var menu = $(tab.tabWindow.find('.menu')[0]);
            var menuToggled = false;
            var menuItems = $(tab.tabWindow.find('.menu-items')[0]);
            var settings = $(tab.tabWindow.find('.menu-item')[0]);
            var history = $(tab.tabWindow.find('.menu-item')[1]);
            var bookmarks = $(tab.tabWindow.find('.menu-item')[2]);
            var downloads = $(tab.tabWindow.find('.menu-item')[3]);
            var extensions = $(tab.tabWindow.find('.menu-item')[4]);
            var newWindow = $(tab.tabWindow.find('.menu-item')[5]);
            var fullscreen = $(tab.tabWindow.find('.menu-item')[6]);
            var devtools = $(tab.tabWindow.find('.menu-item')[7]);
            var screenshot = $(tab.tabWindow.find('.menu-item')[8]);
            var privacy = $(tab.tabWindow.find('.menu-item')[9]);
            var iconRippleTime = 300;
            var rippleTime = 400;
            var firstUrl = url;
            var json = '';
            var lastUrl = '';
            s.searchInput = searchInput;
            var fs = require('fs');
            fs.stat('foo.txt', function(err, stat) {
                if(err.code == 'ENOENT') {
                    var blob = new Blob(['{"history":[]}'], {
                        type: "text/plain;charset=utf-8"
                    });
                    saveAs(blob, "history.json");
                }
            });



            $(webview).ready(function() {
                $.ajax({
                    type: "GET",
                    url: "http://google.com/complete/search?client=firefox&q=webexpress",
                    success: function(data) {

                    }
                });
                var ses = webview.getWebContents().session;
                searchInput.focus();
                ses.on('will-download', (event, item, webContents) => {
                    console.log("handled download"); //TODO make download
                });
                webview.loadURL(url);
            });
            menu.css('visibility', 'hidden');
            menu.css('opacity', 1);
            setInterval(function() {
                $('#webviewcontainer').css('height', $(window).height() - 74);
                $(webview).css('width', $(window).width());
                $(webview).css('height', $(window).height() - 74);
                menu.css('margin-left', $(window).width() - menu.width() - 16);

            }, 1);
            settings.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            history.click(function(e) {

                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
                var tab = new Tab();
                var tw = new TabWindow(tab, `webexpress://history`);
                addTab(tw, tab);

            });
            bookmarks.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            downloads.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            extensions.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            newWindow.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            fullscreen.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            devtools.click(function(e) {
                webview.openDevTools();
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            screenshot.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });
            privacy.click(function(e) {
                console.log("sth");
                var relX = e.pageX - $(this).offset().left;
                var relY = e.pageY - $(this).offset().top;
                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), rippleTime, 0);
            });

            $(window).click(function() {
                if (menuToggled) {
                    menu.css('opacity', 1).animate({
                        opacity: 0
                    }, 200).css('top', 8).animate({
                        top: -32
                    }, {
                        queue: false,
                        complete: function() {
                            menu.css('visibility', 'hidden');
                        },
                        duration: 200
                    });
                    menuToggled = false;
                }
                suggestions_ul.css('display', 'none');
                suggestions_ul.css('height', 185);
            });

            webview.addEventListener('did-finish-load', function() {
                tab.Title.empty();
                tab.Title.append("<p style='display: inline; width:50%;'>" + webview.getTitle() + "</p>");
                searchInput.val(webview.getURL());
                if (webview.getURL().startsWith("webexpress://newtab")) {

                } else {

                }

                if (lastUrl != webview.getURL()) {
                    var array;
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd
                    }

                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    today = mm + '-' + dd + '-' + yyyy;
                    var fs = require('fs');
                    fs.readFile('history.json', function(err, data) {
                        if (err) throw err;
                        json = data.toString();
                        json = json.replace("\ufeff", "");
                        var obj = JSON.parse(json);
                        if (!webview.getURL().startsWith("webexpress://")) {
                            obj['history'].push({
                                "link": webview.getURL(),
                                "title": webview.getTitle(),
                                "date": today
                            });
                            var jsonStr = JSON.stringify(obj);
                            json = jsonStr;
                            var blob = new Blob([json], {
                                type: "text/plain;charset=utf-8"
                            });
                            saveAs(blob, "history.json");
                            lastUrl = webview.getURL();
                        }
                    });

                }
                setTimeout(function() {
                    webview.executeJavaScript("function s() {var markup = document.documentElement.innerHTML; return markup} s();", false, function(result) {
                        var regexp = /<meta name='?.theme-color'?.*>/;
                        if (regexp.test(result)) {
                            var regex = result.match(regexp).toString();
                            tab.Color = regex.match(/content="(.*?)"/)[1];
                            tab.Tab.css('background-color', tab.Color);
                            bar.css('background-color', tab.Color);
                            changeContrast();
                        } else {
                            getColor();
                        }
                    });
                }, 200);

            });
            webview.addEventListener('did-start-loading', function() {
                setTimeout(function() {
                    searchInput.val(webview.getURL());
                    suggestions_ul.css('display', 'none');
                    suggestions_ul.css('height', 185);
                }, 200);

            });
            webview.addEventListener('page-favicon-updated', function(favicon) {
                console.log(favicon.favicons[0]);
                tab.Favicon.empty();
                tab.Favicon.append("<div class='favicon' style='background-image: url(\"" + favicon.favicons[0] + "\");'></div>");
            });
            backBtn.click(function() {
                if (webview.canGoBack()) {
                    webview.goBack();
                }
                Ripple.makeRipple(backBtn, backBtn.width() / 2, backBtn.height() / 2, (backBtn.width() - 8) / 2, (backBtn.height() - 8) / 2, iconRippleTime, 0);
            });
            forwardBtn.click(function() {
                if (webview.canGoForward()) {
                    webview.goForward();
                }
                Ripple.makeRipple(forwardBtn, forwardBtn.width() / 2, forwardBtn.height() / 2, (forwardBtn.width() - 8) / 2, (forwardBtn.height() - 8) / 2, iconRippleTime, 0);
            });
            refreshBtn.click(function() {
                webview.reload();
                Ripple.makeRipple(refreshBtn, refreshBtn.width() / 2, refreshBtn.height() / 2, (refreshBtn.width() - 8) / 2, (refreshBtn.height() - 8) / 2, iconRippleTime, 0);
            });
            menuBtn.click(function() {
                Ripple.makeRipple(menuBtn, menuBtn.width() / 2, menuBtn.height() / 2, (menuBtn.width() - 8) / 2, (menuBtn.height() - 8) / 2, iconRippleTime, 0);
                if (!menuToggled) {
                    menu.css('visibility', 'visible');
                    menu.css('opacity', 0).animate({
                        opacity: 1
                    }, 200, function() {
                        menuToggled = true
                    }).css('top', -32).animate({
                        top: 8
                    }, {
                        queue: false,
                        duration: 200
                    });

                } else {
                    menu.css('opacity', 1).animate({
                        opacity: 0
                    }, 200).css('top', 8).animate({
                        top: -32
                    }, {
                        queue: false,
                        complete: function() {
                            menu.css('visibility', 'hidden');
                        },
                        duration: 200
                    });
                    menuToggled = false;
                }
            });
            menu.click(function(event) {
                event.stopPropagation();
            });

            function changeContrast() {
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


            function getColor() {
                webview.capturePage(function(image) {

                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    var img = new Image();
                    img.onload = function() {
                        context.drawImage(img, 0, 0);
                        var myData = context.getImageData(2, 2, img.width, img.height);
                        if (myData != null) {
                            tab.Color = rgbToHex(myData.data[0], myData.data[1], myData.data[2]);
                            tab.Tab.css('background-color', tab.Color);
                            bar.css('background-color', tab.Color);
                            changeContrast();
                        }
                    };
                    img.src = image.toDataURL();
                    canvas.width = img.width;
                    canvas.height = img.height;
                });
            }

            var suggestCallBack;


            searchInput.focusin(function() {
                $(this).select();
            });

            setInterval(function() {
                if (searchInput.val() == "" || searchInput.val() == null) {
                    suggestions_ul.css('display', 'none');
                    suggestions_ul.css('height', 185);
                }
            }, 1);

            function autocomplete(input, text, strings) {
                if (!(strings.length < 1)) {
                  strings = strings.reverse();
                  if (strings[0].toLowerCase().startsWith(text.toLowerCase())) {
                    console.log(strings[0]);
                    input.val(strings[0]);
                    input[0].setSelectionRange(text.length, strings[0].length);
                  }
                }
            }
            var allLinks = [];

            function getSelectionText() {
                var text = "";
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type != "Control") {
                    text = document.selection.createRange().text;
                }
                return text;
            }
            searchInput[0].onkeydown = function() {
                var key = event.keyCode || event.charCode;
                if (key != 40 && key != 38) {
                    if (searchInput.val() == "") return;
                    suggestions_ul.empty();
                    var items = 0;
                    $.ajax({
                        type: "GET",
                        url: "history.json",
                        success: function(data) {
                            suggestions_ul.empty();
                            json = data.toString();
                            json = json.replace("\ufeff", "");
                            var obj = JSON.parse(json);
                            var prevLink;
                            var links = [];
                            var items = 0;
                            for (var i = 0; i < obj.history.length; i++) {
                                if (items == 3) {
                                    return;
                                }
                                if (obj.history[i].link.indexOf(searchInput.val()) !== -1 && items != 3 && !isInArray(obj.history[i].link, links)) {
                                    var str = obj.history[i].link;
                                    if (obj.history[i].link.startsWith("https://www.")) {
                                        str = str.split("https://www.")[1];
                                    }
                                    if (obj.history[i].link.startsWith("http://www.")) {
                                        str = str.split("http://www.")[1];
                                    }
                                    var s = $('<li data-ripple-color="#444" class="suggestions-li ripple" text="' + str + '">' + str + '</li>');
                                    suggestions_ul.prepend(s);
                                    suggestions_ul.css('display', 'block');
                                    suggestions_ul.css('height', 185);
                                    s.click(function(e) {
                                        suggestions_ul.css('display', 'none');
                                        suggestions_ul.css('height', 185);
                                        var curr = $(e.currentTarget);
                                        webview.loadURL(curr.attr('text'));
                                    });
                                    s.mousedown(function(e) {
                                        var relX = e.pageX - $(this).offset().left;
                                        var relY = e.pageY - $(this).offset().top;
                                        Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), 600, 0);
                                    });
                                    s.mouseover(function() {
                                        tab.tabWindow.find('.suggestions-li').removeClass("selected");
                                        $(this).addClass("selected");
                                        searchInput.val($(this).attr('text'));
                                    });
                                    links.push(str);
                                    allLinks = links;
                                    items += 1;
                                }
                            }
                            if (key != 8 && key != 13 && key != 17 && key != 18 && key != 16 && key != 9 && key != 20 && key != 46 && key != 32) {
                                autocomplete(searchInput, searchInput.val(), allLinks);
                            }
                        },
                        complete: function() {
                            if (searchInput.val().replace(getSelectionText(), "") != "" || searchInput.val().replace(getSelectionText(), "") != null) {
                                $.ajax({
                                    type: "GET",
                                    url: "http://google.com/complete/search?client=firefox&q=" + searchInput.val().replace(getSelectionText(), ""),
                                    success: function(data) {

                                        var obj = JSON.parse(data);
                                        var arr = obj[1].toString().split(",");
                                        var links = [];
                                        for (var i = 0; i < arr.length; i++) {
                                            if (!isInArray(arr[i], links)) {
                                                links.push(arr[i]);
                                            }
                                        }
                                        var uniqueLinks = [];
                                        $.each(links, function(i, el) {
                                            if ($.inArray(el, uniqueLinks) === -1) uniqueLinks.push(el);
                                        });
                                        for (var i = 0; i < uniqueLinks.length; i++) {
                                            if (items != 3) {
                                                var s = $('<li data-ripple-color="#444" class="suggestions-li ripple" text="' + uniqueLinks[i] + '">' + uniqueLinks[i] + '</li>').appendTo(suggestions_ul);
                                                suggestions_ul.css('display', 'block');
                                                suggestions_ul.css('height', 185);
                                                s.click(function(e) {
                                                    suggestions_ul.css('display', 'none');
                                                    suggestions_ul.css('height', 185);
                                                    var curr = $(e.currentTarget);
                                                    webview.loadURL("http://www.google.com/search?q=" + curr.attr('text'));

                                                });
                                                s.mousedown(function(e) {
                                                    var relX = e.pageX - $(this).offset().left;
                                                    var relY = e.pageY - $(this).offset().top;
                                                    Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), 600, 0);
                                                });
                                                s.mouseover(function() {
                                                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                                                    $(this).addClass("selected");
                                                    searchInput.val($(this).attr('text'));
                                                });
                                                items += 1;
                                            }
                                        }

                                    },


                                });
                            }
                        }
                    });

                }


            }
            searchInput.keydown(function(e) {

                if (e.keyCode == 38) { // up
                    var selected = tab.tabWindow.find(".selected");
                    console.log("sth");
                    if (selected == null) {
                        tab.tabWindow.find('li').first().addClass("selected");
                        selected = tab.tabWindow.find(".selected");
                    }
                    if (typeof selected.prev().attr("text") !== "undefined")
                        searchInput.val(selected.prev().attr('text'));

                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                    if (selected.prev().length == 0) {
                        selected.siblings().last().addClass("selected");
                        searchInput.val(selected.siblings().last().attr('text'));
                    } else {
                        selected.prev().addClass("selected");
                    }

                }
                if (e.keyCode == 40) { // down
                    var selected = tab.tabWindow.find(".selected");
                    if (selected == null) {
                        tab.tabWindow.find('li').first().addClass("selected");
                        selected = tab.tabWindow.find(".selected");
                    }
                    if (typeof selected.next().attr("text") !== "undefined")
                        searchInput.val(selected.next().attr('text'));

                    suggestions_ul.focus();

                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                    if (selected.next().length == 0) {
                        selected.siblings().first().addClass("selected");
                        searchInput.val(selected.siblings().first().attr('text'));
                    } else {
                        selected.next().addClass("selected");
                    }
                }
            });
            searchInput.keypress(function(e) {

                if (e.which == 13) {
                    tab.tabWindow.find('#webviewcontainer').css('visibility', 'visible');
                    if (!searchInput.val().startsWith("webexpress:/")) {
                        if (isURL(searchInput.val())) {
                            if (searchInput.val().startsWith("http://") || searchInput.val().startsWith("https://") || searchInput.val().startsWith("file://")) {
                                webview.loadURL(searchInput.val());
                            } else {
                                webview.loadURL("http://" + searchInput.val());
                            }
                        } else {
                            webview.loadURL("http://www.google.com/search?q=" + searchInput.val());
                        }
                    } else {
                        webview.loadURL(searchInput.val());

                    }

                    return false;
                }
            });
        }).appendTo('#instances');

    }
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function decode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function parseXml(xml) {
    var dom = null;
    if (window.DOMParser) {
        try {
            dom = (new DOMParser()).parseFromString(xml, "text/xml");
        } catch (e) {
            dom = null;
        }
    } else if (window.ActiveXObject) {
        try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml))

                window.alert(dom.parseError.reason + dom.parseError.srcText);
        } catch (e) {
            dom = null;
        }
    } else
        alert("cannot parse xml string!");
    return dom;
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
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

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function decode_utf8(s) {
    return unescape(encodeURIComponent(s));
}

function parseXml(xml) {
    var dom = null;
    if (window.DOMParser) {
        try {
            dom = (new DOMParser()).parseFromString(xml, "text/xml");
        } catch (e) {
            dom = null;
        }
    } else if (window.ActiveXObject) {
        try {
            dom = new ActiveXObject('Microsoft.XMLDOM');
            dom.async = false;
            if (!dom.loadXML(xml))

                window.alert(dom.parseError.reason + dom.parseError.srcText);
        } catch (e) {
            dom = null;
        }
    } else
        alert("cannot parse xml string!");
    return dom;
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
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
