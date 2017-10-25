/**
 * ForumPost.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

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
      via: 'owner'
    },
    creator: {
      model: 'user',
      required: true
    },
    topic: {
      model: 'forumTopics',
      required: true
    }
  }
};

