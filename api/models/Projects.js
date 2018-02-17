/**
 * Projects.js
 *
 * @description :: Projects model holds the info for projects part of the membership plartform
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
        description: {
            type: 'text',
            required: true
        },
        likes: {
            type: 'array',
        },
        comments: {
            collection: 'projectComments',
            via: 'project'
        },
        date: {
            type: 'string'
        },
        status: {
            type: 'string',
            defaultsTo: 'ongoing'
        },
        venue: {
            type: 'text'
        }
    }
};