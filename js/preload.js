const fs = require('fs');

global.getHistoryData = function () {
  return JSON.parse(fs.readFileSync('/userdata/history.json'));
}
console.log(global.getHistoryData());
