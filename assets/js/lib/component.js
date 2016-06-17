/**
 * Created by common on 2016/6/17.
 */
(function ($, win) {
    win.component = function (name) {
        var components = {
            menu: function () {
                $('.menu-triggle').on('click', function () {
                    !$(this).hasClass('open') ?
                        ($('.menu').removeClass('hide'),
                                $(this).addClass('open')
                        ) :
                        ($('.menu').addClass('hide'),
                                $(this).removeClass('open')
                        )
                });
            },

            head: function (afterLgOut) {
                var leftCornerHtml = '';
                var isLogin = user().isLogin();
                if (isLogin.code == 5002) {
                    leftCornerHtml = '<a class="login" href="login.html">登录</a>\
                        <a class="regist" href="regist.html">注册</a>';
                } else {
                    leftCornerHtml = '<a class="menu-triggle">' + isLogin.value.nick + '<i class="icon-hand-down"></i></a>\
                        <ul class="menu hide">\
                        <li class="menu-item"><a href="article_edit.html">写文章</a></li>\
                    <li class="menu-item"><a href="article_list_my.html">我的主页</a></li>\
                    <li class="menu-item lgout"><a href="javascript:void 0;">退出</a></li>\
                    </ul>';
                }

                $('.nav-header .left-corner').html(leftCornerHtml);
                $('.nav-header .left-corner .lgout').on('click', function () {
                    user().loginOut(afterLgOut);
                });
            }
        };
        return components[name.toString()];
    }
})(jQuery, window);