var Ripple = class Ripple {
  static makeRipple(element, xpos, ypos, height, width, time, fadeoutopacity) {
    var $rippleElement = $('<span class="ripple-effect" />'),
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
        backgroundColor: $buttonElement.data("ripple-color")
      })
      .appendTo($buttonElement)
      .animate({
        width: animateSize,
        height: animateSize,
        opacity: fadeoutopacity
      }, time, function() {
        $(this).remove();
      });
  }
};
