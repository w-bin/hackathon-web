/**
 * Created by wbin on 2016/11/20.
 */
$(document).ready(function () {
    $('.bottom-img').mouseenter(function () {
        var imgUrl = $(this).attr('src');
        $(this).addClass('product-item-select');
        $('.top-img').attr('src', imgUrl);
    });
    $('.bottom-img').mouseleave(function () {
        $(this).removeClass('product-item-select');
    });
});
