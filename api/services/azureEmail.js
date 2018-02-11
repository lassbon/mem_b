/**
 * azureEmail
 *
 * @description :: Azure Email Service for sails (powered by mailjet)
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

const Mailjet = require('node-mailjet')
    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE, {
        url: 'api.mailjet.com', // default is the API url
        version: 'v3', // default is '/v3'
        perform_api_call: true // used for tests. default is true
    });

var sendEmail = Mailjet.post('send');

// send email
module.exports.send = function(data, callback) {

    if (data) {

        var emailData = {
            "FromEmail": data.email,
            "FromName": data.from,
            "Subject": data.subject,
            "Html-part": data.body,
            "Recipients": [{ "Email": data.to }]
        }

        sendEmail
            .request(emailData)
            .then(function(resp) {
                if (typeof callback === "function") {
                    callback('success');
                }
            })
            .catch(function(err) {
                if (typeof callback === "function") {
                    callback('error');
                }
            });
    }
};