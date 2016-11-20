$(document).ready(function () {
    $('.title').text($('title').text());
    switch ($('title').text()) {
        case '主页':
            $('#left-menu #index').addClass('select-li');
            break;
        case '开班会帖':
            $('#left-menu .show-li').eq(0).addClass('select-li');
            break;
        case '收班费帖':
            $('#left-menu .show-li').eq(1).addClass('select-li');
            break;
        case '收党费帖':
            $('#left-menu .show-li').eq(2).addClass('select-li');
            break;
        case '评优等生帖':
            $('#left-menu .show-li').eq(3).addClass('select-li');
            break;
        case '考勤结果帖':
            $('#left-menu .show-li').eq(4).addClass('select-li');
            break;
        default:
            break;
    }
    $('#left-menu li').click(function () {
        self.location = $(this).children().attr('href');
    });

    $('.product-item').mouseenter(function () {
        $(this).addClass('product-item-select');
    });
    $('.product-item').mouseleave(function () {
        $(this).removeClass('product-item-select');
    });
    $('.product-item').click(function () {
        self.location = $(this).children('a').attr('href');
    });
});