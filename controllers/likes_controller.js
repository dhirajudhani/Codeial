const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.toggleLike = async function(req, res){
    try {

        // likes /toggle/?id=bcdef&type=Post
        let likeable; 
        let deleted = false;


        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if a like is aleardy exist 
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        // if a like is already exisit then delete it 
        if(existingLike){

            likeable.likes.pull(existingLike._id); // first pull out from post and comment array then remove it
            likeable.save();

            existingLike.remove();
            deleted = true;

        }// else make a new like
        else{

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(newLike._id); // it will push created like in post and comment array
            likeable.save();
        }
        return res.json(200,{
            message: "Request Successful",
            data: {
                deleted: deleted
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.json(500,{
            message: 'Internal Server Error'
        });
    }
}