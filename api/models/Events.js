/**
 * Events.js
 *
 * @description :: Events model holds the info for event part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,

    attributes: {

        title: { 
            type: 'string',
            required: true,
            unique: true
        },
        banner: {
            type: 'string',
            required: true
        },
        description: {
            type: 'text',
            required: true
        },
        date: {
            type: 'string'
        },
        venue: {
            type: 'text'
        },
        organizer: {
            type: 'string'
        },
        likes: {
            type: 'array',
        },
        comments: {
            collection: 'eventComments',
            via: 'event'
        },
        fee: {
            type: 'integer',
            defaultsTo: 0
        },
        eventsPayments: {
            collection: 'eventsPayments',
            via: 'event'
        }
    }
};