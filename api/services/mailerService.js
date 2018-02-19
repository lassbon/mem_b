/**
 * mailerService
 *
 * @description :: Azure Email Service for sails
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

import MailerService from 'sails-service-mailer';

export default MailerService('sendgrid', {
    from: 'no-reply@ghaiklor.com',
    provider: {
        auth: {
            api_user: '<SENDGRID_USERNAME>', // SendGrid username 
            api_key: '<SENDGRID_PASSWORD>' // SendGrid password 
        }
    }
});
