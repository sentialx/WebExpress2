
var json;

  readTextFile("./history.json");

  function readTextFile(file)
  {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function ()
      {
          if(rawFile.readyState === 4)
          {
              if(rawFile.status === 200 || rawFile.status == 0)
              {
                  var allText = rawFile.responseText;
                  json = allText;

                  json = json.replace("\ufeff", "");
                  var obj = JSON.parse(json);
                  for (var i = 0; i < obj.history.length; i++) {

                    var jsonItem = obj.history[i];
                    var item = $('<div class="item" style="padding: 8px;">').appendTo('.card');
                    var border = $('<div style="display: inline; height:14px; padding-left:18px; border-radius: 2px; border: 2px solid #9E9E9E;"></div>').appendTo(item);
                    var hour = $('<p style="display: inline;margin-left: 16px; color: #9E9E9E;">21:37</p>').appendTo(item);
                    var title = $('<p style="display: inline; margin-left: 48px;">' + jsonItem.title + '</p>').appendTo(item);
                    var title = $('<a href="' + jsonItem.link + '" style="margin-left: 8px;">' + jsonItem.link + '</a>').appendTo(item);

                  }

              }
          }
      }
      rawFile.send(null);
  }
