/**
 * Donation.js
 *
 * @description :: Donation model holds the info for donation part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

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
        minAmount: {
            type: 'integer',
            required: true,
        },
        donationPayments: {
            collection: 'donationPayments',
            via: 'donationId'
        },
        status: {
            type: 'string',
            defaultsTo: 'active',
            enum: ['active', 'ended']
        }
    }
};