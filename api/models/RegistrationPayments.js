/**
 * RegistrationPayments.js
 *
 * @description :: RegistrationPayments model holds the info for membership registration payment part of the membership plartform
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
        }
    }
};