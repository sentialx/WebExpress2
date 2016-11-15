class MainCharacter {
    static Move(way) {
        switch(way) {
            case "left":
                var left = MainCharacter.GetLeft();
                if (left - 60 > 0) {
                    left = left - 60;
                } else {
                    left = 0;
                }
                MainCharacter.SetLeft(left);
            break;            
            case "right":
                var left = MainCharacter.GetLeft();
                if (left + 60 < parseInt($('.container').css("width")) - parseInt($('.mcharacter').css('width'))) {
                    left = left + 60;
                } else {
                    left = parseInt($('.container').css("width")) - parseInt($('.mcharacter').css('width'));
                }
                MainCharacter.SetLeft(left);
            break;
        }
    }
    static GetLeft() {
        return parseInt($('.mcharacter').css('left'));
    }
    static SetLeft(x) {
        $('.mcharacter').css('left', x);
    }
    static Shot() {
        var left = $('.mcharacter').offset().left - $('.container').offset().left;
        Shots.Create(left);
    }
}

class Shots {
    static Create(left) {
        var bullet = $('<li style="left: ' + left + 'px; bottom: 60px;"></li>');
        $('.bullets').append($(bullet));
    }
}

class Other {
    static Collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    static GetRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

var pause = false;

$(document).ready(function() {
    $(document).keydown(function(e) {
        if (!pause) {
            switch(e.which) {
                case 37: // left
                    MainCharacter.Move("left");
                break;
                case 39: // right
                    MainCharacter.Move("right");
                break;
                case 32: //space 
                    MainCharacter.Shot();
                break;

                default: return;
            }
            e.preventDefault();
        }
    });

    //bullets
    setInterval(function() {
        if (!pause) {
            $('.bullets li').each(function() {
                var bullet = $(this);
                var bottom = parseInt($(this).css("bottom"));
                if (bottom + 10 > parseInt($('.container').css('height'))) {
                    $(this).remove();
                } else {
                    bottom += 10;
                    $(this).css("bottom", bottom);
                }
                $('.enemies li').each(function() {
                    var collision = Other.Collision($(this), $(bullet));
                    if (collision) {
                        $(this).remove();
                        $(bullet).remove();
                    }
                });
            });
        }
    }, 20);

    //enemies
    setInterval(function() {
        $('.enemies li').each(function() {
            if (!pause) {
                var _top = parseInt($(this).css("top"));
                if (_top + 100 < parseInt($('.container').css('height'))) {
                    $(this).animate({top: _top + 25}, 200);
                } else {
                pause = true;
                }
            }
        });   
    }, 200);

    //spawn enemies
    setInterval(function() {
        if (!pause) {
            var left = Other.GetRandomInt(0, (parseInt($('.container').css('width')) - 56));
            var en = $('<li style="top: 0; left: ' + left + 'px;"></li>')
            $('.enemies').append($(en));
        }
    }, 1000);
});