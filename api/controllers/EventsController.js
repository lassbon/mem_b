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
     * @apiParam {String} [organizer] Organizer of the event.
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
                    Events.update({ id: req.param('id') }, { status: 'completed' }).exec(function(err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        // if (event.banner) {
                        //     var url = event.banner;
                        //     azureBlob.delete('event', url.split('/').reverse()[0]);
                        // }

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
     * @apiParam {String} [organizer] Organizer of the event.
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
     * `EventsController.searchEvents()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/searchevents/:id/:page/:limit Search for event(s)
     * @apiName SearchEvent
     * @apiDescription This is where an event is searched.
     * @apiGroup Event
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
    searchEvents: function(req, res) {
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
            Events.find({ title: { 'contains': req.param('searchTerm') } }).sort('createdAt DESC').paginate({ page: page, limit: limit }).exec(function(err, events) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, { page: page, limit: limit, result: events });
            });
        }
    },

    /**
     * `EventsController.getCompleted()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/events/completed/:id Get event(s)
     * @apiName GetCompleted
     * @apiDescription This is where completed events are retrieved.
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
    getCompleted: function(req, res) {
        if (req.param('id')) {
            Events.findOne({ id: req.param('id'), status: 'ongoing' }).sort('createdAt DESC').exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!event) {
                    return res.json(404, { status: 'error', message: 'No event with such id existing' })
                } else {
                    return res.json(200, event);
                }
            });
        } else {
            Events.find({ status: 'completed' }).sort('createdAt DESC').exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, event);
            });
        }
    },

    /**
     * `EventsController.getOngoing()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/events/ongoing/:id Get event(s)
     * @apiName GetOngoing
     * @apiDescription This is where ongoing events are retrieved.
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
    getOngoing: function(req, res) {
        if (req.param('id')) {
            Events.findOne({ id: req.param('id'), status: 'ongoing' }).sort('createdAt DESC').exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!event) {
                    return res.json(404, { status: 'error', message: 'No event with such id existing' })
                } else {
                    return res.json(200, event);
                }
            });
        } else {
            Events.find({ status: 'ongoing' }).sort('createdAt DESC').exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, event);
            });
        }
    },

    /**
     * `EventsController.myEvents()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/myevents/:id Get event(s)
     * @apiName GetEvent
     * @apiDescription This is where events are retrieved.
     * @apiGroup Event
     *
     * @apiParam {Number} id User id.
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
     * @apiUse UserIdNotProvidedError
     */
    myEvents: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No user id provided!' });
        }

        EventPayments.find({ payer: req.param('id') }).sort('createdAt DESC').exec(function(err, events) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            return res.json(200, events);
        });
    },

    getEvents: function(req, res) {

        if (req.param('id')) {
            Events.findOne({ id: req.param('id')}).sort('createdAt DESC').exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!event) {
                    return res.json(404, { status: 'error', message: 'No event with such id existing' })
                } else {
                    return res.json(200, event);
                }
            });
        } else {
            Events.find().sort('createdAt DESC').exec(function(err, event) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, event);
            });
        }
    }
};
