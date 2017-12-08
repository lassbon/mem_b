/**
 * TrainingPayments.js
 *
 * @description :: TrainingPayments model holds the info for training payment part of the membership plartform
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
        training: {
            model: 'training',
            required: true
        },
        status: {
            type: 'string',
            defaultsTo: 'pending',
            enum: ['pending', 'approved', 'denied', 'free']
        }
    }
};