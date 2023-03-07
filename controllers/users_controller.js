const User = require('../models/user');


// This one controller can handle many users 
//Note every time  we make controller to access it we have to make route
module.exports.profile = function(req,res){
   // return res.render('user_profile',{
   //  title:"User"
   // });
   if(req.cookies.user_id){
      User.findById(req.cookies.user_id,function(err,user){
         if(user){
            return res.render('user_profile',{
               title:"User Profile",
               user:user
            });
         }
         return res.redirect('/users/sign-in');
      })
   }
   else{
      return res.redirect('/users/sign-in');
   }
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
   //find user
   User.findOne({email:req.body.email},function(err,user){
      if(err){console.log("error in finding user in signing in"); return;}

       //handle user found
       if(user){

         //handle password which don't match
         if(user.password != req.body.password){
            return res.redirect('back');
         }
         //handle session creation
         res.cookie('user_id',user.id);
         return res.redirect('/users/profile');

       }else{
           //handle user not found
           return res.redirect('back');
       }
   });
}
module.exports.signOut = function(req,res){
   return res.redirect('/users/sign-in');
}