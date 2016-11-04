class TabWindow {

    constructor(tab, url) {
        var s = this;
        this.searchInput = null;
        this.webView = null;
        this.tab = tab;
        tab.tabWindow = $("<div>").load("browser.html", function() {
            //main section
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
            var extBtn = $(tab.tabWindow.find('.extBtn')[0]);
            var extBtnIcon = $(tab.tabWindow.find('.extBtnIcon')[0]);
            //suggestions
            var suggestions_ul = $(tab.tabWindow.find('.suggestions-ul')[0]);
            var suggestions = $(tab.tabWindow.find('.suggestions')[0]);
            //menu
            var menu = $(tab.tabWindow.find('.menu')[0]);
            var menuToggled = false;
            var menuItems = $(tab.tabWindow.find('.menu-items')[0]);
            var extMenu = $(tab.tabWindow.find('.ext-menu')[0]);
            var extMenuToggled = false;
            //menu actions
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

            //global properties
            var iconRippleTime = 300;
            var rippleTime = 400;
            var firstUrl = url;
            var json = '';
            var lastUrl = '';
            var historyPath = '/userdata/history.json';
            var extensionsPath = '/userdata/extensions';
            var userdataPath = '/userdata';
            s.searchInput = searchInput;
            s.webView = webview;


            //extensions api
            function setTitlebarColor(hex) {

            }
            function setTabsColor(indexArray, hex) {

            }
            function getTabsColor(indexArray) {
              return null;
            }
            function getTitlebarColor() {
              return null;
            }
            s.setBarColor = function(hex) {
                /*s.tab.tabWindow.find('.bar').css('background-color', hex);
                changeContrast();*/
            }
            s.getBarColor = function() {
              return s.tab.tabWindow.find('.bar').css('background-color');
            }


            //requires
            var fs = require('fs');
            var IsThere = require("is-there");
            var dir = require('node-dir');

            //check if directory called userdata exists
            if (!IsThere(userdataPath)) {
                fs.mkdir(userdataPath);
            }
            //check if directory called extensions exists
            if (!IsThere(extensionsPath)) {
                fs.mkdir(extensionsPath);
            }
            //check if file called history.json exists
            if (!IsThere(historyPath)) {
                fs.writeFile(historyPath, '{"history":[]}');
            }

            //global functions
            function makeRippleMenuItem(menuItem, e) {
                var relX = e.pageX - $(menuItem).offset().left;
                var relY = e.pageY - $(menuItem).offset().top;
                Ripple.makeRipple($(menuItem), relX, relY, $(menuItem).width(), $(menuItem).height(), rippleTime, 0);
            }

            function makeRippleIconButton(item) {
                Ripple.makeRipple(item, item.width() / 2, item.height() / 2, 14, 14, iconRippleTime, 0);
            }
            //Extensions system
            function loadExtensions() {
                //get all .JSON files in folder to an array
                var listOfExtensions = [];
                var listOfExtensionsDirs = [];
                dir.subdirs(extensionsPath, function(err, subdirs) {
                    if (err) throw err;
                    for (var i = 0; i < subdirs.length; i++) {

                        dir.files(subdirs[i], function(err, files) {
                            if (err) throw err;

                            for (var i2 = 0; i2 < files.length; i2++) {
                                if (endsWith(files[i2], ".json")) {
                                    listOfExtensions.push(files[i2]);
                                    //read json from all files
                                    $.ajax({
                                        type: "GET",
                                        url: files[i2],
                                        success: function(data) {
                                            var jsonObject = JSON.parse(data);
                                            //Deserialize JSON string
                                            var jName = jsonObject.name;
                                            var jFolder = jsonObject.folder;
                                            var jVersion = jsonObject.version;
                                            var jDesc = jsonObject.description;
                                            var jIcon = jsonObject.icon;
                                            var jPopupPage = jsonObject.popuppage;
                                            var jSettingsPage = jsonObject.settingspage;
                                            var jScripts = jsonObject.scripts;
                                            console.log(extensionsPath + "/" + jFolder + "/" + jIcon);
                                            addExtension(extensionsPath + "/" + jFolder + "/" + jIcon, function() {

                                            });
                                            for (var i3 = 0; i3 < jsonObject.scripts.length; i3++) {
                                                var jFileUrl = extensionsPath + "/" + jFolder + "/" + jsonObject.scripts[i3]["url"];
                                                $.ajax({
                                                    type: "GET",
                                                    url: jFileUrl,
                                                    success: function(data) {
                                                        $('head').append('<script>' + `function a(index) {var tab = tabCollection[index]; var instance = tab.instance;` + data + `} a(` + tabCollection.indexOf(tab) + `); </script>`);
                                                    }
                                                });

                                            }
                                        }
                                    });

                                }
                            }
                        });
                    }
                });
            }

            /*function loadThemes() {
                if (jFileType == "stylesheet" || jFileType == "css") {
                    $('head').append('<link rel="stylesheet" type="text/css" href="' + jFileUrl + '">')
                }
            } TODO */

            //check if background color of bar is dark or light and then set icons foreground to black or white
            function changeContrast(changeTabs) {
                var brightness = colorBrightness(tab.Color);
                if (brightness < 125) {
                    //white icons and text
                    if (changeTabs) {
                        tab.Title.removeClass('light').addClass('dark');
                        tab.closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close-white.png")');
                        tab.Preloader.attr('color', '#fff');
                    }
                    tab.Foreground = 'white';
                    searchBox.css('background-color', 'rgba(255,255,255,0.2) ');
                    searchInput.css('color', '#fff');
                    forwardBtnIcon.css('background-image', 'url("img/forward-white.png")');
                    backBtnIcon.css('background-image', 'url("img/back-white.png")');
                    refreshBtnIcon.css('background-image', 'url("img/refresh-white.png")');
                    menuBtnIcon.css('background-image', 'url("img/menu-white.png")');
                    refreshBtn.attr('data-ripple-color', '#fff');
                    backBtn.attr('data-ripple-color', '#fff');
                    forwardBtn.attr('data-ripple-color', '#fff');
                    menuBtn.attr('data-ripple-color', '#fff');
                    extBtn.attr('data-ripple-color', '#fff');
                    extBtnIcon.css('background-image', 'url("img/more-vert-white.png")');

                } else {
                    //black icons and text
                    if (changeTabs) {
                        tab.Title.removeClass('dark').addClass('light');
                        tab.closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")');
                        tab.Preloader.attr('color', '#3F51B5');
                    }
                    tab.Foreground = 'black';                   
                    searchInput.css('color', '#444');
                    searchBox.css('background-color', '#fff');
                    forwardBtnIcon.css('background-image', 'url("img/forward.png")');
                    backBtnIcon.css('background-image', 'url("img/back.png")');
                    refreshBtnIcon.css('background-image', 'url("img/refresh.png")');
                    menuBtnIcon.css('background-image', 'url("img/menu.png")');
                    refreshBtn.attr('data-ripple-color', '#444');
                    backBtn.attr('data-ripple-color', '#444');
                    forwardBtn.attr('data-ripple-color', '#444');
                    menuBtn.attr('data-ripple-color', '#444');
                    extBtn.attr('data-ripple-color', '#444');
                    extBtnIcon.css('background-image', 'url("img/more-vert.png")');

                }
            }

            //get color from top of website
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
                            if (tab.selected) {
                                tab.Tab.css('background-color', tab.Color);
                                changeContrast(true);
                            }
                            changeContrast(false);

                            bar.css('background-color', tab.Color);

                        }
                    };
                    img.src = image.toDataURL();
                    canvas.width = img.width;
                    canvas.height = img.height;
                });
            }

            //global events
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
                suggestions.css('display', 'none');
            });

            var canRemoveAll = false;
            //global timer
            setInterval(function() {
                if (searchInput.val() == "" || searchInput.val() == null) {
                    suggestions.css('display', 'none');
                    tab.tabWindow.find('.suggestions-li').each(function(i) {
                        $(this).remove();
                    });
                }
            }, 1);

            loadExtensions();

            //webview section
            //webview ready event
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
                tab.Favicon.css('opacity', "0");
                tab.Preloader.css('opacity', "0");
                if (url != null || url != "")
                webview.loadURL(url);
            });
            //webview newwindow event
            webview.addEventListener('new-window', (e) => {
                const protocol = require('url').parse(e.url).protocol
                if (protocol === 'http:' || protocol === 'https:') {
                    var tab = new Tab();
                    addTab(new TabWindow(tab, e.url), tab);
                }
            })

            //webview page load end event
            webview.addEventListener('did-finish-load', function() {


                tab.Favicon.css('opacity', "1");
                tab.Preloader.css('opacity', "0");

                if (!webview.getURL() == "webexpress://newtab" || !webview.getURL() == "about:blank") {
                    searchInput.val(webview.getURL());
                }

                //prevent duplicates in history
                if (lastUrl != webview.getURL()) {
                    var array;
                    //get today's date
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

                    //read history.json file and append new history items
                    fs.readFile(historyPath, function(err, data) {
                        if (err) throw err;
                        json = data.toString();
                        //replace weird characters in utf-8
                        json = json.replace("\ufeff", "");
                        var obj = JSON.parse(json);
                        if (!webview.getURL().startsWith("webexpress://") && !webview.getURL().startsWith("about:blank")) {
                            var date = new Date();
                            var current_hour = date.getHours();
                            var current_minute = date.getMinutes();
                            var time = `${current_hour}:${current_minute}`;
                            if (obj['history'][obj['history'].length - 1] == null) {
                                obj['history'].push({
                                    "link": webview.getURL(),
                                    "title": webview.getTitle(),
                                    "date": today,
                                    "time": time,
                                    "id": 0
                                });
                            } else {
                                obj['history'].push({
                                    "link": webview.getURL(),
                                    "title": webview.getTitle(),
                                    "date": today,
                                    "time": time,
                                    "id": obj['history'][obj['history'].length - 1].id + 1
                                });
                            }
                            var jsonStr = JSON.stringify(obj);
                            json = jsonStr;
                            //append new history item to history.json
                            fs.writeFile(historyPath, json, function(err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                            lastUrl = webview.getURL();
                        }
                    });

                }
                //webview start loading event
                webview.addEventListener('did-start-loading', function() {
                    setTimeout(function() {
                        suggestions.css('display', 'none');
                        searchInput.val(webview.getURL());
                    }, 200);
                    tab.Favicon.css('opacity', "0");
                    tab.Preloader.css('opacity', "1");
                });
                //webview link mouse over
                webview.addEventListener('update-target-url', function() {
                    //TODO
                });
                //webview page title changed event
                webview.addEventListener('page-title-updated', function() {
                    tab.Title.empty();
                    tab.Title.append("<p style='display: inline; width:50%;'>" + webview.getTitle() + "</p>");
                });
                //webview page favicon updated event
                webview.addEventListener('page-favicon-updated', function(favicon) {
                    console.log(favicon.favicons[0]);
                    tab.Favicon.empty();
                    tab.Favicon.append("<div class='favicon' style='background-image: url(\"" + favicon.favicons[0] + "\");'></div>");
                    tab.Favicon.css('opacity', "1");
                    tab.Preloader.css('opacity', "0");
                });
                //wait for 200 milliseconds
                setTimeout(function() {
                    //check if <meta name="theme-color" content="..."> tag exists. When it exists then tab gets the color from content="...", otherwise it getting color from top of a website
                    webview.executeJavaScript("function s() {var markup = document.documentElement.innerHTML; return markup} s();", false, function(result) {
                        var regexp = /<meta name='?.theme-color'?.*>/;
                        if (regexp.test(result)) {
                            //getting color from <meta name="theme-color" content="...">
                            var regex = result.match(regexp).toString();
                            tab.Color = regex.match(/content="(.*?)"/)[1];
                            if (tab.selected) {
                                tab.Tab.css('background-color', tab.Color);
                                changeContrast(true);
                            }
                            changeContrast(false);
                            bar.css('background-color', tab.Color);

                        } else {
                            //getting color from top of a website
                            getColor();
                        }
                    });
                }, 200);

            });

            //menu section
            menu.css('opacity', 0);

            //menu events
            settings.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            history.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            history.click(function(e) {
                var tab = new Tab();
                var tw = new TabWindow(tab, `webexpress://history`);
                addTab(tw, tab);
            });
            bookmarks.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            downloads.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            extensions.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            newWindow.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            fullscreen.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            devtools.mousedown(function(e) {
                webview.openDevTools();
                makeRippleMenuItem(this, e);
            });
            screenshot.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            privacy.mousedown(function(e) {
                makeRippleMenuItem(this, e);
            });
            menu.mousedown(function(event) {
                event.stopPropagation();
            });

            //extensions menu
            var extCollection = [];
            var pageCollection = [];
            var indicatorsCollection = [];
            var extCount = 0;
            var pagesCount = 1;
            var indicatorsCount = 0;

            var currentPage = tab.tabWindow.find('.ext-page');
            var selectedPage = 0;
            pageCollection.push(currentPage);

            function addExtension(image, clickEvent) {
                if (extCount != 9) {

                    var ext = $('<li class="ext-item ripple" data-ripple-color="#444"><div class="ext-item-icon" style="background-image: url(\'' + image + '\')"></div></li>').appendTo(currentPage);
                    ext.click(function() {
                        clickEvent();
                    });
                    ext.mousedown(function() {
                        makeRippleIconButton($(this));
                    });
                    extCollection.push(ext);
                    extCount += 1;
                } else {
                    extCount = 0;
                    currentPage = $('<ul class="ext-page"></ul>').appendTo(tab.tabWindow.find('.ext-menu'));

                    var ext = $('<li class="ext-item ripple" data-ripple-color="#444"><div class="ext-item-icon" style="background-image: url(\'' + image + '\')"></div></li>').appendTo(currentPage);
                    ext.click(function() {
                        clickEvent();
                    });
                    ext.mousedown(function() {
                        makeRippleIconButton($(this));
                    });
                    pageCollection.push(currentPage);
                    extCollection.push(ext);
                    pagesCount += 1;
                    extCount += 1;
                }
                resetIndicators();
                for (var i = 0; i < pageCollection.length; i++) {
                    pageCollection[i].css({
                        top: (-1 * i) * (pageCollection[i].height() + 31),
                        left: -200
                    });
                }
                pageCollection[0].css({
                    left: 0
                });
            }

            function createIndicator(index) {
                var indicator = $('<li class="ext-indicator"></li>').appendTo(tab.tabWindow.find('.ext-indicators'));

                indicator.click(function() {
                    console.log("previous Index: " + selectedPage);
                    if (selectedPage > index) {
                        //from left to right
                        pageCollection[selectedPage].css({
                            left: 0
                        }).animate({
                            left: 200
                        });
                        pageCollection[index].css({
                            left: -200
                        }).animate({
                            left: 0
                        });
                    } else if (selectedPage < index) {
                        //from right to left
                        pageCollection[selectedPage].css({
                            left: 0
                        }).animate({
                            left: -200
                        });
                        pageCollection[index].css({
                            left: 200
                        }).animate({
                            left: 0
                        });
                    }

                    for (var i = 0; i < indicatorsCollection.length; i++) {
                        indicatorsCollection[i].css({
                            height: 8,
                            width: 8,
                            top: 2
                        });
                    }
                    $(this).css({
                        height: 12,
                        width: 12,
                        top: 0
                    });

                    selectedPage = index;
                    console.log("current Index: " + index);
                });
                indicatorsCollection.push(indicator);
            }

            function resetIndicators() {
                indicatorsCollection = [];
                tab.tabWindow.find('.ext-indicators').empty();
                indicatorsCount = 0;
                while (indicatorsCount != pagesCount) {
                    createIndicator(indicatorsCount);
                    indicatorsCount += 1;
                }
                var indicatorsWidth = indicatorsCount * 14;
                tab.tabWindow.find('.ext-indicators').css({
                    width: indicatorsWidth,
                    left: (tab.tabWindow.find('.ext-menu').width() / 2) - (indicatorsWidth / 2) - 4
                });
            }

            function addExtensionDev(count) {
                var items = 0;
                while (items != count) {
                    addExtension("logo.png", function() {});
                    items += 1;
                }
            }

            //bar buttons events

            extBtn.mousedown(function() {
                makeRippleIconButton($(this));
            });
            extBtn.click(function() {
                if (!extMenuToggled) {
                    //menu fade in animation
                    extMenu.css('visibility', 'visible');
                    extMenu.css('opacity', 0).animate({
                        opacity: 1
                    }, 200, function() {
                        extMenuToggled = true
                    }).css('top', -32).animate({
                        top: 8
                    }, {
                        queue: false,
                        duration: 200
                    });

                } else {
                    //menu fade out animation
                    extMenu.css('opacity', 1).animate({
                        opacity: 0
                    }, 200).css('top', 8).animate({
                        top: -32
                    }, {
                        queue: false,
                        complete: function() {
                            extMenu.css('visibility', 'hidden');
                        },
                        duration: 200
                    });
                    extMenuToggled = false;
                }
            });
            backBtn.click(function() {
                if (webview.canGoBack()) {
                    webview.goBack();
                }
            });
            backBtn.mousedown(function() {
                makeRippleIconButton($(this));
            });
            forwardBtn.click(function() {
                if (webview.canGoForward()) {
                    webview.goForward();
                }
            });
            forwardBtn.mousedown(function() {
                makeRippleIconButton($(this));
            });
            refreshBtn.click(function() {
                webview.reload();
            });
            refreshBtn.mousedown(function() {
                makeRippleIconButton($(this));
            });
            menuBtn.click(function() {
                if (!menuToggled) {
                    //menu fade in animation
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
                    //menu fade out animation
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
            menuBtn.mousedown(function() {
                makeRippleIconButton($(this));
            });

            //searchInput section
            //searchInput events
            searchInput.focusin(function() {
                $(this).select();
            });

            searchInput.on("input", function(e) {
                var key = event.keyCode || event.charCode;

                if (key != 40 && key != 38) {

                    //get suggestions from history
                    var inputText = searchInput.val().toLowerCase().replace(getSelectionText(), "");
                    if (inputText != "") {
                        $.ajax({
                            type: "GET",
                            url: historyPath,
                            success: function(data) {
                                json = data.toString();
                                //replace weird characters utf-8
                                json = json.replace("\ufeff", "");
                                var obj = JSON.parse(json);
                                var prevLink;
                                var links = [];

                                for (var i = 0; i < obj.history.length; i++) {
                                    var str = obj.history[i].link;

                                    //remove http://, https:// etc. from item for better suggestions
                                    if (obj.history[i].link.startsWith("http://")) {
                                        str = str.split("http://")[1];
                                        if (str.startsWith("www.")) {
                                            str = str.split("www.")[1];
                                        }
                                    }
                                    if (obj.history[i].link.startsWith("https://")) {
                                        str = str.split("https://")[1];
                                        if (str.startsWith("www.")) {
                                            str = str.split("www.")[1];
                                        }
                                    }
                                    //google search engine
                                    if (!(str.indexOf("google") !== -1 &&
                                        str.indexOf("search?q=") !== -1)) {
                                        if (str.startsWith(inputText)) {
                                            links.push(str);

                                        }
                                    }
                                    links.sort(function(a, b){
                                      // ASC  -> a.length - b.length
                                      // DESC -> b.length - a.length
                                      return a.length - b.length;
                                    });

                                }

                                if (links.length > 0) {
                                    console.log("sorting");
                                    //get shortest url
                                    var oldLink = links.sort(function (a, b) { return a.length - b.length; })[0];
                                    var shortest = oldLink;
                                    shortest = shortest.substring(0, shortest.indexOf("/"));
                                    links[0] = shortest;
                                    if (oldLink.replace("/") != shortest)
                                    links.push(oldLink);
                                    else {
                                        links.splice(links.indexOf(oldLink), 1);
                                    }
                                    //remove duplicates from array
                                    var uniqueLinks = [];
                                    $.each(links, function(i, el) {
                                        if ($.inArray(el, uniqueLinks) === -1) uniqueLinks.push(el);
                                    });

                                    $.each(uniqueLinks, function(i, el) {
                                        if (uniqueLinks[i] != null) {
                                            if (!uniqueLinks[i].toLowerCase().startsWith(inputText)) {
                                                uniqueLinks.splice(i, 1);
                                            }
                                        }
                                    });
                                    uniqueLinks.sort(function(a, b){
                                      return a.length - b.length;
                                    });
                                    //limit array length to 3
                                    if (uniqueLinks.length > 3) {
                                        uniqueLinks.length = 3;
                                    }
                                    var a = uniqueLinks.length;
                                    //disable setting length to < 0
                                    if (a < 0) {
                                        a = 0;
                                    }
                                    if (a > 3) {
                                        a = 3;
                                    }

                                    allLinks = uniqueLinks;
                                    //if items length is smaller than array length, add missing items
                                    if (tab.tabWindow.find('.history').length < a) {
                                        for (var i = 0; i < a; i++) {
                                            if (uniqueLinks[i] != null || uniqueLinks[i] != "" || uniqueLinks[i] != "undefined" || typeof(uniqueLinks[i]) !== "undefined") {
                                                var item = $('<li data-ripple-color="#444" class="suggestions-li ripple history" text="' + uniqueLinks[i] + '">' + uniqueLinks[i] + '</li>');
                                                suggestions_ul.prepend(item);
                                                suggestions.css('display', 'block');
                                                item.click(function(e) {
                                                    var curr = $(e.currentTarget);
                                                    webview.loadURL(curr.attr('text'));
                                                });
                                                item.mousedown(function(e) {
                                                    var relX = e.pageX - $(this).offset().left;
                                                    var relY = e.pageY - $(this).offset().top;
                                                    Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), 600, 0);
                                                });
                                                item.mouseover(function() {
                                                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                                                    $(this).addClass("selected");
                                                    searchInput.val($(this).attr('text'));
                                                });
                                            }
                                        }
                                    } else {
                                        //otherwise edit existing items to new suggestions
                                        tab.tabWindow.find('.history').each(function(i) {
                                            var t = this;
                                            $(t).html(uniqueLinks[i]);
                                            $(t).attr('text', uniqueLinks[i]);
                                            if ($(t).html() == null || $(t).html() == "" || $(t).html() === "undefined") {
                                                $(t).remove();
                                            }
                                        });
                                    }

                                    //remove unecessary items
                                    while (tab.tabWindow.find('.history').length > a) {
                                        tab.tabWindow.find(".history").get(tab.tabWindow.find('.history').length - 1).remove();
                                    }
                                    if (canSuggest) {
                                        autocomplete(searchInput, searchInput.val());
                                        canSuggest = false;
                                    }
                                } else {
                                    //remove all items from suggestions box when array links's length is 0
                                    tab.tabWindow.find('.history').each(function(i) {
                                        $(this).remove();
                                    });

                                }
                            },
                            complete: function() {
                                suggestions.css('display', 'block');
                                //load suggestions from Google
                                if (inputText != "" || inputText != null || typeof inputText !== "undefined") {
                                    $.ajax({
                                        type: "GET",
                                        url: "http://google.com/complete/search?client=firefox&q=" + inputText,
                                        success: function(data) {
                                            var obj = JSON.parse(data);
                                            var arr = obj[1].toString().split(",");
                                            var links = [];
                                            //filter links
                                            for (var i = 0; i < arr.length; i++) {
                                                if (!isInArray(arr[i], links)) {
                                                    links.push(arr[i]);
                                                }
                                            }
                                            //remove duplicates from array
                                            var uniqueLinks = [];
                                            $.each(links, function(i, el) {
                                                if ($.inArray(el, uniqueLinks) === -1) uniqueLinks.push(el);
                                            });
                                            //sort array by length
                                            uniqueLinks.sort(function(a, b) {
                                                return a.length - b.length;
                                            });
                                            //limit array length to 3
                                            if (uniqueLinks.length > 3) {
                                                uniqueLinks.length = 3;
                                            }
                                            //if items length is smaller than array length, add missing items
                                            if (tab.tabWindow.find('.internet').length < 3) {
                                                for (var i = 0; i < 3; i++) {
                                                    var s = $('<li data-ripple-color="#444" class="suggestions-li ripple internet" text="' + uniqueLinks[i] + '">' + uniqueLinks[i] + '</li>').appendTo(suggestions_ul);
                                                    suggestions.css('display', 'block');
                                                    s.click(function(e) {
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

                                                    if (uniqueLinks[i] == null || uniqueLinks[i] == "" || typeof(uniqueLinks[i]) === "undefined") {
                                                        $(s).remove();
                                                    }
                                                }
                                            } else {
                                                //otherwise edit existing items to new suggestions
                                                tab.tabWindow.find('.internet').each(function(i) {
                                                    var t = this;
                                                    $(t).html(uniqueLinks[i]);
                                                    $(t).attr('text', uniqueLinks[i]);
                                                    if (uniqueLinks[i] == null || uniqueLinks[i] == "" || typeof(uniqueLinks[i]) === "undefined") {
                                                        $(t).remove();
                                                    }
                                                });
                                            }
                                            //remove duplicates from ul list
                                            var seen = [];
                                            tab.tabWindow.find('.suggestions-ul li').each(function() {
                                               var txt = $(this).text();
                                               if (seen[txt])
                                                   $(this).remove();
                                               else
                                                   seen[txt] = true;
                                            });
                                            //remove unecessary items
                                            while (tab.tabWindow.find('.history').length > a) {
                                                tab.tabWindow.find(".history").get(tab.tabWindow.find('.history').length - 1).remove();
                                            }
                                            //select first item from suggestions box
                                            var t = $(tab.tabWindow.find('.suggestions-li'));
                                            var s = $(tab.tabWindow.find('.selected'));
                                            if (s.length == 0) {
                                                t.first().addClass("selected");
                                            }

                                        }
                                    });
                                }
                            }
                        });
                    }
                    var t = $(tab.tabWindow.find('.suggestions-li'));
                    var s = $(tab.tabWindow.find('.selected'));
                    if (s.length == 0) {
                        t.first().addClass("selected");
                    }
                }

            });

            //arrow keys navigating in suggestions box
            searchInput.keydown(function(e) {
                //arrow key up
                if (e.keyCode == 38) {
                    searchInput.select();
                    var selected = tab.tabWindow.find(".selected");
                    if (typeof selected.prev().attr("text") !== "undefined") {
                        searchInput.val(selected.prev().attr('text'));
                    }

                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                    if (selected.prev().length == 0) {
                        selected.first().addClass("selected");
                        searchInput.val(selected.first().attr('text'));
                    } else {
                        selected.prev().addClass("selected");
                    }
                    searchInput.select();
                }
                //arrow key down
                if (e.keyCode == 40) {
                    searchInput.select();
                    var selected = tab.tabWindow.find(".selected");

                    if (typeof selected.next().attr("text") !== "undefined") {
                        searchInput.val(selected.next().attr('text'));
                    }

                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                    if (selected.next().length == 0) {
                        selected.last().addClass("selected");
                        searchInput.val(selected.last().attr('text'));
                    } else {
                        selected.next().addClass("selected");
                    }
                    searchInput.select();

                }

            });

            searchInput.keypress(function(e) {
                //if enter key was pressed
                if (e.which == 13) {
                    tab.tabWindow.find('#webviewcontainer').css('visibility', 'visible');
                    if (!searchInput.val().startsWith("webexpress://")) {
                        if (isURL(searchInput.val())) {
                            if (searchInput.val().startsWith("http://") || searchInput.val().startsWith("https://") || searchInput.val().startsWith("file://")) {
                                webview.loadURL(searchInput.val());
                            } else {
                                webview.loadURL("http://" + searchInput.val());
                            }
                        } else {
                            //TODO: search engines
                            webview.loadURL("http://www.google.com/search?q=" + searchInput.val());
                        }
                    } else {
                        webview.loadURL(searchInput.val());
                    }

                    return false;
                }
            });

            //suggestions system
            var canSuggest = false;
            searchInput[0].onkeydown = function() {

                var key = event.keyCode || event.charCode;
                //blacklist: backspace, enter, ctrl, alt, shift, tab, caps lock, delete, space
                if (key != 8 && key != 13 && key != 17 && key != 18 && key != 16 && key != 9 && key != 20 && key != 46 && key != 32) {
                    canSuggest = true;
                }

            }

            //searchInput functions

            function autocomplete(input, text) {
                if (tab.tabWindow.find('.selected').html() != null) {
                    if (tab.tabWindow.find('.selected').html().toLowerCase().startsWith(text.toLowerCase())) {
                        input.val(tab.tabWindow.find('.selected').html());
                        input[0].setSelectionRange(text.length, tab.tabWindow.find('.selected').html().length);
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

        }).appendTo('#instances');

    }
}
