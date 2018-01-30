/**
 * Levels.js
 *
 * @description :: Levels model holds the info for levels part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    schema: true,

    attributes: {

        name: {
            type: 'string',
            required: true,
            unique: true
        },
        description: {
            type: 'text',
            required: true
        },
        fee: {
            type: 'integer',
            required: true
        },
        paystack: {
            type: 'json'
        }
    }
};