/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 /**
 * @apiDefine PasswordNotMatchError
 *
 * @apiError PasswordNotMatch Password doesn\'t match, What a shame!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'Password doesn\'t match, What a shame!'
 *     }
 */

/** 
 * @apiDefine UserInfoNotCompleteError
 *
 * @apiError UserInfoNotComplete User info not complete.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No { title | banner | description } provided!"
 *     }
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
   * `UserController.create()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/projects/post Create a new user
   * @apiName CreateUser
   * @apiDescription This is where a new user is created.
   * @apiGroup User
   *
   * @apiParam {String} [username] Username of the new user.
   * @apiParam {String} [email] Email of the new user.
   * @apiParam {String} [password] Password.
   * @apiParam {String} [confirmPassword] Confirm the password.
   * @apiParam {String} [addresse] Addresse of the business.
   * @apiParam {String} [bizNature] Nature of business.
   * @apiParam {String} [company] Name of company.
   * @apiParam {String} [phone] Phone number of company.
   * @apiParam {String} [companyRepName1] Name of first company representative.
   * @apiParam {String} [companyRepPhone1] Phone number of first company representative.
   * @apiParam {String} [companyRepEmail1] Email of first company representative.
   * @apiParam {String} [companyRepName2] Name of second company representative.
   * @apiParam {String} [companyRepPhone2] Phonenumber of second company representative.
   * @apiParam {String} [companyRepEmail2] Email of second company representative.
   * @apiParam {String} [tradeGroup] Trade group of company.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "id": "59dce9c16b54d91c38847825",
   *       "....": "....................."
   *     }
   * 
   * @apiUse PasswordNotMatchError
   * 
   * @apiUse UserInfoNotCompleteError
   */
  create: function (req, res) {

    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {status: 'error', err: 'Password doesn\'t match, What a shame!'});
    }

    // remove the confirmPassword element from the body object before saving to DB
    delete req.body.confirmPassword;

    User.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, {
          username: user.username,
          id: user.id,
          role: user.role
        });
      }
    });
  }, 


  /**
   * `UserController.delete()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/user Reject a user
   * @apiName DeleteUser
   * @apiDescription This is where a user is deleted.
   * @apiGroup User
   *
   * @apiParam {Number} id User id of the the user to be deleted.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "User with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse UserIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  delete: function (req, res) {
    if (!req.param('id')) {
      return res.json(401, {status: 'error', err: 'No User id provided!'});
    }else{ 
      User.findOne({select: 'username', where : {id : req.param('id')}}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(404, {status: 'error', message: 'No User with such id existing'});
        }else{
          User.destroy({id : req.param('id')}).exec(function (err){
            if (err) {
              return res.json(err.status, {err: err});
            }
    
            return res.json(200, {status: 'success', message: 'User with id '+req.param('id')+' has been deleted'});
          });
        }
      });
    }
  },


  /**
   * `UserController.update()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/user Reject a user
   * @apiName DeleteUser
   * @apiDescription This is where a user's info is updated.
   * @apiGroup User
   *
   * @apiParam {Number} id User id of the the user to be updated.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "User with id 59dce9d56b54d91c38847825 has been updated'"
   *     }
   *
   * @apiUse UserIdNotProvidedError
   * 
   * @apiUse UserNotFoundError
   */
  update: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No User id provided!'});
    }else{
      User.findOne({select: 'username', where : {id : req.param('id')}}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(404, {status: 'error', message: 'No User with such id existing'})
        }else{
          User.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'User with id '+req.param('id')+' has been updated'});
          });
        }
      });
    }
  },


  /**
   * `UserController.get()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/user/:id Get User(s)
   * @apiName GetUser(s)
   * @apiDescription This is where users are retrieved.
   * @apiGroup User
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
      User.findOne({select: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'], where : {id : req.param('id')}}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!user){
          return res.json(404, {status: 'error', message: 'No User with such id existing'})
        }else{
          return res.json(200, user);
        }
      });
    }else{
      var role = 'Admin';
      User.find({role: role}, {select: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']}).exec(function (err, user){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, user);
      });
    }
  }
};

