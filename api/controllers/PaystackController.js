/**
 * PaymentController 
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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

                // 
                case 'subscription.create':
                    User.findOne({ select: 'membershipID', where: { email: event.data.customer.email } }).exec(function(err, user) {
                        if (err) {
                            return res.json(err.status, { status: 'error', err: err });
                        }
                        User.update({ email: event.data.customer.email }, { membershipFee: 'paid', membershipLevel: event.data.plan.name }).exec(function(err, info) {
                            if (err) {
                                // TODO log the errors that may have occurred

                                res.send(200);
                                //return res.json(err.status, { status: 'error', err: err });
                            }

                            var data = {
                                memeberID: user.membershipId,
                                name: event.data.customer.first_name + ' ' + event.data.customer.last_name,
                                type: 'Payment for' + event.data.plan.name,
                                source: event.plan.authorization.channel,
                                data: event
                            }

                            Payment.create(data).exec(function(err, level) {
                                res.send(200);
                                //return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been updated' });
                            });
                        });
                    });
                    break;

                case 'charge.success':
                    // Check to see if charge is subscription based or a one time payment
                    if (event.data.plan.id) {
                        User.findOne({ select: 'membershipID', where: { email: event.data.customer.email } }).exec(function(err, user) {
                            if (err) {
                                return res.json(err.status, { status: 'error', err: err });
                            }
                            User.update({ email: event.data.customer.email }, { membershipFee: 'paid', membershipLevel: event.data.plan.name }).exec(function(err, info) {
                                if (err) {
                                    // TODO log the errors that may have occurred

                                    res.send(200);
                                    //return res.json(err.status, { status: 'error', err: err });
                                }

                                var data = {
                                    memeberID: user.membershipId,
                                    name: event.data.customer.first_name + ' ' + event.data.customer.last_name,
                                    type: 'Payment for' + event.data.plan.name,
                                    source: event.data.authorization.channel,
                                    data: event
                                }

                                Payment.create(data).exec(function(err, level) {
                                    res.send(200);
                                    //return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been updated' });
                                });
                            });
                        });
                    } else {
                        User.findOne({ select: 'membershipID', where: { email: event.data.customer.email } }).exec(function(err, user) {
                            if (err) {
                                return res.json(err.status, { status: 'error', err: err });
                            }

                            var data = {
                                memeberID: user.membershipId,
                                name: event.data.customer.first_name + ' ' + event.data.customer.last_name,
                                type: 'Payment for' + event.data.metadata.custom_fields[0].display_name,
                                source: event.data.authorization.channel,
                                data: event
                            }

                            Payment.create(data).exec(function(err, level) {
                                return res.json(200);
                                //return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been updated' });
                            });
                        });
                    }
                    break;

                case 'subscription.disable':
                    User.update({ email: event.data.customer.email }, { membershipFee: 'unpaid' }).exec(function(err, data) {
                        if (err) {
                            // TODO log the errors that may have occurred

                            res.send(200);
                            //return res.json(err.status, { status: 'error', err: err });
                        }
                        res.send(200);
                        //return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been updated' });
                    });
                    break;

                default:
                    res.send(200);
                    break;
            }
        }
    },
}