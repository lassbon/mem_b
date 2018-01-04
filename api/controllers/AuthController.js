/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine PasswordAndUsernameRequiredError
 *
 * @apiError PasswordAndUsernameRequired Username and password required.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'Username and password required.'
 *     }
 */

/**
 * @apiDefine PasswordOrUsernameInvalidError
 *
 * @apiError PasswordOrUsernameInvalid Username or password invalid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'username or password invalid.'
 *     }
 */

module.exports = {


    /**
     * `AuthController.index()`
     */
    index: function(req, res) {
        return res.json(204, 'No direct access allowed.');
    },


    /**
     * `AuthController.userLogin()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/auth/user Login a user
     * @apiName Login
     * @apiDescription This is where a user is logged in, and a token generated and returned.
     * @apiGroup Auth
     *
     * @apiParam {Number} username Username of the user.
     * @apiParam {Number} password Password of the user.
     *
     * @apiSuccess {String} user Details of the logged in user.
     * @apiSuccess {String} token  Access token for accessing all parts of the plartform.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "user": {},
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9rb2xpbGVtdWVsM"
     *     }
     *
     * 
     * @apiUse PasswordOrUsernameInvalidError
     * 
     * @apiUse PasswordAndUsernameRequiredError
     * 
     */
    userLogin: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;

        if (!email || !password) {
            return res.json(401, { status: 'error', err: 'email and password required' });
        }

        User.findOne({ email: email }, function(err, user) {
            if (!user) {
                return res.json(401, { status: 'error', err: 'invalid email or password' });
            }



            User.comparePassword(password, user, function(err, valid) {
                if (err) {
                    sails.log.error(err);
                    return res.json(403, { status: 'error', err: 'forbidden' });
                }

                if (!valid) {
                    return res.json(401, { status: 'error', err: 'invalid email or password' });
                } else {
                    res.json({
                        user: {
                            username: user.username,
                            email: user.email,
                            id: user.id,
                            role: user.role
                        },
                        token: jwToken.issue({
                            username: user.username,
                            email: user.email,
                            id: user.id,
                            role: user.role
                        })
                    });
                }
            });
        });
    },

    /**
     * `AuthController.adminLogin()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/auth/admin Login a user
     * @apiName Login
     * @apiDescription This is where a user is logged in, and a token generated and returned.
     * @apiGroup Auth
     *
     * @apiParam {Number} username Username of the user.
     * @apiParam {Number} password Password of the user.
     *
     * @apiSuccess {String} user Details of the logged in user.
     * @apiSuccess {String} token  Access token for accessing all parts of the plartform.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "user": {},
     *       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im9rb2xpbGVtdWVsM"
     *     }
     *
     * 
     * @apiUse PasswordOrUsernameInvalidError
     * 
     * @apiUse PasswordAndUsernameRequiredError
     * 
     */
    adminLogin: function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        if (!username || !password) {
            return res.json(401, { status: 'error', err: 'username and password required' });
        }

        Admin.findOne({ username: username }, function(err, admin) {
            if (!admin) {
                return res.json(401, { status: 'error', err: 'invalid username or password' });
            }



            Admin.comparePassword(password, admin, function(err, valid) {
                if (err) {
                    sails.log.error(err);
                    return res.json(403, { status: 'error', err: 'forbidden' });
                }

                if (!valid) {
                    return res.json(401, { status: 'error', err: 'invalid username or password' });
                } else {
                    res.json({
                        admin: {
                            username: admin.username,
                            email: admin.email,
                            id: admin.id,
                            role: admin.role,
                            permission: admin.permission
                        },
                        token: jwToken.issue({
                            username: admin.username,
                            email: admin.email,
                            id: admin.id,
                            role: admin.role,
                            permission: admin.permission
                        })
                    });
                }
            });
        });
    }
};