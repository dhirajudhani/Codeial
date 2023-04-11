const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    Post.create({
        content: req.body.content,
        user: req.user._id
    },function(err,post){
        if(err){console.log('error in creating a post'); return;}
        return res.redirect('back');
        
    });
};

//creating the action 
module.exports.destroy = function(req,res){
    Post.findById(req.params.id , function(err,post){

        //check that a user who is created a post is only can delete the post
        //.id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            //deleteMany = delete all the coments   
            Comment.deleteMany({post:req.user.id}, function(err){
                return res.redirect('back');
            });

        }else{
            return res.redirect('back');
        }
    
        
    });
}