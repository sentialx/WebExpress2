var fs = require('fs');

global.getHistoryData = function () {
  return JSON.parse(fs.readFileSync('/userdata/history.json'));
}

global.saveHistory = function(json) {
    fs.writeFile('/userdata/history.json', json, function(err) {
      if (err) {
          return console.log(err);
      }
    });
}
