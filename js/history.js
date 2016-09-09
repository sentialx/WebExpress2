var obj = getHistoryData();
obj.history = obj.history.reverse();
for (var i = 0; i < obj.history.length; i++) {
    var jsonItem = obj.history[i];
    var item = $('<div class="item" style="margin-bottom: -16px;">').appendTo('.card');
    var border = $('<div style="display: inline-block; height:14px; padding-left:18px; border-radius: 2px; border: 2px solid #9E9E9E;"></div>').appendTo(item);
    var hour = $('<p style="display: inline-block;margin-left: 16px; color: #9E9E9E;">'+ jsonItem.time + '</p>').appendTo(item);
    var title = $('<p style="margin-left: 72px;display: inline-block;white-space: nowrap;overflow:hidden !important;text-overflow: ellipsis;max-width: 40%;max-height: 16px; position: relative; top: 14px;">' + jsonItem.title + '</p>').appendTo(item);
    var link = $('<a href="' + jsonItem.link + '" style="margin-left: 16px; display: inline-block;white-space: nowrap;overflow:hidden !important;text-overflow: ellipsis;max-width: 30%; max-height: 16px;">' + jsonItem.link + '</a>').appendTo(item);
}
