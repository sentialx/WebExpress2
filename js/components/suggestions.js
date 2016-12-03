 $.fn.suggestions = function (params) {
        var settings = $.extend({
                searchInput: null,
                tab: null
            }, params),
            tGlobal = this,
            webview = settings.tab.instance.webview.webview,
            t = this

        this.suggestionsUl = $('<ul class="suggestions-ul">').appendTo($(this))

        settings.searchInput.on("input", function (e) {
            
            var key = event.keyCode || event.charCode;

            if (key != 40 && key != 38) {

                //get suggestions from history
                var inputText = settings.searchInput.val().toLowerCase().replace(getSelectionText(), "");
                if (inputText != "") {
                    $(t).css('display', 'block');
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
                                    var oldLink = links.sort(function (a, b) {
                                        return a.length - b.length;
                                    })[0];
                                    var newLink = links.sort(function (a, b) {
                                        return a.length - b.length;
                                    })[0];
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
                                    while ($(t).find('.history').length < finalLength) {
                                        var s = $('<li data-ripple-color="#444" class="suggestions-li ripple history" link=""></li>').prependTo($(tGlobal.suggestionsUl));
                                        s.click(function (e) {
                                            webview.loadURL('http://' + $(this).attr('link'));
                                        });
                                        s.mousedown(function (e) {
                                            var relX = e.pageX - $(this).offset().left;
                                            var relY = e.pageY - $(this).offset().top;
                                            Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), 800, 0);
                                        });
                                        s.mouseover(function () {
                                            $(t).find('.suggestions-li').removeClass("selected");
                                            $(this).addClass("selected");
                                            settings.searchInput.val($(this).attr('link'));
                                        });
                                        
                                    }
                                    //remove excess items
                                    while ($(t).find('.history').length > finalLength) {
                                        $(t).find('.history').first().remove()
                                    }
                                    //change each item content to new link from array
                                    $(t).find('.history').each(function (i) {
                                        $(this).html(uniqueLinks[i]);
                                        $(this).attr('link', uniqueLinks[i]);
                                    })

                                    if (canSuggest) {
                                        autocomplete(settings.searchInput, uniqueLinks[0]);
                                        canSuggest = false;
                                    }
                                } else {
                                    
                                }

                            } else {
                                //if addressbar text is empty, clear all items
                                $(t).find('.history').each(function (i) {
                                    $(this).remove();
                                });
                            }
                            //select first item from suggestions box
                            var t1 = $($(t).find('.suggestions-li'));
                            t1.removeClass('selected');
                            t1.first().addClass("selected");

                        },
                        complete: function () {
                            $(t).css('display', 'block');
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
                                        while ($(t).find('.internet').length < finalLength) {
                                            var s = $('<li data-ripple-color="#444" class="suggestions-li ripple internet" link=""></li>').appendTo($(tGlobal.suggestionsUl));
                                            s.click(function (e) {
                                                webview.loadURL("http://www.google.com/search?q=" + $(this).attr('link'));
                                            });
                                            s.mousedown(function (e) {
                                                var relX = e.pageX - $(this).offset().left;
                                                var relY = e.pageY - $(this).offset().top;
                                                Ripple.makeRipple($(this), relX, relY, $(this).width(), $(this).height(), 600, 0);
                                            });
                                            s.mouseover(function () {
                                                $(t).find('.suggestions-li').removeClass("selected");
                                                $(this).addClass("selected");
                                                settings.searchInput.val($(this).attr('link'));
                                            });
                                        }
                                        //remove excess items
                                        while ($(t).find('.internet').length > finalLength) {
                                            $(t).find('.internet').first().remove()
                                        }
                                        //change each item content to new link from array
                                        $(t).find('.internet').each(function (i) {
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
        settings.searchInput[0].onkeydown = function () {
            var key = event.keyCode || event.charCode;
            //blacklist: backspace, enter, ctrl, alt, shift, tab, caps lock, delete, space
            if (key != 8 && key != 13 && key != 17 && key != 18 && key != 16 && key != 9 && key != 20 && key != 46 && key != 32) {
                canSuggest = true;
            }
        }

        //arrow keys navigating in suggestions box
        settings.searchInput.keydown(function (e) {
            var selected = $(t).find(".selected")
                //arrow key up
            if (e.keyCode == 38) {
                e.preventDefault();
                settings.searchInput.select();
                settings.searchInput.val(selected.prev().attr('link'));

                $(t).find('.suggestions-li').removeClass("selected");
                if (selected.prev().length == 0) {
                    selected.first().addClass("selected");
                    settings.searchInput.val(selected.first().attr('link'));
                } else {
                    selected.prev().addClass("selected");
                }
                settings.searchInput.select();
            }
            //arrow key down
            if (e.keyCode == 40) {
                e.preventDefault();
                settings.searchInput.select();
                settings.searchInput.val(selected.next().attr('link'));

                $(t).find('.suggestions-li').removeClass("selected");
                if (selected.next().length == 0) {
                    selected.last().addClass("selected");
                    settings.searchInput.val(selected.last().attr('link'));
                } else {
                    selected.next().addClass("selected");
                }
                settings.searchInput.select();

            }

        });
        setInterval(function () {
            if (settings.searchInput.val() == "" || settings.searchInput.val() == null) {
                $(t).css('display', 'none')
                $(t).find('.suggestions-li').each(function (i) {
                    $(this).remove()
                });
            }
        }, 1);
        $(window).click(function() {
            $(t).css('display', 'none');
        })
        return this
    }