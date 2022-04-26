var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var UsersDBRoutes = require('./routes/UsersRoutes');
var LabelsRoutes = require('./routes/LabelsRoutes');
var RefreshtokensRoutes = require("./routes/refreshTokensRoutes");

var app = express();
const nodb = require("./models");

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/UsersDB', UsersDBRoutes);
app.use('/Labels', LabelsRoutes);
app.use("/Rtokens", RefreshtokensRoutes);

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
