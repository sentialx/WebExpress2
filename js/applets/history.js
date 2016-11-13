function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

var obj = getHistoryData();
var groups = [];
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
var count = 0;
var headers = [];
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}
today = mm + '-' + dd + '-' + yyyy;
var checkboxes = [];
obj.history = obj.history.reverse();
var checkedCount = 0;
$('#unselect-btn').click(function() {
    $('.checkbox').each(function(i) {
        if (this.checked) {
            this.checked = false;
            checkedCount -= 1;
            verifyCheckboxes();
        }
    });
});
$('.icon-button').mousedown(function() {
     Ripple.makeRipple($(this), 10, 10, 15, 15, 300, 0);
});
$('#delete-btn').click(function() {
   
    $('.checkbox').each(function(i) {
        if (this.checked) {
            console.log(obj.history[this.id]);
            
            for (var i = 0; i < obj.history.length; i++) {
                if (obj.history[i].id == this.id) {
                    obj.history.splice(i, 1);
                }
            }
            this.item.remove();
            if (this.item.length <= 0) {
                checkedCount = 0;
                verifyCheckboxes(); 
            }
            checkedCount = 0;
            this.group.items -= 1;
            if (this.group.items <= 0) {
                this.group.remove();
                headers.splice(headers.indexOf(this.group), 1);
                headers[0].css('margin-top', '-32px');
            }
            verifyCheckboxes();
        }
    });
    obj.history.sort(function(a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
    });
    saveHistory("");
    saveHistory(JSON.stringify(obj));
});
$('.flat-button').mousedown(function(e) {
    var relX = e.pageX - $(this).offset().left;
    var relY = e.pageY - $(this).offset().top;
    Ripple.makeRipple($(this), relX, relY, $(this).width() + 16, $(this).height() + 16, 300, 0);
});
function verifyCheckboxes() {
    $('#selected-items').html('Selected items: ' + checkedCount);
    if (checkedCount >= 1) {
        $(".toolbar").animate({backgroundColor: '#283593'}, {duration: 200, queue: false});
        $('.default-toolbar').css('visibility', 'hidden');
        $('.selecteditems-toolbar').css({visibility: 'visible', opacity: 0});
        $('.selecteditems-toolbar').animate({opacity: 1}, {duration: 200, queue: false});
    } else {
        $(".toolbar").animate({backgroundColor: '#3F51B5'}, {duration: 200, queue: false});
        $('.default-toolbar').css({visibility: 'visible', opacity: 0});
         $('.default-toolbar').animate({opacity: 1}, {duration: 200, queue: false})
        $('.selecteditems-toolbar').css('visibility', 'hidden');
    }
}
for (var i = 0; i < obj.history.length; i++) {
    var jsonItem = obj.history[i];

    function additem(header) {
        var item = $('<div class="item" style="margin-bottom: -8px; ">').appendTo('.card');
        var checkbox = $('<div class="checkbox ripple-icon" data-ripple-color="#444" style="display: inline-block;"></div>').appendTo(item);
        checkbox[0].item = item;
        if (header != null)
        checkbox[0].group = header;
        checkbox[0].id = jsonItem.id;
        checkbox.click(function(e) {
            if (this.checked) {
                checkedCount += 1;
            } else {
                checkedCount -= 1;
            }
            verifyCheckboxes();
        });
        checkboxes.push(checkbox[0])
        var hour = $('<p style="display: inline-block;margin-left: 16px; width: 50px;color: #9E9E9E;position: relative; top: -4px;">' + jsonItem.time + '</p>').appendTo(item);
        var title = $('<p style="margin-left: 52px;display: inline-block;white-space: nowrap;overflow:hidden !important;text-overflow: ellipsis;max-width: 40%;max-height: 16px; position: relative; top: 14px; margin-top: -4px;">' + jsonItem.title + '</p>').appendTo(item);
        var link = $('<a href="' + jsonItem.link + '" style="margin-left: 16px; display: inline-block;white-space: nowrap;overflow:hidden !important;text-overflow: ellipsis;max-width: 30%; max-height: 16px; margin-top: -4px;">' + jsonItem.link + '</a>').appendTo(item);
        count += 1;
    }
    var currentHeader;
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
        cardHeader.items = 1;
        additem(cardHeader);
        currentHeader = cardHeader;
        groups.push(jsonItem.date);
        headers.push(cardHeader);
    } else {
        currentHeader.items += 1;
        additem(currentHeader);
        
    }
}
