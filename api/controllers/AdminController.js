/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 /**
 * @apiDefine AdminNotFoundError
 *
 * @apiError AdminNotFound The admin was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No admin with such id existing'
 *     }
 */

  /** 
 * @apiDefine AdminIdNotProvidedError
 *
 * @apiError AdminIdNotProvided No admin id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No admin id provided!"
 *     }
 */

module.exports = {


  /**
   * `AdminController.index()`
   */
  index : function (req, res) {
    return res.json(204, 'No direct access allowed.');
  },
	

  /**
   * `AdminController.create()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/admin Create a new admin
   * @apiName CreateAdmin
   * @apiDescription This is where a new admin is created.
   * @apiGroup Admin
   *
   * @apiParam {String} [username] Username of the admin.
   * @apiParam {String} [email] Email addresse of the admin.
   * @apiParam {String} [password] Password of the admin.
   * @apiParam {String} [confirmPassword] Confirm password of the admin.
   * @apiParam {String} [firstname] First of the admin.
   * @apiParam {String} [lastname] Last name of the admin.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "id": "59dce9c16b54d91c38847825",
   *       "role": "Admin"
   *     }
   * 
   * @apiError PasswordDoNotmatch Password do not match.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "Password doesn\'t match, What a shame!"
   *     }
   */
  create: function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {status: "error", err: 'Password doesn\'t match, What a shame!'});
    }

    // remove the confirmPassword element from the body object before saving to DB
    delete req.body.confirmPassword;
    req.body.role = 'Admin';

    User.create(req.body).exec(function (err, admin) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (admin) {
        // NOTE: payload is { id: user.id}
        res.json(200, {
          status: "success",
          id: admin.id,
          role: admin.role
        });
      }
    });
  },


  /**
   * `AdminController.delete()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/admin/:id Delete a admin
   * @apiName DeleteAdmin
   * @apiDescription This is where an admin is deleted
   * @apiGroup Admin
   *
   * @apiParam {Number} id Admin ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Admin with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse AdminIdNotProvidedError
   * 
   * @apiUse AdminNotFoundError
   */
  delete: function (req, res) {
    if (!req.param('id')) {
      return res.json(401, {err: 'No admin id provided!'});
    }else{
      User.findOne({select: 'username', where : {id : req.param('id')}}).exec(function (err, admin){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!admin){
          return res.json(200, 'No Admin with such id existing')
        }else{
          User.destroy({id : req.param('id')}).exec(function (err){
            if (err) {
              return res.json(err.status, {err: err});
            }
    
            return res.json(200, 'Admin with id '+req.param('id')+' has been deleted');
          });
        }
      });
    }
  },


  /**
   * `AdminController.update()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/admin/:id Update an admin
   * @apiName UpdateAdmin
   * @apiDescription This is where an admin is updated
   * @apiGroup Knowledgebase
   *
   * @apiParam {Number} id Admin ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Admin with id 59dce9d56b54d91c38847825 has been updated'"
   *     }
   *
   * @apiUse AdminIdNotProvidedError
   * 
   * @apiUse AdminNotFoundError
   */
  update: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {err: 'No admin id provided!'});
    }else{
      User.findOne({select: 'username', where : {id : req.param('id')}}).exec(function (err, admin){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!admin){
          return res.json(200, 'No Admin with such id existing')
        }else{
          User.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, 'Admin with id '+req.param('id')+' has been updated');
          });
        }
      });
    }
  },


  /**
   * `AdminController.get()`
   */
  get: function (req, res) {
    if(req.param('id')){
      User.findOne({select: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt'], where : {id : req.param('id')}}).exec(function (err, admin){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!admin){
          return res.json(204, 'No Admin with such id existing')
        }else{
          return res.json(200, admin);
        }
      });
    }else{
      var role = 'Admin';
      User.find({role: role}, {select: ['id', 'username', 'email', 'role', 'createdAt', 'updatedAt']}).exec(function (err, admins){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, admins);
  
        console.log(admins);
      });
    }
  }
};

