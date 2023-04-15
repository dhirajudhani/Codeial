{
    //method to submit the form data for new post using AJAX
   let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(), // this convert form data into json
                success:function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost)); // new thing to learn
                },error: function(error){
                    console.log(error.responseText);
                }
            })
        });
   }

   //method to create a post in a DOM
   let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                        <p>
                           
                            <small>
                                <a href="/posts/destroy/${ post._id}" class="delete-post-button">x</a>
                            </small>
                            
                            ${ post.content}
                            <br>
                            <small>
                            ${ post.user.name}
                            </small>
                        
                        </p>
                        <div class="post-comments">
                           
                                <form action="/comments/create" method="post">
                                    <input type="text" name="content" placeholder="Add Comment..." required>
                                    <input type="hidden" name="post" value="${post._id}">
                                    <input type="submit" value="Add Comment">
                                </form>
                            
                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                                
                                </ul>
                            </div>
                        </div>
        
    </li>`)
   }

   //method to delete a post from DOM
   //this method basicaly sends a postid which we have to delete
   let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'), // to fetch href from anchor tag
                success:function(data){
                    $(`#post-${data.data.post._id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
   }




   createPost();
}