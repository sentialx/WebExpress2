class Extensions {
    constructor() {
        this.loadedExts = []
        this.apis = []
    }
    deleteExtensions() {
        var t = this
        $.each(t.loadedExts, function (i, el) {
            $(t.loadedExts[i]).remove()
        })
        $.each(t.apis, function (i, el) {
            t.apis[i].dispose()
            t.apis[i] = null
        })
        this.apis = []
        this.loadedExts = []
    }

    loadExtensions(id, callback = null) {
        var t = this
            //get all .JSON files in folder to an array
        var listOfExtensions = [];
        var listOfExtensionsDirs = [];
        dir.subdirs(extensionsPath, function (err, subdirs) {
            if (err) throw err;
            for (var i = 0; i < subdirs.length; i++) {
                dir.files(subdirs[i], function (err, files) {
                    if (err) throw err;
                    for (var i2 = 0; i2 < files.length; i2++) {
                        if (endsWith(files[i2], ".json")) {
                            listOfExtensions.push(files[i2]);
                            //read json from all files
                            $.ajax({
                                type: "GET",
                                url: files[i2],
                                success: function (data) {
                                    var jsonObject = JSON.parse(data);
                                    //Deserialize JSON string
                                    var jsonData = {
                                        name: jsonObject.name,
                                        folder: jsonObject.folder,
                                        version: jsonObject.version,
                                        desc: jsonObject.description,
                                        icon: jsonObject.icon,
                                        popupPage: jsonObject.popuppage,
                                        settingsPage: jsonObject.settingspage,
                                        scripts: jsonObject.scripts
                                    }


                                    for (var i3 = 0; i3 < jsonData.scripts.length; i3++) {
                                        var fileUrl = extensionsPath + "/" + jsonData.folder + "/" + jsonData.scripts[i3]["url"]
                                        $.ajax({
                                            type: "GET",
                                            url: fileUrl,
                                            success: function (data) {
                                                if (typeof (callback) === 'function') {
                                                    jsonData.code = data
                                                    callback(jsonData)
                                                }
                                                $('#extensions').ready(function () {
                                                    $('#extensions')[0].contentWindow.parent = window
                                                    var extension = $(`<script async>
                                                            function a${id}(index) {
                                                                var api = new API(parent.tabCollection[index], parent)
                                                                parent.tabCollection[index].instance.extensions.apis.push(api)
                                                                parent = null
                                                                ${data}
                                                            } a${id}(${id}); 
                                                            </script>`).appendTo($('#extensions').contents().find('body'))

                                                    t.loadedExts.push(extension)
                                                })

                                            }
                                        })

                                    }
                                }
                            })

                        }
                    }
                })
            }
        })

    }
}