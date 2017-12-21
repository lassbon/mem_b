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
  verify: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No User id provided!'});
    }else{
      User.findOne({select: 'username', where : {id : req.param('id')}}).exec(function (err, user){
        if (err) {
          sails.log.error(err);
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(401, {status: 'error', err: 'No User with such id existing'});
        }else{
          User.update({id: req.param('id')}, {verified: true}).exec(function(err, data){
            if(err){
              sails.log.error(err);
              return res.json(err.status, {err: err});
            }

            // TODO: send email to the user alerting him/her to the state of affairs
      
            return res.json(200, 'User with id '+req.param('id')+' has been verified');
          });
        }
      });
    }
  },


  /**
   * `VerifierController.reject()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/verifier Reject a user
   * @apiName Verify
   * @apiDescription This is where a newly registered user is rejected instead of beign verified.
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
          sails.log.error(err);
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(401, {status: 'error', err: 'No User with such id existing'});
        }else{
          User.update({id: req.param('id')}, {rejected: true}).exec(function(err, data){
            if(err){
              sails.log.error(err);
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
   * `VerifierController.get()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/social/verifier/:id Get unverified user(s)
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
  get: function (req, res) {
    if(req.param('id')){
      User.findOne({id : req.param('id'), verified: false}).exec(function (err, user){
        if (err) {
          sails.log.error(err);
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
      User.find({verified: false}).exec(function (err, user){
        if (err) {
          sails.log.error(err);
          return res.json(err.status, {err: err});
        }

        // delete the password from the returned user objects
        var userData = user.map( function(item) { return delete item.password; } );
        return res.json(200, userData);
      });
    }
  }
};

