require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('express-flash-message').default;
const session = require('express-session');
const connectDB = require('./server/config/db')

const app = express();
const port = 5500;

//Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true}));
app.use (express.json());
app.use(methodOverride('_method'));

//Static files server
app.use(express.static('public'));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine','ejs');

//Set express Session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
    })
  );

// Setup Flash Messages
app.use(
    flash({
    sessionKeyName: 'express-flash-message',
    })
  );

// Routes
app.use('/', require('./server/routes/customer'))

// Handle 404 errors
app.get('*', (req, res) => {
    res.status(404).render('404');
  });


app.listen(port, ()=> {
    console.log('App Running');
});