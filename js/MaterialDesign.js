$(document).ready(function() {
  //declare objects
  var eSwitch = $(".mdc-switch");

  /* checkbox */

  var CheckBox = class CheckBox {

    static checked(element, bool) {
      var t = element.data('can-check');
      console.log(t);
      var c = false;
      if (t == true || t == null) {
        c = true;
      } else {
        c = false;
      }
      if (1) { //c == true
        element.attr('data-can-check', 'false');
        var ellipse = element.find(".ellipse");
        var ellipseRipple = element.find(".ellipse-ripple");
        if (bool) {
          ellipseRipple.animate({opacity: '0.2'}, 300, function() {
            ellipseRipple.animate({ left: '12px' }, 400, 'easeInOutQuart',function() {

            });
            ellipse.animate({ left: '24px' }, 400, 'easeInOutQuart',function() {
              setTimeout(function() {
                ellipseRipple.animate({opacity: '0'}, 300, function() {

                    element.attr('data-can-check', 'true');

                });
              }, 250);
            });
          });
        } else {
          element.attr('data-can-check', 'false');
          ellipseRipple.animate({opacity: '0.2'}, 300, function() {
            ellipseRipple.animate({ left: '-17.5px' }, 400, 'easeInOutQuart',function() {

            });
            ellipse.animate({ left: '-4px' }, 400, 'easeInOutQuart',function() {
              setTimeout(function() {
                ellipseRipple.animate({opacity: '0'}, 300, function() {

                    element.attr('data-can-check', 'true');

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
    CheckBox.checked($(this), x);
    if (x) { x = false; } else { x = true; }
  });

});
