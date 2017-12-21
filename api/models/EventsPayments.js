/**
 * EventsPayments.js
 *
 * @description :: EventsPayments model holds the info for event payment part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        amount: {
            type: 'integer',
            required: true
        },
        payer: {
            model: 'user',
            required: true
        },
        event: {
            model: 'events',
            required: true
        }
    }
};