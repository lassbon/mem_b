/**
 * SocialController
 *
 * @description :: Server-side logic for managing socials
 * @help 
 */

 /** 
 * @apiDefine RequesterIdNotProvidedError
 *
 * @apiError RequesterIdNotProvided No Requester id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Requester id provided!"
 *     }
 */

 /** 
 * @apiDefine RequesteeIdNotProvidedError
 *
 * @apiError RequesteeIdNotProvided No Requestee id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Requestee id provided!"
 *     }
 */

 /**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No User with such id existing'
 *     }
 */

 /**
 * @apiDefine PostNotFoundError
 *
 * @apiError PostNotFound The id of the Post was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Post with such id existing'
 *     }
 */

 /**
 * @apiDefine PostIdNotProvidedError
 *
 * @apiError PostIdNotProvided No post id provided.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No Post id provided!"
   *     }
 */

  /**
 * @apiDefine CommentNotFoundError
 *
 * @apiError CommentNotFound The id of the Comment was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Comment with such id existing'
 *     }
 */

 /**
 * @apiDefine CommentIdNotProvidedError
 *
 * @apiError CommentIdNotProvided No comment id provided.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No Comment id provided!"
   *     }
 */

 /**
 * @apiDefine SearchTermNotProvidedError
 *
 * @apiError SearchTermNotProvided No search term provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No search term provided!"
 *     }
 */


