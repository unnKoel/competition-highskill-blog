/**
 * Created by common on 2016/6/17.
 */
(function ($, win) {
    $(function () {
        var user = win.user();
        var doPage = function () {
            win.component('head')(function () {
                window.location.href = 'index.html';
            });
            win.component('menu')();
            var generateStore = win.generateStore,
                table = win.table;

            var lgUsers = generateStore('users', [], true).get().value,
                lgUser = table(lgUsers).find('email', cookie().get('sg-login'));
            viewMy(lgUser);

            var articles = generateStore('articles', [], true).get();
            var myArticles = table(articles.value).findMulti('email', cookie().get('sg-login'));
            viewArts(myArticles);

            function viewMy(info) {
                $('.my-info h4').text(lgUser.nick);
                $('.my-info p').text(lgUser.word);
            }

            function viewArts(myArticles) {
                var $ul = $(".art-list");
                for (index in myArticles) {
                    var myArticle = myArticles[index];
                    if (index == 0) {
                        $ul.append($('<li><a href="article_view.html?id=' + myArticle.id + '"> ' + myArticle.name + "</a></li>"));
                    } else {
                        $ul.append($('<li><a href="article_view.html?id=' + myArticle.id + '"> ' + myArticle.name + "</a></li>"));
                    }
                }
            }
        };
        var backCode = user.isLogin().code;
        if (backCode == 5002) {
            window.location.href = "login.html";
        } else {
            doPage();
        }
    });
})(jQuery, window);