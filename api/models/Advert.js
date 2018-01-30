/**
 * Advert.js
 *
 * @description :: Advert model holds the info for advert part of the membership plartform
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
        url: {
            type: 'string',
            required: true
        }
    }
};