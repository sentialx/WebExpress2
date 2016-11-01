var tabCollection = [];
var tabWidth = 170;
var selectedTabColor = '#F5F5F5';
var locked = false;
var cursorX;
var cursorY;

function addTab(instance, tab) {
    //declarations in Tab class
    tab.Tab = $('<div class="tab" id="#tab"></div>').appendTo('#tabbar');
    tab.closeBtn = $("<div class='closeBtn'><div class='closeBtnImg'></div></div>").appendTo(tab.Tab);
    tab.Title = $("<div class='tabTitle'>New tab</div>").appendTo(tab.Tab);
    tab.Favicon = $("<div></div>").appendTo(tab.Tab);
    tab.Foreground = 'black';
    tab.Color = selectedTabColor;
    tab.instance = instance;
    tab.Preloader = $('<div class="md-preloader" style="position: absolute; left: 6px; top: 8px;"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="16" width="16" viewbox="0 0 75 75"><circle class="preloader-circle" cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg></div>').appendTo(tab.Tab);
    tab.selected = false;

    //close button click event
    tab.closeBtn.click(function(e) {
        removeTab(tab);
    });
    //tab drag event
    tab.Tab.draggable({
        axis: 'x',
        stop: function(event, ui) {
            calcSizes(true, true);
        },
        drag: function(event, ui) {
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
                changePos(overTab);
            }
        }
    });
    $('#addTab').insertAfter(tab.Tab);
    tabCollection.push(tab);
    selectTab(tab.Tab);
    tab.selected = true;
    tab.Tab.mousedown(function(e) {
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
}

function removeTab(tab) {
  if (tabCollection.indexOf(tab) - 1 != -1) {
      console.log(tabCollection.indexOf(tab) - 1);
      selectTab(tabCollection[tabCollection.indexOf(tab) - 1].Tab);
  } else {
      if (tabCollection[1] != null)
          selectTab(tabCollection[1].Tab);
  }

  tabCollection.splice(tabCollection.indexOf(tab), 1);
  tab.Tab.remove();
  if (tabCollection.length == 0) {
      const remote = require('electron').remote;
      var window = remote.getCurrentWindow();
      window.close();
  }
  calcSizes(true, true);
}

function getTabFromMousePoint(callingTab) {
    if (!locked) {
        for (var i = 0; i < tabCollection.length; i++) {
            if (tabCollection[i] != callingTab) {
                if (contains(tabCollection[i].Tab[0])) {
                    return tabCollection[i];
                }
            }
        }
    }
}

function changePos(callingTab) {
    locked = true;
    callingTab.Tab.animate({
        left: tabCollection.indexOf(callingTab) * tabCollection[0].Tab.width()
    }, {
        duration: 200,
        complete: function() {
            locked = false
        }, queue: false
    });
}

document.onmousemove = function(e) {
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
        if (!($('#tabbar').width() / tabCollection.length >= tabWidth)) {
            tabWidthTemp = ($('#tabbar').width() - $('#addTab').width() - 20) / tabCollection.length;
        } else {
            tabWidthTemp = 170;
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

$('#addTab').click(function() {
    var tab = new Tab();
    addTab(new TabWindow(tab, "webexpress://newtab"), tab);
});

function selectTab(tab) {
    for (var i = 0; i < tabCollection.length; i++) {
        if (tabCollection[i].Tab != tab) {
            tabCollection[i].Tab.css('background-color', $('#tabbar').css('background-color'));
            tabCollection[i].tabWindow.css('display', 'none');
            tabCollection[i].Title.removeClass('dark').addClass('light');
            tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")');
            tabCollection[i].selected = false;
        } else {
            tabCollection[i].Tab.css('background-color', tabCollection[i].Color);
            tabCollection[i].tabWindow.css('display', 'block');

            if (tabCollection[i].instance.searchInput != null && (tabCollection[i].instance.searchInput.val() == "" || tabCollection[i].instance.searchInput.val() == null)) {
                tabCollection[i].instance.searchInput.focus();
            }
            if (tabCollection[i].Foreground == 'black') {
                tabCollection[i].Title.removeClass('dark').addClass('light');
                tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close.png")');
            } else if (tabCollection[i].Foreground == 'white') {
                tabCollection[i].Title.removeClass('light').addClass('dark');
                tabCollection[i].closeBtn.find('.closeBtnImg').css('background-image', 'url("img/close-white.png")');
            }
            tabCollection[i].selected = true;
        }
    }
}
