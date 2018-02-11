/**
 * Audit.js
 *
 * @description :: Audit model for storing auditory information
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    schema: true,
    
    attributes: {

        comment: {
            type: 'string',
            required: true
        },
        type: {
            type: 'string',
            required: true
        }
    }
};