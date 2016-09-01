var json;


$.ajax({
    type: "GET",
    url: "./userdata/history.json",
    success: function(data) {
      var allText = data;
      json = allText;

      json = json.replace("\ufeff", "");
      var obj = JSON.parse(json);
      for (var i = 0; i < obj.history.length; i++) {

          var jsonItem = obj.history[i];
          var item = $('<div class="item" style="padding: 8px;">').appendTo('.card');
          var border = $('<div style="display: inline; height:14px; padding-left:18px; border-radius: 2px; border: 2px solid #9E9E9E;"></div>').appendTo(item);
          var hour = $('<p style="display: inline;margin-left: 16px; color: #9E9E9E;">21:37</p>').appendTo(item);
          var title = $('<p style="display: inline; margin-left: 48px;overflow: hidden;white-space: nowrap;">' + jsonItem.title + '</p>').appendTo(item);
          var link = $('<a href="' + jsonItem.link + '" style="margin-left: 8px; display: inline; margin-right: 32px; overflow: hidden;white-space: nowrap;">' + jsonItem.link + '</a>').appendTo(item);

      }
    }
});
