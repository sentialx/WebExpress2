var tabCollection = [];
var tabWidth = 190;
var tabHeight = 32;
var selectedTabColor = '#fff';
var locked = false;
var cursorX;
var cursorY;
var normalColor = '#eee';
var Foreground = '#444';
var borderColor = 'rgba(0,0,0,0.1)';

function addTab(instance, tab) {
    //declarations in Tab class
    tab.Tab = $('<div class="tab" id="#tab"></div>').appendTo('#tabbar');
    tab.closeBtn = $("<div class='closeBtn'><i class='material-icons' style='font-size: 18px;'>close</i></div>").appendTo(tab.Tab);
    tab.Title = $("<div class='tabTitle'>New tab</div>").appendTo(tab.Tab);
    tab.Favicon = $("<div></div>").appendTo(tab.Tab);
    tab.Foreground = 'black';
    tab.Color = selectedTabColor;
    tab.instance = instance;
    tab.Preloader = $('<div class="preloader" style="height: 16px;width: 16px;position:absolute; top: 6px; left:6px;" thickness="10" color="#3F51B5"></div>').appendTo(tab.Tab);
    tab.Preloader.preloader()
    tab.selected = false;
    tab.getColor = function () {
        return tab.Tab.css('background-color')
    }

    //close button click event
    tab.closeBtn.click(function (e) {
        removeTab(tab);
    });
    //tab drag event
    tab.Tab.draggable({
        containment: "parent",
        axis: 'x',
        stop: function (event, ui) {
            calcSizes(true, true);
        },
        drag: function (event, ui) {
            for (var i = 0; i < tabCollection.length; i++) {
                tabCollection[i].Tab.css('z-index', 1);

            }
            tab.Tab.css('z-index', 9999);
            var overTab = getTabFromMousePoint(tab);
            if (overTab != null) {
                var indexTab = tabCollection.indexOf(tab);
                var indexOverTab = tabCollection.indexOf(overTab);
                tabCollection[indexTab] = overTab;
                tabCollection[indexOverTab] = tab;
                overTab.Tab.stop();
                changePos(overTab);
            }
        }
    });
    $('#addTab').insertAfter(tab.Tab);
    tabCollection.push(tab);
    selectTab(tab.Tab);
    tab.selected = true;
    tab.Tab.mousedown(function (e) {
        selectTab(tab.Tab);

    });
    calcSizes(false, true);
    tab.Tab.css({
        top: 50
    });
    tab.Tab.animate({
        top: 0
    }, {
        duration: 200
    });
    setInterval(function () {
        if (tabCollection.indexOf(tab) == 0) {
            tab.Tab.css('border-left', 'none');
        } else {
            tab.Tab.css('border-left', '1px solid ' + borderColor);
        }
    }, 1)
    tab.Tab.mouseenter(function () {
        var color = tab.Color;

        if (color.startsWith('#')) {
            color = hexToRgb(tab.Color);
            var r = color.r;
            var g = color.g;
            var b = color.b;
            if (!tab.selected)
                tab.Tab.animate({
                    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`
                }, {
                    duration: 25,
                    queue: false
                })
        } else {
            var rgb = getRGB(color)
            var r = rgb.r
            var g = rgb.g
            var b = rgb.b
            if (!tab.selected)
                tab.Tab.animate({
                    backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`
                }, {
                    duration: 25,
                    queue: false
                })
        }
    })
    tab.Tab.mouseleave(function () {
        if (!tab.selected)
            tab.Tab.animate({
                backgroundColor: normalColor
            }, {
                duration: 25,
                queue: false
            })
    })
}

function removeTab(tab) {
    tab.tabWindow.remove();
    tab.instance.deleteExtensions();
    if (tabCollection.indexOf(tab) - 1 != -1) {
        selectTab(tabCollection[tabCollection.indexOf(tab) - 1].Tab);
    } else {
        if (tabCollection[1] != null)
            selectTab(tabCollection[1].Tab);
    }

    tabCollection.splice(tabCollection.indexOf(tab), 1);
    tab.Tab.animate({
        top: 50
    }, {
        duration: 200,
        complete: function () {
            tab.Tab.remove();
        }
    })
    if (tabCollection.length == 0) {
        const remote = require('electron').remote;
        var window = remote.getCurrentWindow();
        window.close();
    }
    calcSizes(true, true);
}

