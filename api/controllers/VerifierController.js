/**
 * VerifierController
 *
 * @description :: Server-side logic for managing verifiers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No User with such id existing'
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
   * `VerifierController.verify()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/verifier Verify a user
   * @apiName Verify
   * @apiDescription This is where a newly registered user is verified instead  of beign rejected.
   * @apiGroup Verifier
   *
   * @apiParam {Number} id User id of the the user to be verified.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "User with id 59dce9d56b54d91c38847825 has been verified'"
   *     }
   *
   * @apiUse UserIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  verify: function(req, res) {
    if (!req.param('id')) {
      return res.json(401, { status: 'error', err: 'No User id provided!' });
    }

    User.findOne({ id: req.param('id') }).then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        sails.log.info(req.param('id') + ' is about to be verified.');

        if (!user) {
          return res.json(404, { status: 'error', err: 'No User with such id existing' });
        } else {
          User.update({ id: req.param('id') }, { verified: true }).exec(function(err, data) {
            if (err) {
              sails.log.error(err);
              return res.json(err.status, { err: err });
            }

            sails.log.info(req.param('id') + ' has been verified.');

            alert.approver(user.companyName);

            var verificationMessage = 'Your ' + process.env.SITE_NAME + ' membership application has been verified.';

            // Send notification to the user alerting him/her on the state of affairs
            Notifications.create({ id: req.param('id'), message: verificationMessage }).exec(function(err, info) {
              if (err) {
                sails.log.error(err);
              }
            });

            // Send email to the user alerting him/her to the state of affairs
            var emailData = {
              'email': process.env.SITE_EMAIL,
              'from': process.env.SITE_NAME,
              'subject': 'Your ' + process.env.SITE_NAME + ' membership registration status',
              'body': 'Hello ' + user.companyName + '! <br><br> ' + verificationMessage + ' <br><br> Kindly wait for the approval step to take place. <br><br> All the best, <br><br>' + process.env.SITE_NAME,
              'to': user.email
            }

            azureEmail.send(emailData, function(resp) {
              if (resp === 'success') {
                sails.log.info('The email was sent successfully.');
              }

              if (resp === 'error') {
                sails.log.error(resp);
              }
            });

            return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been verified' });
          });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },


  /**
   * `VerifierController.reject()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/verifier/:id/:reason Reject a user
   * @apiName Verify
   * @apiDescription This is where a newly registered user is rejected instead of beign verified.
   * @apiGroup Verifier
   *
   * @apiParam {Number} id User id of the the user to be verified.
   * @apiParam {String} reason Reason for the user to be rejected.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "User with id 59dce9d56b54d91c38847825 has been rejected'"
   *     }
   *
   * @apiUse UserIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  reject: function(req, res) {
    if (!req.param('id')) {
      return res.json(401, { status: 'error', err: 'No User id provided!' });
    }

    if (!req.param('reason')) {
      return res.json(401, { status: 'error', err: 'No rejection reason provided!' });
    }

    User.findOne({ id: req.param('id') }).then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        sails.log.info(req.param('id') + ' is about to be rejected by a verifier.');

        if (!user) {
          return res.json(404, { status: 'error', err: 'No User with such id existing' });
        } else {
          User.update({ id: req.param('id') }, { verified: false, verifiedRejectionReason: req.param('reason') }).exec(function(err, data) {
            if (err) {
              sails.log.error(err);
              return res.json(err.status, { err: err });
            }

            sails.log.info(req.param('id') + ' has been rejected by a verifier.');

            var rejectionMessage = 'Your ' + process.env.SITE_NAME + ' membership application has been rejected.';

            // Send notification to the user alerting him/her on the state of affairs
            Notifications.create({ id: req.param('id'), message: rejectionMessage }).exec(function(err, info) {
              if (err) {
                sails.log.error(err);
              }
            });

            // Send email to the user alerting him/her to the state of affairs
            var emailData = {
              'email': process.env.SITE_EMAIL,
              'from': process.env.SITE_NAME,
              'subject': 'Your ' + process.env.SITE_NAME + ' membership registration status',
              'body': 'Hello ' + user.companyName + '! <br><br> ' + rejectionMessage + ' <br><br> ' + req.param('reason') + ' <br><br> All the best, <br><br>' + process.env.SITE_NAME,
              'to': user.email
            }

            azureEmail.send(emailData, function(resp) {
              if (resp === 'success') {
                sails.log.info('The email was sent successfully.');
              }

              if (resp === 'error') {
                sails.log.error(resp);
              }
            });

            return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been verified' });
          });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },


  /**
   * `VerifierController.get()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/verifier/:id Get unverified user(s)
   * @apiName Get
   * @apiDescription This is where unverified users are retrieved.
   * @apiGroup Verifier
   *
   * @apiParam {Number} id user ID.
   *
   * @apiSuccess {String} user Post response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "59dce9d56b54d91c38847825",
   *       ".........": "...................."
   *        .................................
   *     }
   * 
   * @apiUse UserNotFoundError
   * 
   */
  get: function(req, res) {
    if (req.param('id')) {
      User.findOne({ id: req.param('id'), verified: false }).sort('createdAt DESC').then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          if (!user) {
            return res.json(404, { status: 'error', message: 'No User with such id existing' });
          } else {
            delete user.password; // delete the password from the returned user object
            return res.json(200, user);
          }
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });

    } else {

      User.find({ verified: false, referred1: true, referred2: true }).sort('createdAt DESC').then(function(users, err) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          // delete the password from the returned user objects
          users.forEach(function(user) {
            delete user.password;
          });

          return res.json(200, users);
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    }
  }
};
