'use strict';
var gulp = require('gulp');
var electron = require('electron-connect').server.create();
gulp.task('default', function () {
 electron.start();
 gulp.watch('app.js', electron.restart);
 gulp.watch(['index.html', 'browser.html', 'main.js', 'newtab.html', 'package.json', 'js/utils.js', 'js/newtab.js', 'js/main.js', 'js/tabsystem/tabbar.js', 'js/materialdesign/materialdesign.js', 'js/materialdesign/ripple.js', 'js/materialdesign/css/materialdesign.css', 'js/extensions/api.js', 'js/extensions/preload.js', 'js/applets/history.js', 'js/applets/tabwindow.js'], electron.reload);
});