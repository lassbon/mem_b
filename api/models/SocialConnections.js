/**
 * Social.js
 *
 * @description :: Model to manage the friend request data.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    requestee: {
      model: 'user',
      required: true
    },
    requester: {
      type: 'string',
      required: true
    }
  }
};

