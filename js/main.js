const remote = require('electron').remote;
const {app} = require('electron').remote;
var os = require('os');
var fileToStart = remote.getGlobal("startArgs").data[2]
fileToStart = fileToStart.replace(/\\/g,"/");
var historyPath = app.getPath('userData') + '/userdata/history.json';
var extensionsPath = app.getPath('userData').replace(/\\/g, '/') + '/userdata/extensions';
console.log(extensionsPath);
var userdataPath = app.getPath('userData') + '/userdata';

var mainWindow = remote.getCurrentWindow();
var fs = require('fs');
var IsThere = require("is-there");
var dir = require('node-dir');

$(document).ready(function () {
    var tab = new Tab();
    addTab(new TabWindow(tab, "webexpress://newtab"), tab);
});
window.onresize = function (event) {
    calcSizes(false, false);
};

$('.windowbutton-close').click(function () {
    mainWindow.close();
});
$('.windowbutton-maximize').click(function () {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }

});
$('.windowbutton-minimize').click(function () {
    mainWindow.minimize();
});



function checkFiles() {
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
}

/*function loadThemes() {
    if (jFileType == "stylesheet" || jFileType == "css") {
        $('head').append('<link rel="stylesheet" type="text/css" href="' + jFileUrl + '">')
    }
} TODO */
