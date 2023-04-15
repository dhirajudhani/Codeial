const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback: true
    },
    //done -> it is a callback function which is responding back to passport.js
    function(req,email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password!=password){
                // console.log('Invalid Username/Password');
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }

));

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
    // Basically set id in cookies in encrypted form
});

//deserializing the user from the key  in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding User --> Passport');
        }
        return done(null,user);
    });
});

//check if user is authenticated

passport.checkAuthentication = function(req,res,next){
    //if user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){ 
        return next();
    }

    //if the user not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user; 
        
    }
     next();
  
}

module.exports = passport;