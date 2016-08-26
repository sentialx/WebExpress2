var tabCollection = [];
var tabWidth = 170;
var selectedTabColor = '#F5F5F5';

function addTab() {
  for (var i = 0; i < tabCollection.length; i++) {
    tabCollection[i].Tab.css('z-index', 9999);

  }
  var tab = new Tab();
  tab.Tab = $('<div class="tab" id="#tab"></div>').appendTo('#tabbar');
  tab.closeBtn = $("<div class='closeBtn'><div class='closeBtnImg'></div></div>").appendTo(tab.Tab);
  tab.Title = $("<div class='tabTitle'>New tab</div>").appendTo(tab.Tab);
  tab.instance = new TabWindow(tab);

  tab.closeBtn.click(function(e) {

    if (tabCollection.indexOf(tab) - 1 != -1) {
      console.log(tabCollection.indexOf(tab) - 1);
      selectTab(tabCollection[tabCollection.indexOf(tab) - 1].Tab);
    }
    else {
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
  });
  $('#addTab').insertAfter(tab.Tab);
  tabCollection.push(tab);
  selectTab(tab.Tab);
  tab.Tab.click(function(e) {
    selectTab(tab.Tab);
  });
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
  calcSizes(false, true);
    tab.Tab.css({top: 50});
    tab.Tab.animate({top: 0}, {duration: 200});
}

function getSelectedTab() {
  for (var i = 0; i < tabCollection.length; i++) {
    if (tabCollection[i].Tab.css('background-color') != $('#tabbar').css('background-color')) {
      return tabCollection[i];
    }
  }
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
var locked = false;
function changePos(callingTab) {
  locked = true;
  callingTab.Tab.animate({left: tabCollection.indexOf(callingTab) * tabCollection[0].Tab.width()},  {duration: 200, complete: function(){
    locked = false;
    }
  });
}
var cursorX;
document.onmousemove = function(e){
    cursorX = e.pageX;
}
function contains(tabToCheck) {
  var rect = tabToCheck.getBoundingClientRect();
  if (cursorX >= rect.left && cursorX <= rect.right) {
    return true;
  }
  return false;
}

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
      tabCollection[i].Tab.animate({left: tabCountTemp * tabCollection[0].Tab.width()}, {duration: 200});

    } else {
      tabCollection[i].Tab.animate({left: tabCountTemp * tabCollection[0].Tab.width()}, {duration: 1});
    }
    tabCountTemp += 1;
  }
  if (tabCollection[0] != null) {
    if (addButtonAnimation == true) {
      $('#addTab').animate({left: tabCollection.length * tabCollection[0].Tab.width()}, {duration: 200});
    } else {
      $('#addTab').css({left: tabCollection.length * tabCollection[0].Tab.width()});
    }
  }
}


function selectTab(tab) {
  for (var i = 0; i < tabCollection.length; i++) {
    if (tabCollection[i].Tab != tab) {
        tabCollection[i].Tab.css('background-color', $('#tabbar').css('background-color'));
        tabCollection[i].tabWindow.css('display', 'none');
    } else {
        tabCollection[i].Tab.css('background-color', selectedTabColor);
        tabCollection[i].tabWindow.css('display', 'block');
    }

  }

}