var fs = require('fs');
var os = require('os');
const {ipcRenderer} = require('electron');
const {app} = require('electron').remote;
var os = require('os');

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
ipcRenderer.on('getContextData', function (event, loc) {
    var element = document.elementFromPoint(loc.x, loc.y)
    if (element) {
        var src = element.href || element.src
        if (element.tagName === 'IMG' || element.tagName === 'PICTURE') {
            var image = element.src
        }
    }
    if (typeof (src) === "undefined") {
        src = "";
    }
    if (typeof (image) === "undefined") {
        image = "";
    }

    ipcRenderer.sendToHost('contextData', {
        selection: window.getSelection().toString(),
        src: src,
        image: image
    })
})
