/**
 * ForumPost.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,

  attributes: {

    title: {
      type: 'string',
      required: true
    },
    content: {
      type: 'text',
      required: true
    },
    comments: {
      collection: 'forumComments',
      via: 'post'
    },
    creator: {
      model: 'user',
      required: true
    },
    topic: {
      model: 'forumTopics',
      required: true
    },
    likes: {
      type: 'array',
    },
    censored: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
