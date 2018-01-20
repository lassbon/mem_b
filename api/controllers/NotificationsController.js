/**
 * NotificationsController
 *
 * @description :: Server-side logic for managing notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine NotificationNotFoundError
 *
 * @apiError NotificationNotFound The Notification was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Notification with such id existing'
 *     }
 */

/** 
 * @apiDefine NotificationIdNotProvidedError
 *
 * @apiError NotificationIdNotProvided No Notification id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Notification id provided!"
 *     }
 */

module.exports = {


    /**
     * `NotificationsController.create()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/notifications Create a new notification
     * @apiName CreateProject
     * @apiDescription This is where a new notification is created.
     * @apiGroup Notifications
     *
     * @apiParam {String} id User id of the recipient.
     * @apiParam {String} message Actual content of the notification.
     * @apiParam {String} from Sender of the notification.
     * @apiParam {String} [type] Type of notification (notificaton or message).
     *
     * @apiSuccess {String} id Id of the new notification.
     *
     * @apiSuccessExample Success-Response: 
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success"
     *       "id": "59dce9c16b54d91c38847825"
     *     }
     *
     * @apiError NotificationsInfoNotComplete Post info not complete.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No { id | message | type } provided!"
     *     }
     */
    create: function(req, res) {

        Notifications.create(req.body).exec(function(err, notification) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { status: 'error', err: err });
            }

            if (notification) {

                res.json(200, {
                    status: 'success',
                    id: notification.id
                });
            }
        });
    },


    /**
     * `NotificationsController.delete()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/notifications/:id Delete a notification
     * @apiName DeleteNotification
     * @apiDescription This is where a notification is deleted
     * @apiGroup Notifications
     *
     * @apiParam {Number} id Notification ID.
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
     * @apiUse NotificationIdNotProvidedError
     * 
     * @apiUse NotificationNotFoundError
     */
    delete: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Notification id provided!' });
        } else {
            Notifications.findOne({ select: 'message', where: { id: req.param('id') } }).exec(function(err, notification) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!notification) {
                    return res.json(404, { status: 'error', err: 'No Notification with such id existing' })
                } else {
                    Notifications.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Notification with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },


    /**
     * `NotificationsController.get()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/notification/:id Get notification(s)
     * @apiName GetLevel
     * @apiDescription This is where notification are retrieved.
     * @apiGroup Notifications
     *
     * @apiParam {Number} [id] Notifications id.
     *
     * @apiSuccess {String} notification Notifications response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse NotificationNotFoundError
     */
    get: function(req, res) {
        if (req.param('id')) {
            Notifications.findOne({ id: req.param('id') }).exec(function(err, notification) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!notification) {
                    return res.json(404, { status: 'error', err: 'No Notifications with such id existing' })
                } else {
                    return res.json(200, notification);
                }
            });
        } else {
            Notifications.find().exec(function(err, notification) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, notification);
            });
        }
    }
};
