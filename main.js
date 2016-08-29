const electron = require('electron')
const protocol = electron.protocol
const app = electron.app
const path = require('path')
const BrowserWindow = electron.BrowserWindow
let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, height: 768, frame: false})
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.setMenu(null)
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    item.setSavePath(item.getFilename()) //TODO set path to downloads folder
  })
}
  protocol.registerStandardSchemes(['webexpress'])
app.on('ready', function() {
  protocol.registerFileProtocol('webexpress', (request, callback) => {
    var url = request.url.substr(13)
    console.log(request);
    var lastChar = url.substr(url.length - 1)
    var s = url.split("/");
    if (lastChar != "/") {
      url = url.replace(s[0], "")
    }
    if (lastChar == "/") {
      url = url.substring(0, url.length - 1)
      url += ".html"
    }


    callback({path: path.normalize(`${__dirname}/${url}`)})
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    })
  createWindow();
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
