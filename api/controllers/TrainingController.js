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

        Training.create(req.body).exec(function(err, training) {
            if (err) {
                return res.json(err.status, { err: err });
            }
            // If training is created successfuly we return training id and title
            if (training) {
                // NOTE: payload is { id: training.id}
                res.json(200, {
                    status: 'success',
                    id: training.id
                });
            }
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
            Training.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).exec(function(err, training) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!training) {
                    return res.json(404, { status: 'error', message: 'No Training with such id existing' })
                } else {
                    Training.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            return res.json(err.status, { err: err });
                        }

                        if (training.banner) {
                            var url = training.banner;
                            azureBlob.delete('training', url.split('/').reverse()[0]);
                        }

                        return res.json(200, { status: 'success', message: 'Training with id ' + req.param('id') + ' has been deleted' });
                    });
                }
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
            Training.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).exec(function(err, training) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!training) {
                    return res.json(404, { status: 'error', message: 'No Training with such id existing' })
                } else {

                    if (training.banner && training.banner !== req.param('banner')) {
                        var url = training.banner;
                        azureBlob.delete('training', url.split('/').reverse()[0]);
                    }

                    Training.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Training with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },


    /**
     * `TrainingController.getTraining()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/training/:id Get training(s)
     * @apiName GetTraining
     * @apiDescription This is where trainings are retrieved.
     * @apiGroup Training
     *
     * @apiParam {Number} id Training id.
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
    getTraining: function(req, res) {
        if (req.param('id')) {
            Training.findOne({ id: req.param('id') }).exec(function(err, training) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!training) {
                    return res.json(404, { status: 'error', message: 'No Training with such id existing' })
                } else {
                    return res.json(200, training);
                }
            });
        } else {
            Training.find().exec(function(err, training) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                return res.json(200, training);
            });
        }
    },

    /**
     * `TrainingController.createPayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/training/payment Pay for a training
     * @apiName CreatePayment
     * @apiDescription This is where a training payment is created.
     * @apiGroup Training
     *
     * @apiParam {String} amount Amount to be paid for training.
     * @apiParam {String} payer User id of the payer.
     * @apiParam {String} training Training id of the training beign paid for.
     * @apiParam {String} [status] State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "id": "59dce9d56b54d91c38847825"
     *     }
     * 
     *
     * @apiUse TrainingIdNotProvidedError
     * 
     * @apiUse TrainingNotFoundError
     * 
     * @apiUse PayerIdNotProvidedError
     * 
     * @apiUse AmountNotProvidedError
     */
    createPayment: function(req, res) {
        if (!req.param('payer')) {
            return res.json(401, { status: 'error', err: 'No Payer id provided!' });
        }

        if (!req.param('training')) {
            return res.json(401, { status: 'error', err: 'No Training id provided!' });
        }

        if (!req.param('amount')) {
            return res.json(401, { status: 'error', err: 'No Training fee provided!' });
        }

        TrainingPayment.create(req.body).exec(function(err, payment) {
            if (err) {
                return res.json(err.status, { err: err });
            }
            // If trainig is created successfuly we return payment id
            if (payment) {
                // NOTE: payload is { id: payment.id}
                res.json(200, {
                    status: 'success',
                    id: payment.id
                });
            }
        });
    },


    /**
     * `TrainingController.updatePayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/training/payment/:id Update a payment
     * @apiName UpdatePayment
     * @apiDescription This is where a payment is updated.
     * @apiGroup Training
     *
     * @apiParam {String} id Id of the payment.
     * @apiParam {String} status State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Payment with id 59dce9d56b54d91c38847825 has been updated'"
     *     }
     * 
     *
     * @apiUse PaymentIdNotProvidedError
     * 
     * @apiUse PaymentIdNotFoundError
     */
    updatePayment: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Payment id provided!' });
        } else {
            TrainingPayments.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, training) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!training) {
                    return res.json(404, { status: 'error', message: 'No Payment with such id existing' })
                } else {
                    TrainingPayments.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Payment with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },

    /**
     * `TrainingController.getPayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/training/:id Get payment(s)
     * @apiName GetPayment
     * @apiDescription This is where payments are retrieved.
     * @apiGroup Training
     *
     * @apiParam {Number} id Payment id.
     *
     * @apiSuccess {String} payment Payment response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse PaymentIdNotFoundError
     */
    getPayment: function(req, res) {
        if (req.param('id')) {
            TrainingPayments.findOne({ id: req.param('id') }).exec(function(err, payment) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!payment) {
                    return res.json(404, { status: 'error', message: 'No Trainig with such id existing' })
                } else {
                    return res.json(200, payment);
                }
            });
        } else {
            TrainingPayments.find().exec(function(err, payments) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                return res.json(200, payments);
            });
        }
    }

    //TODO: Build in an API function to deletepayments if needed.
};