let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan')('dev');
let sassMiddleware = require('node-sass-middleware');
let session = require('express-session')
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();

const bot = require('./discord/app')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_KEY
}))
app.use(async function (req, res, next) {
  req.bot = bot
  if (req.session.access_token) {
    let response = await fetch('https://discord.com/api/users/@me', {
      headers: {
        'Authorization': `Bearer ${req.session.access_token}`
      }
    })
    req.user = await response.json()
    response = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        'Authorization': `Bearer ${req.session.access_token}`
      }
    })
    req.user.guilds = await response.json()
  }
  req.checkAdmin = (int) => {
    return (int & 8)
  }
  next()
})
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
