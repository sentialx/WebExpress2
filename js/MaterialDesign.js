$(document).ready(function() {

    //Switch
    //variables
    class Switch {
        constructor(where) {
            where.switched = false;
            var instance = $("<div>").load("controls/switch.html", function() {
                var mdSwitch = instance.find(".md-switch");
                var ellipseRipple = instance.find('.ellipse-ripple');
                ellipseRipple.hide("scale", {
                    procent: 0
                }, 1);

                //events
                mdSwitch.click(function() {
                    var switchContainer = $(this).find('.switch-container');
                    var lever = $(this).find('.lever');
                    ellipseRipple = $(this).find('.ellipse-ripple');
                    var ellipse = $(this).find('.ellipse');
                    if (!where.switched) {
                        ellipseRipple.stop();
                        ellipseRipple.css({
                            height: 48,
                            width: 48,
                            left: -17.5 + 28,
                            top: -15,
                            position: 'absolute'
                        });
                        ellipse.animate({
                            backgroundColor: mdSwitch.attr('ellipse-color')
                        }, {
                            queue: false,
                            duration: 200
                        });
                        ellipse.animate({
                            left: 24
                        }, {
                            queue: false,
                            duration: 200
                        });
                        lever.animate({
                            backgroundColor: mdSwitch.attr('bg-color-on')
                        }, {
                            queue: false,
                            duration: 200
                        });
                        ellipseRipple.css('opacity', 0.4).hide().show("scale", {
                            procent: 100
                        }, 200, function() {
                            ellipseRipple.animate({
                                opacity: 0
                            });
                        });

                        where.switched = true;
                    } else {
                        ellipseRipple.stop();
                        ellipseRipple.css({
                            height: 48,
                            width: 48,
                            left: -17.5,
                            top: -15,
                            position: 'absolute'
                        });
                        ellipse.animate({
                            backgroundColor: mdSwitch.attr('ellipse-basecolor')
                        }, {
                            queue: false,
                            duration: 200
                        });
                        ellipse.animate({
                            left: -4
                        }, {
                            queue: false,
                            duration: 200
                        });
                        lever.animate({
                            backgroundColor: mdSwitch.attr('bg-color-off')
                        }, {
                            queue: false,
                            duration: 200
                        });
                        ellipseRipple.css('opacity', 0.4).hide().show("scale", {
                            procent: 100
                        }, 200, function() {
                            ellipseRipple.animate({
                                opacity: 0
                            });
                        });

                        where.switched = false;
                    }
                });
            }).appendTo($(where));

        }
    }
    $('.switch').each(function(index) {
        var s = new Switch(this);
    });
    $('.switch').click(function() {
      console.log(this.switched);
    })


})
