/**
 * Created by wbin on 2016/11/20.
 */
$(document).ready(function () {
    $('.order-item-number').bind('input propertychange', function () {
        var price = parseInt($(this).parent().children().eq(2).text());
        var number = parseInt($(this).parent().children().eq(4).children().val());
        console.log(price + ' !! ' + number);
        if (isNaN(price) || isNaN(number)) {
            $(this).next().text('￥0');
        } else {
            $(this).next().text('￥' + (price * number));
        }
    });
});