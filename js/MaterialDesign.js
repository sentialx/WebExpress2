$(document).ready(function() {
  //declare objects
  var eSwitch = $(".mdc-switch");

  /* checkbox */

  var CheckBox = class CheckBox {

    static checked(element, bool) {
      var t = element.data('can-check');

      var c = false;
      if (t == true || t == null) {
        c = true;
      } else {
        c = false;
      }
      if (1) { //c == true
        element.addClass('ccheck');
        var ellipse = element.find(".ellipse");
        var ellipseRipple = element.find(".ellipse-ripple");
        var lever = element.find(".lever");

        var DataToggleOffColor = element.data('toggle-off-color');
        var DataEllipseToggleOffColor = element.data('ellipse-toggle-off-color');
        var DataToggleOnColor = element.data('toggle-on-color');
        var DataEllipseToggleOnColor = element.data('ellipse-toggle-on-color');

        if (bool) {
          ellipseRipple.addClass("isanimating");
          ellipseRipple.animate({opacity: '0.2'}, 300, function() {
            ellipseRipple.animate({ left: '12px' }, 200, 'easeInOutQuart',function() {

            });
            lever.animate({backgroundColor: DataToggleOnColor}, {duration: 300, queue: false});
            ellipse.animate({backgroundColor: DataEllipseToggleOnColor},{duration: 300, queue: false});
            ellipseRipple.animate({backgroundColor: DataEllipseToggleOnColor}, {duration: 300, queue: false});

            ellipse.animate({ left: '24px' }, 200, 'easeInOutQuart',function() {
              setTimeout(function() {
                ellipseRipple.animate({opacity: '0'}, 300, function() {
                   ellipseRipple.removeClass("isanimating");
                   setTimeout(function() {
                     element.removeClass('ccheck');
                   }, 1);
                });
              }, 250);
            });
          });
        } else {
          ellipseRipple.addClass("isanimating");
          ellipseRipple.animate({opacity: '0.2'}, 300, function() {
            ellipseRipple.animate({ left: '-17.5px' }, 200, 'easeInOutQuart',function() {

            });
            lever.animate({backgroundColor: DataToggleOffColor}, {duration: 300, queue: false});
            ellipse.animate({backgroundColor: DataEllipseToggleOffColor},{duration: 300, queue: false});
            ellipseRipple.animate({backgroundColor: DataEllipseToggleOffColor}, {duration: 300, queue: false});
            ellipse.animate({ left: '-4px' }, 200, 'easeInOutQuart',function() {

              setTimeout(function() {
                ellipseRipple.animate({opacity: '0'}, 300, function() {
                  ellipseRipple.removeClass("isanimating");
                  setTimeout(function() {
                    element.removeClass('ccheck');
                  }, 1);


                });
              }, 250);
            });
          });
        }
      }
    }
  }

  //events
  var x = true;

  /*eSwitch.mousedown(function(event) {
    CheckBox.showRipple($(this), x);
    if (x == true) {
      x = false;
    } else {
      x = true;
    }
  });

  eSwitch.mouseup(function(event) {
    CheckBox.showRipple($(this), false);
  });*/
  var x = true;
  eSwitch.click(function() {
    var ellipse = $(this).find(".ellipse");
    var ellipseRipple = $(this).find(".ellipse-ripple");

    var isanimating = ellipseRipple.hasClass('isanimating');
    console.log(isanimating);

    if (isanimating == false) {
      CheckBox.checked($(this), x);
    }
    if (x) { x = false; } else { x = true; }
  });
  eSwitch.mousedown(function() {
    var ellipse = $(this).find(".ellipse");
    var ellipseRipple = $(this).find(".ellipse-ripple");

  /*  ellipseRipple.animate({opacity: '0.2'}, 300, function() {

  });*/
  });
  eSwitch.mouseleave(function() {
    var ellipse = $(this).find(".ellipse");
    var ellipseRipple = $(this).find(".ellipse-ripple");
    var hc = ellipseRipple.hasClass("isanimating");
    if (hc == false || hc == null) {
      ellipseRipple.animate({opacity: '0'}, 300, function() {

      });
    }
  });

  eSwitch.each(function() {
    var ellipse = $(this).find(".ellipse");
    var ellipseRipple = $(this).find(".ellipse-ripple");
    var lever = $(this).find(".lever");

    var ToggleOffColor = lever.css('background-color');
    var EllipseToggleOffColor = ellipseRipple.css('background-color');
    var ToggleOnColor = "#1abc9c";
    var EllipseToggleOnColor = "#16a085";

    var DataToggleOffColor = $(this).data('toggle-off-color');
    var DataEllipseToggleOffColor = $(this).data('ellipse-toggle-off-color');
    var DataToggleOnColor = $(this).data('toggle-on-color');
    var DataEllipseToggleOnColor = $(this).data('ellipse-toggle-on-color');

    if (DataToggleOffColor != null || typeof DataToggleOffColor !== "undefined") {
      ToggleOffColor = DataToggleOffColor;
    }

    if (DataToggleOnColor != null || typeof DataToggleOnColor !== "undefined") {
      ToggleOnColor = DataToggleOnColor;
    }

    if (DataEllipseToggleOffColor != null || typeof DataEllipseToggleOffColor !== "undefined") {
      EllipseToggleOffColor = DataEllipseToggleOffColor;
    }

    if (DataEllipseToggleOnColor != null || typeof DataEllipseToggleOnColor !== "undefined") {
      EllipseToggleOnColor = DataEllipseToggleOnColor;
    }

    lever.css('background-color', ToggleOffColor);
    ellipse.css('background-color', EllipseToggleOffColor);
    ellipseRipple.css('background-color', EllipseToggleOffColor);
  });

});
