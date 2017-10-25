/**
 * ForumController
 *
 * @description :: Server-side logic for managing forums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	


  /**
   * `ForumController.createTopic()`
   */
  createTopic: function (req, res) {
    if (!req.param('id')) {
      return res.json(401, {err: 'No User id provided!'});
    }else{
      ForumTopics.create(req.body).exec(function (err, topic) {
        if (err) {
          return res.json(err.status, {err: err});
        }
        
        if (topic) {
          res.json(200, {
            title: topic.title,
            id: topic.id
          });
        }
      });
    }
  },


  /**
   * `ForumController.updateTopic()`
   */
  updateTopic: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Topic id provided!'});
    }else{
      ForumTopics.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, topic){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!topic){
          return res.json(200, {status: 'error', message: 'No Topic with such id existing'});
        }else{
          ForumTopics.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Topic with id '+req.param('id')+' has been updated'});
          });
        }
      });
    }
  },


  /**
   * `ForumController.deleteTopic()`
   */
  deleteTopic: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Topic id provided!'});
    }else{
      ForumTopics.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, topic){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!topic){
          return res.json(200, {status: 'error', message: 'No Topic with such id existing'});
        }else{
          ForumTopics.destroy({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Topic with id '+req.param('id')+' has been deleted'});
          });
        }
      });
    }
  },


  /**
   * `ForumController.getTopic()`
   */
  getTopic: function (req, res) {
    if(req.param('id')){
      ForumTopics.findOne({id : req.param('id')}).populate('posts').exec(function (err, topic){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!topic){
          return res.json(204, {status: 'error', message: 'No Topic with such id existing'})
        }else{
          return res.json(200, topic);
        }
      });
    }else{
      ForumTopics.find().populate('posts').exec(function (err, topics){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, topics);
      });
    }
  },


  /**
   * `ForumController.createPost()`
   */
  createPost: function (req, res) {
    if (!req.param('creator')) {
      return res.json(401, {err: 'No Creator id provided!'});
    }else{
      ForumPosts.create(req.body).exec(function (err, post) {
        if (err) {
          return res.json(err.status, {err: err});
        }
        
        if (post) {
          res.json(200, {
            title: post.title,
            id: post.id
          });
        }
      });
    }
  },


  /**
   * `ForumController.updatePost()` 
   */
  updatePost: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Post id provided!'});
    }else{
      ForumPosts.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, post){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!post){
          return res.json(404, {status: 'error', message: 'No Post with such id existing'});
        }else{
          ForumPosts.update({id: req.param('id')}, req.body).exec(function(err, data){
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
   * `ForumController.deletePost()`
   */
  deletePost: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Post id provided!'});
    }else{
      ForumPosts.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, post){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!post){
          return res.json(404, {status: 'error', message: 'No Post with such id existing'});
        }else{
          ForumPosts.destroy({id: req.param('id')}, req.body).exec(function(err, data){
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
   * `ForumController.getPost()`
   */
  getPost: function (req, res) {
    if(req.param('id')){
      ForumPosts.findOne({id : req.param('id')}).populate('comments').exec(function (err, post){
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
      ForumPosts.find().populate('comments').exec(function (err, posts){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, posts);
      });
    }
  },

  /**
   * `ForumController.createComment()`
   */
  createComment: function (req, res) {
    if (!req.param('creator')) {
      return res.json(401, {err: 'No Creator id provided!'});
    }else{
      ForumComments.create(req.body).exec(function (err, comment) {
        if (err) {
          return res.json(err.status, {err: err});
        }
        
        if (comment) {
          res.json(200, {
            comment: comment.comment,
            id: comment.id
          });
        }
      });
    }
  },

  /**
   * `ForumController.updateComment()`
   */
  updateComment: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Comment id provided!'});
    }else{
      ForumComments.findOne({select: 'comment', where : {id : req.param('id')}}).exec(function (err, comment){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!comment){
          return res.json(404, {status: 'error', message: 'No Comment with such id existing'});
        }else{
          ForumComments.update({id: req.param('id')}, req.body).exec(function(err, data){
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
   * `ForumController.deleteComment()`
   */
  deleteComment: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No Comment id provided!'});
    }else{
      ForumComments.findOne({select: 'comment', where : {id : req.param('id')}}).exec(function (err, comment){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!comment){
          return res.json(404, {status: 'error', message: 'No Comment with such id existing'});
        }else{
          ForumComments.destroy({id: req.param('id')}, req.body).exec(function(err, data){
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
   * `ForumController.getComment()`
   */
  getComment: function (req, res) {
    if(req.param('id')){
      ForumComments.findOne({id : req.param('id')}).exec(function (err, comment){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!topic){
          return res.json(204, {status: 'error', message: 'No Comment with such id existing'})
        }else{
          return res.json(200, comment);
        }
      });
    }else{
      ForumComments.find().exec(function (err, comments){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, comments);
      });
    }
  },
};

