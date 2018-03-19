/**
 * News.js
 *
 * @description :: News model holds the info for news part of the membership plartform
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
        image: {
            type: 'string',
            required: true
        },
        body: {
            type: 'text',
            required: true
        },
        author: {
            type: 'string'
        }
    }
};