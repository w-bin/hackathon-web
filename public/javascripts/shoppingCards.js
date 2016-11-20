/**
 * Created by wbin on 2016/11/20.
 */
$(document).ready(function () {
    $('#all-checkbox').click(function () {
        if ($(this).is(':checked')) {
            $('input:checkbox').prop('checked', true);
        } else {
            $('input:checkbox').prop('checked', false);
        }
    });
});