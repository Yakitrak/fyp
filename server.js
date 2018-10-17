const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('connect-flash');
const path = require('path');
const favicon = require('serve-favicon');
const expressPromiseRouter = require('express-promise-router');

const dependencies = require('./dependencies');
const ejs = require('ejs');
const port = 80;

dependencies.resolve(function(main) {

    function setupExpress() {
        const app = express();
        const server = http.createServer(app);

        server.listen(port, function() {
            console.log('Listening on port ' + port);
        });

        const router = expressPromiseRouter();
        main.setRouting(router);
        app.use(router);

        configureExpress(app);

    }

    function configureExpress(app) {
        app.use(express.static('client/public'));
        app.use(favicon(path.join(__dirname, 'client/src/media', 'favicon.png')));
        app.use(cookieParser());

        app.set('views', __dirname + '/client/public');
        app.set('view engine', 'ejs');

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(validator());
        app.use(flash());
    }

    setupExpress();

});
