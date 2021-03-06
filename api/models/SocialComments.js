/**
 * SocialComments.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {
    comment: {
      type:'string',
      required: true
    },
    owner:{
      model: 'user',
      required: true
    },
    companyName:{
      type: 'string',
      required: true
    },
    post: {
      model: 'socialPosts',
      required: true
    }
  }
};