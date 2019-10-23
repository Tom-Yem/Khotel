const bcrypt = require('bcrypt');
const config = require('config');
const passport = require('passport');
const LocalStrategy = require('passport-local');
let FacebookStrategy = require('passport-facebook').Strategy;
const {Admin,validateAdmin} = require('../../models/admins');
const express = require('express');
const router = express.Router();

passport.use('local-register', new LocalStrategy({
    usernameField: 'email',
    password: 'password'
}, async (email,password,done) =>{
    
    const {error} = validateAdmin({email,password});
    if(error) return done(null,false,{message:error.details[0].message}); 

    let admin = await Admin.findOne({ email:email});
    if(admin) return done(null,false,{message:'Admin already exist!'});
    admin = new Admin({
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(admin.password,salt);
    await admin.save();

    return done(null,admin);
    
}));


passport.use('RegFacebook',new FacebookStrategy({
    clientID: config.get('appId'),
    clientSecret: config.get('secretKey'),
    callbackURL: "/register/redirect",
}, async (accessToken, refreshToken, profile, done) =>{
    let admin = await Admin.findOne({ 'facebook.id':profile.id});
    if(admin) return done(null,false);
     
    admin = new Admin();
    admin.facebook.id = profile.id;
    admin.facebook.name = profile.displayName;
    admin.name = 'facebookuser';
    admin.email = 'facebookuser';
    admin.password = 'facebookuser';
    await admin.save();
    return done(null,admin);

}));

router.post('/',function(req,res,next){
    passport.authenticate('local-register',function(err,user,info){
        if(err) return next(err);
        
        if(!user) return res.status(400).send(info.message);

        req.logIn(user,function(err){
           if(err) return next(err)

           return res.status(200).send();
        });
}) (req,res,next);
});

router.get('/fail', (req,res) =>{
   res.send('ERROR::Failed to register admin!');
});

router.get('/facebook',passport.authenticate('RegFacebook'));

router.get('/redirect',
passport.authenticate('RegFacebook',{failureRedirect:'/register/fail'}),
(req,res) =>{
    res.redirect('/Admin');
});

module.exports = router;