 (function ($) {
     $.fn.extensionsMenu = function (params) {
         var settings = $.extend({
                 tab: null
             }, params),
             t = this

         this.toggled = false
         this.extPage = $('<ul class="ext-page">').appendTo($(this))
         this.extIndicators = $('<ul class="ext-indicators">').appendTo($(this))

         this.hide = function () {
             //menu fade out animation
             $(t).css('opacity', 1).animate({
                 opacity: 0
             }, 200).css('top', 8).animate({
                 top: -32
             }, {
                 queue: false,
                 complete: function () {
                     $(t).css('visibility', 'hidden');
                 },
                 duration: 200
             });
             t.toggled = false;
         }

         this.show = function () {
             //menu fade in animation
             $(t).css('visibility', 'visible');
             $(t).css('opacity', 0).animate({
                 opacity: 1
             }, 200, function () {
                 t.toggled = true
             }).css('top', -32).animate({
                 top: 8
             }, {
                 queue: false,
                 duration: 200
             });
             $(t).focus()
         }

         var extCollection = [];
         var pageCollection = [];
         var indicatorsCollection = [];
         var extCount = 0;
         var pagesCount = 1;
         var indicatorsCount = 0;
         var currentPage = this.extPage
         var selectedPage = 0
         pageCollection.push(currentPage)

         this.resetExtMenu = function () {
             extCollection = []
             pageCollection = []
             indicatorsCollection = [];
             extCount = 0
             pagesCount = 1
             indicatorsCount = 0
             $(t).find('.ext-page').remove()
             t.extIndicators.empty()
             t.extPage = $('<ul class="ext-page">').appendTo($(this))
             currentPage = t.extPage
             selectedPage = 0
             pageCollection.push(currentPage)
         }

         this.addExtension = function (image, clickEvent) {
             if (extCount != 9) {

                 var ext = $('<li class="ext-item ripple" data-ripple-color="#444"><div class="ext-item-icon" style="background-image: url(\'' + image + '\')"></div></li>').appendTo(currentPage);
                 ext.click(function () {
                     clickEvent();
                 });

                 ext.mousedown(function () {
                     makeRippleIconButton($(this));
                 });
                 $('.ripple-effect').css('z-index', '2');
                 extCollection.push(ext);
                 extCount += 1;
             } else {
                 extCount = 0;
                 currentPage = $('<ul class="ext-page"></ul>').appendTo($(t));

                 var ext = $('<li class="ext-item ripple" data-ripple-color="#444"><div class="ext-item-icon" style="background-image: url(\'' + image + '\')"></div></li>').appendTo(currentPage);
                 ext.click(function () {
                     clickEvent();
                 });
                 ext.mousedown(function () {
                     makeRippleIconButton($(this));
                 });
                 $('.ripple-effect').css('z-index', '2');
                 pageCollection.push(currentPage);
                 extCollection.push(ext);
                 pagesCount += 1;
                 extCount += 1;
             }
             t.resetIndicators();
             for (var i = 0; i < pageCollection.length; i++) {
                 pageCollection[i].css({
                     top: (-1 * i) * (pageCollection[i].height() + 31),
                     left: -200
                 });
             }
             pageCollection[0].css({
                 left: 0
             });
         }

         this.createIndicator = function (index) {
             var indicator = $('<li class="ext-indicator"></li>').appendTo(t.extIndicators);

             indicator.click(function () {
                 if (selectedPage > index) {
                     //from left to right
                     pageCollection[selectedPage].css({
                         left: 0
                     }).animate({
                         left: 200
                     });
                     pageCollection[index].css({
                         left: -200
                     }).animate({
                         left: 0
                     });
                 } else if (selectedPage < index) {
                     //from right to left
                     pageCollection[selectedPage].css({
                         left: 0
                     }).animate({
                         left: -200
                     });
                     pageCollection[index].css({
                         left: 200
                     }).animate({
                         left: 0
                     });
                 }

                 for (var i = 0; i < indicatorsCollection.length; i++) {
                     indicatorsCollection[i].css({
                         height: 8,
                         width: 8,
                         top: 2
                     });
                 }
                 $(this).css({
                     height: 12,
                     width: 12,
                     top: 0
                 });

                 selectedPage = index;
             });
             indicatorsCollection.push(indicator);
         }

         this.resetIndicators = function () {
             indicatorsCollection = [];
             t.extIndicators.empty();
             indicatorsCount = 0;
             while (indicatorsCount != pagesCount) {
                 t.createIndicator(indicatorsCount);
                 indicatorsCount += 1;
             }
             var indicatorsWidth = indicatorsCount * 14;
             t.extIndicators.css({
                 width: indicatorsWidth,
                 left: ($(t).width() / 2) - (indicatorsWidth / 2) - 4
             });
         }

         this.addExtensionsDev = function (count) {
             var items = 0;
             while (items != count) {
                 addExtension("./img/logo.png", function () {});
                 items += 1;
             }
         }

         $(window).on('click', function () {
             t.hide()
         })
         $(this).on('click', function (e) {
             e.stopPropagation()
         })
         
         return this
     }
 }(jQuery))