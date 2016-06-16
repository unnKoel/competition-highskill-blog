/**
 * Created by common on 2016/6/16.
 */
(function ($, window) {
    $('#lg-begin').on('click', function () {
        var email = $('#lg-email').val(),
            pwd = $('#lg-pwd').val(),
            generateStore = window.generateStore,
            table = window.table;

        var users = generateStore('users', []).get();
        var user = table(users).find('email', email) || {};

        if (pwd == user.pwd) {
            console.log('登录成功');
        } else {
            console.log('用户名或密码错误');
        }
    })
})(jQuery, window);