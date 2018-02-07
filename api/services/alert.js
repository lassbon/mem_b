/**
 * alert
 *
 * @description :: A service to alert certain people in the system about certain things
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

// Alert the verifiers in the admin portal to verify a new user
module.exports.verifier = function(companyName, ) {

	Admin.find({ permission: 'verifier' }).exec(function(err, verifiers) {
		if (err) {
			sails.log.error(err);
		}

		verifiers.forEach(function(verifier) {
			var emailData = {
				'email': process.env.SITE_EMAIL,
				'from': process.env.SITE_NAME,
				'subject': 'Your member verification.',

				'body': 'Hello ' + verifier.username + '!<br><br>' +
					'A prospective member' + companyName + ' needs to be verified .<br><br>' +
					'Kindly click on the "Verifier" button to be redirected to the verification page on the admin portal.<br><br>' +
					'<a href=" ' + process.env.VERIFIER_ADMIN + ' " style="color: green;">Verifier</a>.<br><br>' +
					'Thank you for your time.<br><br>' +
					process.env.SITE_NAME,

				'to': verifier.email
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
	});
};

// Alert the approvers in the admin portal to approve a new user
module.exports.approver = function(companyName, ) {

	Admin.find({ permission: 'approver' }).exec(function(err, approvers) {
		if (err) {
			sails.log.error(err);
		}

		approvers.forEach(function(approver) {
			var emailData = {
				'email': process.env.SITE_EMAIL,
				'from': process.env.SITE_NAME,
				'subject': 'Your member verification.',

				'body': 'Hello ' + approver.username + '!<br><br>' +
					'A prospective member' + companyName + ' needs to be verified .<br><br>' +
					'Kindly click on the "Approver" button to be redirected to the verification page on the admin portal.<br><br>' +
					'<a href=" ' + process.env.APPROVER_ADMIN + ' " style="color: green;">Approver</a>.<br><br>' +
					'Thank you for your time.<br><br>' +
					process.env.SITE_NAME,

				'to': approver.email
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
	});
};

// Alert the referees to confirm a new user
module.exports.referee = function(companyName, userId, email) {

	User.findOne({ select: 'membershipId', where: { email: email } }).exec(function(err, referee) {
		if (err) {
			sails.log.error(err);
		}

		// Send action email to the users apointed referees
		var emailData = {
			'email': process.env.SITE_EMAIL,
			'from': process.env.SITE_NAME,
			'subject': 'Action required on ' + process.env.SITE_NAME + ' membership registration for ' + companyName,

			'body': 'Hello!<br><br>' +
				companyName + ' Appointed you as referee to it\'s registration on the ' + process.env.SITE_NAME + ' membership plartform.<br><br>' +
				'Click on the appropriate button to CONFIRM or REJECT the applicant for membership.<br><br>' +
				'<a href=" ' + process.env.VERIFIER_CONFIRM + userId + '/' + referee.id + ' " style="color: green;">CONFIRM</a>.<br><br>' +
				'<a href=" ' + process.env.VERIFIER_REJECT + userId + '/' + referee.id + ' " style="color: red;">REJECT</a>.<br><br>' +
				'Thank you for your time.<br><br>' +
				process.env.SITE_NAME,

			'to': email
		}

		azureEmail.send(emailData, function(resp) {
			if (resp === 'success') {
				sails.log.info('The email was sent successfully.');
			}

			if (resp === 'error') {
				sails.log.error(resp);
			}
		});

	});
};

// Alert the user on referee rejection
module.exports.rejected = function(res, companyName, email, referee) {

	var rejectionMessage = 'One of your referee ' + referee + ' has rejected your registration.<br> please provide a new and valid referee through this <a href="'+ process.env.REFEREE_LINK +'" target="blank">LINK</a>.';

	// Send email to the user alerting him/her to the state of affairs
	var emailData = {
		'email': process.env.SITE_EMAIL,
		'from': process.env.SITE_NAME,
		'subject': 'Your ' + process.env.SITE_NAME + ' membership registration status',
		'body': 'Hello ' + companyName + '! <br><br> ' + rejectionMessage + ' <br><br> All the best, <br><br>' + process.env.SITE_NAME,
		'to': email
	}

	azureEmail.send(emailData, function(resp) {
		if (resp === 'success') {
			return res.json(200, { status: 'success', message: 'Rejected!' });
		}

		if (resp === 'error') {
			sails.log.error(resp);
			return res.json(401, { status: 'error', err: 'There was an error while sending the rejection email.' });
		}
	});
};
