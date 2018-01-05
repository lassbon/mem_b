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
     * @apiParam {String} username Username of the new user.
     * @apiParam {String} email Email of the new user.
     * @apiParam {String} password Password.
     * @apiParam {String} confirmPassword Confirm the password.
     * @apiParam {String} address Addresse of the business.
     * @apiParam {String} bizNature Nature of business.
     * @apiParam {String} company Name of company.
     * @apiParam {String} phone Phone number of company.
     * @apiParam {String} companyRepName1 Name of first company representative.
     * @apiParam {String} companyRepPhone1 Phone number of first company representative.
     * @apiParam {String} companyRepEmail1 Email of first company representative.
     * @apiParam {String} companyRepName2 Name of second company representative.
     * @apiParam {String} companyRepPhone2 Phonenumber of second company representative.
     * @apiParam {String} companyRepEmail2 Email of second company representative.
     * @apiParam {String} tradeGroup Trade group of company.
     * @apiParam {String} annualReturn Annual return of company.
     * @apiParam {String} annualProfits Annual profits of company.
     * @apiParam {String} employees Employee count of company.
     * @apiParam {String} referrer1 Email of first referrer.
     * @apiParam {String} referrer2 Email of second referrer.
     * @apiParam {String} [profileImage] Profile image for the company/member.
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
    create: function(req, res) {

        console.log(req.param('email'));

        // if (req.body.password !== req.body.confirmPassword) {
        //     return res.json(401, { status: 'error', err: 'Password doesn\'t match, What a shame!' });
        // }

        // remove the confirmPassword element from the body object before saving to DB
        delete req.body.confirmPassword;

        // create and add membership id to the body content
        req.body.membershipId = utility.membershipId(req.body.email);

        User.create(req.body).exec(function(err, user) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }
            // If user created successfuly we return user and token as response
            if (user) {
                // NOTE: payload is { id: user.id}
                res.json(200, {
                    email: user.email,
                    id: user.id,
                    role: user.role
                });
            }
        });
    },

    /**
     * `ProjectsController.uploadBanner()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/user/upload Upload a profile image
     * @apiName UploadImage
     * @apiDescription This is where a profile image is uploaded (Make sure image file extension is either jpg or png).
     * @apiGroup User
     *
     * @apiParam {String} image Profile image file to be uploaded.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "bannerUrl": "https://accicloud.blob.core.windows.net/user/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg"
     *     }
     *
     * @apiError ImageNotUploaded No image uploaded.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No image uploaded!"
     *     }
     */
    uploadImage: function(req, res) {
        if (req.method != 'POST') return res.notFound();

        var container = 'userprofile';

        azureBlob.createContainerIfNotExists(container, function() {
            req.file('image')
                .upload({
                    maxBytes: 5000000,
                    adapter: require('skipper-azure'),
                    key: process.env.AZURE_STORAGE_ACCOUNT,
                    secret: process.env.AZURE_STORAGE_ACCESS_KEY,
                    container: container
                }, function whenDone(err, uploadedFiles) {
                    if (err) { 
                        sails.log.error(err);
                        return res.negotiate(err);
                    } else if (uploadedFiles.length === 0) {
                        return res.json(401, { status: 'error', err: 'No image uploaded!' });
                    } else return res.ok({
                        status: 'success',
                        bannerUrl: process.env.AZURE_STORAGE_ACCOUNT_URL + container + '/' + uploadedFiles[0].fd
                    });
                });
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
    delete: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No User id provided!' });
        } else {
            User.findOne({ select: ['username', 'profileImage'], where: { id: req.param('id') } }).exec(function(err, user) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!user) {
                    return res.json(404, { status: 'error', err: 'No User with such id existing' });
                } else {
                    User.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        if (user.profileImage) {
                            var url = user.profileImage;
                            azureBlob.delete('user', url.split('/').reverse()[0]);
                        }

                        var who = jwToken.who(req.headers.authorization);
                        audit.log('user', who + ' deleted '+ user.company );

                        return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been deleted' });
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
    update: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No User id provided!' });
        } else {
            User.findOne({ select: ['username', 'profileImage'], where: { id: req.param('id') } }).exec(function(err, user) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!user) {
                    return res.json(404, { status: 'error', err: 'No User with such id existing' })
                } else {

                    if (user.profileImage && user.profileImage !== req.param('image')) {
                        var url = user.profileImage;
                        azureBlob.delete('user', url.split('/').reverse()[0]);
                    }

                    User.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        var who = jwToken.who(req.headers.authorization);
                        audit.log('user', who + ' edited '+ user.company );

                        return res.json(200, { status: 'success', message: 'User with id ' + req.param('id') + ' has been updated' });
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
    get: function(req, res) {
        if (req.param('id')) {
            User.findOne({ id: req.param('id') }).exec(function(err, user) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!user) {
                    return res.json(404, { status: 'error', err: 'No User with such id existing' })
                } else {
                    delete user.password;
                    return res.json(200, user);
                }
            });
        } else {
            User.find().exec(function(err, user) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, user);
            });
        }
    },

    /**
     * `UserController.forgotPassword()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/user/:id Forgot user password
     * @apiName Forgot
     * @apiDescription This is where an user forgoten password is taken care of.
     * @apiGroup User
     *
     * @apiParam {String} email User email.
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
     * @apiUse UserEmailNotProvidedError
     * 
     * @apiUse UserNotFoundError
     */
    forgotPassword: function(req, res) {
        if (!req.param('email')) {
            return res.json(401, { status: 'error', err: 'No user email provided!' });
        } else {
            User.findOne({ select: ['email', 'password', 'username'], where: { email: req.param('email') } }).exec(function(err, user) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!user) {
                    return res.json(404, { status: 'error', err: 'No User with such email existing' })
                } else {
                    var resetUrl = req.param('url') + '?token=' + jwToken.resetPassword({ email: req.param('email'), password: user.password, time: Date.now() });
                    var emailData = {
                        'email': process.env.SITE_EMAIL,
                        'from': process.env.SITE_NAME,
                        'subject': 'Your ' + process.env.SITE_NAME + ' Password Reset',
                        'body': 'Hello ' + user.username + '! <br><br> Click the link below to change your password: <br><br> <a href="' + resetUrl + '" >Change Password</a> <br><br>',
                        'to': req.param('email')
                    }

                    azureEmail.send(emailData, function(resp) {
                        if (resp === 'success') {
                            return res.json(200, { status: 'success', message: 'Click on the link sent to your email to change your password.' });
                        }

                        if (resp === 'error') {
                            return res.json(401, { status: 'error', message: 'There was an error while sending your password reset email.' });
                        }
                    });
                }
            });
        }
    },

    /**
     * `UserController.changePassword()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/user/change/:token Change user password
     * @apiName Change
     * @apiDescription This is where an user password is changed.
     * @apiGroup User
     *
     * @apiParam {String} token User email token.
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
     * @apiUse UserTokenNotProvidedError

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

                User.update({ email: token.email }, { password: req.param('password') }).exec(function(err, data) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    var who = jwToken.who(req.headers.authorization);
                    audit.log('user', who + ' changed password' );

                    return res.json(200, { status: 'success', message: 'Password successfully changed.' });
                });
            });
        }
    },
};
