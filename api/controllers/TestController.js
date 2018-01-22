module.exports = {

    testEmail: function(req, res) {
        var email = 'lemuel@karixchange.com';

        var emailData = {
            'email': process.env.SITE_EMAIL,
            'from': process.env.SITE_NAME,
            'subject': process.env.SITE_NAME + ' test email',
            'body': 'Hello <br><br> This is just a test email.',
            'to': email
        }

        azureEmail.send(emailData, function(resp) {
            if (resp === 'success') {
                sails.log.info('The email was sent successfully.');

                return res.json(200, { status: 'success', message: 'The email test was successful' });
            }

            if (resp === 'error') {
                sails.log.error(resp);

                return res.json(200, { status: 'error', err: resp });
            }
        });
    }
}
