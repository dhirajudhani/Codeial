const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){

    let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        });

    return res.json(200,{
        message: "List of posts",
        posts: posts
    });
}


module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
            //check that a user who is created a post is only can delete the post
            //.id means converting the object id into string


            if(post.user == req.user.id){
                post.remove();

                //deleteMany = delete all the coments   
                await Comment.deleteMany({post:req.user.id});

              

                
               return res.json(200,{
                    message: "Post and associated comments deleted successfully"
               })

            }else{
                return res.json(401,{
                    message: "You can not delete this post"
                });
            }
    }catch(err){
        
        console.log(err);
        return res.json(500,{
            message: "Internal server error"
        });
    }
}
