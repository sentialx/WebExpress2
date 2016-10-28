function isInArray(value, array) {
    return array.indexOf(value) > -1;
}
console.log(fs);
var obj = getHistoryData();
var groups = [];
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}
today = mm + '-' + dd + '-' + yyyy;

obj.history = obj.history.reverse();
for (var i = 0; i < obj.history.length; i++) {
    var jsonItem = obj.history[i];

    function additem() {
        var item = $('<div class="item" style="margin-bottom: -8px;">').appendTo('.card');
        var border = $('<div class="checkbox" style="display: inline-block; height: 20px; width: 20px;"></div>').appendTo(item);
        var hour = $('<p style="display: inline-block;margin-left: 16px; width: 50px;color: #9E9E9E;position: relative; top: -4px;">' + jsonItem.time + '</p>').appendTo(item);
        var title = $('<p style="margin-left: 52px;display: inline-block;white-space: nowrap;overflow:hidden !important;text-overflow: ellipsis;max-width: 40%;max-height: 16px; position: relative; top: 14px; margin-top: -4px;">' + jsonItem.title + '</p>').appendTo(item);
        var link = $('<a href="' + jsonItem.link + '" style="margin-left: 16px; display: inline-block;white-space: nowrap;overflow:hidden !important;text-overflow: ellipsis;max-width: 30%; max-height: 16px; margin-top: -4px;">' + jsonItem.link + '</a>').appendTo(item);
    }

    if (!isInArray(jsonItem.date, groups)) {
        var cardHeader;
        if (groups.length == 0) {
            if (jsonItem.date == today) {
                cardHeader = $('<div class="card-header" style="margin-bottom:32px;"><div style="padding-bottom: 16px;">Today</div></div>').appendTo('.card');
            } else {
                cardHeader = $('<div class="card-header" style="margin-bottom:32px;"><div style="padding-bottom: 16px;">' + jsonItem.date + '</div></div>').appendTo('.card');
            }
        } else {
            cardHeader = $('<div class="card-header" style="margin-top: 32px; margin-bottom:32px;"><div style="padding-bottom: 16px;">' + jsonItem.date + '</div></div>').appendTo('.card');
        }
        var hr = $('<hr style="position: absolute; top: 0; left:0;right:0; margin-top: 0; padding-top: 0;" />').appendTo(cardHeader);
        var hr = $('<hr style="position: absolute; bottom: 0; left:0;right:0; margin-bottom: 0; padding-bottom: 0;" />').appendTo(cardHeader);
        additem();

        groups.push(jsonItem.date);
    } else {
        additem();
    }
}
