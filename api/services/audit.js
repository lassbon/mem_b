/**
 * audit
 *
 * @description :: Azure Table powered audit log 
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

// Log info to the azure audit table
module.exports.log = function(type, comment) {

    Audit.create({ type: type, comment: comment }).exec(function(err, info) {
        if (err) {
            sails.log.error(err);
        }
    });
};
