const Post = require('../models/post');
const { populate } = require('../models/user');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    //populate or show user for each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title:"Codieal | Home",
            posts:posts
         });
    })
    
};

// module.exports.actionName = function(req,res){}