module.exports = {
	

  
  /**
   * `SocialController.request()` 
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/request Send a friend request
   * @apiName Request
   * @apiDescription This is where the friend request is registered to the database
   * @apiGroup Social
   *
   * @apiParam {Number} User ID of the requester.
   * @apiParam {Number} User ID of the requestee.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Friend request sent"
   *     }
   *
   * @apiUse RequesterIdNotProvidedError
   * 
   * @apiUse RequesteeIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  request: function (req, res) {
    if (!req.param('requester')) {
      return res.json(401, {status: 'error', err: 'No Requester id provided!'});
    }

    if (!req.param('requestee')) {
      return res.json(401, {status: 'error', err: 'No Requestee id provided!'});
    }

    SocialConnections.create(req.body).exec(function (err, friendRequest) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      if (friendRequest) {
        res.json(200, {status: 'success', message: 'Friend request sent'});
      }
    });
  },

  /**
   * `SocialController.cancel()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/cancel Cancel a friend request
   * @apiName Cancel
   * @apiDescription This is where a friend request is canceled befor it is accepted by the requestee
   * @apiGroup Social
   *
   * @apiParam {Number} User ID of the requester.
   * @apiParam {Number} User ID of the requestee.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "'Friend request canceled"
   *     }
   *
   * @apiUse RequesterIdNotProvidedError
   * 
   * @apiUse RequesteeIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  cancel: function (req, res) {
    if (!req.param('requester')) {
      return res.json(401, {status: 'error', err: 'No User id provided!'});
    }
    
    if(!req.param('requestee')){
      return res.json(401, {status: 'error', err: 'No Requestee id provided!'});
    }

    SocialConnections.findOne({select: 'requester', where : {requester : req.param('requester'), requestee: req.param('requestee')}}).exec(function (err, requester){
      if (err) {
        return res.json(err.status, {err: err});
      }

      if(!requester){
        return res.json(404, {status: 'error', message: 'No User with such requester id existing'})
      }else{
        SocialConnections.destroy({requester : req.param('requester'), requestee: req.param('requestee')}).exec(function (err){
          if (err) {
            return res.json(err.status, {err: err});
          }
  
          return res.json(200, {message: 'success', message: 'Friend request canceled'});
        });
      }
    });
  },


  /**
   * `SocialController.remove()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/remove Terminate a friendship
   * @apiName Remove
   * @apiDescription This is where a friendship is terminated or destroyed 
   * @apiGroup Social
   *
   * @apiParam {Number} User ID of the requester.
   * @apiParam {Number} User ID of the requestee.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Friendship terminated"
   *     }
   *
   * @apiUse RequesterIdNotProvidedError
   * 
   * @apiUse RequesteeIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  remove: function (req, res) {
    if(!req.param('requester')){
      return res.json(401, {status: 'error', err: 'No Requester id provided!'});
    }

    if(!req.param('requestee')){
      return res.json(401, {status: 'error', err: 'No Requestee id provided!'});
    }
    
    User.findOne({select: 'username', where : {id : req.param('requestee')}}).populate('friends').exec(function (err, user){
      if (err) {
        return res.json(err.status, {err: err});
      }
      
      if(!user){
        return res.json(404, {status: 'error', message: 'No User with such requestee id existing'});
      }else{

        user.friends.remove(req.param('requester'));
        user.save(function(err){ 
          if(err) return res.json(err.status, {err: err});

          return res.json(200, {status: 'success', message: 'Friendship terminated'});
        });
      }
    });
  },


  /**
   * `SocialController.accept()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/accept Accept a friend request
   * @apiName Accept
   * @apiDescription This is where the requestee accepts a friend request from a requester 
   * @apiGroup Social
   *
   * @apiParam {Number} User ID of the requester.
   * @apiParam {Number} User ID of the requestee.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Friend request accepted"
   *     }
   *
   * @apiUse RequesterIdNotProvidedError
   * 
   * @apiUse RequesteeIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  accept: function (req, res) {
    if(!req.param('requester')){
      return res.json(401, {status: 'error', err: 'No Requester id provided!'});
    }

    if(!req.param('requestee')){
      return res.json(401, {status: 'error', err: 'No Requestee id provided!'});
    }

    User.findOne({select: 'username', where : {id : req.param('requestee')}}).populate('friends').exec(function (err, user){
      if (err) {
        return res.json(err.status, {err: err});
      }
      
      if(!user){
        return res.json(404, {status: 'error', message: 'No User with such id existing'});
      }else{
        
        user.friends.add(req.param('requester'));
        user.save(function(err){ 
          if(err) return res.json(err.status, {err: err});

          return res.json(200, {status: 'success', message: 'Friend request accepted'});
        });
      }
    });
  },
  
  /**
   * `SocialController.createPost()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/post Create a new social post
   * @apiName CreatePost
   * @apiDescription This is where a new social post is created.
   * @apiGroup Social
   *
   * @apiParam {String} postText Text content of the post.
   * @apiParam {Number} owner User ID of the post creator.
   * @apiParam {String} [postImage] Url of images associated with the post.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "id": "59dce9c16b54d91c38847825"
   *     }
   *
   * @apiError PostOwnerIdNotProvided No post owner id provided.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No Creator/Owner user id provided!"
   *     }
   * 
   * @apiError PostContentNotProvided No post content provided.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No post content provided!"
   *     }
   */
  createPost: function (req, res) {
    if (!req.param('owner')) {
      return res.json(401, {status: 'error', err: 'No Creator/Owner user id provided!'});
    }

    if (!req.param('postText')) {
      return res.json(401, {status: 'error', err: 'No post content provided!'});
    }
    SocialPosts.create(req.body).exec(function (err, post) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      
      if (post) {
        res.json(200, { status: 'success', id: post.id });
      }
    });
  },

  /**
   * `SocialController.uploadPostImage()`
   */
  uploadPostImage: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Post id provided!'});
    }else{
      req.file('image').upload({
        maxBytes: 10,
        dirname: require('path').resolve(sails.config.appPath, 'assets/images/social')
      },function (err, uploadedFiles) {
        if (err) return res.negotiate(err);

        if (uploadedFiles.length === 0){
          return res.badRequest('No file was uploaded');
        }

        SocialPosts.update({id: req.param('id')}, {
          
          // Generate a unique URL where the avatar can be downloaded.
          avatarUrl: require('util').format('%s/user/avatar/%s', sails.config.appUrl, req.session.me),
    
          // Grab the first file and use it's `fd` (file descriptor)
          avatarFd: uploadedFiles[0].fd
        })
        .exec(function (err){
          if (err) return res.negotiate(err);

          return res.json({status: 'success', message: uploadedFiles.length + ' file(s) uploaded successfully!'});
        });
      });
    }
  },

  /**
   * `SocialController.updatePost()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/social/post Update a post
   * @apiName UpdatePost
   * @apiDescription This is where a social post is updated.
   * @apiGroup Social
   *
   * @apiParam {Number} id Post ID.
   * @apiParam {String} [postText] Text content of the post.
   * @apiParam {String} [postImage] Url of images associated with the post.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Post with id 59dce9d56b54d91c38847825 has been updated'"
   *     }
   *
   * @apiUse PostIdNotProvidedError
   * 
   * @apiUse PostNotFoundError
   */
  updatePost: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: "error", err: 'No Post id provided!'});
    }else{
      SocialPosts.findOne({select: 'postText', where : {id : req.param('id')}}).exec(function (err, post){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!post){
          return res.json(404, {status: 'error', message: 'No Post with such id existing'});
        }else{
          SocialPosts.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Post with id '+req.param('id')+' has been updated'});
          });
        }
      });
    }
  },

  /**
   * `SocialController.deletePost()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/social/post/:id Delete a post
   * @apiName DeletePost
   * @apiDescription This is where a social post is deleted
   * @apiGroup Social
   *
   * @apiParam {Number} id Post ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Post with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse PostIdNotProvidedError
   * 
   * @apiUse PostNotFoundError
   */
  deletePost: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: "error", err: 'No Post id provided!'});
    }else{
      SocialPosts.findOne({select: 'postText', where : {id : req.param('id')}}).exec(function (err, post){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!post){
          return res.json(404, {status: 'error', message: 'No Post with such id existing'});
        }else{
          SocialPosts.destroy({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Post with id '+req.param('id')+' has been deleted'});
          });
        }
      });
    }
  },

  /**
   * `SocialController.getPost()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/social/post/:id Get post(s)
   * @apiName GetPost
   * @apiDescription This is where a social post(s) is retrieved
   * @apiGroup Social
   *
   * @apiParam {Number} id Post ID.
   *
   * @apiSuccess {String} post Postresponse from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "59dce9d56b54d91c38847825",
   *       "postImage": "http://w............"
   *        .................................
   *     }
   * 
   * @apiUse PostNotFoundError
   */
  getPost: function (req, res) {
    var page = 1;
    var limit = 25;

    if(req.param('page') > 1){
      page = req.param('page');
    }

    if(req.param('limit') > 1){
      limit = req.param('limit');
    }

    if(req.param('id')){
      SocialPosts.findOne({id : req.param('id')}).populate('comments').populate('likes').exec(function (err, post){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!post){
          return res.json(204, {status: 'error', message: 'No Post with such id existing'})
        }else{
          return res.json(200, post);
        }
      });
    }else{
      SocialPosts.find().populate('comments').populate('likes').paginate({page: page, limit: limit}).exec(function (err, posts){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, posts);
      });
    }
  },

  /**
   * `SocialController.searchPost()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/social/post/search Search for post(s)
   * @apiName SearchPost
   * @apiDescription This is where a social post is searched.
   * @apiGroup Social
   *
   * @apiParam {String} searchTerm Search term to be searched.
   *
   * @apiSuccess {String} page Current page of the search result.
   * @apiSuccess {String} limit  Number of search items per page.
   * @apiSuccess {String} result  Result of the search.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "page": "1",
   *       "limit": "50",
   *       "result": [{}]
   *     }
   *
   * @apiUse SearchTermNotProvidedError
   * 
   */
  searchPost: function (req, res) {
    var page = 1;
    var limit = 25;

    if(req.param('page') && req.param('page') > 1){
      page = req.param('page');
    }

    if(req.param('limit')){
      limit = req.param('limit');
    }

    if(!req.param('searchTerm')){
      return res.json(401, {status: "error", err: 'No search term provided!'});
    }else{
      SocialPosts.find({ postText: { 'contains': req.param('searchTerm') }}).populate('comments').populate('likes').paginate({page: page, limit: limit}).exec(function (err, posts){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, {page: page, limit: limit, result: posts});
      });
    }
  },

    /**
   * `SocialController.unlikePost()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/post/unlike Unlike a post
   * @apiName UnlikePost
   * @apiDescription This is where a social post is unliked
   * @apiGroup Social
   *
   * @apiParam {String} id Post ID.
   * @apiParam {String} liker User id of the post liker.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Post unliked"
   *     }
   *
   * @apiUse PostIdNotProvidedError
   * 
   * @apiUse PostNotFoundError
   */
  unlikePost: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: "success", err: 'No Post id provided!'});
    }else{
      SocialPosts.findOne({select: 'postText', where : {id : req.param('id')}}).populate('likes').exec(function (err, post){
        if (err) {
          return res.json(err.status, {err: err});
        }
        
        if(!post){
          return res.json(200, {status: 'error', message: 'No Post with such id existing'});
        }else{
          
          post.likes.remove(req.param('liker'));
          post.save(function(err){ 
            if(err) return res.json(err.status, {err: err});

            return res.json(200, {status: 'success', message: 'Post unliked'});
          });
        }
      });
    }
  },

  /**
   * `SocialController.likePost()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/post/like Like a post
   * @apiName LikePost
   * @apiDescription This is where a social post is liked
   * @apiGroup Social
   *
   * @apiParam {String} id Post ID.
   * @apiParam {String} liker User id of the post liker.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Post liked"
   *     }
   *
   * @apiUse PostIdNotProvidedError
   * 
   * @apiUse PostNotFoundError
   */
  likePost: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Post id provided!'});
    }else{
      SocialPosts.findOne({select: 'postText', where : {id : req.param('id')}}).populate('likes').exec(function (err, post){
        if (err) {
          return res.json(err.status, {err: err});
        }
        
        if(!post){
          return res.json(200, {status: 'error', message: 'No Post with such id existing'});
        }else{
          
          post.likes.add(req.param('liker'));
          post.save(function(err){ 
            if(err) return res.json(err.status, {err: err});

            return res.json(200, {status: 'success', message: 'Post liked'});
          });
        }
      });
    }
  },

  /**
   * `SocialController.createComment()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/social/comment Create a new comment
   * @apiName CreateComment
   * @apiDescription This is where a comment on post is created
   * @apiGroup Social
   *
   * @apiParam {String} comment The comment to be made on a post.
   * @apiParam {Number} owner User id of the commentor.
   * @apiParam {Number} post Post id of the post to be commented on.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  the comment id of the newly created comment.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "id": "59dce9c16b54d91c38847825"
   *     }
   *
   * @apiUse PostIdNotProvidedError
   * 
   * @apiError OwnerIdNotProvided No Owner/User id provided.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No post content provided!"
   *     }
   * 
   * 
   * @apiError CommentNotProvided No comment provided.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No comment provided!"
   *     }
   */
  createComment: function (req, res) {
    if (!req.param('post')) {
      return res.json(401, {err: 'No Post id provided!'});
    }

    if (!req.param('owner')) {
      return res.json(401, {err: 'No Owner id provided!'});
    }

    if (!req.param('comment')) {
      return res.json(401, {err: 'No Comment provided!'});
    }

    SocialComments.create(req.body).exec(function (err, comment) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      
      if (post) {
        res.json(200, {
          id: comment.id
        });
      }
    });
    
  },

  /**
   * `SocialController.updateComment()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/social/post Update a comment
   * @apiName UpdateComment
   * @apiDescription This is where a comment on post is updated.
   * @apiGroup Social
   *
   * @apiParam {Number} id Comment ID.
   * @apiParam {String} comment The comment to be made on a post.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Comment with id 59dce9d56b54d91c38847825 has been updated'"
   *     }
   *
   * @apiUse CommentIdNotProvidedError
   * 
   * @apiUse CommentNotFoundError
   */
  updateComment: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Comment id provided!'});
    }else{
      SocialComments.findOne({select: 'comment', where : {id : req.param('id')}}).exec(function (err, comment){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!comment){
          return res.json(404, {status: 'error', message: 'No Comment with such id existing'});
        }else{
          SocialComments.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Comment with id '+req.param('id')+' has been updated'});
          });
        }
      });
    }
  },

  /**
   * `SocialController.deleteComment()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/social/comment/:id Delete a comment
   * @apiName DeleteComment
   * @apiDescription This is where a comment on post is deleted.
   * @apiGroup Social
   *
   * @apiParam {Number} id Comment ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Comment with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse CommentIdNotProvidedError
   * 
   * @apiUse CommentNotFoundError
   */
  deleteComment: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No Comment id provided!'});
    }else{
      SocialComments.findOne({select: 'comment', where : {id : req.param('id')}}).exec(function (err, comment){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!comment){
          return res.json(404, {status: 'error', message: 'No Comment with such id existing'});
        }else{
          SocialComments.destroy({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Comment with id '+req.param('id')+' has been deleted'});
          });
        }
      });
    }
  },

  /**
   * `SocialController.getComment()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/social/comment/:id Get comment(s)
   * @apiName GetComment
   * @apiDescription This is where a comment on post is retrieved.
   * @apiGroup Social
   *
   * @apiParam {Number} id Comment ID.
   *
   * @apiSuccess {String} comment Postresponse from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "59dce9d56b54d91c38847825",
   *       ".........": "...................."
   *        .................................
   *     }
   * 
   * @apiUse CommentNotFoundError
   * 
   */
  getComment: function (req, res) {
    if(req.param('id')){
      SocialComments.findOne({id : req.param('id')}).exec(function (err, comment){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!comment){
          return res.json(204, {status: 'error', message: 'No Comment with such id existing'})
        }else{
          return res.json(200, comment);
        }
      });
    }else{
      SocialComments.find().exec(function (err, posts){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, posts);
      });
    }
  },

  /**
   * `SocialController.searchComment()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/social/comment/search Search for post(s)
   * @apiName SearchComment
   * @apiDescription This is where a comment on post is searched.
   * @apiGroup Social
   *
   * @apiParam {String} searchTerm Search term to be searched.
   *
   * @apiSuccess {String} page Current page of the search result.
   * @apiSuccess {String} limit  Number of search items per page.
   * @apiSuccess {String} result  Result of the search.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "page": "1",
   *       "limit": "50",
   *       "result": [{}]
   *     }
   *
   * @apiUse SearchTermNotProvidedError
   */
  searchComment: function (req, res) {
    var page = 1;
    var limit = 25;

    if(req.param('page') && req.param('page') > 1){
      page = req.param('page');
    }

    if(req.param('limit')){
      limit = req.param('limit');
    }

    if(!req.param('searchTerm')){
      return res.json(401, {err: 'No search term provided!'});
    }else{
      SocialComments.find({ comment: { 'contains': req.param('searchTerm') }}).paginate({page: page, limit: limit}).exec(function (err, comments){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, {page: page, limit: limit, result: comments});
      });
    }
  }
  
};
