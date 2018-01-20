/**
 * PaymentsController
 *
 * @description :: Server-side logic for viewing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine PaymentNotFoundError
 *
 * @apiError PaymentNotFound The Payment was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No payment matched your search term'
 *     }
 */

 /** 
 * @apiDefine UserIdNotProvidedError
 *
 * @apiError UserIdNotProvided No User id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No User id provided!"
 *     }
 */

module.exports = {

	/**
	 * `UserPaymentsController.donations()`
	 * 
	 * ----------------------------------------------------------------------------------
	 * @api {get} /api/v1/userpayments/donations/:id Get user donation payments
	 * @apiName Donations
	 * @apiDescription This is where user donation payment records are obtained.
	 * @apiGroup UserPayments

	 * @apiParam {Number} id user ID.

	 * @apiUse UserIdNotProvidedError
	 */
	userDonations: function(req, res) {
		if (!req.param('id')) {
			return res.json(401, { status: 'error', err: 'No user id provided!' });
		}

		DonationPayments.find({ donator: req.param('id') }).sort('createdAt DESC').exec(function(err, donations) {
			if (err) {
				sails.log.error(err);
				return res.json(err.status, { err: err });
			}

			DonationPayments.count({ donator: req.param('id') }).exec(function(err, count) {
				if (err) {
					sails.log.error(err);
					return res.json(err.status, { err: err });
				}

				var donationTotal = 0;
				donations.forEach(function(donation) {
					donationTotal += donation.amount;
				});

				var paymentData = {};
				paymentData.donations = donations;
				paymentData.count = count;
				paymentData.total = donationTotal;

				return res.json(200, paymentData);
			});
		});
	},

	/**
	 * `UserPaymentsController.userEvents()`
	 * 
	 * ----------------------------------------------------------------------------------
	 * @api {get} /api/v1/userpayments/events/:id Get user event payments
	 * @apiName Events
	 * @apiDescription This is where user event payment records are obtained.
	 * @apiGroup UserPayments

	 * @apiParam {Number} id user ID.

	 * @apiUse UserIdNotProvidedError
	 */
	userEvents: function(req, res) {

		if (!req.param('id')) {
			return res.json(401, { status: 'error', err: 'No user id provided!' });
		}

		EventsPayments.find({ payer: req.param('id') }).sort('createdAt DESC').exec(function(err, events) {
			if (err) {
				sails.log.error(err);
				return res.json(err.status, { err: err });
			}

			EventsPayments.count({ payer: req.param('id') }).exec(function(err, count) {
				if (err) {
					sails.log.error(err);
					return res.json(err.status, { err: err });
				}

				var eventTotal = 0;
				events.forEach(function(event) {
					eventTotal += event.amount;
				});

				var paymentData = {};
				paymentData.events = events;
				paymentData.count = count;
				paymentData.total = eventTotal;

				return res.json(200, paymentData);
			});
		});
	},

	/**
     * `UserPaymentsController.userTrainings()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/userpayments/trainings/:id Get event payments
     * @apiName Trainings
     * @apiDescription This is where training payment records are obtained.
     * @apiGroup Payments

     * @apiParam {Number} id user ID.

     * @apiUse UserIdNotProvidedError
     */
	userTrainings: function(req, res) {

		if (!req.param('id')) {
			return res.json(401, { status: 'error', err: 'No user id provided!' });
		}

		TrainingPayments.find({ payer: req.param('id') }).sort('createdAt DESC').exec(function(err, trainings) {
			if (err) {
				sails.log.error(err);
				return res.json(err.status, { err: err });
			}

			TrainingPayments.count({ payer: req.param('id') }).exec(function(err, count) {
				if (err) {
					sails.log.error(err);
					return res.json(err.status, { err: err });
				}

				var trainingTotal = 0;
				trainings.forEach(function(training) {
					trainingTotal += training.amount;
				});

				var paymentData = {};
				paymentData.trainings = trainings;
				paymentData.count = count;
				paymentData.total = trainingTotal;

				return res.json(200, paymentData);
			});
		});
	},

	/**
     * `UserPaymentsController.userMemberships()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/userpayments/memberships/:id Get user membership payments
     * @apiName Memberships
     * @apiDescription This is where user membership payment records are obtained.
     * @apiGroup Payments

     * @apiParam {Number} id user ID.

     * @apiUse UserIdNotProvidedError
     */
	userMemberships: function(req, res) {

		if (!req.param('id')) {
			return res.json(401, { status: 'error', err: 'No user id provided!' });
		}

		MembershipPayments.find({ payer: req.param('id') }).sort('createdAt DESC').exec(function(err, memberships) {
			if (err) {
				sails.log.error(err);
				return res.json(err.status, { err: err });
			}

			MembershipPayments.count({ payer: req.param('id') }).exec(function(err, count) {
				if (err) {
					sails.log.error(err);
					return res.json(err.status, { err: err });
				}

				var membershipTotal = 0;
				memberships.forEach(function(membership) {
					membershipTotal += membership.amount;
				});

				var paymentData = {};
				paymentData.memberships = memberships;
				paymentData.count = count;
				paymentData.total = membershipTotal;

				return res.json(200, paymentData);
			});
		});
	},

	// postuserMemberships: function(req, res) {

	// 	EventsPayments.create(req.body).exec(function(err, memberships) {
	// 		//console.log(memberships);
	// 		return res.json(200, memberships);
	// 	});
	// },
}
