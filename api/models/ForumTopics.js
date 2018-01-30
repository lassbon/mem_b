/**
 * ForumTopic.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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
        description: {
            type: 'string',
        },
        creator: {
            model: 'user',
            required: true
        },
        posts: {
            collection: 'forumPosts',
            via: 'topic'
        }
    }
};