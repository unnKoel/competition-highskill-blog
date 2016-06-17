/**
 * Created by common on 2016/6/17.
 */
(function ($, win) {
    win.component('head')(function () {
        window.location.href = 'index.html';
    });
    win.component('menu')();

    var urlValues = window.location.href.match(new RegExp("[\?\&]id=([^\&]*)(\&?)", "i")),
        id = urlValues ? urlValues[1] : urlValues;
    var articles = generateStore('articles', [], true).get().value,
        article = table(articles).find('id', id);
    viewArt(article);

    function viewArt(article) {
        $('#article-view .title').text(article.name);
        $('#article-view .content').text(article.content);
    }
})(jQuery, window);