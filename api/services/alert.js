/**
 * alert
 *
 * @description :: A service to alert certain people in the system about certain things
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

// Alert the verifiers in the admin portal to verify a new user
module.exports.verifier = function(companyName) {

	Admin.find({ permission: 'verifier' }).exec(function(err, verifiers) {
		if (err) {
			sails.log.error(err);
		}

		verifiers.forEach(function(verifier) {
			var emailData = {
				'email': process.env.SITE_EMAIL,
				'from': process.env.SITE_NAME,
				'subject': 'Action required for ACCI membership registration search for ' + companyName + '.',

				'body': 'Hello ' + verifier.username + '!<br><br>' +
					companyName + ' needs you to check their company status.<br><br>' +
					'Kindly go through the documents on the admin panel to check.<br><br>' +
					'Please click <a href=" ' + process.env.VERIFIER_ADMIN + ' " style="color: green;">Here</a> to proceed.<br><br>' +
					'If you have any questions, please contact the admin.<br><br>' +
					'Thank you.<br><br>' +
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

			sails.log.info('Verifier' +verifier.id + ' has been alerted.');
		});
	});
};

// Alert the approvers in the admin portal to approve a new user
module.exports.approver = function(companyName) {

	Admin.find({ permission: 'approver' }).exec(function(err, approvers) {
		if (err) {
			sails.log.error(err);
		}

		approvers.forEach(function(approver) {
			var emailData = {
				'email': process.env.SITE_EMAIL,
				'from': process.env.SITE_NAME,
				'subject': 'Action required for ACCI membership registration search for ' + companyName + '.',

				'body': 'Hello ' + approver.username + '!<br><br>' +
					companyName + ' needs you to approve their company status.<br><br>' +
					'Kindly go through the documents on the admin panel to approve.<br><br>' +
					'Please click <a href=" ' + process.env.APPROVER_ADMIN + ' " style="color: green;">HERE</a> to proceed.<br><br>' +
					'If you have any questions, please contact the admin.<br><br>' +
					'Thank you.<br><br>' +
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

			sails.log.info('Approver' + approver.id + ' has been alerted.');
		});
	});
};

// Alert the referees to confirm a new user
module.exports.referee = function(companyName, userId, email) {

	User.findOne({ select: ['membershipId', 'email'], where: { email: email } }).exec(function(err, referee) {
		if (err) {
			sails.log.error(err);
		}

		if (!referee) {
			return res.json(404, { status: 'error', err: 'No referee with such id existing' });
		} else {
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

			sails.log.info('Referee' + referee.id + ' has been alerted.');
		}
	});
};

// Alert the user on referee rejection
module.exports.rejected = function(res, companyName, email, referee, whoRejected) {

	var rejectionMessage = 'One of your referee ' + referee + ' has rejected your registration.<br> please provide a new and valid referee through this <a href="' + process.env.REFEREE_LINK + '/' + whoRejected + '" target="blank">LINK</a>.';

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
