/**
 * Payment.js
 *
 * @description :: 
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        memberId: {
            type: 'string',
            required: true
        },
        name: {
            type: 'string',
            required: true
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
            type: 'string',
            required: true
        },
        amount: {
            type: 'string',
            required: true
        },
    }
};