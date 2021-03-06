/**
 * ReferrerController
 *
 * @description :: Server-side logic for managing referrers
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
   * `ReferrerController.confirm()`
   *
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/referrer Approve a user
   * @apiName Approve
   * @apiDescription This is where a newly registered user is confirmed instead of beign rejected by a referee.
   * @apiGroup Referrer
   *
   * @apiParam {Number} id User id of the the user to be confirmed.
   * @apiParam {Number} refereeId Member id of the referee.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Confirmed!"
   *     }
   *
   * @apiUse UserIdNotProvidedError
   *
   * @apiUse UserNotFoundError
   */
  confirm: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No User id provided!" });
    }

    if (!req.param("refereeId")) {
      return res.json(401, { status: "error", err: "No referee id provided!" });
    }

    User.findOne({ id: req.param("id") })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        if (!user) {
          return res.json(404, {
            status: "error",
            message: "No User with such id existing"
          });
        }

        User.findOne({
          select: ["email", "membershipId"],
          where: { id: req.param("refereeId") }
        }).exec(function(err, referee) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          sails.log.info(
            req.param("id") + " is about to be confirmed by a referee."
          );

          if (user.referee1 === referee.email) {
            console.log("yes");

            user.referred1 = true;

            User.update({ id: req.param("id") }, { referred1: true }).exec(
              function(err, data) {
                if (err) {
                  sails.log.error(err);
                  return res.json(err.status, { err: err });
                }

                sails.log.info(
                  req.param("id") + " has been confirmed by the first referee."
                );
              }
            );

            if (user.referred1 === true && user.referred2 === true) {
              // alert the verifier about a new user to be verified
              sails.log.info("Verifiers about to be alerted.");
              alert.verifier(user.companyName);
            }
          }

          if (user.referee2 === referee.email) {
            user.referred2 = true;

            User.update({ id: req.param("id") }, { referred2: true }).exec(
              function(err, data) {
                if (err) {
                  sails.log.error(err);
                  return res.json(err.status, { err: err });
                }

                sails.log.info(
                  req.param("id") + " has been confirmed by the second referee."
                );
              }
            );

            if (user.referred1 === true && user.referred2 === true) {
              // alert the verifier about a new user to be verified
              sails.log.info("Verifiers about to be alerted.");
              alert.verifier(user.companyName);
            }
          }

          return res.json(200, { status: "success", message: "Success" });
        });
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `ReferrerController.reject()`
   *
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/referrer Reject a user
   * @apiName Reject
   * @apiDescription This is where a newly registered user is rejected instead of beign confirmed by a referrer.
   * @apiGroup Referrer
   *
   * @apiParam {Number} id User id of the the user to be rejected.
   * @apiParam {Number} refereeId Member id of the referee.
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
  reject: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No User id provided!" });
    }

    if (!req.param("refereeId")) {
      return res.json(401, { status: "error", err: "No referee id provided!" });
    }

    User.findOne({ id: req.param("id") })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        sails.log.info(
          req.param("id") + " is about to be rejected by a referee."
        );

        User.findOne({
          select: ["email", "membershipId"],
          where: { id: req.param("refereeId") }
        }).exec(function(err, referee) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          if (!user) {
            return res.json(404, {
              status: "error",
              message: "No User with such id existing"
            });
          } else {
            if (user.referee1 == referee.email) {
              User.update({ id: req.param("id") }, { referred1: false }).exec(
                function(err, data) {
                  if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                  }

                  sails.log.info(
                    req.param("id") + " has been rejected by the first referee."
                  );

                  alert.rejected(
                    res,
                    user.companyName,
                    user.email,
                    referee.email,
                    1
                  );
                }
              );
            } else if (user.referee2 == referee.email) {
              User.update({ id: req.param("id") }, { referred2: false }).exec(
                function(err, data) {
                  if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                  }

                  sails.log.info(
                    req.param("id") +
                      " has been rejected by the second referee."
                  );

                  alert.rejected(
                    res,
                    user.companyName,
                    user.email,
                    referee.email,
                    2
                  );
                }
              );
            } else {
              return res.json(404, {
                status: "error",
                message: "No referee with such id existing"
              });
            }
          }
        });
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `ReferrerController.get()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/social/reerrer/:id Get unapproved user(s)
   * @apiName Get
   * @apiDescription This is where unverified users are retrieved.
   * @apiGroup Referrer
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
    if (req.param("id")) {
      User.findOne()
        .where({
          id: req.param("id"),
          or: [{ referred1: false }, { referred2: false }]
        })
        .then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          if (!user) {
            return res.json(404, {
              status: "error",
              message: "No User with such id existing"
            });
          } else {
            delete user.password; // delete the password from the returned user object
            return res.json(200, user);
          }
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    } else {
      User.find()
        .where({
          role: "User",
          or: [{ referred1: false }, { referred2: false }]
        })
        .then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          // delete the password from the returned user objects
          var userData = user.map(function(item) {
            return delete item.password;
          });
          return res.json(200, userData);
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    }
  }
};
