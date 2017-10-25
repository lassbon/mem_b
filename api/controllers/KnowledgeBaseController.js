/**
 * KnowledgeBaseController
 *
 * @description :: Server-side logic for managing knowledgebases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 /**
 * @apiDefine DocumentNotFoundError
 *
 * @apiError DocumentNotFound The Document was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Document with such id existing'
 *     }
 */

  /** 
 * @apiDefine DocumentIdNotProvidedError
 *
 * @apiError DocumentIdNotProvided No Document id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Document id provided!"
 *     }
 */

 /**
 * @apiDefine CategoryNotFoundError
 *
 * @apiError CategoryNotFound The Category was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Category with such id existing'
 *     }
 */

  /** 
 * @apiDefine CategoryIdNotProvidedError
 *
 * @apiError CategoryIdNotProvided No Category id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Category id provided!"
 *     }
 */

module.exports = {
	


  /**
   * `KnowledgeBaseController.create()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/knowledgebase Create a new document
   * @apiName CreateDocument
   * @apiDescription This is where a new document is created.
   * @apiGroup Knowledgebase
   *
   * @apiParam {String} [title] Title of the document.
   * @apiParam {String} [description] Full description of the document.
   * @apiParam {String} [docUrl] Cloud storage url of the document.
   * @apiParam {String} [uploader] Id of the user who uploaded the docment.
   * @apiParam {String} views Number of times the document has been viewed.
   * @apiParam {String} downloads Number of times the document has been downloaded.
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
   */
  create: function (req, res) {
  
    KnowledgeBase.create(req.body).exec(function (err, doc) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      
      if (doc) {
        res.json(200, {
          status: 'success',
          id: doc.id,
        });
      }
    });
  },


  /**
   * `KnowledgeBaseController.delete()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/knowledgebase/:id Delete a document
   * @apiName DeleteDocument
   * @apiDescription This is where a document is deleted
   * @apiGroup Knowledgebase
   *
   * @apiParam {Number} id Document ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Document with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse DocumentIdNotProvidedError
   * 
   * @apiUse DocumentNotFoundError
   */
  delete: function (req, res) {
    if (!req.param('id')) {
      return res.json(401, {status: 'error', err: 'No Document id provided!'});
    }else{
      KnowledgeBase.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!doc){
          return res.json(404, {status: 'error', message: 'No Document with such id existing'})
        }else{
          KnowledgeBase.destroy({id : req.param('id')}).exec(function (err){
            if (err) {
              return res.json(err.status, {err: err});
            }
    
            return res.json(200, 'Document with id '+req.param('id')+' has been deleted');
          });
        }
      });
    }
  },


  /**
   * `KnowledgeBaseController.update()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/knowledgebase/:id Update a document
   * @apiName UpdateDocument
   * @apiDescription This is where a document is updated
   * @apiGroup Knowledgebase
   *
   * @apiParam {Number} id Document ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Document with id 59dce9d56b54d91c38847825 has been updated'"
   *     }
   *
   * @apiUse DocumentIdNotProvidedError
   * 
   * @apiUse DocumentNotFoundError
   */
  update: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No Document id provided!'});
    }else{
      KnowledgeBase.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!doc){
          return res.json(404, {status: 'error', message: 'No Document with such id existing'})
        }else{
          KnowledgeBase.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, 'Document with id '+req.param('id')+' has been updated');
          });
        }
      });
    }
  },


  /**
   * `KnowledgeBaseController.get()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/knowledgebase/:id Get document(s)
   * @apiName GetDocument
   * @apiDescription This is where documents are retrieved.
   * @apiGroup Knowledgebase
   *
   * @apiParam {Number} id Document id.
   *
   * @apiSuccess {String} document Document response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "59dce9d56b54d91c38847825",
   *       ".........": "...................."
   *        .................................
   *     }
   * 
   * @apiUse DocumentNotFoundError
   */
  get: function (req, res) {
    if(req.param('id')){
      KnowledgeBase.findOne({id : req.param('id')}).exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!doc){
          return res.json(404, {status: 'error', message: 'No Document with such id existing'})
        }else{
          return res.json(200, doc);
        }
      });
    }else{
      KnowledgeBase.find().exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, doc);
      });
    }
  },

  /**
   * `KnowledgeBaseController.createCategory()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/knowledgebase/category Create a new category
   * @apiName CreateCategory
   * @apiDescription This is where a new category is created.
   * @apiGroup Knowledgebase
   *
   * @apiParam {String} [name] Name of the category.
   * @apiParam {String} [description] Full description of the category.
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
   */
  createCategory: function (req, res) {
    Category.create(req.body).exec(function (err, category) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      
      if (doc) {
        res.json(200, {
          status: "success",
          id: category.id,
        });
      }
    });
  },

  /**
   * `KnowledgeBaseController.deleteCategory()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/knowledgebase/category/:id Delete a category
   * @apiName DeleteCategory
   * @apiDescription This is where a category is deleted
   * @apiGroup Knowledgebase
   *
   * @apiParam {Number} id Category ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Category with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse CategoryIdNotProvidedError
   * 
   * @apiUse CategoryNotFoundError
   */
  deleteCategory: function (req, res) {
    if (!req.param('id')) {
      return res.json(401, {status: 'error', err: 'No Category id provided!'});
    }else{
      Category.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!doc){
          return res.json(404, {status: 'error', message: 'No Category with such id existing'});
        }else{
          Category.destroy({id : req.param('id')}).exec(function (err){
            if (err) {
              return res.json(err.status, {err: err});
            }
    
            return res.json(200, {status: 'success', message: 'Category with id '+req.param('id')+' has been deleted'});
          });
        }
      });
    }
  },

  /**
   * `KnowledgeBaseController.updateCategory()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/knowledgebase/category/:id Update a category
   * @apiName UpdateCategory
   * @apiDescription This is where a category is updated
   * @apiGroup Knowledgebase
   *
   * @apiParam {Number} id Category ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Category with id 59dce9d56b54d91c38847825 has been updated"
   *     }
   *
   * @apiUse CategoryIdNotProvidedError
   * 
   * @apiUse CategoryNotFoundError
   */
  updateCategory: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No Category id provided!'});
    }else{
      Category.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!doc){
          return res.json(404, {status: 'error', message: 'No Category with such id existing'});
        }else{
          Category.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Category with id '+req.param('id')+' has been updated'});
          });
        }
      });
    }
  },

  /**
   * `KnowledgeBaseController.getCategory()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/knowledgebase/category/:id Get category(s)
   * @apiName GetCategory
   * @apiDescription This is where categories are retrieved.
   * @apiGroup Knowledgebase
   *
   * @apiParam {Number} id Category id.
   *
   * @apiSuccess {String} category Category response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "59dce9d56b54d91c38847825",
   *       ".........": "...................."
   *        .................................
   *     }
   * 
   * @apiUse CategoryNotFoundError
   */
  getCategory: function (req, res) {
    if(req.param('id')){
      Category.findOne({id : req.param('id')}).exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!doc){
          return res.json(404, {status: 'error', message: 'No Category with such id existing'});
        }else{
          return res.json(200, doc);
        }
      });
    }else{
      Category.find().exec(function (err, doc){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, doc);
      });
    }
  }

};
