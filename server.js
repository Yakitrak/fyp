const express = require('express');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const flash = require('connect-flash');
const path = require('path');
const favicon = require('serve-favicon');
const expressPromiseRouter = require('express-promise-router');
const passport = require('passport');
const dependencies = require('./dependencies');
const ejs = require('ejs');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const port = 80;

function configureExpress(app) {
    app.use(express.static('client/public'));
    app.use(cookieParser());
    app.set('views', __dirname + '/client/public');
    app.set('view engine', 'ejs');
    app.use(favicon(path.join(__dirname, 'client/src/media', 'favicon.png')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(validator());
    app.use(session({
        secret: 'SUPER SECRET',
        resave: true,
        saveInitializes: true,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
    }));
    app.use(flash());
    require('./config/passport-google')(passport);
    app.use(passport.initialize());
    app.use(passport.session());
}

dependencies.resolve(function(main) {

    function setupExpress() {
        const router = expressPromiseRouter();
        const app = express();
        const server = http.createServer(app);

        server.listen(port, function() {
            console.log('Listening on port ' + port);
        });

        configureExpress(app);
        main.setRouting(router);
        app.use(router);

    }

    setupExpress();
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/PyParson');
});
