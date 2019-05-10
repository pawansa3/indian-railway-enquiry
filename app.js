const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const path = require('path');
const flash = require('connect-flash');
const routes = require('./routes');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// server static files
app.use(express.static(path.join(__dirname, 'public')));

// take the raw requests and turn them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
app.use(session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: true,
    saveUninitialized: false,
}));

// Exposes a bunch of methods for validating form input data.
app.use(expressValidator());

// The flash middleware let's us use req.flash('error', 'Oops! Error')
app.use(flash());

// pass variables to views on all requests
app.use((req, res, next) => {
    res.locals.flashes = req.flash();
    res.locals.h = helpers;
    res.locals.currentPath = req.path;
    next();
});

// handling routes
app.use('/', routes);

// handling errors 404 error
app.use(errorHandlers.notFound);

// handling flash errors
app.use(errorHandlers.flashValidationErrors);

// handling development env errors
if(app.get('env') === 'development') {
    app.use(errorHandlers.developmentErrors);
}

// handling production env errors
app.use(errorHandlers.productionErrors);

// export app
module.exports = app;