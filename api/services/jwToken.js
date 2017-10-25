/**
 * jwToken
 *
 * @description :: JSON Webtoken Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */
 
var
jwt = require('jsonwebtoken'),
tokenSecret = "-0987td0986yjmxdfty7890][pkj4567ujjvder6789uiknbgrestdcvb[70695432qwsdrt-ijp";

// Generates a token from supplied payload
module.exports.issue = function(payload) {
    return jwt.sign(
    payload,
    tokenSecret, // Token Secret that we sign it with
    {
        expiresIn : 43200 // Token Expire time
    });
};

// Verifies token on a request
module.exports.verify = function(token, callback) {
    return jwt.verify(
    token, // The token to be verified
    tokenSecret, // Same token we used to sign
    {}, // No Option, for more see https://github.com/auth0/node-jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
    callback //Pass errors or decoded token to callback
    );
};