function getTabFromMousePoint(callingTab) {
    for (var i = 0; i < tabCollection.length; i++) {
        if (tabCollection[i] != callingTab) {
            if (contains(tabCollection[i].Tab[0])) {
                if (!tabCollection[i].locked)
                    return tabCollection[i];
            }
        }
    }
}

function changePos(callingTab) {
    callingTab.locked = true;
    callingTab.Tab.animate({
        left: tabCollection.indexOf(callingTab) * tabCollection[0].Tab.width(),
        easing: 'easeOutQuint'
    }, {
        duration: 200,
        complete: function () {
            callingTab.locked = false;
        },
        queue: false
    });
}

document.onmousemove = function (e) {
        cursorX = e.pageX;
        cursorY = e.pageY;
    }
    //check if bounds of another tab contains mouse point
function contains(tabToCheck) {
    var rect = tabToCheck.getBoundingClientRect();
    if (cursorX >= rect.left && cursorX <= rect.right) {
        return true;
    }
    return false;
}

//responsive tabs
function calcSizes(animation, addButtonAnimation) {
    var tabCountTemp = 0;
    for (var i = 0; i < tabCollection.length; i++) {
        var tabWidthTemp = tabWidth;
        if (!(($('#tabbar').width() - $('#addTab').width() - 15) / tabCollection.length >= tabWidth)) {
            tabWidthTemp = ($('#tabbar').width() - $('#addTab').width() - 15) / tabCollection.length;
        } else {
            tabWidthTemp = tabWidth;
        }
        tabCollection[i].Tab.css('width', tabWidthTemp);

        if (animation == true) {
            tabCollection[i].Tab.animate({
                left: tabCountTemp * tabCollection[0].Tab.width()
            }, {
                duration: 200,
                queue: false
            });

        } else {
            tabCollection[i].Tab.animate({
                left: tabCountTemp * tabCollection[0].Tab.width()
            }, {
                duration: 1,
                queue: false
            });
        }
        tabCountTemp += 1;
    }
    if (tabCollection[0] != null) {
        if (addButtonAnimation == true) {
            $('#addTab').animate({
                left: tabCollection.length * tabCollection[0].Tab.width()
            }, {
                duration: 200,
                queue: false
            });
        } else {
            $('#addTab').css({
                left: tabCollection.length * tabCollection[0].Tab.width()
            });
        }
    }
}

$('#addTab').click(function () {
    var tab = new Tab();
    addTab(new TabWindow(tab, ""), tab);
});

function deselect(tab) {
    tab.Tab.css('background-color', normalColor)
    tab.tabWindow.css({height: 0, position: 'absolute', opacity: 0, visibility: 'hidden'})
    tab.Title.css('color', Foreground)
    if (Foreground == "#fff") {
        tab.closeBtn.css('color', '#fff')
    } else {
        tab.closeBtn.css('color', '#000')
    }
    tab.Tab.css('height', tabHeight - 1)
    tab.Preloader.attr('color', '#3F51B5')
    tab.selected = false;
}

function select(tab) {
    tab.Tab.css('background-color', tab.Color);
    tab.tabWindow.css({height: $(window).height(), position: 'relative', opacity: 1, visibility: 'visible'});
    if (tab.instance.searchInput != null && (tab.instance.searchInput.val() == "" || tab.instance.searchInput.val() == null)) {
        tab.instance.searchInput.focus();
    }
    if (tab.Foreground == 'black') {
        tab.Preloader.attr('color', '#3F51B5')
        tab.Title.css('color', '#444')
        tab.closeBtn.css('color', '#000')
    } else if (tab.Foreground == 'white') {
        tab.Title.css('color', '#fff')
        tab.Preloader.attr('color', '#fff')
        tab.closeBtn.css('color', '#fff')
    }
    tab.Tab.css('height', tabHeight)
    tab.selected = true;
}

function selectTab(tab) {
    for (var i = 0; i < tabCollection.length; i++) {
        if (tabCollection[i].Tab != tab) {
            deselect(tabCollection[i])
        } else {
            select(tabCollection[i])
        }
    }
}

function Tab() {}