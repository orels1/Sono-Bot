$(document).ready(function() {
    $('.container-table').height($(window).height());
    $('.blog').css('minHeight', $(window).height() + 'px');

    $('#go-to-blog').click(function() {
        $('html, body').stop().animate({
            'scrollTop': $('.blog').offset().top,
        }, 1000);
    });
})