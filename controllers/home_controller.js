const Post = require('../models/post');
const User = require('../models/user');
const { populate } = require('../models/user');

module.exports.home = async function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    //populate or show user for each post
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            },
            populate: {
                path: 'likes'
            }
        }).populate('likes');
        let user = await User.find({});   //finding all the user


        return res.render('home',{
            title:"Codieal | Home",
            posts:posts,
            all_user:user //showing all the user
        });
    }catch(err){
        console.log('Error',err);
        return;
    }
    
};

// module.exports.actionName = function(req,res){}

//using then
// Post.find({}).populate('comments').then(function( ));

//using promises
// let post = Post.find({}).populate('comments').exec();
// post.then()