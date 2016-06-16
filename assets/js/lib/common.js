/**
 * Created by common on 2016/6/16.
 */
(function (global) {
    //持久化存储
    global.generateStore = function (storeKey, defaultVal) {
        defaultVal = defaultVal || {};

        return {
            get: function () {
                return JSON.parse(localStorage.getItem(storeKey) || JSON.stringify(defaultVal));
            },

            set: function (values) {
                localStorage.setItem(storeKey, JSON.stringify(values));
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
            }
        }
    }
})(window);