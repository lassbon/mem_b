/**
 * Notifications.js
 *
 * @description :: Notifications model holds the info for notifications part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {

        userId: {
            type: 'string',
            required: true,
        },
        message: {
            type: 'string',
            required: true
        },
        type: {
            type: 'string',
            defaultsTo: 'notification'
        },
        from: {
            type: 'string',
            required: true
        }
    }
};