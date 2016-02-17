'use strict'

var express    = require('express'),
    bodyParser = require('body-parser'),
    morgan     = require('morgan'),
    hbs        = require('hbs'),
    JSX        = require('node-jsx').install(),
    env        = process.env.NODE_ENV || 'development',
    config     = require('./config/config.js')[env],
    routes     = require('./routes'),
    app        = express();


// Set up to use Handlebars views
app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

// Enable logging in development
if (config.isDev) app.use(morgan('dev'));

app.get('/', routes.index);

// Kick off the server
app.listen( config.port );


