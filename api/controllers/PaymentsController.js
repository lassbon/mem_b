/**
 * PaymentsController
 *
 * @description :: Server-side logic for viewing payments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine PaymentNotFoundError
 *
 * @apiError PaymentNotFound The Payment was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No payment matched your search term'
 *     }
 */

module.exports = {

    /**
     * `PaymentsController.get()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/levels/:id Get project(s)
     * @apiName GetPayment
     * @apiDescription This is where levels are retrieved.
     * @apiGroup Payments
     *
     * @apiParam {String} [term] Search term.
     * @apiParam {String} [field] Search field.
     *
     * @apiSuccess {String} payments Response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "id": "59dce9d56b54d91c38847825",
     *       ".........": "...................."
     *        .................................
     *     }
     * 
     * @apiUse PaymentNotFoundError
     */
    get: function(req, res) {
        var offset, limit = 0;

        var field = req.param('field');

        if (req.param('offset')) {
            offset = req.param('offset');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        if (field && req.param('term')) {

            Payment.find({ field: req.param('term') }).limit(limit)
                .skip(offset).exec(function(err, payments) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, payments);
                });
        } else {

            Payment.find().limit(limit)
                .skip(offset).exec(function(err, payments) {
                    if (err) {
                        sails.log.error(err);
                        return res.json(err.status, { err: err });
                    }

                    return res.json(200, payments);
                });
        }
    }
};
