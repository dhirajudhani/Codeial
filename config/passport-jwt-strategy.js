const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');
const { ExtractJwt } = require('passport-jwt');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}

passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    //Here doesnot have to match password and username like passport local strategy here we directly match user id present in payload of jwt 
    User.findById(jwtPayLoad._id, function(err,user){
        if(err){
            console.log('Error in findng user from jwt');
            return;
        }
        if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });

}));


module.exports = passport;