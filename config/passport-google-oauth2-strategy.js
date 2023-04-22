const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use new strategy for google login
passport.use(new googleStrategy({
    clientID: "667219078412-dje2u6511ctujm1bna6fv3644s8lqmid.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8001/users/auth/google/callback"
},
    function(accessToken, refreshToken, profile, done){
        // find the user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){
                console.log('error in google strategy-passport',err);
                return;
            }

            console.log(profile);

            if(user){
                // if found set this user as req.user
                return done(null,user);
            }else{
                // if not found create user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){
                        console.log('error in creating user',err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;