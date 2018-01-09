/**
 * ForumController
 *
 * @description :: Server-side logic for managing forums
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/** 
 * @apiDefine TopicIdNotProvidedError
 *
 * @apiError TopicIdNotProvided No Topic id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Topic id provided!"
 *     }
 */

/**
 * @apiDefine TopicNotFoundError
 *
 * @apiError TopicNotFound The id of the Topic was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Topic with such id existing'
 *     }
 */

/** 
 * @apiDefine PostIdNotProvidedError
 *
 * @apiError PostIdNotProvided No Post id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Post id provided!"
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
 * @apiDefine CommentIdNotProvidedError
 *
 * @apiError CommentIdNotProvided No Comment id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Comment id provided!"
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

module.exports = {



    /**
     * `ForumController.createTopic()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/forum/topic Create a new forum topic
     * @apiName CreateTopic
     * @apiDescription This is where a new forum topic is created.
     * @apiGroup Forum
     *
     * @apiParam {String} title Title of the forum topic.
     * @apiParam {String} description Full description of the topic.
     * @apiParam {Number} creator User ID of the topic creator.
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
     * @apiError TopicOwnerIdNotProvided No forum topic owner id provided.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No Creator/Owner user id provided!"
     *     }
     * 
     */
    createTopic: function(req, res) {
        if (!req.param('creator')) {
            return res.json(401, { status: "error", err: 'No creator id provided!' });
        } else {
            ForumTopics.create(req.body).exec(function(err, topic) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (topic) {
                    res.json(200, {
                        status: "success",
                        id: topic.id
                    });
                }
            });
        }
    },


    /**
     * `ForumController.updateTopic()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/forum/topic/:id Update a forum topic
     * @apiName UpdateTopic
     * @apiDescription This is where a forum topic is updated.
     * @apiGroup Forum
     *
     * @apiParam {Number} id topic Id.
     * @apiParam {String} [title] Title of the forum topic.
     * @apiParam {String} [description] Full description of the topic.
     * @apiParam {Number} [creator] User ID of the topic creator.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Topic with id 59dce9d56b54d91c38847825 has been updated'"
     *     }
     *
     * @apiUse TopicIdNotProvidedError
     * 
     * @apiUse TopicNotFoundError
     */
    updateTopic: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Topic id provided!' });
        } else {
            ForumTopics.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, topic) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!topic) {
                    return res.json(404, { status: 'error', err: 'No Topic with such id existing' });
                } else {
                    ForumTopics.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Topic with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },


    /**
     * `ForumController.deleteTopic()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/forum/topic/:id Delete a forum topic
     * @apiName DeleteTopic
     * @apiDescription This is where a forum topic is deleted
     * @apiGroup Forum
     *
     * @apiParam {Number} id Topic Id.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Topic with id 59dce9d56b54d91c38847825 has been deleted'"
     *     }
     *
     * @apiUse TopicIdNotProvidedError
     * 
     * @apiUse TopicNotFoundError
     */
    deleteTopic: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Topic id provided!' });
        } else {
            ForumTopics.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, topic) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!topic) {
                    return res.json(404, { status: 'error', err: 'No Topic with such id existing' });
                } else {
                    ForumTopics.destroy({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Topic with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },


    /**
     * `ForumController.getTopic()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/forum/topic/:id Get topic(s)
     * @apiName GetTopic(s)
     * @apiDescription This is where forum topic(s) is retrieved
     * @apiGroup Forum
     *
     * @apiParam {Number} [id] Topic Id.
     *
     * @apiSuccess {String} topic Topic response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       "........": ".................."
     *     }
     * 
     * @apiUse TopicNotFoundError
     */
    getTopic: function(req, res) {
        if (req.param('id')) {
            ForumTopics.findOne({ id: req.param('id') }).populate('posts').exec(function(err, topic) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!topic) {
                    return res.json(404, { status: 'error', err: 'No Topic with such id existing' })
                } else {
                    return res.json(200, topic);
                }
            });
        } else {
            ForumTopics.find().populate('posts').exec(function(err, topics) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, topics);
            });
        }
    },


    /**
     * `ForumController.createPost()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/forum/post Create a new forum post
     * @apiName CreatePost
     * @apiDescription This is where a new forum post is created.
     * @apiGroup Forum
     *
     * @apiParam {String} title Title of the forum post.
     * @apiParam {String} content the content of the post.
     * @apiParam {String} creator User id of the post creator.
     * @apiParam {String} topic Id of forum topic to which the post  will belong.
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
     * @apiError PostOwnerIdNotProvided No post creator user id provided.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No Creator/Owner user id provided!"
     *     }
     */
    createPost: function(req, res) {
        if (!req.param('creator')) {
            return res.json(401, { status: "error", err: 'No Creator id provided!' });
        } else {
            ForumPosts.create(req.body).exec(function(err, post) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (post) {
                    res.json(200, {
                        status: "success",
                        id: post.id
                    });
                }
            });
        }
    },


    /**
     * `ForumController.updatePost()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/forum/post/:id Update a forum post
     * @apiName UpdatePost
     * @apiDescription This is where a forum post is updated.
     * @apiGroup Forum
     *
     * @apiParam {Number} id topic Id.
     * @apiParam {String} [title] Title of the forum post.
     * @apiParam {String} [content] the content of the post.
     * @apiParam {String} [topic] Id of forum topic to which the post  will belong.
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
    updatePost: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: "error", err: 'No Post id provided!' });
        } else {
            ForumPosts.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, post) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!post) {
                    return res.json(404, { status: 'error', err: 'No Post with such id existing' });
                } else {
                    ForumPosts.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Post with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },


    /**
     * `ForumController.deletePost()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/forum/post/:id Delete a forum post
     * @apiName DeletePost
     * @apiDescription This is where a forum post is deleted
     * @apiGroup Forum
     *
     * @apiParam {Number} id Post Id.
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
    deletePost: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Post id provided!' });
        } else {
            ForumPosts.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, post) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!post) {
                    return res.json(404, { status: 'error', err: 'No Post with such id existing' });
                } else {
                    ForumPosts.destroy({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Post with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },


    /**
     * `ForumController.getPost()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/forum/post/:id Get post(s)
     * @apiName GetPost(s)
     * @apiDescription This is where forum post(s) is retrieved
     * @apiGroup Forum
     *
     * @apiParam {Number} [id] Post Id.
     *
     * @apiSuccess {String} post Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       "........": ".................."
     *     }
     * 
     * @apiUse PostNotFoundError
     */
    getPost: function(req, res) {
        if (req.param('id')) {
            ForumPosts.findOne({ id: req.param('id') }).populate('comments').exec(function(err, post) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!post) {
                    return res.json(404, { status: 'error', err: 'No Post with such id existing' })
                } else {
                    return res.json(200, post);
                }
            });
        } else {
            ForumPosts.find().populate('comments').exec(function(err, posts) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, posts);
            });
        }
    },

    /**
     * `ForumController.createComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/forum/comment Create a new forum comment
     * @apiName CreateComment
     * @apiDescription This is where a new forum comment is created.
     * @apiGroup Forum
     *
     * @apiParam {String} comment the content of the comment.
     * @apiParam {Number} owner the user id of the commentor.
     * @apiParam {Number} post the forum post to comment on.
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
     * @apiError CommenttOwnerIdNotProvided No comment creator user id provided.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No Creator/Owner user id provided!"
     *     }
     * 
     * @apiUse PostIdNotProvidedError
     */
    createComment: function(req, res) {
        if (!req.param('owner')) {
            return res.json(401, { status: 'error', err: 'No Creator id provided!' });
        }

        if (!req.param('post')) {
            return res.json(401, { status: 'error', err: 'No Post id provided!' });
        }

        ForumComments.create(req.body).exec(function(err, comment) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            if (comment) {
                res.json(200, {
                    status: 'success',
                    id: comment.id
                });
            }
        });
    },

    /**
     * `ForumController.updateComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/forum/comment/:id Update a forum comment
     * @apiName UpdateComment
     * @apiDescription This is where a forum comment is updated.
     * @apiGroup Forum
     *
     * @apiParam {Number} id topic Id.
     * @apiParam {String} [comment] the content of the comment.
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
    updateComment: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Comment id provided!' });
        } else {
            ForumComments.findOne({ select: 'comment', where: { id: req.param('id') } }).exec(function(err, comment) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!comment) {
                    return res.json(404, { status: 'error', err: 'No Comment with such id existing' });
                } else {
                    ForumComments.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Comment with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },

    /**
     * `ForumController.deleteComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/forum/comment/:id Delete a forum comment
     * @apiName DeleteComment
     * @apiDescription This is where a forum comment is deleted
     * @apiGroup Forum
     *
     * @apiParam {Number} id Comment Id.
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
    deleteComment: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Comment id provided!' });
        } else {
            ForumComments.findOne({ select: 'comment', where: { id: req.param('id') } }).exec(function(err, comment) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!comment) {
                    return res.json(404, { status: 'error', err: 'No Comment with such id existing' });
                } else {
                    ForumComments.destroy({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Comment with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },

    /**
     * `ForumController.getComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/forum/comment/:id Get comment(s)
     * @apiName GetComment(s)
     * @apiDescription This is where forum comment(s) is retrieved
     * @apiGroup Forum
     *
     * @apiParam {Number} [id] Comment Id.
     *
     * @apiSuccess {String} comment Comment response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       "........": ".................."
     *     }
     * 
     * @apiUse CommentNotFoundError
     */
    getComment: function(req, res) {
        if (req.param('id')) {
            ForumComments.findOne({ id: req.param('id') }).exec(function(err, comment) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!comment) {
                    return res.json(204, { status: 'error', err: 'No Comment with such id existing' })
                } else {
                    return res.json(200, comment);
                }
            });
        } else {
            ForumComments.find().exec(function(err, comments) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, comments);
            });
        }
    },

    /**
     * `ForumController.getCount()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/forumcount Get forum counts
     * @apiName GetCount
     * @apiDescription This is where forum counts are obtained.
     * @apiGroup Forum
     */
    getCount: function(req, res) {

        var forumCounts = {};

        ForumTopics.count().exec(function(err, topics) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            forumCounts.topics = topics;

            ForumPosts.count().exec(function(err, posts) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                forumCounts.posts = posts;

                ForumComments.count().exec(function(err, comments) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    forumCounts.comments = comments;

                    return res.json(200, forumCounts);
                });
            });
        });
    },
};
