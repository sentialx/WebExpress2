var fs = require('fs');
const {ipcRenderer} = require('electron');

global.getHistoryData = function () {
    return JSON.parse(fs.readFileSync('/userdata/history.json'));
}

global.saveHistory = function (json) {
    fs.writeFile('/userdata/history.json', json, function (err) {
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
