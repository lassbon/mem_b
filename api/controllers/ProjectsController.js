/**
 * ProjectsController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine ProjectNotFoundError
 *
 * @apiError ProjectNotFound The Project was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Project with such id existing'
 *     }
 */

/** 
 * @apiDefine ProjectIdNotProvidedError
 *
 * @apiError ProjectIdNotProvided No Project id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Project id provided!"
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
     * `ProjectsController.create()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/projects Create a new project
     * @apiName CreateProject
     * @apiDescription This is where a new project is created.
     * @apiGroup Projects
     *
     * @apiParam {String} title Title of the project.
     * @apiParam {String} banner Cloud Url of Picture banner for the project.
     * @apiParam {String} description Full description of the project.
     * @apiParam {String} [date] Date/Duration of the project.
     * @apiParam {String} [venue] Venue of the project.
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
     * @apiError ProjectInfoNotComplete Post info not complete.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No { title | banner | description } provided!"
     *     }
     */
    create: function(req, res) {

        Projects.create(req.body).then(function(project, err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }
                // If project is created successfuly we return project id and title
                if (project) {

                    var who = jwToken.who(req.headers.authorization);
                    audit.log('project', who + ' created ' + project.title);

                    // NOTE: payload is { id: project.id}
                    res.json(200, {
                        status: 'success',
                        id: project.title
                    });
                }
            })
            .catch(function(err) {
                sails.log.error(err);
                return res.json(500, { err: err });
            });
    },

    /**
     * `ProjectsController.uploadBanner()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/projects/upload Upload a project banner
     * @apiName UploadBanner
     * @apiDescription This is where a project image banner is uploaded (Make sure image file extension is either jpg or png).
     * @apiGroup Project
     *
     * @apiParam {String} banner Banner image file to be uploaded.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "bannerUrl": "https://accicloud.blob.core.windows.net/project/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg"
     *     }
     *
     * @apiError ProjectImageNotUploaded No image uploaded.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No image uploaded!"
     *     }
     */
    uploadBanner: function(req, res) {
        if (req.method != 'POST') return res.notFound();

        var container = 'project';

        azureBlob.createContainerIfNotExists(container, function() {
            req.file('banner')
                .upload({
                    maxBytes: 5000000,
                    adapter: require('skipper-azure'),
                    key: process.env.AZURE_STORAGE_ACCOUNT,
                    secret: process.env.AZURE_STORAGE_ACCESS_KEY,
                    container: container
                }, function whenDone(err, uploadedFiles) {
                    if (err) {
                        sails.log.error(err);
                        return res.negotiate(err);
                    } else if (uploadedFiles.length === 0) {
                        return res.json(401, { status: 'error', err: 'No image uploaded!' });
                    } else return res.ok({
                        status: 'success',
                        bannerUrl: process.env.AZURE_STORAGE_ACCOUNT_URL + container + '/' + uploadedFiles[0].fd
                    });
                });
        });
    },


    /**
     * `ProjectsController.delete()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/projects/:id Delete a project
     * @apiName DeleteProject
     * @apiDescription This is where a project is deleted
     * @apiGroup Project
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
     *       "message": "Project with id 59dce9d56b54d91c38847825 has been deleted'"
     *     }
     *
     * @apiUse ProjectIdNotProvidedError
     * 
     * @apiUse ProjectNotFoundError
     */
    delete: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Project id provided!' });
        } else {
            Projects.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!project) {
                        return res.json(404, { status: 'error', err: 'No Project with such id existing' })
                    } else {
                        Projects.update({ id: req.param('id') }, { status: 'completed' }).exec(function(err) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            // if (project.banner) {
                            //     var url = project.banner;
                            //     azureBlob.delete('project', url.split('/').reverse()[0]);
                            // }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('project', who + ' deleted ' + project.title);

                            return res.json(200, { status: 'success', message: 'Project with id ' + req.param('id') + ' has been deleted' });
                        });
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },


    /**
     * `ProjectsController.update()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/projects Update a project
     * @apiName UpdateProject
     * @apiDescription This is where a project is updated.
     * @apiGroup Projects
     *
     * @apiParam {String} [title] Title of the project.
     * @apiParam {String} [banner] Cloud Url of Picture banner for the project.
     * @apiParam {String} [description] Full description of the project.
     * @apiParam {String} [date] Date/Duration of the project.
     * @apiParam {String} [venue] Venue of the project.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Project with id 59dce9d56b54d91c38847825 has been updated'"
     *     }
     * 
     *
     * @apiUse ProjectIdNotProvidedError
     * 
     * @apiUse ProjectNotFoundError
     */
    update: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Project id provided!' });
        } else {
            Projects.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!project) {
                        return res.json(404, { status: 'error', err: 'No Project with such id existing' })
                    } else {

                        if (project.banner && project.banner !== req.param('banner')) {
                            var url = project.banner;
                            azureBlob.delete('project', url.split('/').reverse()[0]);
                        }

                        Projects.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('project', who + ' edited ' + project.title);

                            return res.json(200, { status: 'success', message: 'Project with id ' + req.param('id') + ' has been updated' });
                        });
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.searchProjects()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/searchprojects/:id/:page/:limit Search for project(s)
     * @apiName SearchProject
     * @apiDescription This is where a project is searched.
     * @apiGroup Project
     *
     * @apiParam {String} searchTerm Search term to be searched.
     * @apiParam {String} [page] Current page of the search result.
     * @apiParam {String} [limit] Number of search items per page.
     *
     * @apiSuccess {String} page Current page of the search result.
     * @apiSuccess {String} limit  Number of search items per page.
     * @apiSuccess {String} result  Result of the search.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "page": "1",
     *       "limit": "10",
     *       "result": [{}]
     *     }
     *
     * @apiUse SearchTermNotProvidedError
     * 
     */
    searchProjects: function(req, res) {
        var page = 0;
        var limit = 10;

        if (req.param('page') && req.param('page') > 1) {
            page = req.param('page');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        if (!req.param('searchTerm')) {
            return res.json(401, { status: "error", err: 'No search term provided!' });
        } else {
            Projects.find({ title: { 'contains': req.param('searchTerm') } }).sort('createdAt DESC').paginate({ page: page, limit: limit }).then(function(projects, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, { page: page, limit: limit, result: projects });
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.getCompleted()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/projects/completed/:id Get project(s)
     * @apiName GetCompleted
     * @apiDescription This is where completed projects are retrieved.
     * @apiGroup Project
     *
     * @apiParam {Number} [id] Project id.
     *
     * @apiSuccess {String} project Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse ProjectNotFoundError
     */
    getCompleted: function(req, res) {
        if (req.param('id')) {
            Projects.findOne({ id: req.param('id'), status: 'ongoing' }).sort('createdAt DESC').then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!project) {
                        return res.json(404, { status: 'error', message: 'No Project with such id existing' })
                    } else {
                        return res.json(200, project);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            Projects.find({ status: 'completed' }).sort('createdAt DESC').then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, project);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.getOngoing()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/projects/ongoing/:id Get project(s)
     * @apiName GetOngoing
     * @apiDescription This is where ongoing projects are retrieved.
     * @apiGroup Project
     *
     * @apiParam {Number} [id] Project id.
     *
     * @apiSuccess {String} project Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse ProjectNotFoundError
     */
    getOngoing: function(req, res) {
        if (req.param('id')) {
            Projects.findOne({ id: req.param('id'), status: 'ongoing' }).sort('createdAt DESC').then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!project) {
                        return res.json(404, { status: 'error', message: 'No Project with such id existing' })
                    } else {
                        return res.json(200, project);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            Projects.find({ status: 'ongoing' }).sort('createdAt DESC').then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, project);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    getProjects: function(req, res) {
        if (req.param('id')) {
            Projects.findOne({ id: req.param('id') }).then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!project) {
                        return res.json(404, { status: 'error', message: 'No Project with such id existing' })
                    } else {
                        return res.json(200, project);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            Projects.find().sort('createdAt DESC').then(function(projects, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, projects);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.createComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/projects/comment Create a new comment
     * @apiName CreateComment
     * @apiDescription This is where a comment on project is created
     * @apiGroup Project
     *
     * @apiParam {String} comment The comment to be made on an project.
     * @apiParam {Number} owner User id of the commentor.
     * @apiParam {Number} project Project id of the project to be commented on.
     */
    createComment: function(req, res) {
        if (!req.param('project')) {
            return res.json(401, { status: 'error', err: 'No Project id provided!' });
        }

        if (!req.param('owner')) {
            return res.json(401, { status: 'error', err: 'No Owner id provided!' });
        }

        if (!req.param('comment')) {
            return res.json(401, { status: 'error', err: 'No Comment provided!' });
        }

        User.findOne({ select: ['companyName', 'membershipId'], where: { id: req.param('owner') } }).then(function(user, err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                req.body.companyName = user.companyName;

                ProjectComments.create(req.body).exec(function(err, comment) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (comment) {
                        res.json(200, comment);
                    }
                });
            })
            .catch(function(err) {
                sails.log.error(err);
                return res.json(500, { err: err });
            });
    },

    /**
     * `ProjectsController.updateComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/projects/comment Update a comment
     * @apiName UpdateComment
     * @apiDescription This is where a comment on project is updated.
     * @apiGroup Project
     *
     * @apiParam {Number} id Comment ID.
     * @apiParam {String} comment The comment to be made on a post.
     */
    updateComment: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Comment id provided!' });
        } else {
            ProjectComments.findOne({ select: 'comment', where: { id: req.param('id') } }).then(function(comment, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!comment) {
                        return res.json(404, { status: 'error', err: 'No Comment with such id existing' });
                    } else {
                        ProjectComments.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            return res.json(200, { status: 'success', message: 'Comment with id ' + req.param('id') + ' has been updated' });
                        });
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.deleteComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/projects/comment/:id Delete a comment
     * @apiName DeleteComment
     * @apiDescription This is where a comment on project is deleted.
     * @apiGroup Project
     *
     * @apiParam {Number} id Comment ID.
     */
    deleteComment: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Comment id provided!' });
        } else {
            ProjectComments.findOne({ select: 'comment', where: { id: req.param('id') } }).then(function(comment, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!comment) {
                        return res.json(404, { status: 'error', err: 'No Comment with such id existing' });
                    } else {
                        ProjectComments.destroy({ id: req.param('id') }, req.body).exec(function(err, data) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            return res.json(200, { status: 'success', message: 'Comment with id ' + req.param('id') + ' has been deleted' });
                        });
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.getComment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/projects/comment/:id Get comment(s)
     * @apiName GetComment
     * @apiDescription This is where a comment on a project is retrieved.
     * @apiGroup Project
     *
     * @apiParam {Number} id Comment ID.
     */
    getComment: function(req, res) {
        if (req.param('id')) {
            ProjectComments.findOne({ id: req.param('id') }).sort('createdAt DESC').then(function(comment, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!comment) {
                        return res.json(204, { status: 'error', err: 'No Comment with such id existing' })
                    } else {
                        return res.json(200, comment);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            ProjectComments.find().sort('createdAt DESC').then(function(posts, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, posts);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.likeEvent()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/event/like Like an event
     * @apiName LikeEvent
     * @apiDescription This is where an event is liked
     * @apiGroup Project
     *
     * @apiParam {String} id Project ID.
     * @apiParam {String} liker User id of the project liker.
     */
    likeEvent: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No project id provided!' });
        } else {
            Projects.findOne({ select: ['title', 'description'], where: { id: req.param('id') } }).then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!project) {
                        return res.json(404, { status: 'error', message: 'No project with such id existing' });
                    } else {

                        var likes = project.likes ? project.likes : [];

                        var stat = true;

                        for (var i = 0; i < likes.length; i++) {
                            var name = likes[i];
                            if (name == req.param('liker')) {
                                stat = false;
                                break;
                            }
                        }

                        if (stat == false) {
                            return res.json(403, { status: 'error', err: 'Project already liked' });
                        } else {
                            likes.push(req.param('liker'));

                            Projects.update({ id: req.param('id') }, { likes: likes }).exec(function(err, event) {
                                return res.json(200, { status: 'success', message: 'Project liked' });
                            });
                        }
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `ProjectsController.unlikePost()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/events/unlike Unlike an event
     * @apiName UnlikeEvent
     * @apiDescription This is where an event is unliked
     * @apiGroup Project
     *
     * @apiParam {String} id Project ID.
     * @apiParam {String} liker User id of the post liker.
     */
    unlikeEvent: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: "error", err: 'No project id provided!' });
        } else {
            Projects.findOne({ select: ['title', 'description'], where: { id: req.param('id') } }).then(function(project, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!project) {
                        return res.json(404, { status: 'error', err: 'No project with such id existing' });
                    } else {

                        var likes = project.likes ? project.likes : [];

                        var stat = false;

                        for (var i = 0; i < likes.length; i++) {
                            var name = likes[i];
                            if (name == req.param('liker')) {
                                stat = true;
                                break;
                            }
                        }

                        if (stat == false) {
                            return res.json(403, { status: 'error', err: 'Project not previously liked' });
                        } else {
                            for (var i = project.likes.length; i--;) {
                                if (project.likes[i] === req.param('liker')) {
                                    project.likes.splice(i, 1);
                                }
                            }

                            Projects.update({ id: req.param('id') }, { likes: project.likes }).exec(function(err, project) {
                                return res.json(200, { status: 'success', message: 'Post unliked' });
                            });
                        }
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },
};
