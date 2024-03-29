const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../worker/comment_email_worker');
const queue = require('../config/kue');
const Like = require('../models/like');

module.exports.create = async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
            // handle error
            post.comments.push(comment);
            post.save();

            comment = await comment.populate([{path: 'user', select: 'name'}, {path: 'user', select: 'email'}])
            //commentMailer.newComment(comment);

            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log('Error in creating a queue');
                    return;
                }
                console.log('job enqueued',job.id);
            })
            
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }

            req.flash('success', 'Comment published!');
            res.redirect('/');
        }
}catch(err){
    req.flash('error', err);
    return;
}
}

module.exports.destroy = async function(req,res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
        let postId = comment.post;
        comment.remove();

        let post = await Post.findByIdAndUpdate(postId , {$pull:{comments:req.params.id}});

        // deleted the associated likes for this comment
        await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            if(req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
        req.flash('success', 'Comment deleted!');
        return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
}catch(err){
    req.flash('error', err);
    return; 
}
}