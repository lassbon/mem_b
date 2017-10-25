/**
 * KnowledgeBase.js
 *
 * @description :: KnowledgeBase model holds the info for knowledgeBase part of the membership plartform
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'text',
      required: true
    },
    docUrl: {
      type: 'string',
      required: true
    },
    uploader: {
      type: 'string',
      required: true
    },
    views: {
      type: 'integer',
      defaultsTo: 0
    },
    downloads: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};

