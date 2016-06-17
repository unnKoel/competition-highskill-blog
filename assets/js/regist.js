/**
 * Created by common on 2016/6/16.
 */
(function ($, window) {
    $('#reg-begin').on('click', function () {
        var email = $('#reg-email').val(),
            nick = $('#reg-nick').val(),
            pwd = $('#reg-pwd').val(),
            word = $('#reg-word').val(),
            generateStore = window.generateStore,
            table = window.table;

        var users = generateStore('users', []).get().value;

        if (table(users).find('email', email)) {
            console.log('该用户已经注册');
            return;
        }

        users.push({
            email: email,
            nick: nick,
            pwd: pwd,
            word: word
        });

        generateStore('users', []).set(users);
        console.log('注册成功');
    })
})(jQuery, window);