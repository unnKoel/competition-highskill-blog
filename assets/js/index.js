/**
 * Created by common on 2016/6/17.
 */
(function ($, win) {
    $(function () {
        var user = win.user();
        var doPage = function () {
            win.component('head')(component('head'));
            win.component('menu')();

            var generateStore = win.generateStore,
                table = win.table;
            var articles = table(generateStore('articles', []).get().value).findMulti('publish', 1);

            var $win = $(window),
                $doc = $(document),
                page = 1;
            var pageArts = table(articles).paging(page, 5, 'id');
            view(pageArts);
            $win.scroll(function () {
                if ($doc.scrollTop() >= $doc.height() - $win.height()) {
                    pageArts = table(articles).paging(++page, 5, 'id');
                    view(pageArts);
                }
            });

            function view(pageArts) {
                var $ul = $(".art-list");
                for (index in pageArts) {
                    var article = pageArts[index];
                    if (index == 0) {
                        $ul.append($('<li><a href="article_view.html?id=' + article.id + '"> ' + article.name + "</a></li>"));
                    } else {
                        $ul.append($('<li><a href="article_view.html?id=' + article.id + '"> ' + article.name + "</a></li>"));
                    }
                }
            }
        };
        //var backCode = user.isLogin().code;
        //if (backCode == 5002) {
        //    window.location.href = "login.html";
        //} else {
        doPage();
        //}
    });
})(jQuery, window);