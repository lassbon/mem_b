/**
 * AuditController
 *
 * @description :: Server-side logic for viewing audits
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine AuditNotFoundError
 *
 * @apiError AuditNotFound The record was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "err": 'No audit matched your search term'
 *     }
 */

module.exports = {

    /**
     * `AuditController.get()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/audits/:id Get project(s)
     * @apiName GetAudit
     * @apiDescription This is where audits are retrieved.
     * @apiGroup Audits
     *
     * @apiParam {String} [term] Search term.
     * @apiParam {String} [field] Search field.
     *
     * @apiSuccess {String} audits Response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse AuditNotFoundError
     */
    get: function(req, res) {
        var offset, limit = 0;

        var field = req.param('field')

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        if (field && req.param('term')) {

            Audit.find({ field: req.param('term') }).limit(limit)
                .skip(offset).exec(function(err, audits) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, audits);
                });
        } else {

            Audit.find().limit(limit)
                .skip(offset).exec(function(err, audits) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, audits);
                });
        }
    }
};
