var json2xls = require('json2xls');
var fs = require('fs');

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

module.exports = {

    /**
     * `PaymentsController.get()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/:id Get payments(s)
     * @apiName GetPayment
     * @apiDescription This is where paymet records are retrieved.
     * @apiGroup Payments
     *
     * @apiParam {String} [term] Search term.
     * @apiParam {String} [field] Search field.
     * @apiParam {String} [offset] Search offset for pagination.
     * @apiParam {String} [limit] Search limit for pagination.
     *
     * @apiSuccess {String} payments Response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse PaymentNotFoundError
     */
    get: function(req, res) {
        var offset, limit = 0;

        var field = req.param('field');

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        if (field && req.param('term')) {

            Payment.find({ field: req.param('term') }).limit(limit)
                .skip(offset).exec(function(err, payments) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    Payment.count().exec(function(err, count) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        var paymentData = {};
                        paymentData.payments = payments;
                        paymentData.count = count;

                        return res.json(200, paymentData);
                    });
                });
        } else {

            Payment.find().limit(limit)
                .skip(offset).exec(function(err, payments) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    Payment.count().exec(function(err, count) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        var paymentData = {};
                        paymentData.payments = payments;
                        paymentData.count = count;

                        return res.json(200, paymentData);
                    });
                });
        }
    },

    /**
     * `PaymentsController.getExcel()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/:id Get Payment Excel document
     * @apiName GetExcel
     * @apiDescription This is where payment records are obtained in excel format.
     * @apiGroup Payments
     */
    getExcel: function(req, res) {

        Payment.find().exec(function(err, payments) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            //return res.json(200, payments);

            var xls = json2xls(payments);
            console.log(payments);
            fs.writeFile('assets/tmp/payments.xlsx', xls, function(err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.attachment('assets/tmp/payments.xlsx');
            });

        });
    },

    /**
     * `PaymentsController.getTotals()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/totals Get Payment summary/totals
     * @apiName GetTotals
     * @apiDescription This is payment totals are obtained.
     * @apiGroup Payments
     */
    getTotals: function(req, res) {

        var totals = {};

        DonationPayments.find().exec(function(err, donations) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            var donationTotal = 0;
            donations.forEach(function(donation) {
                donationTotal += donation.amount;
            });

            totals.donation = donationTotal;

            TrainingPayments.find().exec(function(err, trainings) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                var trainingTotal = 0;
                trainings.forEach(function(training) {
                    trainingTotal += training.amount;
                });

                totals.training = trainingTotal;

                RegistrationPayments.find().exec(function(err, registrations) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    var registrationTotal = 0;
                    registrations.forEach(function(registration) {
                        registrationTotal += registration.amount;
                    });

                    totals.registration = registrationTotal;

                    MembershipPayments.find().exec(function(err, memberships) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        var membershipTotal = 0;
                        memberships.forEach(function(membership) {
                            membershipTotal += membership.amount;
                        });

                        totals.membership = membershipTotal;

                        EventsPayments.find().exec(function(err, events) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            var eventTotal = 0;
                            events.forEach(function(event) {
                                eventTotal += event.amount;
                            });

                            totals.event = eventTotal;
                        });
                    });
                });

                return res.json(200, totals);
            });
        });
    },

    /**
     * `PaymentsController.donations()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/donations Get donation payments
     * @apiName Donations
     * @apiDescription This is where donation payment records are obtained.
     * @apiGroup Payments
     */
    donations: function(req, res) {

        var offset, limit = 0;

        var field = req.param('field');

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        DonationPayments.find().limit(limit)
            .skip(offset).exec(function(err, donations) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                DonationPayments.count().exec(function(err, count) {
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
     * `PaymentsController.events()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/events Get event payments
     * @apiName Events
     * @apiDescription This is where event payment records are obtained.
     * @apiGroup Payments
     */
    events: function(req, res) {

        var offset, limit = 0;

        var field = req.param('field');

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        EventsPayments.find().limit(limit)
            .skip(offset).exec(function(err, events) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                EventsPayments.count().exec(function(err, count) {
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
     * `PaymentsController.trainings()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/trainings Get event payments
     * @apiName Trainings
     * @apiDescription This is where training payment records are obtained.
     * @apiGroup Payments
     */
    trainings: function(req, res) {

        var offset, limit = 0;

        var field = req.param('field');

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        TrainingPayments.find().limit(limit)
            .skip(offset).exec(function(err, trainings) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                TrainingPayments.count().exec(function(err, count) {
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
     * `PaymentsController.registrations()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/registrations Get registration payments
     * @apiName Registrations
     * @apiDescription This is where registration payment records are obtained.
     * @apiGroup Payments
     */
    registrations: function(req, res) {

        var offset, limit = 0;

        var field = req.param('field');

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        RegistrationPayments.find().limit(limit)
            .skip(offset).exec(function(err, registrations) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                RegistrationPayments.count().exec(function(err, count) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    var registrationTotal = 0;
                    registrations.forEach(function(registration) {
                        registrationTotal += registration.amount;
                    });

                    var paymentData = {};
                    paymentData.registrations = registrations;
                    paymentData.count = count;
                    paymentData.total = registrationTotal;

                    return res.json(200, paymentData);
                });
            });
    },

    /**
     * `PaymentsController.memberships()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/payments/memberships Get registration payments
     * @apiName Memberships
     * @apiDescription This is where registration payment records are obtained.
     * @apiGroup Payments
     */
    memberships: function(req, res) {

        var offset, limit = 0;

        var field = req.param('field');

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        MembershipPayments.find().limit(limit)
            .skip(offset).exec(function(err, memberships) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                MembershipPayments.count().exec(function(err, count) {
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
};
