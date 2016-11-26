var fs = require('fs');
var os = require('os');
const {
    ipcRenderer
} = require('electron')
const {
    app
} = require('electron').remote;
var historyPath = app.getPath('userData') + '/userdata/history.json';
var extensionsPath = app.getPath('userData') + '/userdata/extensions';
var userdataPath = app.getPath('userData') + '/userdata';

global.getHistoryData = function () {
    return JSON.parse(fs.readFileSync(historyPath));
}

global.saveHistory = function (json) {
    fs.writeFile(historyPath, json, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}
global.removeHistory = function(callback = function() {}) {
    fs.unlink(historyPath, callback)
}
global.addressBarFocus = function () {
    for (var i = 0; i < parent.tabCollection.length; i++) {
        if (parent.tabCollection[i].selected) {
            var itab = parent.tabCollection[i]
            $(itab.tabWindow.find('.searchInput')).focus()
        }
    }
    
}
ipcRenderer.on('getDocument', function (e) {
    var children = document.body.getElementsByTagName("*");
    var colors = []
    for (var i = 0; i < children.length; i++) {
        colors.push(children[i].style.backgroundColor)
    }
    colors.reverse();
    var s = 0;
    for (var i = 0; i < colors.length; i++) {
        if (colors[i].startsWith('rgb') || colors[i].startsWith('#')) {
            color = colors[i];
            ipcRenderer.sendToHost('document', color)
            break;
        }
    }

})