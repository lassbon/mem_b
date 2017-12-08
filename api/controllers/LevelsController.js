var paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);

/**
 * LevelsController
 *
 * @description :: Server-side logic for managing levels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine LevelNotFoundError
 *
 * @apiError LevelNotFound The Level was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Level with such id existing'
 *     }
 */

/** 
 * @apiDefine LevelIdNotProvidedError
 *
 * @apiError LevelIdNotProvided No Level id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Level id provided!"
 *     }
 */

module.exports = {



    /**
     * `LevelsController.create()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/projects/post Create a new project
     * @apiName CreateProject
     * @apiDescription This is where a new project is created.
     * @apiGroup Projects
     *
     * @apiParam {String} name Name of the membership level.
     * @apiParam {String} fee Fee for the memebership level.
     * @apiParam {String} description Full description of the membership level.
     *
     * @apiSuccess {String} levels Level name and id returned from the API.
     *
     * @apiSuccessExample Success-Response: 
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9c16b54d91c38847825",
     *       "....": "......................"
     *     }
     *
     * @apiError LevelsInfoNotComplete Post info not complete.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No { name | fee | description } provided!"
     *     }
     */
    create: function(req, res) {

        Levels.create(req.body).exec(function(err, level) {
            if (err) {
                return res.json(err.status, { status: 'error', err: err });
            }

            if (level) {
                paystack.plan.create({
                        name: req.body.name,
                        amount: req.body.fee,
                        interval: 'annually'
                    })
                    .then(function(body) {
                        Levels.update({ id: level.id }, { paystack: body }).exec(function(err, data) {
                            if (err) {
                                return res.json(err.status, { status: 'error', err: err });
                            }

                            res.json(200, {
                                status: 'success',
                                id: level.id
                            });
                        });
                    })
                    .catch(function(error) {
                        if (error) {
                            return res.json(401, { status: 'error', err: error });
                        }
                    });
            }
        });
    },


    /**
     * `LevelsController.delete()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/levels/:id Delete a level
     * @apiName DeleteLevel
     * @apiDescription This is where a level is deleted
     * @apiGroup Levels
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
     *       "message": "Level with id 59dce9d56b54d91c38847825 has been deleted'"
     *     }
     *
     * @apiUse LevelIdNotProvidedError
     * 
     * @apiUse LevelNotFoundError
     */
    delete: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Level id provided!' });
        } else {
            Levels.findOne({ select: 'name', where: { id: req.param('id') } }).exec(function(err, level) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!level) {
                    return res.json(404, { status: 'error', err: 'No Level with such id existing' })
                } else {
                    Levels.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Level with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },


    /**
     * `LevelsController.update()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/levels Create a new level
     * @apiName CreateLevel
     * @apiDescription This is where a new level is created.
     * @apiGroup Levels
     *
     * @apiParam {String} [name] Name of the membership level.
     * @apiParam {String} [fee] Fee for the memebership level.
     * @apiParam {String} [description] Full description of the membership level.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Level with id 59dce9d56b54d91c38847825 has been updated'"
     *     }
     *
     * @apiUse LevelIdNotProvidedError
     * 
     * @apiUse LevelNotFoundError
     */
    update: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Level id provided!' });
        } else {
            Levels.findOne({ select: 'name', where: { id: req.param('id') } }).exec(function(err, level) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!level) {
                    return res.json(404, { status: 'error', message: 'No Level with such id existing' })
                } else {
                    Levels.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            return res.json(err.status, { err: err });
                        }

                        paystack.plan.update({
                                name: req.body.name,
                                amount: req.body.fee,
                                interval: 'annually'
                            })
                            .then(function(body) {
                                Levels.update({ id: req.param('id') }, { "paystack.data.name": req.body.name, "paystack.data.amount": req.body.fee }).exec(function(err, data) {
                                    if (err) {
                                        return res.json(err.status, { status: 'error', err: err });
                                    }

                                    return res.json(200, { status: 'success', message: 'Level with id ' + req.param('id') + ' has been updated' });
                                });
                            })
                            .catch(function(error) {
                                if (error) {
                                    return res.json(401, { status: 'error', err: error });
                                }
                            });
                    });
                }
            });
        }
    },


    /**
     * `LevelsController.get()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/levels/:id Get project(s)
     * @apiName GetLevel
     * @apiDescription This is where levels are retrieved.
     * @apiGroup Levels
     *
     * @apiParam {Number} [id] Level id.
     *
     * @apiSuccess {String} level Level response from API.
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
    get: function(req, res) {
        if (req.param('id')) {
            Levels.findOne({ id: req.param('id') }).exec(function(err, level) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!level) {
                    return res.json(404, { status: 'error', message: 'No Level with such id existing' })
                } else {
                    return res.json(200, level);
                }
            });
        } else {
            Levels.find().exec(function(err, level) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                return res.json(200, level);
            });
        }
    }
};