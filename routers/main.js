'use strict';

module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/question/*', this.index);
            router.get('/welcome', this.welcome);
        },

        welcome: function(req, res) {
            res.render('index/indexWelcome.ejs', {title: 'Parsons Problem'});
        },
        index: function(req, res) {
            res.render('index/indexDashboard.ejs', {title: 'Parsons Problem'});
        },
    }
};


