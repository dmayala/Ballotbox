import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import jwt_simple from 'jwt-simple';

import pollRoutes from './routes/polls';

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

import React from 'react';
import reactCookie from 'react-cookie';
import createFlux from 'flux/createFlux';
import universalRender from '../shared/universalRender';

import UserModel from 'models/user';
import UserCollection from 'collections/users';

const app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// JWT setup
app.set('jwtTokenSecret', process.env.JWT_SECRET);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/polls', pollRoutes);

app.post('/login', async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase();

  let user = await UserCollection.forge()
                                 .query({ where: { email } })
                                 .fetchOne();

  if (user) {
    let check = await bcrypt.compareAsync(password, user.get('password'));

    if (check) {
      let token = jwt_simple.encode({ user: user.get('email'), name: user.get('name') }, process.env.JWT_SECRET);
      return res.send({ token });
    }
  }

  res.status(500).send({ 'error': 'This username or password is incorrect.' });
});

app.post('/signup', async (req, res) => {
  let { name, email, password } = req.body;
  email = email.toLowerCase();

  let user = await UserCollection.forge()
                                 .query({ where: { email } })
                                 .fetchOne();

  if (!user) {
    let salt = await bcrypt.genSaltAsync(10);
    let hash = await bcrypt.hashAsync(password, salt);

    let user = await UserModel.forge({ name, email, password: hash }).save();
    return res.send(user);
  }

  res.status(500).send({ 'error': 'This email is already registered.' });
});

// react router config
app.use(async (req, res, next) => {

  let { jwt } = req.cookies;
  const flux = createFlux();

  if (jwt) {
    flux.getActions('login').loadUser({ token: jwt });
  } 
  
  await flux.resolver.dispatchPendingActions();

  try {
    reactCookie.plugToRequest(req, res);
    const { body, title, statusCode, description } = await universalRender({ flux, location: req.url });
    return res.render('index', { title, html: body });
  } catch (err) {
    const { error, redirect } = err;
    console.log(err);
    
    if (error && error.code === 404) {
      return next();
    }

    if (redirect) {
      const { pathname, search } = redirect;
      return res.redirect(pathname + search);
    }

    return next(error);
  }

});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

const server = require('http').createServer(app);
server.listen(app.get('port'), () => {
  if (process.send) {
    process.send('online');
  } 
  console.log(`Express server listening on port ${app.get('port')}`);
});
