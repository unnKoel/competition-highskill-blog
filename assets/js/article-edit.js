/**
 * Created by common on 2016/6/17.
 */
(function ($, win) {
    $(function () {
        var user = win.user();
        var backCode = user.isLogin().code;
        if (backCode == 5002) {
            window.location.href = "login.html";
        } else {
            
            article().editInit();
        }
    });
})(jQuery, window);