/**
 * PaystackController 
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var regexp = require('node-regexp');
var donation = regexp().start('donation_').toRegExp();
var events = regexp().start('event_').toRegExp();
var project = regexp().start('project_').toRegExp();
var training = regexp().start('training_').toRegExp();
var register = regexp().start('registration').toRegExp();

module.exports = {

    verify: function(req, res) {
        var crypto = require('crypto');
        var secret = process.env.PAYSTACK_SECRET_KEY;

        //validate event
        var hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

        if (hash == req.headers['x-paystack-signature']) {
            // Retrieve the request's body
            var event = req.body;

            // Do something with event
            switch (event.event) {

                // when a new subscription is created
                case 'subscription.create':
                    User.findOne({ select: ['company', 'membershipId'], where: { email: event.data.customer.email } }).exec(function(err, user) {
                        if (err) {
                            sails.log.error(err);
                        }

                        User.update({ email: event.data.customer.email }, { membershipFee: 'paid', membershipLevel: event.data.plan.name }).exec(function(err, info) {
                            if (err) {
                                sails.log.error(err);
                            }

                            audit.log('membership', user.company + ' paid membership fee');

                            var data = {
                                memeberID: user.membershipId,
                                name: event.data.customer.first_name + ' ' + event.data.customer.last_name,
                                type: 'Payment for' + event.data.plan.name,
                                source: event.plan.authorization.channel,
                                data: event
                            }

                            Payment.create(data).exec(function(err, level) {
                                if (err) {
                                    sails.log.error(err);
                                }

                                return res.json(200);
                            });
                        });
                    });
                    break;

                case 'charge.success':
                    /*
                     *Check to see if charge is subscription based or a one time payment
                     */

                    // when charge is subscription based
                    if (event.data.plan.id) {
                        User.findOne({ select: ['company', 'membershipId'], where: { email: event.data.customer.email } }).exec(function(err, user) {
                            if (err) {
                                sails.log.error(err);
                            }

                            User.update({ email: event.data.customer.email }, { membershipFee: 'paid', membershipLevel: event.data.plan.name }).exec(function(err, info) {
                                if (err) {
                                    sails.log.error(err);
                                }

                                audit.log('membership', user.company + ' renewed membership fee');

                                var data = {
                                    memeberID: user.membershipId,
                                    name: event.data.customer.first_name + ' ' + event.data.customer.last_name,
                                    type: 'Payment for' + event.data.plan.name,
                                    source: event.data.authorization.channel,
                                    data: event
                                }

                                Payment.create(data).exec(function(err, level) {
                                    if (err) {
                                        sails.log.error(err);
                                    }

                                    return res.send(200);
                                });
                            });
                        });
                    } else {
                        User.findOne({ select: ['membershipId', 'company'], where: { email: event.data.customer.email } }).exec(function(err, user) {
                            if (err) {
                                sails.log.error(err);
                            }

                            var payment_for = event.data.metadata.custom_fields[0].value;
                            var memberId = event.data.metadata.custom_fields[1].value;

                            var data = {
                                memberId: memberId,
                                name: user.company,
                                type: 'Payment for ' + event.data.metadata.custom_fields[0].variable_name,
                                source: event.data.authorization.channel,
                                amount: event.data.amount,
                                data: event
                            }


                            /*
                             * Check what the payment is meant for
                             */

                            // Check if payment is towards a donation
                            if (donation.test(payment_for) === true) {
                                var donationId = payment_for.split('_')[1];
                                DonationPayments.create({ amount: event.data.amount, donator: memberId, donationId: donationId }).exec(function(err, info) {
                                    if (err) {
                                        sails.log.error(err);
                                    }

                                    audit.log('donation', user.company + ' donated ' + data.amount + ' to ' + event.data.metadata.custom_fields[0].variable_name, );
                                });
                            }

                            // Check if payment is for a training
                            if (training.test(payment_for) === true) {
                                var trainingId = payment_for.split('_')[1];
                                TrainingPayments.create({ amount: event.data.amount, payer: memberId, trainingId: trainingId }).exec(function(err, info) {
                                    if (err) {
                                        sails.log.error(err);
                                    }

                                    audit.log('training', user.company + ' paid ' + data.amount + ' for ' + event.data.metadata.custom_fields[0].variable_name, );
                                });
                            }

                            // Check if payment is for an event
                            if (events.test(payment_for) === true) {
                                var eventId = payment_for.split('_')[1];
                                EventsPayments.create({ amount: event.data.amount, payer: memberId, trainingId: trainingId }).exec(function(err, info) {
                                    if (err) {
                                        sails.log.error(err);
                                    }

                                    audit.log('event', user.company + ' paid ' + data.amount + ' for ' + event.data.metadata.custom_fields[0].variable_name, );
                                });
                            }

                            // Check if payment is for registration
                            if (registration.test(payment_for) === true) {
                                var regId = payment_for.split('_')[1];
                                RegistrationPayments.create({ amount: event.data.amount, payer: memberId }).exec(function(err, info) {
                                    if (err) {
                                        sails.log.error(err);
                                    }

                                    audit.log('registration', user.company + ' paid ' + data.amount + ' for ' + event.data.metadata.custom_fields[0].variable_name, );
                                });
                            }

                            /*
                             * Record payment details to main payment ledger
                             */
                            Payment.create(data).exec(function(err, level) {
                                if (err) {
                                    sails.log.error(err);
                                }
                                return res.json(200);
                            });
                        });
                    }
                    break;

                case 'subscription.disable':
                    User.update({ email: event.data.customer.email }, { membershipFee: 'unpaid' }).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                        }

                        audit.log('membership', user.company + ' memebership has been disabled' );

                        return res.json(200);
                    });
                    break;

                default:
                    return res.json(200);
                    break;
            }
        }
    },
}
