var json2xls = require('json2xls');
var fs = require('fs');

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
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }
            // If donation is created successfuly we return donation id and title
            if (donation) {

                var who = jwToken.who(req.headers.authorization);
                audit.log('donation', who + ' created "' + donation.title + '" donation');

                // NOTE: payload is { id: donation.id}
                res.json(200, {
                    status: 'success',
                    id: donation.id
                });
            }
        });
    },

    /**
     * `DonationController.uploadBanner()`
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
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!donation) {
                    return res.json(404, { status: 'error', message: 'No Donation with such id existing' })
                } else {
                    Donation.update({ id: req.param('id') }, {status: 'completed'}).exec(function(err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        // if (donation.banner) {
                        //     var url = donation.banner;
                        //     azureBlob.delete('donation', url.split('/').reverse()[0]);
                        // }

                        var who = jwToken.who(req.headers.authorization);
                        audit.log('donation', who + ' deleted '+ donation.title + ' donation' );

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
                    sails.log.error(err);
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
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        var who = jwToken.who(req.headers.authorization);
                        audit.log('donation', who + ' updated '+ donation.username );

                        return res.json(200, { status: 'success', message: 'Donation with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },

    /**
     * `DonationController.searchDonation()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/searchdonations/:id/:page/:limit Search for donation(s)
     * @apiName SearchDonation
     * @apiDescription This is where a donation is searched.
     * @apiGroup Donation
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
    searchDonations: function(req, res) {
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
            Donation.find({ title: { 'contains': req.param('searchTerm') } }).paginate({ page: page, limit: limit }).exec(function(err, donations) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, { page: page, limit: limit, result: donations });
            });
        }
    },

    /**
     * `DonationController.getCompleted()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/donation/completed/:id Get donation(s)
     * @apiName GetCompleted
     * @apiDescription This is where completed donation are retrieved.
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
    getCompleted: function(req, res) {
        if (req.param('id')) {
            Donation.findOne({ id: req.param('id'), status: 'ongoing' }).exec(function(err, donation) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!donation) {
                    return res.json(404, { status: 'error', message: 'No donation with such id existing' })
                } else {
                    return res.json(200, donation);
                }
            });
        } else {
            Donation.find({status: 'completed' }).exec(function(err, donation) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, donation);
            });
        }
    },

    /**
     * `DonationController.getOngoing()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/donation/ongoing/:id Get donation(s)
     * @apiName GetOngoing
     * @apiDescription This is where ongoing donation are retrieved.
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
    getOngoing: function(req, res) {
        if (req.param('id')) {
            Donation.findOne({ id: req.param('id'), status: 'ongoing' }).exec(function(err, donation) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!donation.id) {
                    return res.json(404, { status: 'error', message: 'No donation.id with such id existing' })
                } else {
                    return res.json(200, donation);
                }
            });
        } else {
            Donation.find({status: 'ongoing' }).exec(function(err, donation) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, donation);
            });
        }
    },

    /**
     * `DonationController.myDonations()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/mydonations/:id Get donation(s)
     * @apiName GetDonation
     * @apiDescription This is where a users donations are retrieved.
     * @apiGroup Donation
     *
     * @apiParam {Number} id User id.
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
     * @apiUse UserIdNotProvidedError
     */
    myDonations: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No user id provided!' });
        }

        DonationPayments.find({donator: req.param('id')}).exec(function(err, donations) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            return res.json(200, donations);
        });
    }
};
