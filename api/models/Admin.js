/**
 * Admin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');

module.exports = {

    attributes: {

        username: {
            type: 'string',
            required: 'true',
            unique: true
        },
        email: {
            type: 'email',
            required: 'true',
            unique: true
        },
        password: {
            type: 'string',
            required: 'true'
        },
        firstname: {
            type: 'string'
        },
        permission: {
            type: 'string',
            defaultsTo: 'low'
        },
        role: {
            type: 'string',
            required: 'true'
        }
    },

    // Here we encrypt password before creating an Admin
    beforeCreate: function(values, next) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(values.password, salt, function(err, hash) {
                if (err) return next(err);
                values.password = hash;
                next();
            })
        })
    },

    // Here we encrypt password before creating an Admin
    beforeUpdate: function(values, next) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(values.password, salt, function(err, hash) {
                if (err) return next(err);
                values.password = hash;
                next();
            })
        })
    },

    // Here we comare password with available hash
    comparePassword: function(password, user, cb) {
        bcrypt.compare(password, user.password, function(err, match) {

            if (err) cb(err);
            if (match) {
                cb(null, true);
            } else {
                cb(err);
            }
        })
    }
};