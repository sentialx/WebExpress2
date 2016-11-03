var fs = require('fs');

global.getHistoryData = function () {
  return JSON.parse(fs.readFileSync('/userdata/history.json'));
}
