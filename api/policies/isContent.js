/**
 * isContent
 *
 * @description :: Policy to check admin permission level
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

        // we try to deny access to no admin account holders to sensitive routes
        if ((token.permission) && (token.permission == 'content' || token.permission == 'administrator' || token.permission == 'super')) {
            req.token = token; // This is the decrypted token or the payload you provided
            next();
        }else{
            sails.log.error(err);
            return res.json(401, { status: 'error', err: 'Higher permmission level needed to fully access this route!' });
        }
    });
};
