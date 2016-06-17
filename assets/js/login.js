/**
 * Created by common on 2016/6/16.
 */
(function ($, win) {
    $('#lg-begin').on('click', function () {
        var email = $('#lg-email').val(),
            pwd = $('#lg-pwd').val(),
            user = win.user();
        back = user.login(email, pwd);

        back.code ? window.location.href = 'index.html' : alert(back.value);
    })
})(jQuery, window);