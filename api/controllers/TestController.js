var parseXlsx = require('excel');
const multer = require('multer');

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
    },

    oldData: function(req, res) {
        // req.file('avatar').upload({
        //     dirname: require('path').resolve(sails.config.appPath, 'assets/images')
        // }, function(err, uploadedFiles) {
        //     if (err) return res.negotiate(err);

        //     // return res.json({
        //     //     message: uploadedFiles.length + ' file(s) uploaded successfully!'
        //     // });
        // });

        parseXlsx('assets/images/3348b521-d0ad-4495-b449-7f7f8c588bf9.xlsx', function(err, data) {
            if (err) {
                sails.log.error(err);

                return res.json(401, { status: 'error', err: 'wahala dey' });
            }

            data.splice(0, 3);

            for (var record of data) {

                var oldMember = {
                    oldMember: true,
                    password: 'password',
                    membershipStatus: 'active'
                }

                if (record[1].length !== 0) {
                    oldMember.membershipId = record[1];
                }

                if (record[2].length !== 0) {
                    oldMember.companyName = record[2];
                }

                if (record[5].length !== 0) {
                    oldMember.membershipPlan = record[5];
                }

                if (record[7].length !== 0) {
                    oldMember.companyAddress = record[7];
                }

                if (record[8].length !== 0) {
                    oldMember.email = record[8];
                }

                if (record[9].length !== 0) {
                    oldMember.companyPhone = record[9].split(' ').join(', ');
                }

                if (record[11].length !== 0) {
                    oldMember.tradeGroup = record[11];
                }

                User.findOne({ membershipId: oldMember.membershipId }).exec(function(err, user) {
                    if (err) {
                        sails.log.error(err);
                        //return res.json(err.status, { err: err });
                    }

                    if (!user) {
                        console.log(oldMember);

                        User.create(oldMember).exec(function(err, member) {
                            if (err) {
                                sails.log.error(err);
                                //return res.json(err.status, { err: err });
                            }
                        });
                    }
                });
            }

            return res.json(200, { status: 'success', message: 'success' });
        });
    },
}
