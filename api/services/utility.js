/**
 * Utility
 *
 * @description :: Utility Service for sails. This is where usefull functions are made
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

var Chance = require('chance');

// Delete blob from a container
module.exports.membershipId = function(email) {

    if (email) {
        // Instantiate Chance so it can be used
        var chance = new Chance(email, '3jh4g43jk43jkbh5g4hrbhcuid89rr98r8dbdhje');
        var num = chance.integer({ min: 1000000000, max: 9999999999 });

        return '#' + num;
    }
};