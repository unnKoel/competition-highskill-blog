/**
 * Created by common on 2016/6/16.
 */
(function (global) {
    //持久化存储
    global.generateStore = function (storeKey, defaultVal, permission) {
        defaultVal = defaultVal || {};
        permission = permission || false;

        return {
            get: function () {
                if (!permission) {
                    return {code: 1, value: JSON.parse(localStorage.getItem(storeKey) || JSON.stringify(defaultVal))}
                }
                else {
                    if (user().isLogin().code == 1) {
                        return {
                            code: 1,
                            value: JSON.parse(localStorage.getItem(storeKey) || JSON.stringify(defaultVal))
                        }
                    } else {
                        window.location.href = 'login.html';
                    }
                }
            },

            set: function (values) {
                if (!permission) {
                    localStorage.setItem(storeKey, JSON.stringify(values));
                    return {code: 1}
                }
                else {
                    if (user().isLogin().code == 1) {
                        localStorage.setItem(storeKey, JSON.stringify(values));
                        return {code: 1}
                    } else {
                        window.location.href = 'login.html';
                    }
                }
            }
        }
    };

    global.cookie = function () {
        return {
            set: function (name, value, expire) {
                var date = new Date();
                date.setTime(date.getTime() + expire * 60 * 1000);
                document.cookie = name + '=' + escape(value) + (expire == null ? "" : ";expires=" + date.toGMTString());
            },

            get: function (c_name) {
                if (document.cookie.length > 0) {
                    c_start = document.cookie.indexOf(c_name + "=");
                    if (c_start != -1) {
                        c_start = c_start + c_name.length + 1;
                        c_end = document.cookie.indexOf(";", c_start);
                        if (c_end == -1) c_end = document.cookie.length;
                        return unescape(document.cookie.substring(c_start, c_end))
                    }
                }
                return ""
            },

            clear: function (c_name) {
                this.set(c_name, "", -1);
            }
        }
    };

    //内存表
    global.table = function (tableArray) {
        tableArray = tableArray || [];

        return {
            find: function (field, value) {
                for (index in tableArray) {
                    if (tableArray[index][field.toString()] == value) {
                        return tableArray[index];
                    }
                }
                return null;
            },

            findMulti: function (field, value) {
                var res = [];
                for (index in tableArray) {
                    if (tableArray[index][field.toString()] == value) {
                        res.push(tableArray[index]);
                    }
                }
                return res;
            },

            modify: function (field, value, mField, newValue) {
                for (index in tableArray) {
                    if (tableArray[index][field.toString()] == value) {
                        tableArray[index][mField.toString()] = newValue;
                    }
                }
            },

            delete: function (field, value) {
                for (index in tableArray) {
                    if (tableArray[index][field.toString()] == value) {
                        tableArray.splice(index, 1);
                    }
                }
            },

            order: function (key) {
                tableArray.sort(function (a, b) {
                    return a[key.toString()] - b[key.toString()];
                });
            },

            order_asc: function (key) {
                tableArray.sort(function (a, b) {
                    return b[key.toString()] - a[key.toString()];
                });
            },

            //分页
            paging: function (page, count, key) {
                this.order_asc(key);

                var arrayLenght = tableArray.length;
                var beginIndex = (page - 1) * count > tableArray.length - 1 ? tableArray.length - 1 : (page - 1) * count;
                var endIndex = page * count > tableArray.length ? tableArray.length : page * count;

                var resPerPage = [];

                if ((page - 1) * count > tableArray.length - 1 && page * count > tableArray.length - 1) {
                    return [];
                }
                for (var i = beginIndex; i < endIndex; i++) {
                    resPerPage.push(tableArray[i]);
                }
                return resPerPage;
            }
        }
    };

    //用户
    global.user = function () {
        return {
            isLogin: function () {
                var lgUsers = generateStore('login-user', []).get(),
                    lgUser = table(lgUsers.value).find('email', cookie().get('sg-login'));
                return lgUser ?
                {code: 1, value: lgUser} :
                {code: 5002, value: '未登录'};
            },

            loginOut: function (afterLgOut) {
                var lgUser = cookie().get('sg-login');
                var lgUserStore = generateStore('login-user', []);
                var lgUsers = lgUserStore.get().value;
                table(lgUsers).delete('email', lgUser);
                generateStore('login-user', []).set(lgUsers);

                cookie().clear('sg-login');
                afterLgOut();
            },

            login: function (email, pwd) {
                var users = generateStore('users', []).get(),
                    user = table(users.value).find('email', email) || {},
                    message = {};

                if (pwd == user.pwd) {
                    var lgUserStore = generateStore('login-user', []);
                    var lgUsers = lgUserStore.get().value;

                    if (!table(lgUsers).find('email', email)) {
                        lgUsers.push(user);
                    }

                    lgUserStore.set(lgUsers);

                    cookie().set('sg-login', email, 60);
                    message = {code: 1, value: '登录成功'}
                } else {
                    message = {code: 0, value: '账号或密码错误'}
                }
                return message;
            }
        }
    };

    global.article = function () {
        return {
            editInit: function (art) {
                var self = this;
                //页面加载-----------------------
                global.component('head')(function () {
                    window.location.href = 'index.html';
                });
                global.component('menu')();

                var generateStore = global.generateStore,
                    table = global.table;
                var articles = generateStore('articles', [], true).get();
                var myArticles = table(articles.value).findMulti('email', cookie().get('sg-login'));

                table(myArticles).order('id');

                var $ul = $(".art-list");
                $ul.html('');
                for (index in myArticles) {
                    var myArticle = myArticles[index];
                    if (index == 0) {
                        $ul.append($('<li><a class="first" href="javascript:void (0)" data-id=' + myArticle.id + '>' + myArticle.name + "</a></li>"));
                    } else {
                        $ul.append($('<li><a href="javascript:void (0)" data-id=' + myArticle.id + '>' + myArticle.name + "</a></li>"));
                    }
                }

                var currentArt = null;
                if (art) {
                    currentArt = art;
                } else if (!art && myArticles.length) {
                    currentArt = myArticles[0];
                } else {
                    currentArt = {
                        content: '',
                        name: ''
                    };
                }

                function view(currentArt) {
                    $('#art-area').val(currentArt.content);
                    $('#art-title').val(currentArt.name);
                    currentArt.publish ? $('.publish').text('已发布').addClass('disable') : $('.publish').text('发布文章').removeClass('disable');
                }

                view(currentArt);

                $(".art-list a").on('click', function () {
                    var artId = $(this).data('id');
                    currentArt = table(myArticles).find('id', artId);
                    view(currentArt);
                });

                //$(".art-list a.first").click();


                //保存-------------------------------
                //$('.save').on('click', function () {
                //
                //});

                //发布-------------------------------
                $('.publish').unbind('click').bind('click', function () {
                    if ($(this).hasClass('disable')) return 0;
                    self.publish(currentArt, $('#art-title').val(), $('#art-area').val());
                    //$(this).text('已发布').addClass('disable');
                });

                $('.new').unbind('click').bind('click', function () {
                    currentArt = {};
                    $('.publish').removeClass('disable').text('保存文章');
                    $('#art-title').val("无标题文章");
                    $('#art-area').val('');
                });

                $('#art-title,#art-area').unbind('keyup').bind('keyup', function () {
                    if (currentArt.publish == 1) {
                        $('.publish').removeClass('disable').text('更新发布');
                    }
                });
            },

            //查找文章
            find: function (id) {
                return table(generateStore('articles', [], true).get().value).find('id', id);
            },

            //保存
            save: function (id, name, content) {
                var articles = generateStore('articles', [], true).get().value;
                var artTab = table(articles);
                //article.time=
                artTab.modify('id', id, 'name', name);
                artTab.modify('id', id, 'content', content);
                generateStore('articles', [], true).set(articles);
                return table(generateStore('articles', [], true).get().value).find('id', id);
            },

            add: function (name, content) {
                var lgUsers = generateStore('login-user', [], true).get(),
                    lgUser = table(lgUsers.value).find('email', cookie().get('sg-login'));

                var articles = generateStore('articles', [], true).get().value;
                if (articles.length) {   //已有文章
                    var artTab = table(articles);
                    artTab.order('id');
                    var lastArt = articles[articles.length - 1];
                    articles.push({
                        name: name,
                        content: content,
                        id: lastArt.id + 1,
                        nick: lgUser.nick,
                        email: lgUser.email,
                        publish: 0
                    });
                    generateStore('articles', [], true).set(articles);
                    return table(generateStore('articles', [], true).get().value).find('id', lastArt.id + 1);
                } else {
                    articles.push({
                        name: name,
                        content: content,
                        id: 1,
                        nick: lgUser.nick,
                        email: lgUser.email,
                        publish: 0
                    });
                    generateStore('articles', [], true).set(articles);
                    return table(generateStore('articles', [], true).get().value).find('id', 1);
                }
            },

            //发布
            publish: function (art, name, content) {
                if (!art.id) {
                    art = this.add(name, content);
                    //$('.publish').removeClass('disable').text('发布文章');
                }
                else {
                    var articles = generateStore('articles', [], true).get().value;
                    var artTab = table(articles),
                        article = artTab.find('id', art.id);
                    if (article.publish == 0) {
                        artTab.modify('id', art.id, 'publish', 1);
                        generateStore('articles', [], true).set(articles);
                        art = artTab.find('id', art.id);
                    } else {
                        art = this.save(art.id, name, content);
                    }
                }
                this.editInit(art);
            },

            unPublish: function (id) {
                var artTab = table(generateStore('articles', [], true).get().value);
                artTab.modify('id', id, 'publish', 0);
            },

            delete: function (id) {
                var articles = generateStore('articles', [], true).get().value;
                var artTab = table(articles);
                artTab.delete('id', id);
                generateStore('articles', [], true).set(articles);
                this.editInit();
            }
        }
    };
})(window);
