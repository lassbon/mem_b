/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * @apiDefine NewsNotFoundError
 *
 * @apiError NewsNotFound The News was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No News with such id existing'
 *     }
 */

/**
 * @apiDefine NewsIdNotProvidedError
 *
 * @apiError NewsIdNotProvided No News id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No News id provided!"
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
   * `NewsController.createNews()`
   *
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/news Create a new news
   * @apiName CreateNews
   * @apiDescription This is where a new News is created.
   * @apiGroup News
   *
   * @apiParam {String} title Title of the news.
   * @apiParam {String} image Cloud Url of Picture image for the news.
   * @apiParam {String} body Full body of the news.
   * @apiParam {String} [author] Author of the news.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "id": "59dce9c16b54d91c38847825"
   *     }
   *
   * @apiError NewsInfoNotComplete News info not complete.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No { title | image | body | author} provided!"
   *     }
   */
  createNews: function(req, res) {
    News.create(req.body)
      .then(function(news, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        const container = "news";

        // Handle image image uploads
        if (req.param("image")) {
          azureBlob.upload(container, req.param("image"), azureResponse => {
            News.update({ id: post.id }, { image: azureResponse }).exec(
              (err, data) => {
                if (err) {
                  sails.log.error(err);
                }

                delete req.body.image;
              }
            );
          });
        }

        // If news is created successfuly we return news id and title
        if (news) {
          var who = jwToken.who(req.headers.authorization);
          audit.log("news", who + " created " + news.title);

          // NOTE: payload is { id: news.id}
          res.json(200, {
            status: "success",
            id: news.id
          });
        }
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `NewsController.deleteNews()`
   *
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/news/:id Delete a news
   * @apiName DeleteNews
   * @apiDescription This is where a news is deleted
   * @apiGroup News
   *
   * @apiParam {Number} id News Id.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "News with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse NewsIdNotProvidedError
   *
   * @apiUse NewsNotFoundError
   */
  deleteNews: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, {
        status: "error",
        err: "No News id provided!"
      });
    }

    News.findOne({
      select: ["title", "image"],
      where: { id: req.param("id") }
    })
      .then(function(news, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        if (!news) {
          return res.json(404, {
            status: "error",
            err: "No News with such id existing"
          });
        }

        News.destroy({ id: req.param("id") }).exec(function(err) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          if (news.banner) {
            var url = news.banner;
            azureBlob.delete("news", url.split("/").reverse()[0]);
          }

          var who = jwToken.who(req.headers.authorization);
          audit.log("news", who + " deleted " + news.title);

          return res.json(200, {
            status: "success",
            message: "News with id " + req.param("id") + " has been deleted"
          });
        });
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `NewsController.updateNews()`
   *
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/news/:id Update a news
   * @apiName UpdateNews
   * @apiDescription This is where a news is updated.
   * @apiGroup News
   *
   * @apiParam {String} [title] Title of the news.
   * @apiParam {String} [image] Cloud Url of Picture image for the news.
   * @apiParam {String} [body] Full body of the news.
   * @apiParam {String} [author] Author of the news.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "News with id 59dce9d56b54d91c38847825 has been updated'"
   *     }
   *
   *
   * @apiUse NewsIdNotProvidedError
   *
   * @apiUse NewsNotFoundError
   */
  updateNews: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, {
        status: "error",
        err: "No News id provided!"
      });
    }

    const container = "news";

    News.findOne({
      select: ["title", "image"],
      where: { id: req.param("id") }
    })
      .then(function(news, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        if (!news) {
          return res.json(404, {
            status: "error",
            err: "No News with such id existing"
          });
        }

        // Handle image image uploads
        if (req.param("image")) {
          azureBlob.upload(container, req.param("image"), azureResponse => {
            News.update({ id: req.param("id") }, { image: azureResponse }).exec(
              (err, data) => {
                if (err) {
                  sails.log.error(err);
                }

                delete req.body.image;

                if (news.image && news.image !== data.image) {
                  var url = news.image;
                  azureBlob.delete(container, url.split("/").reverse()[0]);
                }
              }
            );
          });
        }

        News.update({ id: req.param("id") }, req.body).exec(function(
          err,
          data
        ) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          var who = jwToken.who(req.headers.authorization);
          audit.log("news", who + " edited " + news.title);

          return res.json(200, {
            status: "success",
            message: "News with id " + req.param("id") + " has been updated"
          });
        });
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `NewsController.searchNewss()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/searchnews/:id/:page/:limit Search for news(s)
   * @apiName SearchNews
   * @apiDescription This is where a news is searched.
   * @apiGroup News
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
  searchNews: function(req, res) {
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
    }

    News.find({ title: { contains: req.param("searchTerm") } })
      .sort("createdAt DESC")
      .paginate({ page: page, limit: limit })
      .then(function(news, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        return res.json(200, { page: page, limit: limit, result: news });
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  /**
   * `NewsController.myNews()`
   *
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/mynews/:id Get news(s)
   * @apiName GetNews
   * @apiDescription This is where news are retrieved.
   * @apiGroup News
   *
   * @apiParam {Number} id user id.
   *
   * @apiSuccess {String} news Post response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "59dce9d56b54d91c38847825",
   *       ".........": "...................."
   *        .................................
   *     }
   *
   * @apiUse UserIdNotProvidedError
   */
  myNews: function(req, res) {
    if (!req.param("id")) {
      return res.json(401, { status: "error", err: "No user id provided!" });
    }

    News.find({ id: req.param("id") })
      .sort("createdAt DESC")
      .exec(function(news, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        return res.json(200, news);
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  },

  getNews: function(req, res) {
    if (req.param("id")) {
      News.findOne({ id: req.param("id") })
        .sort("createdAt DESC")
        .then(function(news, err) {
          if (err) {
            sails.log.error(err);
            return res.json(err.status, { err: err });
          }

          if (!news.id) {
            return res.json(404, {
              status: "error",
              message: "No news with such id existing"
            });
          } else {
            return res.json(200, news);
          }
        })
        .catch(function(err) {
          sails.log.error(err);
          return res.json(500, { err: err });
        });
    }

    News.find()
      .sort("createdAt DESC")
      .then(function(news, err) {
        if (err) {
          sails.log.error(err);
          return res.json(err.status, { err: err });
        }

        return res.json(200, news);
      })
      .catch(function(err) {
        sails.log.error(err);
        return res.json(500, { err: err });
      });
  }
};
