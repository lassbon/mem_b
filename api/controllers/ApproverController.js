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
  approve: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No User id provided!'});
    }else{
      User.findOne({select: 'username', where : {id : req.param('id')}}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(404, {status: 'error', message: 'No User with such id existing'});
        }else{
          User.update({id: req.param('id')}, {approved: true}).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }

            // TODO: send email to the user alerting him/her to the state of affairs
            return res.json(200, {status: 'success', message: 'User with id '+req.param('id')+' has been approved'});
          });
        }
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
  reject: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No User id provided!'});
    }else{
      User.findOne({select: 'username', where : {id : req.param('id')}}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(404, {status: 'error', message: 'No User with such id existing'});
        }else{
          User.update({id: req.param('id')}, {rejected: true}).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }

            // TODO: send email to the user alerting him/her to the state of affairs
            return res.json(200, {status: 'success', message: 'User with id '+req.param('id')+' has been rejected'});
          });
        }
      });
    }
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
  get: function (req, res) {
    if(req.param('id')){
      User.findOne({id : req.param('id'), approved: false}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(404, {status: 'error', message: 'No User with such id existing'});
        }else{
          delete user.password; // delete the password from the returned user object
          return res.json(200, user);
        }
      });
    }else{
      User.find({approved: false}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }

        // delete the password from the returned user objects
        var userData = user.map( function(item) { return delete item.password; } );
        return res.json(200, userData);
      });
    }
  }
};

