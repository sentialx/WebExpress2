function getHTML(webview, callback) {
    webview.executeJavaScript('f(); function f() { return document.body.innerHTML;}', function(result) {
        callback(result);
    });
}

function insertHTML(webview, code) {
    webview.executeJavaScript(`document.body.innerHTML += '${code}'`);
}

function setHTML(webview, code) {
    webview.executeJavaScript(`document.body.innerHTML = '${code}'`);
}

/*
class HistoryManager {
    constructor() {

    }
    static removeHistoryItemByIndex(index) {

    }
    static removeHistoryItem(string) {

    }
    static clearHistory() {

    }
    static getAllHistory() {
      return historyArray;
    }
}
TODO

class BookmarksManager {
    constructor() {

    }
    static removeBookmarkItemByIndex(index) {

    }
    static removeBookmarkItem(string) {

    }
    static clearBookmarks() {

    }
    static getAllBookmarks() {
      return bookmarksArray;
    }
}
TODO

class DownloadsManager {
    constructor() {

    }
    static removeDownloadByIndex(index) {

    }
    static removeDownloadItem(string) {

    }
    static clearDownloads() {

    }
    static getAllDownloads() {
      return downloadsArray;
    }
}
TODO

class ExtensionsManager {
    constructor() {

    }
    static removeExtensionByIndex(index) {

    }
    static removeExtension(string) {

    }
    static getAllExtensions() {
      return extensionsArray;
    }
}
TODO

class LayoutManager {
    constructor() {

    }
    static setTitlebarColor(hex) {

    }
    static setTabsColor(indexArray, hex) {

    }
    static setBarColor(instance, hex) {

    }
    static getTabsColor(indexArray) {
      return null;
    }
    static getTitlebarColor() {
      return null;
    }
    static getBarColor(instance) {
      return instance.tabWindow.css('background-color');
    }
}
*/
