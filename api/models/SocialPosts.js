/**
 * SocialPosts.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        postText: {
            type: 'text',
            required: true
        },
        postImage: {
            type: 'string'
        },
        owner: {
            model: 'user',
            required: true
        },
        likes: {
            type: 'array',
        },
        comments: {
            collection: 'socialComments',
            via: 'post'
        }
    }
};