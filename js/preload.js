const fs = require('fs');
global.fs = require('fs');

global.getHistoryData = function () {
  return JSON.parse(fs.readFileSync('/userdata/history.json'));
}
