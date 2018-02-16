var parseXlsx = require('excel');
const multer = require('multer');
var base64 = require('base-64');

module.exports = {

    testEmail: function(req, res) {
        User.find({ select: ['membershipId', 'email', 'companyName'], where: { oldMember: true, email: 'sogbolutoluwalase@yahoo.com' } }).exec(function(err, users) {
            if (err) {
                sails.log.error(err);
                return res.json(404, { status: 'error', err: err });
            }

            users.forEach(function(user) {
                var emailData = {
                    'email': process.env.SITE_EMAIL,
                    'from': process.env.SITE_NAME,
                    'subject': 'Your ' + process.env.SITE_NAME + ' membership onboarding.',

                    'body': 'Hello ' + user.companyName + '!<br><br>' +
                        'Welcome to ' + process.env.SITE_NAME + ' Membership platform.<br><br>' +
                        'You can now easily access your membership account with ease and get all information on on-going, completed and past events/projects.<br><br>' +
                        'You can also track your financial reports and pay your annual dues on the go.<br><br>' +
                        'Kindly click on the "Onboard" button to be redirected to the onboarding form.<br><br>' +
                        '<a href=" ' + process.env.ONBOARD_LINK + base64.encode(user.membershipId) + ' " style="color: green;">Onboard</a>.<br><br>' +
                        'Your generic password is <strong>"password"</strong>.<br><br>' +
                        '<strong>Kindly change your password once logged on.</strong><br><br>' +
                        'Thank you for your time.<br><br>' +
                        process.env.SITE_NAME,

                    'to': user.email
                }

                azureEmail.send(emailData, function(resp) {
                    if (resp === 'success') {
                        return sails.log.info(resp);
                    }

                    if (resp === 'error') {
                        sails.log.error(resp);
                    }
                });
            });
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

                if (record[1].length !== 0 && record[8].length !== 0) {

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

                    User.findOne({ membershipId: oldMember.membershipId }).then(function(user, err) {
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
                        })
                        .catch(function(err) {
                            sails.log.error(err);
                            return res.json(500, { err: err });
                        });
                }
            }

            return res.json(200, { status: 'success', message: 'success' });
        });
    },

    alertOldMembers: function(req, res) {
        User.find({ select: ['membershipId', 'email', 'companyName'], where: { oldMember: true } }).then(function(users, err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(404, { status: 'error', err: err });
                }

                users.forEach(function(user) {
                    var emailData = {
                        'email': process.env.SITE_EMAIL,
                        'from': process.env.SITE_NAME,
                        'subject': 'Your ' + process.env.SITE_NAME + ' membership onboarding.',

                        'body': 'Hello ' + user.companyName + '!<br><br>' +
                            'Welcome to ' + process.env.SITE_NAME + ' Membership platform.<br><br>' +
                            'You can now easily access your membership account with ease and get all information on on-going, completed and past events/projects.<br><br>' +
                            'You can also track your financial reports and pay your annual dues on the go.<br><br>' +
                            'Kindly click on the "Onboard" button to be redirected to the onboarding form.<br><br>' +
                            '<a href=" ' + process.env.ONBOARD_LINK + base64.encode(user.membershipId) + ' " style="color: green;">Onboard</a>.<br><br>' +
                            'Your generic password is <strong>"password"</strong>.<br><br>' +
                            '<strong>Kindly change your password once logged on.</strong><br><br>' +
                            'Thank you for your time.<br><br>' +
                            process.env.SITE_NAME,

                        'to': user.email
                    }

                    azureEmail.send(emailData, function(resp) {
                        if (resp === 'success') {
                            sails.log.info(resp);
                        }

                        if (resp === 'error') {
                            sails.log.error(resp);
                        }
                    });
                });
            })
            .catch(function(err) {
                sails.log.error(err);
                return res.json(500, { err: err });
            });
    },

    testPage: function(req, res) {
        // User.find({ select: ['membershipId', 'email', 'companyName'], where: { oldMember: true, email: 'lemuel@karixchange.com' } }).exec(function(err, users) {
        //     if (err) {
        //         sails.log.error(err);
        //         return res.json(404, { status: 'error', err: err });
        //     }

        //     users.forEach(function(user) {
        //         alert.verifier('og prime');
        //     });
        // });

        //alert.verifier('og prime');
        //console.log(utility.membershipId());
        return res.json(200, { membership: utility.membershipId() });
    },
}
