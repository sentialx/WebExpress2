/*
  AUTHOR: xNerhu (Mikołaj Palkiewicz)
  GITHUB: https://github.com/xNerhu22/
  DATE: 18.09.2016
  COPY RIGHT 2013-2017 Nersent
*/
var MaterialRipple = class MaterialRipple {
  static makeRipple(element, xpos, ypos, height, width, bgcolor, dur, starttime, fadeinopacity, fadeoutopacity, fadeouttime, leavefadeout, startcallback, endcallback, ripplestyle) {
    if (xpos == null) {
      xpos = 0;
    }
    if (ypos == null) {
      ypos = 0;
    }
    if (width == null) {
      width = $(element).width();
    }
    if (height == null) {
      height = $(element).height();
    }
    if (bgcolor == null) {
      bgcolor = "#fff";
    }
    if (dur == null) {
      dur = 500;
    }
    if (starttime == null) {
      starttime = 1;
    }
    if (fadeinopacity == null) {
      fadeinopacity = 0.6;
    }
    if (fadeoutopacity == null) {
      fadeoutopacity = 0;
    }
    if (fadeouttime == null) {
      fadeouttime = 600;
    }
    if (leavefadeout == null) {
      leavefadeout = false;
    }
    if (ripplestyle == null) {
      ripplestyle = 'opacity: 0;';
    }
    var rippleE = $('<span class="ripple-effect" style="' + ripplestyle + '"/>');
    rippleE.animate({
      opacity: fadeinopacity
    }, starttime, function() {
      if (startcallback != null) {
        startcallback(true);
      }
      var $rippleElement = $(rippleE),
        $buttonElement = element,
        btnOffset = $buttonElement.offset(),
        xPos = xpos,
        yPos = ypos,
        size = parseInt(Math.min(height, width) * 0.5),
        animateSize = parseInt(Math.max(width, height) * Math.PI);
      $rippleElement
        .css({
          top: yPos,
          left: xPos,
          width: size,
          height: size,
          backgroundColor: bgcolor
        })
        .appendTo($buttonElement)
        .animate({
          width: animateSize,
          height: animateSize,
        }, {
          duration: dur,
          queue: false
        });
      if (!leavefadeout) {
        $rippleElement.animate({
          opacity: fadeoutopacity
        }, fadeouttime, function() {
          $(this).remove();
          if (endcallback != null) {
            endcallback(true);
          }
        })
      }
    });
    if (leavefadeout) {
      $(document).on('mouseout', $(element), function() {
        $(rippleE).animate({
          opacity: fadeoutopacity
        }, fadeouttime, function() {
          $(this).remove();
          if (endcallback != null) {
            endcallback(true);
          }
        })
      });
      $(document).on('click', $(element), function() {
        $(rippleE).animate({
          opacity: fadeoutopacity
        }, fadeouttime, function() {
          $(this).remove();
          if (endcallback != null) {
            endcallback(true);
          }
        })
      });
    }
  }
  static procent(max, int, p) {
    if (p == null && int != null) {
      return (int * 100) / max;
    } else if (p != null && int == null) {
      return (max * p) / 100;
    } else {
      return null;
    }
  }
  static autoRipple(element, mousedown, e) {
    var btnOffset = $(element).offset();

    var xPos = $(element).data("ripple-pos-x");
    var yPos = $(element).data("ripple-pos-y");
    var width = $(element).data("ripple-width");
    var height = $(element).data("ripple-height");
    var color = $(element).data("ripple-color");
    var duration = $(element).data("ripple-duration");
    var startTime = $(element).data("ripple-start-time");
    var fadeInOpacity = $(element).data("ripple-fadein-opacity");
    var fadeOutOpacity = $(element).data("ripple-fadeout-opacity");
    var fadeOutTime = $(element).data("ripple-fadeout-time");
    var isLeaveFadOut = $(element).data("ripple-is-leave-fadeout");

    if (isLeaveFadOut == null) {
      isLeaveFadOut = mousedown;
    }

    if (xPos == "cursor" || xPos == null) {
      xPos = e.pageX - btnOffset.left;
    }
    if (yPos == "cursor" || yPos == null) {
      yPos = e.pageY - btnOffset.top;
    }

    var isWidthP = /%/.test(width);
    var isHeightP = /%/.test(height);
    var elementHeight = $(element).height();
    var elementWidth = $(element).width();

    if (/px/.test(width)) {
      width = width.replace("px", "");
    }
    if (/px/.test(height)) {
      height = height.replace("px", "");
    }

    if (isWidthP) {
      width = width.replace("%", "");
      width = MaterialRipple.procent(elementWidth, null, parseInt(width));
    }
    if (isHeightP) {
      height = height.replace("%", "");
      height = MaterialRipple.procent(elementHeight, null, parseInt(height));
    }

    MaterialRipple.makeRipple($(element), xPos, yPos, height, width, color, duration, startTime, fadeInOpacity, fadeOutOpacity, fadeOutTime, isLeaveFadOut);
  }
};
$(document).on('click', '.ripple-auto', function(e) {
  MaterialRipple.autoRipple($(this), false, e);
});
$(document).on('mousedown', '.ripple-auto-mousedown', function(e) {
  MaterialRipple.autoRipple($(this), true, e);
});