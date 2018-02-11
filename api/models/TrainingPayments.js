/**
 * TrainingPayments.js
 *
 * @description :: TrainingPayments model holds the info for training payment part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {

        amount: {
            type: 'integer',
            required: true
        },
        payer: {
            model: 'user',
            required: true
        },
        trainingId: {
            model: 'training',
            required: true
        }
    }
};