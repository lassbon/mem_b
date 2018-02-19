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

/** 
 * @apiDefine AdminEmailNotProvidedError
 *
 * @apiError AdminEmailNotProvided No admin email provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No admin email provided!"
 *     }
 */

/** 
 * @apiDefine AdminTokenNotProvidedError
 *
 * @apiError AdminTokenNotProvided No token provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No token provided!"
 *     }
 */

module.exports = {


    /**
     * `AdminController.index()`
     */
    index: function(req, res) {
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
     * @apiParam {String} username Username of the admin.
     * @apiParam {String} email Email addresse of the admin.
     * @apiParam {String} password Password of the admin.
     * @apiParam {String} confirmPassword Confirm password of the admin.
     * @apiParam {String} firstname First of the admin.
     * @apiParam {String} lastname Last name of the admin.
     * @apiParam {String} [permission] Permission level of the admin.
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
    create: function(req, res) {
        if (req.body.password !== req.body.confirmPassword) {
            return res.json(401, { status: "error", err: 'Password doesn\'t match, What a shame!' });
        }

        // remove the confirmPassword element from the body object before saving to DB
        delete req.body.confirmPassword;
        req.body.role = 'Admin';

        User.create(req.body).then(function(admin, err) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }
                // If user created successfuly we return user and token as response
                if (admin) {

                    audit.log('admin', admin.username + ' created.');

                    // NOTE: payload is { id: user.id}
                    res.json(200, {
                        status: "success",
                        id: admin.id,
                        role: admin.role
                    });
                }
            })
            .catch(function(err) {
                sails.log.error(err);
                return res.json(500, { err: err });
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
    delete: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No admin id provided!' });
        } else {
            Admin.findOne({ select: 'username', where: { id: req.param('id') } }).then(function(admin, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!admin) {
                        return res.json(404, { status: 'error', err: 'No Admin with such id existing' })
                    } else {
                        Admin.destroy({ id: req.param('id') }).exec(function(err) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('admin', who + ' deleted ' + admin.username);

                            return res.json(200, { status: 'success', message: 'Admin with id ' + req.param('id') + ' has been deleted' });
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
     * `AdminController.update()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/admin/:id Update an admin
     * @apiName UpdateAdmin
     * @apiDescription This is where an admin is updated
     * @apiGroup Admin
     *
     * @apiParam {Number} id Admin ID.
     * 
     * @apiParam {String} [password] Password of the admin.
     * @apiParam {String} [firstname] First of the admin.
     * @apiParam {String} [lastname] Last name of the admin.
     * @apiParam {String} [permission] Permission level of the admin.
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
    update: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No admin id provided!' });
        } else {
            Admin.findOne({ select: 'username', where: { id: req.param('id') } }).then(function(admin, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!admin) {
                        return res.json(404, { status: 'error', err: 'No Admin with such id existing' })
                    } else {
                        Admin.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                            if (err) {
                                sails.log.error(err);
                                return res.json(err.status, { err: err });
                            }

                            var who = jwToken.who(req.headers.authorization);
                            audit.log('admin', who + ' updated ' + admin.username);

                            return res.json(200, { status: 'success', message: 'Admin with id ' + req.param('id') + ' has been updated' });
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
     * `AdminController.get()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/admin/:id Get admin(s)
     * @apiName GetAdmin(s)
     * @apiDescription This is where admins are retrieved.
     * @apiGroup Admin
     *
     * @apiParam {Number} id admin ID.
     *
     * @apiSuccess {String} admin Admin response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse AdminNotFoundError
     */
    get: function(req, res) {
        if (req.param('id')) {
            Admin.findOne({ id: req.param('id') }).then(function(admin, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!admin) {
                        return res.json(404, { status: 'error', err: 'No Admin with such id existing' });
                    } else {

                        delete admin.password;
                        return res.json(200, admin);
                    }
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });

        } else {

            Admin.find().then(function(admins, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    admins.forEach(function(admin, err) {
                        delete admin.password;
                    });

                    return res.json(200, admins);
                })
                .catch(function(err) {
                    sails.log.error(err);
                    return res.json(500, { err: err });
                });
        }
    },

    /**
     * `AdminController.forgotPassword()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/admin/reset Forgot admin password
     * @apiName Forgot
     * @apiDescription This is where an admin forgoten password is taken care of.
     * @apiGroup Admin
     *
     * @apiParam {String} email Admin email.
     * @apiParam {String} url Url to the password change page.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Click on the link sent to your email to change your password'"
     *     }
     *
     * @apiUse AdminEmailNotProvidedError
     * 
     * @apiUse AdminNotFoundError
     */
    forgotPassword: function(req, res) {
        if (!req.param('email')) {
            return res.json(401, { status: 'error', err: 'No admin email provided!' });
        } else {
            Admin.findOne({ select: ['email', 'password'], where: { email: req.param('email') } }).then(function(admin, err) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    if (!admin) {
                        return res.json(404, { status: 'error', err: 'No Admin with such email existing' })
                    } else {
                        var resetUrl = req.param('url') + '?token=' + jwToken.resetPassword({ email: req.param('email'), password: admin.password, time: Date.now() });
                        var emailData = {
                            'email': process.env.SITE_EMAIL,
                            'from': process.env.SITE_NAME,
                            'subject': 'Your ' + process.env.SITE_NAME + ' Password Reset',
                            'body': 'Hello! <br><br> Click the link below to change your password: <br><br> <a href="' + resetUrl + '" >Change Password</a> <br><br>',
                            'to': req.param('email')
                        }

                        azureEmail.send(emailData, function(resp) {
                            if (resp === 'success') {
                                return res.json(200, { status: 'success', message: 'Click on the link sent to your email to change your password.' });
                            }

                            if (resp === 'error') {
                                return res.json(401, { status: 'error', err: 'There was an error while sending your password reset email.' });
                            }
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
     * `AdminController.changePassword()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/admin/change Change admin password
     * @apiName Change
     * @apiDescription This is where an admin password is changed.
     * @apiGroup Admin
     *
     * @apiParam {String} token Admin email token.
     * @apiParam {String} password New password.
     * @apiParam {String} confirmPassword Confirm the new password.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "message": "Click on the link sent to your email to change your password'"
     *     }
     *
     * @apiUse AdminTokenNotProvidedError

     */
    changePassword: function(req, res) {
        if (!req.param('token')) {
            return res.json(401, { status: 'error', err: 'No token provided!' });
        } else {
            jwToken.verify(req.param('token'), function(err, token) {
                if (err) {
                    sails.log.error(err);
                    return res.json(401, { status: 'error', err: 'Invalid Token!' });
                }

                if (req.param('password') !== req.param('confirmPassword')) {
                    return res.json(401, { status: "error", err: 'Password doesn\'t match, What a shame!' });
                }

                Admin.update({ email: token.email }, { password: req.param('password') }).then(function(data, err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Password successfully changed.' });
                    })
                    .catch(function(err) {
                        sails.log.error(err);
                        return res.json(500, { err: err });
                    });
            });
        }
    }
};
