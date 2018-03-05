/**
 * PaystackController
 *
 * @description :: Server-side logic for managing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const regexp = require("node-regexp");
const crypto = require("crypto");

const donation = regexp()
  .start("donation_")
  .toRegExp();
const events = regexp()
  .start("event_")
  .toRegExp();
const project = regexp()
  .start("project_")
  .toRegExp();
const training = regexp()
  .start("training_")
  .toRegExp();
const register = regexp()
  .start("registration")
  .toRegExp();
const membership = regexp()
  .start("membership")
  .toRegExp();

module.exports = {
  verify: function(req, res) {
    var secret = process.env.PAYSTACK_SECRET_KEY;

    //validate event
    var hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash == req.headers["x-paystack-signature"]) {
      // Retrieve the request's body
      var event = req.body;

      // Do something with event
      switch (event.event) {
        // when a new subscription is created
        case "subscription.create":
          User.findOne({
            select: ["companyName", "membershipId"],
            where: { email: event.data.customer.email }
          })
            .then((user, err) => {
              if (err) {
                sails.log.error(err);
              }

              var memberId;
              if (!user.membershipId) {
                memberId = user.id;
              } else {
                memberId = user.membershipId;
              }

              const d = new Date();
              const dueDate = `${d.getDate} / ${d.getMonth} / ${d.getFullYear}`;

              User.update(
                { email: event.data.customer.email },
                {
                  membershipDue: "paid",
                  dueDate: dueDate,
                  membershipLevel: event.data.plan.name,
                  dueSubscriptionCode: event.data.subscription_code
                }
              ).exec((err, info) => {
                if (err) {
                  sails.log.error(err);
                }

                audit.log(
                  "membership",
                  `${user.companyName} paid membership due`
                );

                // this block of code is written to take care of the double zero
                // added to the amount paid by the paystack people
                var amountPaid = event.data.amount;
                amountPaid = amountPaid / 100;

                var data = {
                  memberID: user.membershipId,
                  name: user.companyName,
                  type: `Payment for ${event.data.plan.name}`,
                  source: event.data.authorization.channel,
                  amount: amountPaid,
                  data: event
                };

                DuePayments.create({
                  amount: amountPaid,
                  payer: memberId
                }).exec((err, info) => {
                  if (err) {
                    sails.log.error(err);
                  }

                  audit.log(
                    "Due",
                    `${user.companyName} paid ${data.amount} their annual dues`
                  );
                });

                Payment.create(data).exec((err, level) => {
                  if (err) {
                    sails.log.error(err);
                  }

                  return res.json(200);
                });
              });
            })
            .catch(err => {
              sails.log.error(err);
              return res.json(500, { err: err });
            });

          break;

        case "charge.success":
          /*
          *Check to see if charge is subscription based or a one time payment
          */

          // when charge is subscription based
          if (event.data.plan.id) {
            User.findOne({
              select: ["companyName", "membershipId"],
              where: { email: event.data.customer.email }
            })
              .then((user, err) => {
                if (err) {
                  sails.log.error(err);
                }

                var memberId;
                if (!user.membershipId) {
                  memberId = user.id;
                } else {
                  memberId = user.membershipId;
                }

                var d = new Date();
                var dueDate = `${d.getDate} ${d.getMonth} ${d.getFullYear}`;

                User.update(
                  { email: event.data.customer.email },
                  {
                    membershipDue: "paid",
                    dueDate: dueDate,
                    membershipLevel: event.data.plan.name
                  }
                ).exec((err, info) => {
                  if (err) {
                    sails.log.error(err);
                  }

                  // this block of code is written to take care of the double zero
                  // added to the amount paid by the paystack people
                  var amountPaid = event.data.amount;
                  amountPaid = amountPaid / 100;

                  audit.log(
                    "membership",
                    `${user.companyName} paid membership annual due`
                  );

                  var data = {
                    memeberID: user.membershipId,
                    name: user.companyName,
                    type: `Payment for ${event.data.plan.name}`,
                    source: event.data.authorization.channel,
                    amount: amountPaid,
                    data: event
                  };

                  Payment.create(data).exec((err, level) => {
                    if (err) {
                      sails.log.error(err);
                    }

                    return res.send(200);
                  });
                });
              })
              .catch(err => {
                sails.log.error(err);
                return res.json(500, { err: err });
              });
          } else {
            User.findOne({
              select: ["membershipId", "companyName"],
              where: { email: event.data.customer.email }
            })
              .then((user, err) => {
                if (err) {
                  sails.log.error(err);
                }

                var memberId;
                if (!user.membershipId) {
                  memberId = user.id;
                } else {
                  memberId = user.membershipId;
                }

                // this block of code is written to take care of the double zero
                // added to the amount paid by the paystack people
                var amountPaid = event.data.amount;
                amountPaid = amountPaid / 100;

                var payment_for = event.data.metadata.custom_fields[0].value;
                var memberId = event.data.metadata.custom_fields[1].value;

                var data = {
                  memberId: memberId,
                  name: user.companyName,
                  type:
                    "Payment for " +
                    event.data.metadata.custom_fields[0].variable_name,
                  source: event.data.authorization.channel,
                  amount: amountPaid,
                  data: event
                };

                /*
                * Check what the payment is meant for
                */

                // Check if payment is towards a donation
                if (donation.test(payment_for) === true) {
                  var donationId = payment_for.split("_")[1];
                  DonationPayments.create({
                    amount: amountPaid,
                    donator: memberId,
                    donationId: donationId
                  }).exec((err, info) => {
                    if (err) {
                      sails.log.error(err);
                    }

                    audit.log(
                      "donation",
                      `${user.companyName} paid ${data.amount} for ${
                        event.data.metadata.custom_fields[0].variable_name
                      }`
                    );
                  });
                }

                // Check if payment is for a training
                if (training.test(payment_for) === true) {
                  var trainingId = payment_for.split("_")[1];
                  TrainingPayments.create({
                    amount: amountPaid,
                    payer: memberId,
                    trainingId: trainingId
                  }).exec((err, info) => {
                    if (err) {
                      sails.log.error(err);
                    }

                    audit.log(
                      "training",
                      `${user.companyName} paid ${data.amount} for ${
                        event.data.metadata.custom_fields[0].variable_name
                      }`
                    );
                  });
                }

                // Check if payment is for an event
                if (events.test(payment_for) === true) {
                  var eventId = payment_for.split("_")[1];
                  EventsPayments.create({
                    amount: amountPaid,
                    payer: memberId,
                    eventId: eventId
                  }).exec((err, info) => {
                    if (err) {
                      sails.log.error(err);
                    }

                    audit.log(
                      "event",
                      `${user.companyName} paid ${data.amount} for ${
                        event.data.metadata.custom_fields[0].variable_name
                      }`
                    );
                  });
                }

                // Check if payment is for a membership fee
                if (membership.test(payment_for) === true) {
                  //var memId = payment_for.split("_")[1];
                  MembershipPayments.create({
                    amount: amountPaid,
                    payer: memberId
                  }).exec((err, info) => {
                    if (err) {
                      sails.log.error(err);
                    }

                    User.update(
                      { id: user.id },
                      { membershipFee: "paid" }
                    ).exec((err, data) => {
                      if (err) {
                        sails.log.error(err);
                      }
                    });

                    audit.log(
                      "membership",
                      `${user.companyName} paid ${data.amount} for ${
                        event.data.metadata.custom_fields[0].variable_name
                      }`
                    );
                  });
                }

                // Check if payment is for registration
                if (register.test(payment_for) === true) {
                  //var regId = payment_for.split("_")[1];
                  RegistrationPayments.create({
                    amount: amountPaid,
                    payer: memberId
                  }).exec((err, info) => {
                    if (err) {
                      sails.log.error(err);
                    }

                    User.update(
                      { id: user.id },
                      { registrationFee: "paid" }
                    ).exec((err, data) => {
                      if (err) {
                        sails.log.error(err);
                      }
                    });

                    audit.log(
                      "registration",
                      `${user.companyName} paid ${data.amount} for ${
                        event.data.metadata.custom_fields[0].variable_name
                      }`
                    );
                  });
                }

                /*
                * Record payment details to main payment ledger
                */
                Payment.create(data).exec((err, level) => {
                  if (err) {
                    sails.log.error(err);
                  }
                  return res.json(200);
                });
              })
              .catch(err => {
                sails.log.error(err);
                return res.json(500, { err: err });
              });
          }
          break;

        case "subscription.disable":
          User.update(
            { email: event.data.customer.email },
            { membershipDue: "unpaid", dueSubscriptionCode: null }
          )
            .exec((err, data) => {
              if (err) {
                sails.log.error(err);
              }

              audit.log(
                "membership",
                user.companyName + " membership has been disabled"
              );

              return res.json(200);
            })
            .catch(err => {
              sails.log.error(err);
              return res.json(500, { err: err });
            });

          break;

        default:
          return res.json(200);
          break;
      }
    }
  }
};
