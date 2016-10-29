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
    //Switch
    //variables
    class Checkbox {
        constructor(where) {
            where.checked = false;
            var instance = $("<div>").load("controls/checkbox.html", function() {
                var mdSwitch = instance.find(".md-checkbox");
                var fill = instance.find(".fill");
                var fill2 = instance.find(".fill2");
                var ellipseRipple = instance.find('.ellipse-ripple2');
                ellipseRipple.hide("scale", {
                    procent: 0
                }, 1);
                fill.css('opacity', '0');
                fill2.css('opacity', '0');
                fill2.css('margin-left', '-0px');
                mdSwitch.click(function(e) {
                    if (!where.checked) {
                        ellipseRipple.css('opacity', 0.4).hide().show("scale", {
                            procent: 100
                        }, 200, function() {
                            ellipseRipple.animate({
                                opacity: 0
                            });
                        });
                        fill.animate({opacity: 1}, {duration: 200, queue: false});
                        fill2.animate({opacity: 1}, {duration: 150, queue: true});
                        fill2.animate({marginLeft: 24}, {duration: 200, queue: true});

                        where.checked = true;
                    } else {
                        ellipseRipple.css('opacity', 0.4).hide().show("scale", {
                            procent: 100
                        }, 200, function() {
                            ellipseRipple.animate({
                                opacity: 0
                            });
                        });
                        fill.animate({opacity: 0}, {duration: 200, queue: false});
                        fill2.animate({marginLeft: 0}, {duration: 0, queue: false});
                        fill2.animate({opacity: 0}, {duration: 200, queue: false});

                        where.checked = false;
                    }
                })

            }).appendTo($(where));

        }
    }



    function initializeComponent() {
        $('.switch').each(function(index) {
            var s = new Switch(this);
        });
        $('.checkbox').each(function(index) {
            var s = new Checkbox(this);
        });

    }
    initializeComponent();



})
