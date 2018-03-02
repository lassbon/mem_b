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

/**
 * @apiDefine UserEmailNotProvidedError
 *
 * @apiError UserEmailNotProvided No User email provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No User Email provided!"
 *     }
 */

/**
 * @apiDefine UserTokenNotProvidedError
 *
 * @apiError UserTokenNotProvided No User token provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No token provided!"
 *     }
 */

/**
 * @apiDefine SearchTermNotProvidedError
 *
 * @apiError SearchTermNotProvided No search term provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No search term provided!"
 *     }
 */

module.exports = {
  /**
     * `UserController.create()`
     *
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/user Create a new user
     * @apiName CreateUser
     * @apiDescription This is where a new user is created.
     * @apiGroup User
     *
     * @apiParam {String} email Email of the new user.
     * @apiParam {String} password Password.
     * @apiParam {String} confirmPassword Confirm the password.
     * @apiParam {String} address Addresse of the business.
     * @apiParam {String} bizNature Nature of business.
     * @apiParam {String} companyName Name of company.
     * @apiParam {String} companyCOIUrl Document URL of company certificate if incoporation.
     * @apiParam {String} phone Phone number of company.
     * @apiParam {String} companyRepName1 Name of first company representative.
     * @apiParam {String} companyRepPhone1 Phone number of first company representative.
     * @apiParam {String} companyRepEmail1 Email of first company representative.
     * @apiParam {String} companyRepPassportUrl1 Passport URL of first company representative.
     * @apiParam {String} companyRepCVUrl1 CV URL of first company representative.
     * @apiParam {String} companyRepName2 Name of second company representative.
     * @apiParam {String} companyRepPhone2 Phonenumber of second company representative.
     * @apiParam {String} companyRepEmail2 Email of second company representative.
     * @apiParam {String} companyRepPassportUrl2 Passport URL of second company representative.
     * @apiParam {String} companyRepCVUrl2 CV URL of second company representative.
     * @apiParam {String} tradeGroup Trade group of company.
     * @apiParam {String} annualReturn Annual return of company.
     * @apiParam {String} annualProfits Annual profits of company.
     * @apiParam {String} employees Employee count of company.
     * @apiParam {String} referee1 Email of first referrer.
     * @apiParam {String} referee2 Email of second referrer.

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
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {
        status: "error",
        err: "Passwords doesn't match, What a shame!"
      });
    }

    // remove the confirmPassword element from the body object before saving to DB
    delete req.body.confirmPassword;

    User.findOne({ email: req.param("email") })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        }

        if (user) {
          return res.json(404, {
            status: "error",
            err: "An account with that email already exists."
          });
        } else {
          User.create(req.body).then(function(user, err) {
            if (err) {
              sails.log.error(err);
              return res.json(503, { err: err });
            }

            // If user created successfuly we return user and token as response
            if (user) {
              // // Send email to the user alerting him/her to the state of affairs
              // var emailData = {
              //     'email': process.env.SITE_EMAIL,
              //     'from': process.env.SITE_NAME,
              //     'subject': 'Your ' + process.env.SITE_NAME + ' membership registration status',
              //     'body': 'Hello ' + user.companyName + '! <br><br> Your registration process has begun.<br><br> Kindly execise patience as your apointed referees aprove your registration. <br><br> All the best, <br><br>' + process.env.SITE_NAME,
              //     'to': user.email
              // }

              // azureEmail.send(emailData, function(resp) {
              //     if (resp === 'success') {
              //         sails.log.info('The email was sent successfully.');
              //     }

              //     if (resp === 'error') {
              //         sails.log.error(resp);
              //     }
              // });

              res.json(200, {
                email: user.email,
                id: user.id,
                role: user.role
              });
            }
          });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `UserController.validateReferee()`
   *
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/validatereferee Validate a referee
   * @apiName ValidateReferee
   * @apiDescription This is where a referee is validated.
   * @apiGroup User
   *
   * @apiParam {Number} email Email of the referee to be validated.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "The referee is valid"
   *     }
   */
  validateReferee: function(req, res) {
    User.findOne({
      select: ["membershipFee", "membershipStatus", "membershipDue"],
      where: {
        membershipDue: "paid",
        membershipFee: "paid",
        membershipStatus: "active",
        email: req.body.email
      }
    })
      .then(function(referee, err) {
        if (err) {
          sails.log.error(err);
          return res.json(status, { status: "error", err: err });
        }

        if (!referee) {
          return res.json(404, {
            status: "error",
            err: "The referee is either invalid or not fully paid"
          });
        } else {
          return res.json(200, {
            status: "success",
            message: "The referee is valid"
          });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `UserController.alertReferee()`
   *
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/alertreferee Alert a referee
   * @apiName AlertReferee
   * @apiDescription This is where a referee is alerted to confirm a new membership applicant.
   * @apiGroup User
   *
   * @apiParam {Number} id Id of the user to be conformed by referees
   * @apiParam {String} referrerUrl Url to redirect the referee to (must have a trailing slash).
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "The referees has been alerted."
   *     }
   */
  alertReferee: function(req, res) {
    User.findOne({
      select: ["referee1", "referee2", "referred1", "referred2", "companyName"],
      where: { id: req.body.id }
    })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(404, { status: "error", err: err });
        }

        if (!user) {
          return res.json(404, {
            status: "error",
            err: "The referee is either invalid or not fully paid"
          });
        } else {
          // Send action email to the users apointed referees
          if (user.referee1 && user.referred1 == false) {
            alert.referee(user.companyName, user.id, user.referee1);
          }

          if (user.referee2 && user.referred2 == false) {
            alert.referee(user.companyName, user.id, user.referee2);
          }

          // Send email to the user alerting him/her to the state of affairs
          var emailData = {
            email: process.env.SITE_EMAIL,
            from: process.env.SITE_NAME,
            subject:
              "Your " +
              process.env.SITE_NAME +
              " membership registration status",
            body:
              "Hello " +
              user.companyName +
              "! <br><br> " +
              "Thank you for your interest in ACCI!  Emails have been sent to your chosen financial members for confirmation." +
              "Your registration process has begun. <br><br>" +
              " Kindly execise patience as your apointed referees confirm your application. <br><br>" +
              "We will keep you updated! If you have any enquires please send us an email on <u>Membership@accinigeria.com</u> <br><br><br />" +
              "Thanks! <br />ACCI Membership Team",
            to: user.email
          };

          azureEmail.send(emailData, function(resp) {
            if (resp === "success") {
              return res.json(200, {
                status: "success",
                message: "The referees has been alerted."
              });
            }

            if (resp === "error") {
              sails.log.error(resp);
            }
          });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `UserController.uploadFile()`
   *
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/user/upload Upload a file
   * @apiName UploadFile
   * @apiDescription This is where a file is uploaded .
   * @apiGroup User
   *
   * @apiParam {String} file File to be uploaded.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "bannerUrl": "https://accicloud.blob.core.windows.net/userfiles/27ba91b3-ab78-4240-aa6c-a1f32230227c.jpg"
   *     }
   *
   * @apiError FileNotUploaded No file uploaded.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No file uploaded!"
   *     }
   */
  uploadImage: function(req, res) {
    if (req.method != "POST") return res.notFound();

    var container = "userfiles";

    azureBlob.createContainerIfNotExists(container, function() {
      req.file("file").upload(
        {
          maxBytes: 5000000,
          adapter: require("skipper-azure"),
          key: process.env.AZURE_STORAGE_ACCOUNT,
          secret: process.env.AZURE_STORAGE_ACCESS_KEY,
          container: container
        },
        function whenDone(err, uploadedFiles) {
          if (err) {
            sails.log.error(err);
            return res.negotiate(err);
          } else if (uploadedFiles.length === 0) {
            return res.json(401, { status: "error", err: "No file uploaded!" });
          } else {
            return res.ok({
              status: "success",
              bannerUrl:
                process.env.AZURE_STORAGE_ACCOUNT_URL +
                container +
                "/" +
                uploadedFiles[0].fd
            });
          }
        }
      );
    });
  },

  /**
   * `UserController.addCompanyImage()`
   *
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/user/companyimage Add images to company image collection
   * @apiName AddCompanyImages
   * @apiDescription This is where images are added to company image collection
   * @apiGroup User
   *
   * @apiParam {String} id User Id.
   * @apiParam {String} url Url to image resource.
   */
  addCompanyImage: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No user id provided!" });
    }

    if (!req.param("url")) {
      return res.json(401, { status: "error", err: "No image url provided!" });
    }

    User.findOne({
      select: ["companyName", "companyImages"],
      where: { id: req.param("id") }
    })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        if (!user) {
          return res.json(404, {
            status: "error",
            message: "No user with such id existing"
          });
        } else {
          var companyImages = user.companyImages ? user.companyImages : [];

          var stat = true;

          for (var i = 0; i < companyImages.length; i++) {
            var name = companyImages[i];
            if (name == req.param("url")) {
              stat = false;
              break;
            }
          }

          if (stat == false) {
            return res.json(409, {
              status: "error",
              err: "Image exists already"
            });
          } else {
            companyImages.push(req.param("url"));

            User.update(
              { id: req.param("id") },
              { companyImages: companyImages }
            ).exec(function(err, images) {
              return res.json(200, {
                status: "success",
                message: "Image added"
              });
            });
          }
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `UserController.removeCompanyImage()`
   *
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/user/companyimage/:id/:url Remove images to company image collection
   * @apiName RemoveCompanyImages
   * @apiDescription This is where images are removed from company image collection
   * @apiGroup User
   *
   * @apiParam {String} id User Id.
   * @apiParam {String} url Url to image resource.
   */
  removeCompanyImage: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No user id provided!" });
    }

    if (!req.param("url")) {
      return res.json(401, { status: "error", err: "No image url provided!" });
    }

    User.findOne({
      select: ["companyName", "companyImages"],
      where: { id: req.param("id") }
    })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        if (!user) {
          return res.json(404, {
            status: "error",
            err: "No user with such id existing"
          });
        } else {
          var likes = user.likes ? user.likes : [];

          var stat = false;

          for (var i = 0; i < likes.length; i++) {
            var name = likes[i];
            if (name == req.param("url")) {
              stat = true;
              break;
            }
          }

          if (stat == false) {
            return res.json(403, {
              status: "error",
              err: "Image not already existing"
            });
          } else {
            for (var i = user.likes.length; i--; ) {
              if (user.likes[i] === req.param("url")) {
                user.likes.splice(i, 1);
              }
            }

            User.update({ id: req.param("id") }, { likes: user.likes }).exec(
              function(err, user) {
                return res.json(200, {
                  status: "success",
                  message: "Image removed"
                });
              }
            );
          }
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
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
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No User id provided!" });
    } else {
      User.findOne({
        select: ["username", "profileImage"],
        where: { id: req.param("id") }
      })
        .then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(500, { err: err });
          }

          if (!user) {
            return res.json(404, {
              status: "error",
              err: "No User with such id existing"
            });
          } else {
            User.destroy({ id: req.param("id") }).exec(function(err) {
              if (err) {
                sails.log.error(err);
                return res.json(500, { err: err });
              }

              if (user.profileImage) {
                var url = user.profileImage;
                azureBlob.delete("user", url.split("/").reverse()[0]);
              }

              var who = jwToken.who(req.headers.authorization);
              audit.log("user", who + " deleted " + user.companyName);

              return res.json(200, {
                status: "success",
                message: "User with id " + req.param("id") + " has been deleted"
              });
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
     * `UserController.update()`
     *
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/user Update a user
     * @apiName UpdateUser
     * @apiDescription This is where a user's info is updated.
     * @apiGroup User
     *
     * @apiParam {Number} id User id of the the user to be updated.

     * @apiParam {String} email Email of the new user.
     * @apiParam {String} password Password.
     * @apiParam {String} confirmPassword Confirm the password.
     * @apiParam {String} address Addresse of the business.
     * @apiParam {String} bizNature Nature of business.
     * @apiParam {String} companyName Name of company.
     * @apiParam {String} companyCOIUrl Document URL of company certificate if incoporation.
     * @apiParam {String} phone Phone number of company.
     * @apiParam {String} companyRepName1 Name of first company representative.
     * @apiParam {String} companyRepPhone1 Phone number of first company representative.
     * @apiParam {String} companyRepEmail1 Email of first company representative.
     * @apiParam {String} companyRepPassportUrl1 Passport URL of first company representative.
     * @apiParam {String} companyRepCVUrl1 CV URL of first company representative.
     * @apiParam {String} companyRepName2 Name of second company representative.
     * @apiParam {String} companyRepPhone2 Phonenumber of second company representative.
     * @apiParam {String} companyRepEmail2 Email of second company representative.
     * @apiParam {String} companyRepPassportUrl2 Passport URL of second company representative.
     * @apiParam {String} companyRepCVUrl2 CV URL of second company representative.
     * @apiParam {String} tradeGroup Trade group of company.
     * @apiParam {String} annualReturn Annual return of company.
     * @apiParam {String} annualProfits Annual profits of company.
     * @apiParam {String} employees Employee count of company.
     * @apiParam {String} referee1 Email of first referrer.
     * @apiParam {String} referee2 Email of second referrer.

     * @apiParam {String} [profileImage] Profile image for the company/member.
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
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No User id provided!" });
    } else {
      User.findOne({
        select: ["username", "profileImage", "regState", "annualProfit"],
        where: { id: req.param("id") }
      })
        .then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(500, { err: err });
          }

          if (!user) {
            return res.json(404, {
              status: "error",
              err: "No User with such id existing"
            });
          } else {
            // Recommend a membership type for the user based on annual profits
            if (req.body.regState && req.body.regState == 1) {
              var recommendedmembershipType = "";

              if (
                req.body.annualProfit === "N100,000,001 and above" ||
                req.body.annualProfit === "N5,000,001 - N10,000,000" ||
                req.body.annualProfit === "N3,000,001 - N5,000,000"
              ) {
                recommendedmembershipType = "Gold";
              }

              if (req.body.annualProfit === "N1,000,001 - N3,000,000") {
                recommendedmembershipType = "Silver";
              }

              if (req.body.annualProfit === "N501,000 - N1,000,000") {
                recommendedmembershipType = "Bronze";
              }

              if (req.body.annualProfit === "N100,000 - N500,000") {
                recommendedmembershipType = "Brass";
              }

              req.body.recommendedLevel = recommendedmembershipType;
            }

            if (user.profileImage && user.profileImage !== req.param("image")) {
              var url = user.profileImage;
              azureBlob.delete("user", url.split("/").reverse()[0]);
            }

            User.update({ id: req.param("id") }, req.body).exec(function(
              err,
              data
            ) {
              if (err) {
                sails.log.error(err);
                return res.json(500, { err: err });
              }

              var who = jwToken.who(req.headers.authorization);
              audit.log("user", who + " edited " + user.companyName);

              return res.json(200, {
                status: "success",
                message: "User with id " + req.param("id") + " has been updated"
              });
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
    if (req.param("id")) {
      User.findOne({ id: req.param("id") })
        .then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(500, { err: err });
          }

          if (!user) {
            return res.json(404, {
              status: "error",
              err: "No User with such id existing."
            });
          } else {
            delete user.password;
            return res.json(200, user);
          }
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    } else {
      User.find()
        .sort("createdAt DESC")
        .then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(500, { err: err });
          }

          return res.json(200, user);
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    }
  },

  /**
   * `UserController.getActiveUsers()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/activeusers Get User(s)
   * @apiName GetUser(s)
   * @apiDescription This is where active users are retrieved.
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
  getActiveUsers: function(req, res) {
    User.find({
      membershipStatus: "active",
      membershipDue: "paid",
      membershipFee: "paid",
      referred1: true,
      referred2: true
    })
      .sort("createdAt DESC")
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        }

        return res.json(200, user);
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  getOldMember: function(req, res) {
    User.findOne({ membershipId: req.param("membershipId"), oldMember: true })
      .sort("createdAt DESC")
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        }

        if (!user) {
          return res.json(404, {
            status: "error",
            err: "No User with such id existing..."
          });
        } else {
          delete user.password;
          return res.json(200, user);
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `UserController.searchUser()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/searchuser/:searchTerm/:page/:limit Search for document(s)
   * @apiName SearchUser
   * @apiDescription This is where users are searched.
   * @apiGroup User
   *
   * @apiParam {String} searchTerm Search term to be searched.
   * @apiParam {String} [page] Current page of the search result.
   * @apiParam {String} [limit] Number of search items per page.
   *
   * @apiSuccess {String} page Current page of the search result.
   * @apiSuccess {String} limit  Number of search items per page.
   * @apiSuccess {String} result  Result of the search.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "page": "1",
   *       "limit": "10",
   *       "result": [{}]
   *     }
   *
   * @apiUse SearchTermNotProvidedError
   *
   */
  searchUser: function(req, res) {
    var page = 0;
    var limit = 10;

    if (req.param("page") && req.param("page") > 1) {
      page = req.param("page");
    }

    if (req.param("limit")) {
      limit = req.param("limit");
    }

    if (!req.param("searchTerm")) {
      return res.json(401, {
        status: "error",
        err: "No search term provided!"
      });
    } else {
      User.find({
        companyName: { contains: req.param("searchTerm") },
        membershipDue: "paid",
        membershipFee: "paid",
        membershipStatus: "active"
      })
        .sort("createdAt DESC")
        .paginate({ page: page, limit: limit })
        .then(function(users, err) {
          if (err) {
            sails.log.error(err);
            return res.json(500, { err: err });
          }

          return res.json(200, { page: page, limit: limit, result: users });
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    }
  },

  /**
   * `UserController.getAtivity()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/useractivity/:id Get User social activity
   * @apiName GetUserActivity
   * @apiDescription This is where users activity is retrieved.
   * @apiGroup User
   *
   * @apiParam {Number} id user ID.
   *
   * @apiSuccess {String} user User activity response from API.
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
  getActivity: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No User id provided!" });
    }

    User.findOne({
      select: ["membershipId", "profileImage"],
      where: { id: req.param("id") }
    })
      .sort("createdAt DESC")
      .populate("posts", { sort: "createdAt DESC" })
      .populate("friends")
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        }

        if (!user) {
          return res.json(404, {
            status: "error",
            err: "No User with such id existing"
          });
        }

        delete user.password;
        return res.json(200, user);
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `UserController.getFriends()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/useractivity/:id Get user friends
   * @apiName GetUserFriends
   * @apiDescription This is where users friends is retrieved.
   * @apiGroup User
   *
   * @apiParam {Number} id user ID.
   *
   * @apiSuccess {String} user User activity response from API.
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
  getFriends: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No User id provided!" });
    }

    User.findOne({ select: "membershipId", where: { id: req.param("id") } })
      .sort("createdAt DESC")
      .populate("friends", {
        select: ["email", "membershipId", "companyName", "profileImage"]
      })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        }

        if (!user) {
          return res.json(404, {
            status: "error",
            err: "No User with such id existing"
          });
        } else {
          delete user.password;
          return res.json(200, user);
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `UserController.getCount()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/user/usercount Get User count
   * @apiName GetCount
   * @apiDescription This is where user count is obtained.
   * @apiGroup User
   */
  getCount: function(req, res) {
    User.count()
      .then(function(userCount, err) {
        if (err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        }

        return res.json(200, userCount.toString());
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
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
    if (!req.param("email")) {
      return res.json(401, { status: "error", err: "No user email provided!" });
    } else {
      User.findOne({
        select: ["email", "password", "username"],
        where: { email: req.param("email") }
      })
        .then(function(user, err) {
          if (err) {
            sails.log.error(err);
            return res.json(500, { err: err });
          }

          if (!user) {
            return res.json(404, {
              status: "error",
              err: "No User with such email existing"
            });
          } else {
            var resetUrl =
              process.env.RESET_PASSWORD +
              "?token=" +
              jwToken.resetPassword({
                email: req.param("email"),
                password: user.password,
                time: Date.now()
              });
            var emailData = {
              email: process.env.SITE_EMAIL,
              from: process.env.SITE_NAME,
              subject: "Your " + process.env.SITE_NAME + " Password Reset",

              body:
                "Hello " +
                user.companyName +
                "! <br><br> " +
                "We received a request to reset the password on your account. To reset your password please follow the link below: <br><br>" +
                '<a href="' +
                resetUrl +
                '" style="color: green;">Change Password</a><br><br>' +
                "If you did not initiate this password reset request, you can ignore this email.<br><br>" +
                "If you suspect someone may have unauthorized access to your account, kindly report to membership@accinigeria.com<br><br>" +
                "If you need help or have any questions, please reach out to our team at membership@accinigeria.com<br><br>" +
                "Thank you! <br><br>" +
                process.env.SITE_NAME,

              to: req.param("email")
            };

            azureEmail.send(emailData, function(resp) {
              if (resp === "success") {
                return res.json(200, {
                  status: "success",
                  message:
                    "Click on the link sent to your email to change your password."
                });
              }

              if (resp === "error") {
                return res.json(401, {
                  status: "error",
                  message:
                    "There was an error while sending your password reset email."
                });
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
    if (!req.param("token")) {
      return res.json(401, { status: "error", err: "No token provided!" });
    } else {
      jwToken.verify(req.param("token"), function(err, token) {
        if (err) {
          sails.log.error(err);
          return res.json(401, { status: "error", err: "Invalid Token!" });
        }

        if (req.param("password") !== req.param("confirmPassword")) {
          return res.json(401, {
            status: "error",
            err: "Password doesn't match, What a shame!"
          });
        }

        User.update({ email: token.email }, { password: req.param("password") })
          .then(function(data, err) {
            if (err) {
              sails.log.error(err);
              return res.json(500, { err: err });
            }

            var who = jwToken.who(req.headers.authorization);
            audit.log("user", who + " changed password");

            User.findOne({
              select: ["companyName", "email"],
              where: { email: token.email }
            }).exec(function(user, err) {
              var emailData = {
                email: process.env.SITE_EMAIL,
                from: process.env.SITE_NAME,
                subject: "Your " + process.env.SITE_NAME + " password change.",
                body:
                  "Hello " +
                  user.companyName +
                  "! <br><br> " +
                  "You have successfully changed your password. <br><br>" +
                  "Thank you. <br><br>" +
                  process.env.SITE_NAME,

                to: user.email
              };

              azureEmail.send(emailData, function(resp) {
                if (resp === "error") {
                  sails.log.error(resp);
                }
              });
            });

            return res.json(200, {
              status: "success",
              message: "Password successfully changed."
            });
          })
          .catch(function(err) {
            sails.log.error(err);
            return res.json(500, { err: err });
          });
      });
    }
  },

  /**
   * `UserController.unsubscribe()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/unsubscrbe Get User count
   * @apiName Unsubscribe
   * @apiDescription This is where a user unsubscribes from a membership plan.
   * @apiGroup User
   */
  unsubscribe: function(req, res) {
    User.findOne({ id: req.param("id") })
      .then(function(user, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { status: "error", err: err });
        }

        if (user) {
          paystack.subscription
            .get({
              id_or_subscription_code: user.dueSubscriptionCode
            })
            .then(function(subscriptionData) {
              return paystack.subscription.disable({
                code: user.dueSubscriptionCode,
                toke: user.subscriptionData.email_token
              });
            })
            .then(function(data) {
              User.update(
                { id: user.id },
                {
                  dueSubscriptionCode: null,
                  membershipDue: "unpaid",
                  membershipStatus: "inactive"
                }
              ).exec(function(err, data) {
                if (err) {
                  sails.log.error(err);
                  return res.json(err.status, { status: "error", err: err });
                }

                sails.log.info(`${user.id} successfully unsubscribed.`);
                return res.json(200, {
                  status: "success",
                  message: `${user.id} successfully unsubscribed.`
                });
              });
            });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  }
};
