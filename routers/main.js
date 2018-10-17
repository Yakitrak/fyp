'use strict';

module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/login', this.login);
            router.get('/', this.index);
        },

        login: function(req, res) {
            // res.render('index/index.ejs', {title: 'Parsons Problem'});
        },
        index: function(req, res) {
            res.render('index/index.ejs', {title: 'Parsons Problem'});
        },
    }
};


