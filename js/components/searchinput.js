 (function ($) {
     $.fn.searchInput = function (params) {
         var settings = $.extend({
                 tab: null
             }, params),
             t = this,
             webview = settings.tab.instance.webview.webview


         $(this).focusin(function () {
             $(this).select();
         });
         $(this).keypress(function (e) {
             var suggestions = suggestions = settings.tab.instance.bar.suggestions
                 //if enter key was pressed
             if (e.which == 13) {
                 suggestions.css('display', 'none')
                 if (!$(t).val().startsWith("webexpress://")) {
                     if (isURL($(t).val())) {
                         if ($(t).val().startsWith("http://") || $(t).val().startsWith("https://") || $(t).val().startsWith("file://")) {
                             webview.loadURL($(t).val());
                         } else {
                             webview.loadURL("http://" + $(t).val());
                         }
                     } else {
                         //TODO: search engines
                         webview.loadURL("http://www.google.com/search?q=" + $(t).val());
                     }
                 } else {
                     webview.loadURL($(t).val());
                 }

                 return false;
             }
         });
         return this
     }
 }(jQuery))