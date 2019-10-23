const {Admin}= require('../../models/admins');
const bcrypt = require('bcrypt');
const config = require('config');
const Joi = require('joi');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const router = express.Router();

function validate(Admin){
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    }
    return Joi.validate(Admin,schema);
}

passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    password: 'password'
}, async (email,password,done) =>{
    const {error} = validate({email,password});
    if(error) return done(null,false); 

    let admin = await Admin.findOne({ email:email});
    if(!admin) return done(null,false);

    let validPassword = await bcrypt.compare(password,admin.password);
    if(!validPassword) return done(null,false);

    return done(null,admin);
}));

passport.use('LogFacebook',new FacebookStrategy({
    clientID: config.get('appId'),
    clientSecret: config.get('secretKey'),
    callbackURL: "/login/redirect",
}, async (accessToken, refreshToken, profile, done) =>{
    let admin = await Admin.findOne({ 'facebook.id':profile.id});
    if(!admin) done(null,false);

    return done(null,admin);
}));

router.post('/',function(req,res,next){
    passport.authenticate('local-login',function(err,user,info){
        if(err) return next(err);
        if(!user) return res.status(400).send("Invalid email or password");

        req.logIn(user,function(err){
           if(err) return next(err)

           return res.status(200).send();
        });
}) (req,res,next);
});

router.get('/facebook',passport.authenticate('LogFacebook'));

router.get('/redirect',
passport.authenticate('LogFacebook',{failureRedirect:'/'}),
(req,res) =>{
  res.redirect('/');
});

module.exports = router;