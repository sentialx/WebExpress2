$(document).ready(function () {

    //Switch
    class Switch {
        constructor(where) {
            where.switched = false;
            var instance = $("<div>").load("./html/controls/switch.html", function () {
                var mdSwitch = instance.find(".md-switch");
                var ellipseRipple = instance.find('.ellipse-ripple');
                ellipseRipple.hide("scale", {
                    procent: 0
                }, 1);

                //events
                mdSwitch.click(function () {
                    var switchContainer = $(this).find('.switch-container');
                    var lever = $(this).find('.lever');
                    ellipseRipple = $(this).find('.ellipse-ripple');
                    var ellipse = $(this).find('.ellipse');
                    if (!where.switched) {

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
                        doRippleIcon($(where), 37, 9);

                        where.switched = true;
                    } else {
                        doRippleIcon($(where), 7, 9)
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
                        });;

                        where.switched = false;
                    }
                });
            }).appendTo($(where));

        }
    }
    //Checkbox
    class Checkbox {
        constructor(where) {
            where.checked = false;
            var instance = $("<div>").load("./html/controls/checkbox.html", function () {
                var mdSwitch = instance.find(".md-checkbox");
                var fill = instance.find(".fill");
                var fill2 = instance.find(".fill2");
                var lastState = where.checked;
                fill.css('opacity', '0');
                fill2.css('opacity', '0');
                fill2.css('margin-left', '0px');
                //checked changed listener
                setInterval(function () {
                    if (lastState != where.checked) {
                        lastState = where.checked;
                        if (where.checked) {
                            check();
                        } else {
                            uncheck();
                        }
                    }
                }, 1);

                function check() {
                    fill.animate({
                        opacity: 1
                    }, {
                        duration: 100,
                        queue: false
                    });
                    fill2.animate({
                        opacity: 1
                    }, {
                        duration: 75,
                        queue: true
                    });
                    fill2.animate({
                        marginLeft: 24
                    }, {
                        duration: 200,
                        queue: true
                    });
                    doRippleIcon($(where), 9, 8);
                }

                function uncheck() {
                    doRippleIcon($(where), 9, 8);
                    fill.animate({
                        opacity: 0
                    }, {
                        duration: 100,
                        queue: false
                    });
                    fill2.animate({
                        marginLeft: 0
                    }, {
                        duration: 0,
                        queue: false
                    });
                    fill2.animate({
                        opacity: 0
                    }, {
                        duration: 100,
                        queue: false
                    });
                }
                mdSwitch.mousedown(function (e) {
                    if (!where.checked) {
                        where.checked = true;
                    } else {
                        where.checked = false;
                    }
                })

            }).appendTo($(where));

        }
    }

    function doRippleIcon(item, x, y) {
        Ripple.makeRipple(item, x, y, 17, 17, 300, 0);
    }
    //Preloader
    class Preloader {
        constructor(where) {
            var instance = $("<div>").load("./html/controls/preloader.html", function () {
                var lastColor = $(where).attr('color');
                instance.find(".path").css('stroke', $(where).attr('color'));
                instance.find(".path").attr('stroke-width', $(where).attr('thickness'));
                //checked changed listener
                setInterval(function () {
                    if (lastColor != $(where).attr('color')) {
                        lastColor = $(where).attr('color');
                        instance.find(".path").css('stroke', $(where).attr('color'));
                    }
                }, 1);
            }).appendTo($(where));

        }
    }

    function initializeComponent() {
        $('.switch').each(function (index) {
            $(this).empty();
            var s = new Switch(this);
        });
        $('.checkbox').each(function (index) {
            $(this).empty();
            var s = new Checkbox(this);
        });
        setInterval(function () {
            $('.preloader').each(function (index) {
                if ($(this).html() == null || $(this).html() == "") {
                    $(this).empty();
                    var s = new Preloader(this);
                }
            });
        }, 1)

    }
    initializeComponent();

});