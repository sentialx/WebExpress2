class TabWindow {

    constructor(tab, url) {
        var s = this;
        this.searchInput = null;
        this.webView = null;
        this.loadedExts = [];
        this.apis = [];
        this.deleteExtensions = function () {
            for (var i3 = 0; i3 < s.loadedExts.length; i3++) {
                $(s.loadedExts[i3]).remove();
            }
            for (var i = 0; i < s.apis.length; i++) {
                s.apis[i].dispose()
                s.apis[i] = null;
            }
            s.apis = [];
            s.loadedExts = [];
        }
        tab.tabWindow = $("<div style='height: 100%;'>").load("browser.html", function () {
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
            var firstUrl = url;
            var lastUrl = '';
            s.searchInput = searchInput;
            s.webView = webview;
            var xToInspect, yToInspect;
            var imageToSave = '';
            var linkToOpen = '';

            //requires
            const {remote, ipcMain, clipboard} = require('electron')
            const {Menu, MenuItem} = remote

            checkFiles();

            //check if background color of bar is dark or light and then set icons foreground to black or white
            function changeContrast(changeTabs) {
                var brightness = colorBrightness(tab.Color);
                if (brightness < 125) {
                    //white icons and text
                    if (changeTabs) {
                        tab.Title.css('color', 'white');
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
                        tab.Title.css('color', '#444');
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
                webview.capturePage(function (image) {
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    var img = new Image();
                    img.onload = function () {
                        context.drawImage(img, 0, 0);
                        var myData = context.getImageData(2, 2, 3, 3);
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
            $(window).click(function () {
                if (menuToggled) {
                    menu.css('opacity', 1).animate({
                        opacity: 0
                    }, 200).css('top', 8).animate({
                        top: -32
                    }, {
                            queue: false,
                            complete: function () {
                                menu.css('visibility', 'hidden');
                            },
                            duration: 200
                        });
                    menuToggled = false;
                }
                suggestions.css('display', 'none');
            });

            //global timer
            setInterval(function () {
                if (searchInput.val() == "" || searchInput.val() == null) {
                    suggestions.css('display', 'none');
                    tab.tabWindow.find('.suggestions-li').each(function (i) {
                        $(this).remove();
                    });
                }
            }, 1);

            //create and add context menu items
            var backMenuItem = new MenuItem({
                label: 'Back', click() {
                    webview.goBack();
                }
            });
            var forwardMenuItem = new MenuItem({
                label: 'Forward', click() {
                    webview.goForward();
                }
            });
            var refreshMenuItem = new MenuItem({
                label: 'Reload', click() {
                    webview.reload();
                }
            });
            var openLinkInNewTabMenuItem = new MenuItem({
                label: 'Open link in new tab', click() {
                    if (linkToOpen != "") {
                        var tab = new Tab();
                        var tw = new TabWindow(tab, linkToOpen);
                        addTab(tw, tab);
                    }
                }
            });
            var openImageInNewTabMenuItem = new MenuItem({
                label: 'Open image in new tab', click() {
                    if (linkToOpen != "") {
                        var tab = new Tab();
                        var tw = new TabWindow(tab, linkToOpen);
                        addTab(tw, tab);
                    }
                }
            });
            var copyLinkMenuItem = new MenuItem({
                label: 'Copy link address', click() {
                    if (linkToOpen != "") {
                        clipboard.writeText(linkToOpen);
                    }
                }
            });
            var saveImageAsMenuItem = new MenuItem({
                label: 'Save image as', click() {
                    //saves image as
                }
            });
            var printMenuItem = new MenuItem({
                label: 'Print', click() {
                    //prints webpage
                }
            });
            var inspectElementMenuItem = new MenuItem({
                label: 'Inspect element', click() {
                    webview.inspectElement(xToInspect, yToInspect);
                }
            });
            var viewSourceMenuItem = new MenuItem({
                label: 'View source', click() {
                    //views source
                }
            });
            var separator1 = new MenuItem({ type: 'separator' });
            var separator2 = new MenuItem({ type: 'separator' });

            var menu1 = new Menu();

            /*  Context menu structure:

                    Open link in new tab
                    Back
                    Forward
                    Refresh
                    =====================
                    Copy link address
                    Save image as
                    Print
                    =====================
                    Inspect element
                    View source
                    =====================
                    Extensions

            */

            //append items to context menu
            menu1.append(openLinkInNewTabMenuItem);
            menu1.append(openImageInNewTabMenuItem);
            menu1.append(backMenuItem);
            menu1.append(forwardMenuItem);
            menu1.append(refreshMenuItem);

            menu1.append(separator1);

            menu1.append(copyLinkMenuItem);
            menu1.append(saveImageAsMenuItem);
            menu1.append(printMenuItem);

            menu1.append(separator2);

            menu1.append(inspectElementMenuItem);
            menu1.append(viewSourceMenuItem);

            //webview section
            //webview ready event
            $(webview).ready(function () {

                $.ajax({
                    type: "GET",
                    url: "http://google.com/complete/search?client=firefox&q=webexpress",
                    success: function (data) {

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

                //configure and open context menu
                webview.getWebContents().on('context-menu', (e, params) => {
                    e.preventDefault()
                    imageToSave = '';
                    linkToOpen = '';
                    if (params.mediaType == 'image') {
                        imageToSave = params.srcURL;
                    } else {
                        imageToSave = '';
                    }
                    linkToOpen = params.linkURL;

                    if (linkToOpen == "") {
                        openLinkInNewTabMenuItem.visible = false;
                        copyLinkMenuItem.visible = false;
                    } else {
                        openLinkInNewTabMenuItem.visible = true;
                        copyLinkMenuItem.visible = true;
                    }

                    if (imageToSave == "") {
                        saveImageAsMenuItem.visible = false;
                        openImageInNewTabMenuItem.visible = false;
                    } else {
                        saveImageAsMenuItem.visible = true;
                        openImageInNewTabMenuItem.visible = true;
                    }

                    if (imageToSave == "" && linkToOpen == "") {
                        backMenuItem.visible = true;
                        forwardMenuItem.visible = true;
                        refreshMenuItem.visible = true;
                        printMenuItem.visible = true;
                    } else {
                        backMenuItem.visible = false;
                        forwardMenuItem.visible = false;
                        refreshMenuItem.visible = false;
                        printMenuItem.visible = false;
                    }

                    if (webview.canGoBack()) {
                        backMenuItem.enabled = true;
                    } else {
                        backMenuItem.enabled = false;
                    }
                    if (webview.canGoForward()) {
                        forwardMenuItem.enabled = true;
                    } else {
                        forwardMenuItem.enabled = false;
                    }

                    xToInspect = params.x;
                    yToInspect = params.y;
                    menu1.popup(remote.getCurrentWindow())

                }, false)
            });
            //webview newwindow event
            webview.addEventListener('new-window', (e) => {
                const protocol = require('url').parse(e.url).protocol
                if (protocol === 'http:' || protocol === 'https:') {
                    var tab = new Tab();
                    addTab(new TabWindow(tab, e.url), tab);
                }
            })
            //webview navigate in page event
            webview.addEventListener('did-navigate-in-page', function (event, url, isMain) {
                if (url != null) {
                    if (!url.startsWith("webexpress://newtab") && url != "about:blank") {
                        searchInput.val(url);
                    }
                }
                 //wait for 200 milliseconds
                setTimeout(function () {
                    //check if <meta name="theme-color" content="..."> tag exists. When it exists then tab gets the color from content="...", otherwise it getting color from top of a website
                    webview.executeJavaScript("function s() {var markup = document.documentElement.innerHTML; return markup} s();", false, function (result) {
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
                }, 400);


            })
            //webview page load end event
            webview.addEventListener('did-finish-load', function () {


                tab.Favicon.css('opacity', "1");
                tab.Preloader.css('opacity', "0");
                if (!webview.getURL().startsWith("webexpress://newtab") && webview.getURL() != "about:blank") {
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
                    fs.readFile(historyPath, function (err, data) {
                        if (err) throw err;
                        var json = data.toString();
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
                            fs.writeFile(historyPath, json, function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });
                            lastUrl = webview.getURL();
                        }
                    });

                }

                //wait for 400 milliseconds
                setTimeout(function () {
                    //check if <meta name="theme-color" content="..."> tag exists. When it exists then tab gets the color from content="...", otherwise it getting color from top of a website
                    webview.executeJavaScript("function s() {var markup = document.documentElement.innerHTML; return markup} s();", false, function (result) {
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
                }, 400);

            });

            //webview start loading event
            webview.addEventListener('did-start-loading', function () {
                setTimeout(function () {
                    suggestions.css('display', 'none');
                }, 200);
                tab.Favicon.css('opacity', "0");
                tab.Preloader.css('opacity', "1");
            });
            //webview page title changed event
            webview.addEventListener('page-title-updated', function (title) {
                tab.Title.html("<p style='display: inline; width:50%;'>" + webview.getTitle() + "</p>");
            });
            //webview load commit event
            webview.addEventListener('load-commit', function (url, isMain) {
                suggestions.css('display', 'none');

            });
            //webview page favicon updated event
            webview.addEventListener('page-favicon-updated', function (favicon) {
                tab.Favicon.html("<div class='favicon' style='background-image: url(\"" + favicon.favicons[0] + "\");'></div>");
                tab.Favicon.css('opacity', "1");
                tab.Preloader.css('opacity', "0");
            });

            //menu section
            menu.css('opacity', 0);

            //menu events
            settings.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            history.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            history.click(function (e) {
                var tab = new Tab();
                var tw = new TabWindow(tab, `webexpress://history`);
                addTab(tw, tab);
            });
            bookmarks.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            downloads.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            extensions.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            newWindow.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            fullscreen.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            devtools.mousedown(function (e) {
                webview.openDevTools({ mode: 'right' });
                makeRippleMenuItem(this, e);
            });
            screenshot.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            privacy.mousedown(function (e) {
                makeRippleMenuItem(this, e);
            });
            menu.mousedown(function (event) {
                event.stopPropagation();
            });
            //Extensions system
            function refreshExtensions() {
                s.deleteExtensions();
                resetExtMenu();
                loadExtensions();
            }
            function loadExtensions() {
                //get all .JSON files in folder to an array
                var listOfExtensions = [];
                var listOfExtensionsDirs = [];
                dir.subdirs(extensionsPath, function (err, subdirs) {
                    if (err) throw err;
                    for (var i = 0; i < subdirs.length; i++) {
                        dir.files(subdirs[i], function (err, files) {
                            if (err) throw err;
                            for (var i2 = 0; i2 < files.length; i2++) {
                                if (endsWith(files[i2], ".json")) {
                                    listOfExtensions.push(files[i2]);
                                    //read json from all files
                                    $.ajax({
                                        type: "GET",
                                        url: files[i2],
                                        success: function (data) {
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
                                            addExtension(extensionsPath + "/" + jFolder + "/" + jIcon, function () {

                                            });

                                            for (var i3 = 0; i3 < jsonObject.scripts.length; i3++) {
                                                var jFileUrl = extensionsPath + "/" + jFolder + "/" + jsonObject.scripts[i3]["url"];
                                                $.ajax({
                                                    type: "GET",
                                                    url: jFileUrl,
                                                    success: function (data) {
                                                        $('#extensions').ready(function () {
                                                            var id = tabCollection.indexOf(tab);
                                                            $('#extensions')[0].contentWindow.parent = window
                                                            var extension = $(`<script async>
                                                            function a(index) {
                                                                var api = new API(parent.tabCollection[index], parent)
                                                                parent.tabCollection[index].instance.apis.push(api)
                                                                parent = null
                                                                ${data}
                                                            } a(${id}); 
                                                            </script>`).appendTo($('#extensions').contents().find('body'));

                                                            s.loadedExts.push(extension);
                                                        })

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
            loadExtensions();
            //extensions menu
            var extCollection = [];
            var pageCollection = [];
            var indicatorsCollection = [];
            var extCount = 0;
            var pagesCount = 1;
            var indicatorsCount = 0;
            var currentPage = tab.tabWindow.find('.ext-page')
            var selectedPage = 0
            pageCollection.push(currentPage)

            function resetExtMenu() {
                extCollection = []
                pageCollection = []
                indicatorsCollection = [];
                extCount = 0
                pagesCount = 1
                indicatorsCount = 0
                tab.tabWindow.find('.ext-page').remove()
                tab.tabWindow.find('.ext-indicators').remove()
                tab.tabWindow.find('.ext-menu').append('<ul class="ext-page"></ul>')
                tab.tabWindow.find('.ext-menu').append('<ul class="ext-indicators"></ul>')
                currentPage = tab.tabWindow.find('.ext-page')
                selectedPage = 0
                pageCollection.push(currentPage)
            }

            function addExtension(image, clickEvent) {
                if (extCount != 9) {

                    var ext = $('<li class="ext-item ripple" data-ripple-color="#444"><div class="ext-item-icon" style="background-image: url(\'' + image + '\')"></div></li>').appendTo(currentPage);
                    ext.click(function () {
                        clickEvent();
                    });

                    ext.mousedown(function () {
                        makeRippleIconButton($(this));
                    });
                    $('.ripple-effect').css('z-index', '2');
                    extCollection.push(ext);
                    extCount += 1;
                } else {
                    extCount = 0;
                    currentPage = $('<ul class="ext-page"></ul>').appendTo(tab.tabWindow.find('.ext-menu'));

                    var ext = $('<li class="ext-item ripple" data-ripple-color="#444"><div class="ext-item-icon" style="background-image: url(\'' + image + '\')"></div></li>').appendTo(currentPage);
                    ext.click(function () {
                        clickEvent();
                    });
                    ext.mousedown(function () {
                        makeRippleIconButton($(this));
                    });
                    $('.ripple-effect').css('z-index', '2');
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

                indicator.click(function () {
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
                    addExtension("./img/logo.png", function () { });
                    items += 1;
                }
            }
            //bar buttons events

            extBtn.mousedown(function () {
                makeRippleIconButton($(this));
            });
            extBtn.click(function () {
                if (!extMenuToggled) {
                    //menu fade in animation
                    extMenu.css('visibility', 'visible');
                    extMenu.css('opacity', 0).animate({
                        opacity: 1
                    }, 200, function () {
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
                            complete: function () {
                                extMenu.css('visibility', 'hidden');
                            },
                            duration: 200
                        });
                    extMenuToggled = false;
                }
            });
            backBtn.click(function () {
                if (webview.canGoBack()) {
                    webview.goBack();
                }
            });
            backBtn.mousedown(function () {
                makeRippleIconButton($(this));
            });
            forwardBtn.click(function () {
                if (webview.canGoForward()) {
                    webview.goForward();
                }
            });
            forwardBtn.mousedown(function () {
                makeRippleIconButton($(this));
            });
            refreshBtn.click(function () {
                webview.reload();
                refreshExtensions();
            });
            refreshBtn.mousedown(function () {
                makeRippleIconButton($(this));
            });
            menuBtn.click(function () {
                if (!menuToggled) {
                    //menu fade in animation
                    menu.css('visibility', 'visible');
                    menu.css('opacity', 0).animate({
                        opacity: 1
                    }, 200, function () {
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
                            complete: function () {
                                menu.css('visibility', 'hidden');
                            },
                            duration: 200
                        });
                    menuToggled = false;
                }
            });
            menuBtn.mousedown(function () {
                makeRippleIconButton($(this));
            });

            //searchInput section
            //searchInput events
            searchInput.focusin(function () {
                $(this).select();
            });

            searchInput.on("input", function (e) {
                var key = event.keyCode || event.charCode;

                if (key != 40 && key != 38) {

                    //get suggestions from history
                    var inputText = searchInput.val().toLowerCase().replace(getSelectionText(), "");
                    if (inputText != "") {
                        suggestions.css('display', 'block');
                        $.ajax({
                            type: "GET",
                            url: historyPath,
                            success: function (data) {
                                var json = data.toString();
                                //replace weird characters utf-8
                                json = json.replace("\ufeff", "");
                                var obj = JSON.parse(json);
                                if (inputText != "") {
                                    var links = [];
                                    for (var i = 0; i < obj.history.length; i++) {
                                        var str = obj.history[i].link;
                                        //remove http://, https:// etc. from item for better suggestions
                                        if (str.startsWith("http://")) {
                                            str = str.split("http://")[1];
                                            if (str.startsWith("www.")) {
                                                str = str.split("www.")[1];
                                            }
                                        }
                                        if (str.startsWith("https://")) {
                                            str = str.split("https://")[1];
                                            if (str.startsWith("www.")) {
                                                str = str.split("www.")[1];
                                            }
                                        }
                                        var lastChar = str.substr(str.length - 1);
                                        if (str.split('/').length == 2 && lastChar == "/") {
                                            str = str.replace('/', '');
                                        }
                                        //google search engine
                                        if (!(str.indexOf("google") !== -1 && str.indexOf("search?q=") !== -1)) {
                                            if (str.startsWith(inputText)) {
                                                links.push(str);
                                            }
                                        }
                                    }
                                    //check if links array has any child
                                    if (links.length > 0) {

                                        //get shortest link from array links
                                        var oldLink = links.sort(function (a, b) { return a.length - b.length; })[0];
                                        var newLink = links.sort(function (a, b) { return a.length - b.length; })[0];
                                        //get important part of link ex. webexpress.tk for better suggestions
                                        newLink = newLink.substr(0, newLink.indexOf('/'));
                                        if (oldLink != newLink) {
                                            links.push(newLink);
                                        }
                                        //sort links by length
                                        links.sort(function (a, b) {
                                            return b.length - a.length;
                                        });
                                        //get most similar link to addressbar text
                                        for (var i = 0; i < links.length; i++) {
                                            if (links[i] == "") {
                                                links.splice(i, 1)
                                            }
                                            if (links[i] != null) {
                                                var a = links[i].length - inputText.length;
                                                //move the most similar link to top
                                                if (a > -1) {
                                                    var s = links[i];
                                                    links.splice(i, 1)
                                                    links.unshift(s)
                                                }
                                            }
                                        }
                                        //remove duplicates from array
                                        var uniqueLinks = [];
                                        $.each(links, function (i, el) {
                                            if ($.inArray(el, uniqueLinks) === -1) uniqueLinks.push(el)
                                        });
                                        //limit array length to 3
                                        if (uniqueLinks.length > 3) {
                                            uniqueLinks.length = 3;
                                        }
                                        var finalLength = uniqueLinks.length;
                                        if (finalLength > 3) {
                                            finalLength = 3;
                                        }
                                        if (finalLength < 0) {
                                            finalLength = 0;
                                        }
                                        //append missing items
                                        while (tab.tabWindow.find('.history').length < finalLength) {
                                            var s = $('<li data-ripple-color="#444" class="suggestions-li ripple history" link=""></li>').prependTo($(suggestions_ul));
                                            s.click(function (e) {
                                                webview.loadURL('http://' + $(this).attr('link'));
                                            });
                                            s.mousedown(function (e) {
                                                var relX = e.pageX - $(this).offset().left;
                                                var relY = e.pageY - $(this).offset().top;
                                                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), 600, 0);
                                            });
                                            s.mouseover(function () {
                                                tab.tabWindow.find('.suggestions-li').removeClass("selected");
                                                $(this).addClass("selected");
                                                searchInput.val($(this).attr('link'));
                                            });
                                        }
                                        //remove excess items
                                        while (tab.tabWindow.find('.history').length > finalLength) {
                                            tab.tabWindow.find('.history').first().remove()
                                        }
                                        //change each item content to new link from array
                                        tab.tabWindow.find('.history').each(function (i) {
                                            $(this).html(uniqueLinks[i]);
                                            $(this).attr('link', uniqueLinks[i]);
                                        })

                                        if (canSuggest) {
                                            autocomplete(searchInput, uniqueLinks[0]);
                                            canSuggest = false;
                                        }
                                    } else {
                                        //if array items is empty, remove all items
                                        tab.tabWindow.find('.history').each(function (i) {
                                            $(this).remove();
                                        });
                                    }

                                } else {
                                    //if addressbar text is empty, clear all items
                                    tab.tabWindow.find('.history').each(function (i) {
                                        $(this).remove();
                                    });
                                }
                                //select first item from suggestions box
                                var t = $(tab.tabWindow.find('.suggestions-li'));
                                t.removeClass('selected');
                                t.first().addClass("selected");

                            },
                            complete: function () {
                                suggestions.css('display', 'block');
                                //load suggestions from Google
                                if (inputText != "" || inputText != null || typeof inputText !== "undefined") {
                                    $.ajax({
                                        type: "GET",
                                        url: "http://google.com/complete/search?client=firefox&q=" + inputText,
                                        success: function (data) {
                                            var obj = JSON.parse(data);
                                            var arr = obj[1].toString().split(",");
                                            var links = [];
                                            //filter links
                                            for (var i = 0; i < arr.length; i++) {
                                                if (!isInArray(arr[i], links)) {
                                                    links.push(arr[i]);
                                                }
                                            }
                                            if (links.length > 0) {

                                            }
                                            //remove duplicates from array
                                            var uniqueLinks = [];
                                            $.each(links, function (i, el) {
                                                if ($.inArray(el, uniqueLinks) === -1) uniqueLinks.push(el);
                                            });
                                            //sort array by length
                                            uniqueLinks.sort(function (a, b) {
                                                return a.length - b.length;
                                            });
                                            //limit array length to 3
                                            if (uniqueLinks.length > 3) {
                                                uniqueLinks.length = 3;
                                            }
                                            var finalLength = uniqueLinks.length;
                                            if (finalLength > 3) {
                                                finalLength = 3;
                                            }
                                            if (finalLength < 0) {
                                                finalLength = 0;
                                            }
                                            //append missing items
                                            while (tab.tabWindow.find('.internet').length < finalLength) {
                                                var s = $('<li data-ripple-color="#444" class="suggestions-li ripple internet" link=""></li>').appendTo($(suggestions_ul));
                                                s.click(function (e) {
                                                    webview.loadURL("http://www.google.com/search?q=" + $(this).attr('link'));
                                                });
                                                s.mousedown(function (e) {
                                                    var relX = e.pageX - $(this).offset().left;
                                                    var relY = e.pageY - $(this).offset().top;
                                                    Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), 600, 0);
                                                });
                                                s.mouseover(function () {
                                                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                                                    $(this).addClass("selected");
                                                    searchInput.val($(this).attr('link'));
                                                });
                                            }
                                            //remove excess items
                                            while (tab.tabWindow.find('.internet').length > finalLength) {
                                                tab.tabWindow.find('.internet').first().remove()
                                            }
                                            //change each item content to new link from array
                                            tab.tabWindow.find('.internet').each(function (i) {
                                                $(this).html(uniqueLinks[i]);
                                                $(this).attr('link', uniqueLinks[i]);
                                            })

                                        }
                                    });
                                }
                            }
                        });
                    }
                }

            });
            var canSuggest = false;
            searchInput[0].onkeydown = function () {
                var key = event.keyCode || event.charCode;
                //blacklist: backspace, enter, ctrl, alt, shift, tab, caps lock, delete, space
                if (key != 8 && key != 13 && key != 17 && key != 18 && key != 16 && key != 9 && key != 20 && key != 46 && key != 32) {
                    canSuggest = true;
                }
            }

            //arrow keys navigating in suggestions box
            searchInput.keydown(function (e) {
                //arrow key up
                if (e.keyCode == 38) {
                    e.preventDefault();
                    searchInput.select();
                    var selected = tab.tabWindow.find(".selected");
                    searchInput.val(selected.prev().attr('link'));

                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                    if (selected.prev().length == 0) {
                        selected.first().addClass("selected");
                        searchInput.val(selected.first().attr('link'));
                    } else {
                        selected.prev().addClass("selected");
                    }
                    searchInput.select();
                }
                //arrow key down
                if (e.keyCode == 40) {
                    e.preventDefault();
                    searchInput.select();
                    var selected = tab.tabWindow.find(".selected");
                    searchInput.val(selected.next().attr('link'));

                    tab.tabWindow.find('.suggestions-li').removeClass("selected");
                    if (selected.next().length == 0) {
                        selected.last().addClass("selected");
                        searchInput.val(selected.last().attr('link'));
                    } else {
                        selected.next().addClass("selected");
                    }
                    searchInput.select();

                }

            });

            searchInput.keypress(function (e) {
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


        }).appendTo('#instances');

    }
}