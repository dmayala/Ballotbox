import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import jwt from 'jwt-simple';

// import productRoutes from './routes/products';
// import cartRoutes from './routes/carts';

import React from 'react';
import Router from 'react-router';
import routes from 'routes';
import Flux from 'utils/flux';

const bcrypt = require('bluebird').promisifyAll(require('bcrypt'));

const app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// JWT setup
// app.set('jwtTokenSecret', process.env.JWT_SECRET);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// app.use('/api/products', productRoutes);
// app.use('/api/carts', cartRoutes);

app.use('/phase1/:id/:pass', async (req, res) => {
  let UserModel = require('models/user');
  let { id, pass } = req.params;

  let user = await UserModel.forge({ id }).fetch();

  let check = require('bcrypt').compareSync(pass, user.get('password'));
  res.send(check);
});

app.post('/signup', async (req, res) => {
  let UserModel = require('models/user');
  let { name, email, password } = req.body;

  let salt = await bcrypt.genSaltAsync(10);
  let hash = await bcrypt.hashAsync(password, salt);

  let user = await UserModel.forge({ name, email, password: hash }).save();
  res.send(user);
});
  
// react router config
app.use((req, res, next) => {
  let router = Router.create({ 
    location: req.url,
    routes: routes
  });
  const flux = new Flux();
  router.run((Handler, state) => {
    if (state.routes.length < 1) {
      return next();  
    }
    flux.render(Handler, flux).then((content) => {
      return res.render('index', { html: content.body });
    }); 
  });
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
