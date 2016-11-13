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
    tab.closeBtn = $("<div class='closeBtn'><div class='closeBtnImg'></div></div>").appendTo(tab.Tab);
    tab.Title = $("<div class='tabTitle'>New tab</div>").appendTo(tab.Tab);
    tab.Favicon = $("<div></div>").appendTo(tab.Tab);
    tab.Foreground = 'black';
    tab.Color = selectedTabColor;
    tab.instance = instance;
    tab.Preloader = $('<div class="preloader" style="width: 16px;position:absolute; top: 8px; left:6px;" thickness="5" color="#3F51B5"></div>').appendTo(tab.Tab);
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
    tab.Tab.animate({top: 50}, {duration: 200, complete: function() {
        tab.Tab.remove();
    }})
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
            }, queue: false
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
                    duration: 200, queue: false
                });

        } else {
            tabCollection[i].Tab.animate({
                left: tabCountTemp * tabCollection[0].Tab.width()
            }, {
                    duration: 1, queue: false
                });
        }
        tabCountTemp += 1;
    }
    if (tabCollection[0] != null) {
        if (addButtonAnimation == true) {
            $('#addTab').animate({
                left: tabCollection.length * tabCollection[0].Tab.width()
            }, {
                    duration: 200, queue: false
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
function selectTab(tab) {
    for (var i = 0; i < tabCollection.length; i++) {
        if (tabCollection[i].Tab != tab) {
            tabCollection[i].Tab.css('background-color', normalColor);
            tabCollection[i].tabWindow.css('position', 'absolute');
            tabCollection[i].tabWindow.css('top', '-50000000px');
            tabCollection[i].Title.css('color', Foreground)
            if (Foreground == "#fff") {
                tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close-white.png")');
            } else {
                tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")');
            }
            tabCollection[i].Tab.css('height', tabHeight - 1)

            tabCollection[i].selected = false;
        } else {
            tabCollection[i].Tab.css('background-color', tabCollection[i].Color);
            tabCollection[i].tabWindow.css('position', 'relative');
            tabCollection[i].tabWindow.css('top', '0px');

            if (tabCollection[i].instance.searchInput != null && (tabCollection[i].instance.searchInput.val() == "" || tabCollection[i].instance.searchInput.val() == null)) {
                tabCollection[i].instance.searchInput.focus();
            }
            if (tabCollection[i].Foreground == 'black') {
                tabCollection[i].Title.css('color', '#444')
                tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")');
            } else if (tabCollection[i].Foreground == 'white') {
                tabCollection[i].Title.css('color', '#fff')
                tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close-white.png")');
            }
            tabCollection[i].Tab.css('height', tabHeight)
            tabCollection[i].selected = true;
        }
    }
}
function Tab() { }
