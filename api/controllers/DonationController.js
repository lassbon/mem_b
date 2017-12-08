/**
 * DonationController
 *
 * @description :: Server-side logic for managing donation
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine DonationNotFoundError
 *
 * @apiError DonationNotFound The Donation was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Donation with such id existing'
 *     }
 */

/** 
 * @apiDefine DonationIdNotProvidedError
 *
 * @apiError DonationIdNotProvided No Donation id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Donation id provided!"
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
 * @apiDefine PaymentIdNotFoundError
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
 * @apiDefine PaymentIdNotProvidedError
 *
 * @apiError PaymentIdNotProvided No Payment id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Payment id provided!"
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
     * `TrainingController.createDonation()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/donation Create a new donation
     * @apiName CreateDonation
     * @apiDescription This is where a new donation is created.
     * @apiGroup Donation
     *
     * @apiParam {String} title Title of the donation.
     * @apiParam {String} banner Cloud Url of Picture banner for the donation.
     * @apiParam {String} description Full description of the donation.
     * @apiParam {String} minAmount Minimum amount acceptable as donation.
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
     * @apiError DonationInfoNotComplete Donation info not complete.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No { title | banner | description | minAmount} provided!"
     *     }
     */
    createDonation: function(req, res) {

        Donation.create(req.body).exec(function(err, donation) {
            if (err) {
                return res.json(err.status, { err: err });
            }
            // If donation is created successfuly we return donation id and title
            if (donation) {
                // NOTE: payload is { id: donation.id}
                res.json(200, {
                    status: 'success',
                    id: donation.id
                });
            }
        });
    },

    /**
     * `TrainingController.uploadBanner()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/donation/upload Upload a donation banner
     * @apiName UploadBanner
     * @apiDescription This is where a donation image banner is uploaded (Make sure image file extension is either jpg or png).
     * @apiGroup Donation
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
     *       "bannerUrl": "https://accicloud.blob.core.windows.net/donation/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg"
     *     }
     *
     * @apiError BannerImageNotUploaded No image uploaded.
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

        var container = 'donation';

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
     * `DonationController.deleteDonation()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/donation/:id Delete a donation
     * @apiName DeleteDonation
     * @apiDescription This is where a donation is deleted
     * @apiGroup Donation
     *
     * @apiParam {Number} id Donation Id.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Donation with id 59dce9d56b54d91c38847825 has been deleted'"
     *     }
     *
     * @apiUse DonationIdNotProvidedError
     * 
     * @apiUse DonationNotFoundError
     */
    deleteDonation: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Donation id provided!' });
        } else {
            Donation.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).exec(function(err, donation) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!donation) {
                    return res.json(404, { status: 'error', message: 'No Donation with such id existing' })
                } else {
                    Donation.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            return res.json(err.status, { err: err });
                        }

                        if (donation.banner) {
                            var url = donation.banner;
                            azureBlob.delete('donation', url.split('/').reverse()[0]);
                        }

                        return res.json(200, { status: 'success', message: 'Donation with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },


    /**
     * `DonationController.updateDonation()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/donation/:id Update a donation
     * @apiName UpdateDonation
     * @apiDescription This is where a donation is updated.
     * @apiGroup Donation
     *
     * @apiParam {String} [title] Title of the donation.
     * @apiParam {String} [banner] Cloud Url of Picture banner for the donation.
     * @apiParam {String} [description] Full description of the donation.
     * @apiParam {String} [minAmount] Minimum amount acceptable as donation.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Donation with id 59dce9d56b54d91c38847825 has been updated"
     *     }
     * 
     *
     * @apiUse DonationIdNotProvidedError
     * 
     * @apiUse DonationNotFoundError
     */
    updateDonation: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Donation id provided!' });
        } else {
            Donation.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).exec(function(err, donation) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!donation) {
                    return res.json(404, { status: 'error', message: 'No Donation with such id existing' })
                } else {

                    if (donation.banner && donation.banner !== req.param('banner')) {
                        var url = donation.banner;
                        azureBlob.delete('donation', url.split('/').reverse()[0]);
                    }
                    Donation.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Donation with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },


    /**
     * `DonationController.getDonation()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/donation/:id Get donation(s)
     * @apiName GetDonation
     * @apiDescription This is where donations are retrieved.
     * @apiGroup Donation
     *
     * @apiParam {Number} [id] Donation id.
     *
     * @apiSuccess {String} donation Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse DonationNotFoundError
     */
    getDonation: function(req, res) {
        if (req.param('id')) {
            Donation.findOne({ id: req.param('id') }).exec(function(err, donation) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!donation) {
                    return res.json(404, { status: 'error', message: 'No Donation with such id existing' })
                } else {
                    return res.json(200, donation);
                }
            });
        } else {
            Donation.find().exec(function(err, donations) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                return res.json(200, donations);
            });
        }
    },

    /**
     * `DonationController.createPayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/donation/payment Pay for a donation
     * @apiName CreatePayment
     * @apiDescription This is where a donation payment is created.
     * @apiGroup Donation
     *
     * @apiParam {String} amount Amount to be paid for donation.
     * @apiParam {String} donator User id of the donator.
     * @apiParam {String} donation donation id of the donation beign paid for.
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
     * @apiUse DonationIdNotProvidedError
     * 
     * @apiUse DonationNotFoundError
     * 
     * @apiUse PayerIdNotProvidedError
     * 
     * @apiUse AmountNotProvidedError
     */
    createPayment: function(req, res) {
        if (!req.param('donator')) {
            return res.json(401, { status: 'error', err: 'No donator id provided!' });
        }

        if (!req.param('donation')) {
            return res.json(401, { status: 'error', err: 'No donation id provided!' });
        }

        if (!req.param('amount')) {
            return res.json(401, { status: 'error', err: 'No donation amount provided!' });
        }

        DonationPayment.create(req.body).exec(function(err, donation) {
            if (err) {
                return res.json(err.status, { err: err });
            }
            // If donation is successful, we return donation id
            if (donation) {
                // NOTE: payload is { id: donation.id}
                res.json(200, {
                    status: 'success',
                    id: donation.id
                });
            }
        });
    },

    /**
     * `DonationController.updatePayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/donation/payment/:id Update a donation payment
     * @apiName UpdatePayment
     * @apiDescription This is where a donation payment is updated.
     * @apiGroup Donation
     *
     * @apiParam {String} id Id of the donation payment.
     * @apiParam {String} status State/status of the donation payment. Must be any of 'pending', 'approved', 'denied'.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Donation payment with id 59dce9d56b54d91c38847825 has been updated"
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
            DonationPayments.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, payment) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!payment) {
                    return res.json(404, { status: 'error', message: 'No Payment with such id existing' })
                } else {
                    DonationPayments.update({ id: req.param('id') }, req.body).exec(function(err, data) {
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
     * `DonationController.getPayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/donation/:id Get payment(s)
     * @apiName GetPayment
     * @apiDescription This is where donation payments are retrieved.
     * @apiGroup Donation
     *
     * @apiParam {Number} [id] Payment id.
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
            DonationPayments.findOne({ id: req.param('id') }).exec(function(err, payment) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                if (!payment) {
                    return res.json(404, { status: 'error', message: 'No payment with such id existing' })
                } else {
                    return res.json(200, payment);
                }
            });
        } else {
            DonationPayments.find().exec(function(err, payments) {
                if (err) {
                    return res.json(err.status, { err: err });
                }

                return res.json(200, payments);
            });
        }
    }

    //TODO: Build in an API function to deletepayments if needed.
};