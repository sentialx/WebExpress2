$(document).ready(function () {
    $('.md-input .text').focus(function () {
        var textLength = $('.md-input .text').val().length;
        if (textLength <= 0) {
            $('.md-input .hint').addClass("md-input-animate-hint");
        }
        $('.md-input .divider2').addClass("md-input-animate-divider");
    });
    $('.md-input .text').focusout(function () {
        var textLength = $('.md-input .text').val().length;
        if (textLength <= 0) {
            $('.md-input .hint').removeClass("md-input-animate-hint");
        }
        $('.md-input .divider2').removeClass("md-input-animate-divider");
    });
});
function isURL(s) {
    var regexp = /[a-zA-Z-0-9]+\.[a-zA-Z-0-9]{2,3}/;
    return regexp.test(s);
}
$('.text').keypress(function (e) {
    //if enter key was pressed
    if (e.which == 13) {
        if (!$('.text').val().startsWith("webexpress://")) {
            if (isURL($('.text').val())) {
                if ($('.text').val().startsWith("http://") || $('.text').val().startsWith("https://") || $('.text').val().startsWith("file://")) {
                    window.location.href = $('.text').val();
                } else {
                    window.location.href = "http://" + $('.text').val() 
                }
            } else {
                //TODO: search engines
                window.location.href = "http://www.google.com/search?q=" + $('.text').val();
            }
        } else {
             window.location.href = $('.text').val();
        }

        return false;
    }
});