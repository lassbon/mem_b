/**
 * ApproverController
 *
 * @description :: Server-side logic for managing approvers
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
   * `ApproverController.approve()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/approver Approve a user
   * @apiName Approve
   * @apiDescription This is where a newly registered user is approved instead of beign rejected by an admin.
   * @apiGroup Approver
   *
   * @apiParam {Number} id User id of the the user to be approved.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "User with id 59dce9d56b54d91c38847825 has been approved'"
   *     }
   *
   * @apiUse UserIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  approve: function(req, res) {
    if (!req.param('id')) {
      return res.json(401, { status: 'error', err: 'No User id provided!' });
    } else {
      User.findOne({ id: req.param('id') }).then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          sails.log.info(req.param('id') + ' is about to be approved by an approver.');

          if (!user) {
            return res.json(404, { status: 'error', err: 'No User with such id existing' });
          } else {

            // create and associate membership id to the new user
            var membershipId = utility.membershipId();

            User.update({ id: req.param('id') }, { regState: 6, approved: true, membershipStatus: 'active', membershipId: membershipId }).exec(function(err, data) {
              if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
              }

              sails.log.info(req.param('id') + ' has been approved by an approver.');

              var approvalMessage = 'Your ' + process.env.SITE_NAME + ' membership application has been approved.';

              // Send notification to the user alerting him/her on the state of affairs
              Notifications.create({ id: req.param('id'), message: approvalMessage }).exec(function(err, info) {
                if (err) {
                  sails.log.error(err);
                }
              });

              // Send email to the user alerting him/her to the state of affairs
              var emailData = {
                'email': process.env.SITE_EMAIL,
                'from': process.env.SITE_NAME,
                'subject': 'Your ' + process.env.SITE_NAME + ' membership registration status',
                'body': 'Hello ' + user.companyName + '! <br><br> ' +
                  'We are very pleased to inform you that your membership application has been reviewed and approved! <br><br> ' +
				  'You are just a step away from being a member, we are very excited to have you as one of us!'+
                  'Kindly click <a href="' + process.env.MEMBERSHIP_LINK + '"> HERE</a> to proceed with your registration<br> ' +
                  'and make the necessary payments. <br><br>' +
                  'If you have any enquires please send us an email on <u>Membership@accinigeria.com</u><br /> '+
				  'Thanks!<br >'+
				  'ACCI Membership Team. <br><br>',
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

              return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been approved' });
            });
          }
        })
        
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    }
  },


  /**
   * `ApproverController.reject()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/approver Reject a user
   * @apiName Reject
   * @apiDescription This is where a newly registered user is rejected instead of beign approved by an admin.
   * @apiGroup Approver
   *
   * @apiParam {Number} id User id of the the user to be rejected.
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

        sails.log.info(req.param('id') + ' is about to be rejected by an approver.');

        if (!user) {
          return res.json(404, { status: 'error', err: 'No User with such id existing' });
        } else {
          User.update({ id: req.param('id') }, { approved: false, approvedRejectionReason: req.param('reason') }).exec(function(err, data) {
            if (err) {
              sails.log.error(err);
              return res.json(err.status, { err: err });
            }

            sails.log.info(req.param('id') + ' has been rejected by an approver.');

            var rejectionMessage = 'YOUR ' + process.env.SITE_NAME + ' MEMBERSHIP APPLICATION HAS BEEN REJECTED.<br />';
								   'We are sorry as it looks like your one or two of your chosen financial members has'+
								   'declined your request for confirmation.<br />'+
								   'We also do advise you to call your chosen Financial Member first,'+
								   'so s/he gets to know that you will be needing them for confirmation in order to continue '+
								   'the registration process.<br />'+
								   'If you have any enquires please send us an email on Membership@accinigeria.com or call <br /><br />'+
								   'Thanks!<br />' +
								   'ACCI Membership Team';


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
              'body': 'Hello ' + user.companyName + '! <br><br> ' + rejectionMessage ,
			  'to': user.email
            }
			// //+ ' <br><br> ' + req.param('reason') + ' <br><br> All the best, <br><br>' + process.env.SITE_NAME,

            azureEmail.send(emailData, function(resp) {
              if (resp === 'success') {
                sails.log.info('The email was sent successfully.');
              }

              if (resp === 'error') {
                sails.log.error(resp);
              }
            });

            return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been approved' });
          });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },


  /**
   * `ApproverController.get()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/social/approver/:id Get unapproved user(s)
   * @apiName Get
   * @apiDescription This is where unapproved users are retrieved.
   * @apiGroup Approver
   *
   * @apiParam {Number} id user ID.
   *
   * @apiSuccess {String} comment Post response from API.
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
   */
  get: function(req, res) {
    if (req.param('id')) {
      User.findOne({ id: req.param('id'), approved: false }).sort('createdAt DESC').then(function(user, err) {
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
      User.find({ approved: false, verified: true }).sort('createdAt DESC').then(function(users, err) {
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
          return res.json(err.status, { err: err });
        });
    }
  }
};
