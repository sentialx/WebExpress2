const fs = require('fs');



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
      return JSON.parse(fs.readFileSync('/userdata/history.json'));
    }
}


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
      //TODO: return JSON object;
    }
}


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
      //TODO: return JSON object;
    }
}


class ExtensionsManager {
    constructor() {

    }
    static removeExtensionByIndex(index) {

    }
    static removeExtension(string) {

    }
    static getAllExtensions() {
      //TODO: return JSON object;
    }
}
