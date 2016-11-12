var fs = require('fs');
var os = require('os');
const {app} = require('electron').remote;

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

