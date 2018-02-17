/**
 * AdvertController
 *
 * @description :: Server-side logic for managing advert
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine AdvertNotFoundError
 *
 * @apiError AdvertNotFound The Advert was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Advert with such id existing'
 *     }
 */

/** 
 * @apiDefine AdvertIdNotProvidedError
 *
 * @apiError AdvertIdNotProvided No Advert id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Advert id provided!"
 *     }
 */

module.exports = {

    /**
     * `AdvertController.createAdvert()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/advert Create a new advert
     * @apiName CreateAdvert
     * @apiDescription This is where a new advert is created.
     * @apiGroup Advert
     *
     * @apiParam {String} title Title of the advert.
     * @apiParam {String} banner Cloud Url of Picture banner for the advert.
     * @apiParam {String} url URL of the advert.
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
     * @apiError AdvertInfoNotComplete Advert info not complete.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No { title | banner | url | fee} provided!"
     *     }
     */
    createAdvert: function(req, res) {

        Advert.create(req.body).then(function(advert, err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }
                // If advert is created successfuly we return advert id and title
                if (advert) {

                    var who = jwToken.who(req.headers.authorization);
                    audit.log('advert', who + ' created ' + advert.title);

                    // NOTE: payload is { id: advert.id}
                    res.json(200, {
                        status: 'success',
                        id: advert.id
                    });
                }
            })
            .catch(function(err) {
                sails.log.error(err);
                return res.json(500, { err: err });
            });
    },

    /**
     * `AdvertController.uploadBanner()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/advert/upload Upload a advert banner
     * @apiName UploadBanner
     * @apiDescription This is where a advert image banner is uploaded (Make sure image file extension is either jpg or png).
     * @apiGroup Advert
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
     *       "bannerUrl": "https://accicloud.blob.core.windows.net/advert/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg"
     *     }
     *
     * @apiError AdvertImageNotUploaded No image uploaded.
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

        var container = 'advert';

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
     * `AdvertController.deleteAdvert()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/advert/:id Delete a advert
     * @apiName DeleteAdvert
     * @apiDescription This is where an advert is deleted
     * @apiGroup Advert
     *
     * @apiParam {Number} id Advert Id.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Advert with id 59dce9d56b54d91c38847825 has been deleted'"
     *     }
     *
     * @apiUse AdvertIdNotProvidedError
     * 
     * @apiUse AdvertNotFoundError
     */
    deleteAdvert: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Advert id provided!' });
        } else {
            Advert.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).then(function(advert, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!advert) {
                        return res.json(404, { status: 'error', err: 'No Advert with such id existing' })
                    } else {
                        Advert.destroy({ id: req.param('id') }).exec(function(err) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            if (advert.banner) {
                                var url = advert.banner;
                                azureBlob.delete('advert', url.split('/').reverse()[0]);
                            }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('advert', who + ' deleted ' + advert.title);

                            return res.json(200, { status: 'success', message: 'Advert with id ' + req.param('id') + ' has been deleted' });
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
     * `AdvertController.updateAdvert()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/advert/:id Update a advert
     * @apiName UpdateAdvert
     * @apiDescription This is where a advert is updated.
     * @apiGroup Advert
     *
     * @apiParam {String} [title] Title of the advert.
     * @apiParam {String} [banner] Cloud Url of Picture banner for the advert.
     * @apiParam {String} [url] Url of the advert.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Advert with id 59dce9d56b54d91c38847825 has been updated'"
     *     }
     * 
     *
     * @apiUse AdvertIdNotProvidedError
     * 
     * @apiUse AdvertNotFoundError
     */
    updateAdvert: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Advert id provided!' });
        } else {
            Advert.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).then(function(advert, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!advert) {
                        return res.json(404, { status: 'error', err: 'No Advert with such id existing' })
                    } else {

                        if (advert.banner && advert.banner !== req.param('banner')) {
                            var url = advert.banner;
                            azureBlob.delete('advert', url.split('/').reverse()[0]);
                        }

                        Advert.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('advert', who + ' edited ' + advert.title);

                            return res.json(200, { status: 'success', message: 'Advert with id ' + req.param('id') + ' has been updated' });
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
     * `AdvertController.getAdvert()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/advert/:id Get advert(s)
     * @apiName GetAdvert
     * @apiDescription This is where adverts are retrieved.
     * @apiGroup Advert
     *
     * @apiParam {Number} id Advert id.
     *
     * @apiSuccess {String} advert Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse AdvertNotFoundError
     */
    getAdvert: function(req, res) {
        if (req.param('id')) {
            Advert.findOne({ id: req.param('id') }).sort('createdAt DESC').then(function(advert, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!advert) {
                        return res.json(404, { status: 'error', err: 'No Advert with such id existing' })
                    } else {
                        return res.json(200, advert);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {
            
            Advert.find().sort('createdAt DESC').then(function(advert, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, advert);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    }
};
