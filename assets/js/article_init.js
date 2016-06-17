/**
 * Created by common on 2016/6/16.
 */
(function (generateStore) {
    var article_init = [
        {
            id: 1,
            nick: '李苏特',
            time: '2016/6/25',
            email: 'zyj123@163.com',
            name: '无限加载的实现',
            content: '在while循环里，写加载，就这么简单；',
            publish: 1
        },
        {
            id: 2,
            nick: '徐湖态',
            time: '2016/6/26',
            email: 'zyj123@163.com',
            name: '41岁的男人还在追逐梦想',
            content: '41岁，男人的人生才刚刚开始，Let us go!',
            publish: 1
        },
        {
            id: 3,
            nick: '呵呵呵',
            time: '2016/3/20',
            email: 'zyj123@163.com',
            name: '我的创业之路',
            content: '从苏州到上海，又从上海到北京，下一站美国西雅图',
            publish: 0
        },
        {
            id: 4,
            nick: '李苏特',
            time: '2016/6/25',
            email: 'zyj123@163.com',
            name: '2无限加载的实现',
            content: '在loop里，实现加载不就可以了嘛',
            publish: 0
        },
        {
            id: 5,
            nick: '徐湖态',
            time: '2016/6/26',
            email: 'zyj123@163.com',
            name: '241岁的男人还在追逐梦想',
            content: '应该活不了那么长，而梦想却可以一代代延续...',
            publish: 0
        },
        {
            id: 6,
            nick: '呵呵呵',
            time: '2016/3/20',
            email: '176@163.com',
            name: '2我的创业之路',
            content: '美国西雅图，没去成；不过谁又能理解得了，我又启程呢？',
            publish: 0
        },
        {
            id: 7,
            nick: '李苏特',
            time: '2016/6/25',
            email: '176@163.com',
            name: '3无限加载的实现',
            content: '我已经不想在加载了...',
            publish: 0
        },
        {
            id: 8,
            nick: '徐湖态',
            time: '2016/6/26',
            email: '176@163.com',
            name: '341岁的男人还在追逐梦想',
            content: '3应该活不了那么长，而梦想却可以一代代延续...',
            publish: 0
        },
        {
            id: 9,
            nick: '呵呵呵',
            time: '2016/3/20',
            email: '176@163.com',
            name: '3我的创业之路',
            content: '创业，已经是种精神!',
            publish: 0
        }];
    localStorage.removeItem('articles');
    generateStore('articles', []).set(article_init);
})(generateStore);