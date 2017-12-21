/**
 * EventsController
 *
 * @description :: Server-side logic for managing events
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine EventNotFoundError
 *
 * @apiError EventNotFound The Event was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Event with such id existing'
 *     }
 */

/** 
 * @apiDefine EventIdNotProvidedError
 *
 * @apiError EventIdNotProvided No Event id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Event id provided!"
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
     * `EventsController.createEvent()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/events Create a new event
     * @apiName CreateEvent
     * @apiDescription This is where a new event is created.
     * @apiGroup Event
     *
     * @apiParam {String} title Title of the event.
     * @apiParam {String} banner Cloud Url of Picture banner for the event.
     * @apiParam {String} description Full description of the event.
     * @apiParam {String} [date] Date/Duration of the event.
     * @apiParam {String} [venue] Venue of the event.
     * @apiParam {String} [fee] Fee for the event.
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
     * @apiError EventInfoNotComplete Event info not complete.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No { title | banner | description | fee} provided!"
     *     }
     */
    createEvent: function(req, res) {

        Events.create(req.body).exec(function(err, event) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            var who = jwToken.who(req.headers.authorization);
            audit.log('event', who + ' created ' + event.title);

            // If event is created successfuly we return event id
            if (event) {
                // NOTE: payload is { id: event.id}
                res.json(200, {
                    status: 'success',
                    id: event.id
                });
            }
        });
    },

    /**
     * `EventsController.uploadBanner()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/event/upload Upload an event banner
     * @apiName UploadBanner
     * @apiDescription This is where a event image banner is uploaded (Make sure image file extension is either jpg or png).
     * @apiGroup Event
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
     *       "bannerUrl": "https://accicloud.blob.core.windows.net/event/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg"
     *     }
     *
     * @apiError EventImageNotUploaded No image uploaded.
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

        var container = 'event';

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
     * `EventsController.deleteEvent()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/event/:id Delete a event
     * @apiName DeleteEvent
     * @apiDescription This is where a event is deleted
     * @apiGroup Event
     *
     * @apiParam {Number} id Event Id.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Event with id 59dce9d56b54d91c38847825 has been deleted'"
     *     }
     *
     * @apiUse EventIdNotProvidedError
     * 
     * @apiUse EventNotFoundError
     */
    deleteEvent: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Event id provided!' });
        } else {
            Events.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!event) {
                    return res.json(404, { status: 'error', err: 'No Event with such id existing' })
                } else {
                    Events.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        if (event.banner) {
                            var url = event.banner;
                            azureBlob.delete('event', url.split('/').reverse()[0]);
                        }

                        var who = jwToken.who(req.headers.authorization);
                        audit.log('event', who + ' deleted ' + event.title);

                        return res.json(200, { status: 'success', message: 'Event with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },


    /**
     * `EventsController.updateEvent()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/event/:id Update an event
     * @apiName UpdateEvent
     * @apiDescription This is where an event is updated.
     * @apiGroup Event
     *
     * @apiParam {String} [title] Title of the event.
     * @apiParam {String} [banner] Cloud Url of Picture banner for the event.
     * @apiParam {String} [description] Full description of the event.
     * @apiParam {String} [date] Date/Duration of the event.
     * @apiParam {String} [venue] Venue of the event.
     * @apiParam {String} [fee] Fee for the event.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Event with id 59dce9d56b54d91c38847825 has been updated'"
     *     }
     * 
     *
     * @apiUse EventIdNotProvidedError
     * 
     * @apiUse EventNotFoundError
     */
    updateEvent: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Event id provided!' });
        } else {
            Events.findOne({ select: ['title', 'banner'], where: { id: req.param('id') } }).exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!event) {
                    return res.json(404, { status: 'error', err: 'No Event with such id existing' })
                } else {

                    if (event.banner && event.banner !== req.param('banner')) {
                        var url = event.banner;
                        azureBlob.delete('event', url.split('/').reverse()[0]);
                    }

                    Events.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        var who = jwToken.who(req.headers.authorization);
                        audit.log('event', who + ' edited ' + event.title);

                        return res.json(200, { status: 'success', message: 'Event with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },


    /**
     * `EventsController.getEvent()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/event/:id Get event(s)
     * @apiName GetEvent
     * @apiDescription This is where events are retrieved.
     * @apiGroup Event
     *
     * @apiParam {Number} [id] Event id.
     *
     * @apiSuccess {String} event Post response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse EventNotFoundError
     */
    getEvent: function(req, res) {
        if (req.param('id')) {
            Events.findOne({ id: req.param('id') }).exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!event) {
                    return res.json(404, { status: 'error', err: 'No Event with such id existing' })
                } else {
                    return res.json(200, event);
                }
            });
        } else {
            Events.find().exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, event);
            });
        }
    },

    /**
     * `EventsController.createPayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/event/payment Pay for an event
     * @apiName CreatePayment
     * @apiDescription This is where an event payment is created.
     * @apiGroup Event
     *
     * @apiParam {String} amount Amount to be paid for event.
     * @apiParam {String} payer User id of the payer.
     * @apiParam {String} event Event id of the training beign paid for.
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
     * @apiUse EventIdNotProvidedError
     * 
     * @apiUse EventNotFoundError
     * 
     * @apiUse PayerIdNotProvidedError
     * 
     * @apiUse AmountNotProvidedError
     */
    createPayment: function(req, res) {
        if (!req.param('payer')) {
            return res.json(401, { status: 'error', err: 'No Payer id provided!' });
        }

        if (!req.param('event')) {
            return res.json(401, { status: 'error', err: 'No Event id provided!' });
        }

        if (!req.param('amount')) {
            return res.json(401, { status: 'error', err: 'No Event fee provided!' });
        }

        EventsPayment.create(req.body).exec(function(err, payment) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }
            // If event is created successfuly we return payment id
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
     * `EventsController.updatePayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/event/payment/:id Update a payment
     * @apiName UpdatePayment
     * @apiDescription This is where a payment is updated.
     * @apiGroup Event
     *
     * @apiParam {String} id Id of the payment.
     * @apiParam {String} [status] State/status of the payment. Must be any of 'pending', 'approved', 'denied', 'free'.
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
            EventsPayments.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!event) {
                    return res.json(404, { status: 'error', err: 'No Payment with such id existing' })
                } else {
                    EventsPayments.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Payment with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },

    /**
     * `EventsController.getPayment()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/event/:id Get payment(s)
     * @apiName GetPayment
     * @apiDescription This is where payments are retrieved.
     * @apiGroup Event
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
            EventsPayments.findOne({ id: req.param('id') }).exec(function(err, payment) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!payment) {
                    return res.json(404, { status: 'error', err: 'No Event with such id existing' })
                } else {
                    return res.json(200, payment);
                }
            });
        } else {
            EventsPayments.find().exec(function(err, payments) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, payments);
            });
        }
    }

    //TODO: Build in an API function to deletepayments if needed.
};
