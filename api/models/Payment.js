/**
 * Payment.js
 *
 * @description :: 
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        memberId: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        type: {
            type: 'string',
            required: true
        },
        source: {
            type: 'string',
            required: true
        },
        data: {
            type: 'json',
            required: true
        },
        amount: {
            type: 'integer',
            required: true
        },
    }
};