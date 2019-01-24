'use strict';

module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/welcome', this.welcome);
            router.get('/question/*', this.index);
        },

        welcome: function(req, res) {
            res.render('index/indexWelcome.ejs', {title: 'Welcome - Parsons Problem'});
        },
        index: function(req, res) {
            res.render('index/indexDashboard.ejs', {title: 'Parsons Problem'});
        },
    }
};


