//requires
const {
    remote,
    ipcMain,
    clipboard
} = require('electron')
const {
    Menu,
    MenuItem
} = remote
const {
    app
} = require('electron').remote;
var getPixels = require("get-pixels")
var fs = require('fs');
var IsThere = require("is-there");
var dir = require('node-dir');
var os = require('os');

//paths
var fileToStart = remote.getGlobal("startArgs").data[2]
var historyPath = app.getPath('userData') + '/userdata/history.json';
var extensionsPath = app.getPath('userData').replace(/\\/g, '/') + '/userdata/extensions';
var userdataPath = app.getPath('userData') + '/userdata';
console.log(extensionsPath);

var mainWindow = remote.getCurrentWindow();

$(document).ready(function () {
    var tab = new Tab(),
        instance = $('#instances').browser({
            tab: tab,
            url: 'webexpress://newtab'
        })
    addTab(instance, tab);
});
window.onresize = function (event) {
    calcSizes(false, false);
};

//window buttons
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
