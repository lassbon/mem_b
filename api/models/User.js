/**
 * User.js
 *
 * @description :: Model to manage the user data.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 // We don't want to store password with out encryption
var bcrypt = require('bcrypt');

module.exports = {

  attributes: {

    username:{
        type: 'string',
        required: true,
        unique: true
    },
    email:{
        type: 'email',
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true
    },
    bizNature:{
        type: 'string',
        required: true
    },
    company:{
        type: 'string',
        required: true
    },
    phone:{
      type: 'string',
      required: true
    },
    companyRepName1:{
      type: 'string',
      required: true
    },
    companyRepPhone1:{
      type: 'string',
      required: true
    },
    companyRepEmail1:{
      type: 'string',
      required: true
    },
    companyRepName2:{
      type: 'string',
      required: true
    },
    companyRepPhone2:{
      type: 'string',
      required: true
    },
    companyRepEmail2:{
      type: 'string',
      required: true
    },
    address:{
        type: 'text',
        required: true
    },
    tradeGroup:{
      type: 'string',
      required: true
    },
    role:{
        type: 'string',
        defaultsTo : 'User'
    },
    verified:{
      type: 'boolean',
      defaultsTo : false
    },
    friends: {
      collection: 'user',
      via: 'id'
    },
    friendRequests: {
      collection: 'social',
      via: 'requestee'
    },
    posts: {
      collection: 'socialPosts',
      via: 'owner'
    },
    forumTopics: {
      collection: 'forumTopics',
      via: 'creator'
    },
    forumPosts: {
      collection: 'forumPosts',
      via: 'creator'
    },
    approved:{
      type: 'boolean',
      defaultsTo : false
    },
    rejected:{
      type: 'boolean',
      defaultsTo : false
    },
    referred1:{
      type: 'boolean',
      defaultsTo : false
    },
    referred2:{
      type: 'boolean',
      defaultsTo : false
    },
    referrer1:{
      type: 'string',
      required: 'true'
    },
    referrer2:{
      type: 'string',
      required: 'true'
    },
    
    // Add a reference to KnowledgeBase
    documents: {
      collection: 'knowledgeBase',
      via: 'uploader'
    }
  }, 

  // Here we encrypt password before creating a User
  beforeCreate : function (values, next) {
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if(err) return next(err);
        values.password = hash;
        next();
      })
    })
  },

  // Here we compare password with available hash
  comparePassword : function (password, user, cb) {
    bcrypt.compare(password, user.password, function (err, match) {
      if(err) cb(err);
      if(match) {
        cb(null, true);
      } else {
        cb(err);
      }
    })
  }
};

