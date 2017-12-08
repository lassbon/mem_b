/**
 * TrainingPayments.js
 *
 * @description :: DonationPayments model holds the info for donation payment part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        amount: {
            type: 'integer',
            required: true
        },
        donator: {
            model: 'user',
            required: true
        },
        donation: {
            model: 'donation',
            required: true
        },
        status: {
            type: 'string',
            defaultsTo: 'pending',
            enum: ['pending', 'approved', 'denied']
        }
    }
};