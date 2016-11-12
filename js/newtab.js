$(document).ready(function() {
    $('.md-input .text').focus(function() {
        var textLength = $('.md-input .text').val().length;
        if (textLength <= 0) {
          $('.md-input .hint').addClass("md-input-animate-hint");
        }
        $('.md-input .divider2').addClass("md-input-animate-divider");
    });
    $('.md-input .text').focusout(function() {
        var textLength = $('.md-input .text').val().length;
        if (textLength <= 0) {
          $('.md-input .hint').removeClass("md-input-animate-hint");
        }        
        $('.md-input .divider2').removeClass("md-input-animate-divider");
    });
});