const User = require('../models/user');


// This one controller can handle many users 
//Note every time  we make controller to access it we have to make route
module.exports.profile = function(req,res){
   return res.render('user_profile',{
    title:"User"
   });
}

//render a sign up page
module.exports.signUp = function(req,res){
   return res.render('user_sign_up',{
      title:"Codeial | Sign Up"
   });
}

//render a sign In page
module.exports.signIn = function(req,res){
   return res.render('user_sign_in',{
      title:"Codeial | Sign In"
   });
}

//get a sign up data
module.exports.create = function(req,res){
   if(req.body.password != req.body.confirm_password){
      return res.redirect("back");
   }
   User.findOne({email:req.body.email},function(err,user){
      if(err){console.log("error in finding user in signing up"); return;}

      if(!user){
         User.create(req.body,function(err,user){
            if(err){console.log("error in creating user while signing up"); return;}

            return res.redirect('/users/sign-in');
         })
      }
      else{
         return res.redirect('back');
      }
   })

}

//sign in and create session for user
module.exports.createSession = function(req,res){

}