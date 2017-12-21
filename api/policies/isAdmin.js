/**
 * isAdmin
 *
 * @description :: Policy to check user role (if user or admin)
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function(req, res, next) {
    var token;

    if (req.headers && req.headers.authorization) {
        token = req.headers.authorization;
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        return res.json(401, { status: 'error', err: 'No Authorization header was found' });
    }

    jwToken.verify(token, function(err, token) {
        if (err) {
            sails.log.error(err);
            return res.json(401, { status: 'error', err: 'Invalid Token!' });
        }

        // we try to deny access to no admin account holders to the admin backend
        if (token.role && token.role == 'Admin') {
            req.token = token; // This is the decrypted token or the payload you provided
            next();
        }else{
            sails.log.error(err);
            return res.json(401, { status: 'error', err: 'Admin access denied!' });
        }
    });
};
