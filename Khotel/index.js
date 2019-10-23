let config = require('config');
require('express-async-errors');
const book = require('./Routes/common_routes/Book');
const admin = require('./Routes/Admin_routes/Admin');
const static = require('./Statics/statics');
const {Admin} = require('./models/admins');
const login= require('./Routes/Admin_routes/login');
const logout = require('./Routes/Admin_routes/logout');
const register= require('./Routes/Admin_routes/register');
const error = require('./middlewares/errorHandler');
const passport = require('passport');
const flash = require('connect-flash');
const expressSession = require('express-session');
const check = require('./Routes/Admin_routes/check');
const mongoose = require('mongoose');
const express = require('express');
const app  = express();

mongoose.connect(config.get('db'),{ useNewUrlParser: true,
     useUnifiedTopology: true, 
     useCreateIndex: true})
.then( () => console.log('connected to mongoDb'))
.catch( (er) => console.log('cant connect to mongoDb',er));

app.set('view engine','pug');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/book',book);

app.use(flash());
app.use(expressSession({
  secret: config.get('sessionSecret'),
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  const user = await Admin.findById(id);
  done(null, user);
});

app.use('/check',check);
app.use('/static',static);
app.use('/Admin',admin);
app.use('/login',login);
app.use('/register',register);
app.use('/logout',logout);

app.use(error);

app.get('/', (req,res) =>{

  if(req.isAuthenticated()) return res.redirect('/Admin');

  res.sendFile(__dirname + '/first-page.html');
});

const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Listening on port ${port}`));