class Storage {
    constructor() {

    }

    saveHistory(title, url) {
        if (title != null && url != null) {

            var array;
            //get today's date
            var today = new Date(),
                dd = today.getDate(),
                mm = today.getMonth() + 1,
                yyyy = today.getFullYear()
            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }
            today = mm + '-' + dd + '-' + yyyy

            //read history.json file and append new history items
            fs.readFile(historyPath, function (err, data) {
                if (err) throw err
                var json = data.toString()
                    //replace weird characters in utf-8
                json = json.replace("\ufeff", "")
                var obj = JSON.parse(json)
                if (!url.startsWith("webexpress://") && !url.startsWith("about:blank")) {
                    var date = new Date()
                    var current_hour = date.getHours()
                    var current_minute = date.getMinutes()
                    var time = `${current_hour}:${current_minute}`
                    if (obj['history'][obj['history'].length - 1] == null) {
                        obj['history'].push({
                            "link": url,
                            "title": title,
                            "date": today,
                            "time": time,
                            "id": 0
                        });
                    } else {
                        obj['history'].push({
                            "link": url,
                            "title": title,
                            "date": today,
                            "time": time,
                            "id": obj['history'][obj['history'].length - 1].id + 1
                        });
                    }
                    var jsonStr = JSON.stringify(obj)
                    json = jsonStr
                        //append new history item to history.json
                    fs.writeFile(historyPath, json, function (err) {
                        if (err) {
                            return console.log(err)
                        }
                    })
                }
            })
        }


    }
}