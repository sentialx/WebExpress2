class ContextMenu {
    constructor(webview) {
        var t = this
        this.webview = webview
        this.linkToOpen = ''
        this.imageToSave = ''
        this.xToInspect = null
        this.yToInspect = null
        this.menu = new Menu()
        this.prepareContextMenu()

        $(webview).ready(function () {
            webview.getWebContents().on('context-menu', (e, params) => {
                e.preventDefault()
                t.imageToSave = ''
                t.linkToOpen = ''
                if (params.mediaType == 'image') {
                    t.imageToSave = params.srcURL
                } else {
                    t.imageToSave = ''
                }
                t.linkToOpen = params.linkURL

                if (t.linkToOpen == "") {
                    t.openLinkInNewTabMenuItem.visible = false
                    t.copyLinkMenuItem.visible = false
                } else {
                    t.openLinkInNewTabMenuItem.visible = true
                    t.copyLinkMenuItem.visible = true
                }

                if (t.imageToSave == "") {
                    t.saveImageAsMenuItem.visible = false
                    t.openImageInNewTabMenuItem.visible = false
                } else {
                    t.saveImageAsMenuItem.visible = true
                    t.openImageInNewTabMenuItem.visible = true
                }

                if (t.imageToSave == "" && t.linkToOpen == "") {
                    t.backMenuItem.visible = true
                    t.forwardMenuItem.visible = true
                    t.refreshMenuItem.visible = true
                    t.printMenuItem.visible = true
                } else {
                    t.backMenuItem.visible = false
                    t.forwardMenuItem.visible = false
                    t.refreshMenuItem.visible = false
                    t.printMenuItem.visible = false
                }

                if (webview.canGoBack()) {
                    t.backMenuItem.enabled = true
                } else {
                    t.backMenuItem.enabled = false
                }
                if (webview.canGoForward()) {
                    t.forwardMenuItem.enabled = true
                } else {
                    t.forwardMenuItem.enabled = false
                }

                t.xToInspect = params.x
                t.yToInspect = params.y
                t.menu.popup(remote.getCurrentWindow())

            }, false)
        })

    }

    prepareContextMenu() {
        var t = this
        t.backMenuItem = new MenuItem({
            label: 'Back',
            click() {
                t.webview.goBack()
            }
        })
        t.forwardMenuItem = new MenuItem({
            label: 'Forward',
            click() {
                t.webview.goForward()
            }
        })
        t.refreshMenuItem = new MenuItem({
            label: 'Reload',
            click() {
                t.webview.reload()
            }
        })
        t.openLinkInNewTabMenuItem = new MenuItem({
            label: 'Open link in new tab',
            click() {
                if (t.linkToOpen != "") {
                    var tab = new Tab(),
                        instance = $('#instances').browser({
                            tab: tab,
                            url: t.linkToOpen
                        })
                    addTab(instance, tab);
                }
            }
        })
        t.openImageInNewTabMenuItem = new MenuItem({
            label: 'Open image in new tab',
            click() {
                if (t.linkToOpen != "") {
                    var tab = new Tab(),
                        instance = $('#instances').browser({
                            tab: tab,
                            url: t.linkToOpen
                        })
                    addTab(instance, tab);
                }
            }
        })
        t.copyLinkMenuItem = new MenuItem({
            label: 'Copy link address',
            click() {
                if (t.linkToOpen != "") {
                    clipboard.writeText(t.linkToOpen)
                }
            }
        })
        t.saveImageAsMenuItem = new MenuItem({
            label: 'Save image as',
            click() {
                //saves image as
            }
        })
        t.printMenuItem = new MenuItem({
            label: 'Print',
            click() {
                //prints webpage
            }
        })
        t.inspectElementMenuItem = new MenuItem({
            label: 'Inspect element',
            click() {
                t.webview.inspectElement(t.xToInspect, t.yToInspect)
            }
        })
        t.viewSourceMenuItem = new MenuItem({
            label: 'View source',
            click() {
                //views source
            }
        })
        t.separator1 = new MenuItem({
            type: 'separator'
        })
        t.separator2 = new MenuItem({
            type: 'separator'
        })
        t.addContextMenuItem(t.openLinkInNewTabMenuItem)
        t.addContextMenuItem(t.openImageInNewTabMenuItem)
        t.addContextMenuItem(t.backMenuItem)
        t.addContextMenuItem(t.forwardMenuItem)
        t.addContextMenuItem(t.refreshMenuItem)
        t.addContextMenuItem(t.separator1)
        t.addContextMenuItem(t.copyLinkMenuItem)
        t.addContextMenuItem(t.saveImageAsMenuItem)
        t.addContextMenuItem(t.printMenuItem)
        t.addContextMenuItem(t.separator2)
        t.addContextMenuItem(t.inspectElementMenuItem)
        t.addContextMenuItem(t.viewSourceMenuItem)
    }

    addContextMenuItem(item) {
        this.menu.append(item)
    }
}