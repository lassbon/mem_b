/**
 * TrainingController
 *
 * @description :: Server-side logic for managing training
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine TrainingNotFoundError
 *
 * @apiError TrainingNotFound The Training was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Training with such id existing'
 *     }
 */

/** 
 * @apiDefine TrainingIdNotProvidedError
 *
 * @apiError TrainingIdNotProvided No Training id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Training id provided!"
 *     }
 */

/** 
 * @apiDefine PayerIdNotProvidedError
 *
 * @apiError PayerIdNotProvided No Payer id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Payer id provided!"
 *     }
 */

/**
 * @apiDefine PaymentNotFoundError
 *
 * @apiError PaymentNotFound The Payment was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Payment with such id existing'
 *     }
 */

/** 
 * @apiDefine AmountNotProvidedError
 *
 * @apiError AmountNotProvided No Amount provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Amount provided!"
 *     }
 */

/** 
 * @apiDefine UserIdNotProvidedError
 *
 * @apiError UserIdNotProvided No User id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No User id provided!"
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
     * `TrainingController.createTraining()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/training Create a new training
     * @apiName CreateTraining
     * @apiDescription This is where a new training is created.
     * @apiGroup Training
     *
     * @apiParam {String} title Title of the training.
     * @apiParam {String} banner Cloud Url of Picture banner for the training.
     * @apiParam {String} description Full description of the training.
     * @apiParam {String} [date] Date/Duration of the training.
     * @apiParam {String} [venue] Venue of the training.
     * @apiParam {String} fee Fee for the training.
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
     * @apiError TrainingInfoNotComplete Training info not complete.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No { title | banner | description | fee} provided!"
     *     }
     */
    createTraining: function(req, res) {

        Training.create(req.body).then(function(training, err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }
                // If training is created successfuly we return training id and title
                if (training) {

                    var who = jwToken.who(req.headers.authorization);
                    audit.log('training', who + ' created ' + training.title);

                    // NOTE: payload is { id: training.id}
                    res.json(200, {
                        status: 'success',
                        id: training.id
                    });
                }
            })
            .catch(function(err) {
                sails.log.error(err);
                return res.json(500, { err: err });
            });
    },

    /**
     * `TrainingController.uploadBanner()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/training/upload Upload a training banner
     * @apiName UploadBanner
     * @apiDescription This is where a training image banner is uploaded (Make sure image file extension is either jpg or png).
     * @apiGroup Training
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
     *       "bannerUrl": "https://accicloud.blob.core.windows.net/training/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg"
     *     }
     *
     * @apiError TrainingImageNotUploaded No image uploaded.
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

        var container = 'training';

        azureBlob.createContainerIfNotExists(container, function() {
            req.file('banner')
                .upload({
                    maxBytes: 5000000,
                    adapter: require('skipper-azure'),
                    key: process.env.AZURE_STORAGE_ACCOUNT,
                    secret: process.env.AZURE_STORAGE_ACCESS_KEY,
                    container: container
                }, function whenDone(err, uploadedFiles) {
                    if (err) return res.negotiate(err);
                    else if (uploadedFiles.length === 0) {
                        return res.json(401, { status: 'error', err: 'No image uploaded!' });
                    } else return res.ok({
                        status: 'success',
                        bannerUrl: process.env.AZURE_STORAGE_ACCOUNT_URL + container + '/' + uploadedFiles[0].fd
                    });
                });
        });
    },


    /**
     * `TrainingController.deleteTraining()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/training/:id Delete a training
     * @apiName DeleteTraining
     * @apiDescription This is where a training is deleted
     * @apiGroup Training
     *
     * @apiParam {Number} id Training Id.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Training with id 59dce9d56b54d91c38847825 has been deleted'"
     *     }
     *
     * @apiUse TrainingIdNotProvidedError
     * 
     * @apiUse TrainingNotFoundError
     */
    deleteTraining: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Training id provided!' });
        } else {
            Training.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).then(function(training, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!training) {
                        return res.json(404, { status: 'error', err: 'No Training with such id existing' })
                    } else {
                        Training.update({ id: req.param('id') }, { status: 'completed' }).exec(function(err) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            // if (training.banner) {
                            //     var url = training.banner;
                            //     azureBlob.delete('training', url.split('/').reverse()[0]);
                            // }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('training', who + ' deleted ' + training.title);

                            return res.json(200, { status: 'success', message: 'Training with id ' + req.param('id') + ' has been deleted' });
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
     * `TrainingController.updateTraining()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/training/:id Update a training
     * @apiName UpdateTraining
     * @apiDescription This is where a training is updated.
     * @apiGroup Training
     *
     * @apiParam {String} [title] Title of the training.
     * @apiParam {String} [banner] Cloud Url of Picture banner for the training.
     * @apiParam {String} [description] Full description of the training.
     * @apiParam {String} [date] Date/Duration of the training.
     * @apiParam {String} [venue] Venue of the training.
     * @apiParam {String} [fee] Fee for the training.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Training with id 59dce9d56b54d91c38847825 has been updated'"
     *     }
     * 
     *
     * @apiUse TrainingIdNotProvidedError
     * 
     * @apiUse TrainingNotFoundError
     */
    updateTraining: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Training id provided!' });
        } else {
            Training.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).then(function(training, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!training) {
                        return res.json(404, { status: 'error', err: 'No Training with such id existing' })
                    } else {

                        if (training.banner && training.banner !== req.param('banner')) {
                            var url = training.banner;
                            azureBlob.delete('training', url.split('/').reverse()[0]);
                        }

                        Training.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('training', who + ' edited ' + training.title);

                            return res.json(200, { status: 'success', message: 'Training with id ' + req.param('id') + ' has been updated' });
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
     * `TrainingController.searchTrainings()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/searchtrainings/:id/:page/:limit Search for training(s)
     * @apiName SearchTraining
     * @apiDescription This is where a training is searched.
     * @apiGroup Training
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
    searchTrainings: function(req, res) {
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
            Training.find({ title: { 'contains': req.param('searchTerm') } }).sort('createdAt DESC').paginate({ page: page, limit: limit }).then(function(trainings, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, { page: page, limit: limit, result: trainings });
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `TrainingController.getCompleted()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/training/completed/:id Get training(s)
     * @apiName GetCompleted
     * @apiDescription This is where completed training are retrieved.
     * @apiGroup Training
     *
     * @apiParam {Number} [id] Training id.
     *
     * @apiSuccess {String} training Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse TrainingNotFoundError
     */
    getCompleted: function(req, res) {
        if (req.param('id')) {
            Training.findOne({ id: req.param('id'), status: 'ongoing' }).sort('createdAt DESC').then(function(training, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!training) {
                        return res.json(404, { status: 'error', message: 'No training with such id existing' })
                    } else {
                        return res.json(200, training);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            Training.find({ status: 'completed' }).sort('createdAt DESC').then(function(training, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, training);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `TrainingController.getOngoing()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/training/ongoing/:id Get training(s)
     * @apiName GetOngoing
     * @apiDescription This is where ongoing training are retrieved.
     * @apiGroup Training
     *
     * @apiParam {Number} [id] Training id.
     *
     * @apiSuccess {String} training Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse TrainingNotFoundError
     */
    getOngoing: function(req, res) {
        if (req.param('id')) {
            Training.findOne({ id: req.param('id'), status: 'ongoing' }).sort('createdAt DESC').then(function(training, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!training.id) {
                        return res.json(404, { status: 'error', message: 'No training with such id existing' })
                    } else {
                        return res.json(200, training);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            Training.find({ status: 'ongoing' }).sort('createdAt DESC').then(function(training, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, training);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `TrainingController.myTrainings()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/mytrainings/:id Get training(s)
     * @apiName GetTraining
     * @apiDescription This is where trainings are retrieved.
     * @apiGroup Training
     *
     * @apiParam {Number} id user id.
     *
     * @apiSuccess {String} training Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse UserIdNotProvidedError
     */
    myTrainings: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No user id provided!' });
        }

        TrainingPayments.find({ payer: req.param('id') }).sort('createdAt DESC').exec(function(trainings, err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, trainings);
            })
            .catch(function(err) {
                sails.log.error(err);
                return res.json(500, { err: err });
            });
    },

    getTrainings: function(req, res) {
        if (req.param('id')) {
            Training.findOne({ id: req.param('id') }).sort('createdAt DESC').then(function(training, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!training.id) {
                        return res.json(404, { status: 'error', message: 'No training with such id existing' })
                    } else {
                        return res.json(200, training);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            Training.find().sort('createdAt DESC').then(function(trainings, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, trainings);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    }
};
