var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var passport = require('passport');

var indexRouter = require('./routes/index');
var UsersDBRoutes = require('./routes/UsersRoutes');
var LabelsRoutes = require('./routes/LabelsRoutes');

var app = express();
const nodb = require("./models");

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Rutas generales
app.use('/', indexRouter);
app.use('/UsersDB', UsersDBRoutes);
app.use('/Labels', LabelsRoutes);

//setear puerto por defecto
app.listen(process.env.DEFAULT_PORT);

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/UsersModel');

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = app;
