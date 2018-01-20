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
 * @apiDefine UploaderIdNotProvidedError
 *
 * @apiError UploaderIdNotProvided No Uploader id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Uploader id provided!"
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
     * `KnowledgeBaseController.create()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/knowledgebase/document Create a new document
     * @apiName CreateDocument
     * @apiDescription This is where a new document is created.
     * @apiGroup Knowledgebase
     *
     * @apiParam {String} title Title of the document.
     * @apiParam {String} description Full description of the document.
     * @apiParam {String} docUrl Cloud storage url of the document.
     * @apiParam {String} uploader Id of the user who uploaded the docment.
     * @apiParam {String} category Id of category the document will belong to.
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
     * @apiUse CategoryIdNotProvidedError
     * 
     * @apiUse UploaderIdNotProvidedError
     */
    create: function(req, res) {
        if (!req.param('category')) {
            return res.json(401, { status: "error", err: 'No category id provided!' });
        }

        if (!req.param('uploader')) {
            return res.json(401, { status: "error", err: 'No uploader id provided!' });
        }

        KnowledgebaseDocuments.create(req.body).exec(function(err, doc) {
            if (err) {
                return res.json(err.status, { err: err });
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
     * `KnowledgeBaseController.uploadDocument()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {post} /api/v1/knowledgebase/document/upload Upload a document
     * @apiName UploadDocument
     * @apiDescription This is where a knowledgebase document is uploaded (Make sure image file extension is either jpg or png).
     * @apiGroup Knowledgebase
     *
     * @apiParam {String} document Document to be uploaded.
     *
     * @apiSuccess {String} status Status of the response from API.
     * @apiSuccess {String} message  Success message response from API.
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "status": "success",
     *       "docUrl": "https://accicloud.blob.core.windows.net/knowledgebase/27ba91b3-ab78-4240-aa6c-a1f32230227c.pdf"
     *     }
     *
     * @apiError DocumentNotUploaded No document uploaded.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 401 Not Found
     *     {
     *       "status": "error",
     *       "err": "No document uploaded!"
     *     }
     */
    uploadDocument: function(req, res) {
        if (req.method != 'POST') return res.notFound();

        var container = 'knowledgebase';

        azureBlob.createContainerIfNotExists(container, function() {
            req.file('document')
                .upload({
                    maxBytes: 5000000,
                    adapter: require('skipper-azure'),
                    key: process.env.AZURE_STORAGE_ACCOUNT,
                    secret: process.env.AZURE_STORAGE_ACCESS_KEY,
                    container: container
                }, function whenDone(err, uploadedFiles) {
                    if (err) return res.negotiate(err);
                    else if (uploadedFiles.length === 0) {
                        return res.json(401, { status: 'error', err: 'No image uploaded!' });
                    } else return res.ok({
                        status: 'success',
                        docUrl: process.env.AZURE_STORAGE_ACCOUNT_URL + container + '/' + uploadedFiles[0].fd
                    });
                });
        });
    },

    /**
     * `KnowledgeBaseController.getCount()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/knowledgebase/doccount Get document count
     * @apiName GetCount
     * @apiDescription This is where document count is obtained.
     * @apiGroup KnowledgeBase
     */
    getCount: function(req, res) {
        KnowledgebaseDocuments.count().exec(function(err, docCount) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            return res.json(200, docCount.toString());
        });
    },


    /**
     * `KnowledgeBaseController.delete()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {delete} /api/v1/knowledgebase/document/:id Delete a document
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
    delete: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Document id provided!' });
        } else {
            KnowledgebaseDocuments.findOne({ select: ['title', 'docUrl'], where: { id: req.param('id') } }).exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!doc) {
                    return res.json(404, { status: 'error', err: 'No Document with such id existing' })
                } else {
                    KnowledgebaseDocuments.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        if (doc.docUrl) {
                            var url = doc.docUrl;
                            azureBlob.delete('knowledgebase', url.split('/').reverse()[0]);
                        }

                        return res.json(200, { status: 'success', message: 'Document with id ' + req.param('id') + ' has been deleted' });
                    });
                }
            });
        }
    },


    /**
     * `KnowledgeBaseController.update()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {put} /api/v1/knowledgebase/document/:id Update a document
     * @apiName UpdateDocument
     * @apiDescription This is where a document is updated
     * @apiGroup Knowledgebase
     *
     * @apiParam {Number} id Document ID.
     * @apiParam {String} [title] Title of the document.
     * @apiParam {String} [description] Full description of the document.
     * @apiParam {String} [docUrl] Cloud storage url of the document.
     * @apiParam {String} [uploader] Id of the user who uploaded the docment.
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
    update: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Document id provided!' });
        } else {
            KnowledgebaseDocuments.findOne({ select: ['title', 'docUrl'], where: { id: req.param('id') } }).exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!doc) {
                    return res.json(404, { status: 'error', err: 'No Document with such id existing' })
                } else {

                    if (doc.docUrl && doc.docUrl !== req.param('docUrl')) {
                        var url = doc.docUrl;
                        azureBlob.delete('knowledgebase', url.split('/').reverse()[0]);
                    }

                    KnowledgebaseDocuments.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Document with id ' + req.param('id') + ' has been updated' });
                    });
                }
            });
        }
    },


    /**
     * `KnowledgeBaseController.get()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/knowledgebase/document/:id Get document(s)
     * @apiName GetDocument
     * @apiDescription This is where documents are retrieved.
     * @apiGroup Knowledgebase
     *
     * @apiParam {Number} [id] Document id.
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
    getDoc: function(req, res) {
        if (req.param('id')) {
            KnowledgebaseDocuments.findOne({ id: req.param('id') }).sort('createdAt DESC').exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!doc) {
                    return res.json(404, { status: 'error', err: 'No Document with such id existing' })
                } else {
                    return res.json(200, doc);
                }
            });
        } else {
            KnowledgebaseDocuments.find().sort('createdAt DESC').exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, doc);
            });
        }
    },

    /**
     * `KnowledgeBaseController.searchDocuments()`
     * 
     * ----------------------------------------------------------------------------------
     * @api {get} /api/v1/searchdocuments/:id/:page/:limit Search for document(s)
     * @apiName SearchDocument
     * @apiDescription This is where a document is searched.
     * @apiGroup Knowledgebase
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
    searchDocuments: function(req, res) {
        var page = 0;
        var limit = 10;

        if (req.param('page') && req.param('page') > 1) {
            page = req.param('page');
        }

        if (req.param('limit')) {
            limit = req.param('limit');
        }

        if (!req.param('searchTerm')) {
            return res.json(401, { status: "error", err: 'No search term provided!' });
        } else {
            KnowledgebaseDocuments.find({ title: { 'contains': req.param('searchTerm') } }).sort('createdAt DESC').paginate({ page: page, limit: limit }).exec(function(err, documents) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, { page: page, limit: limit, result: documents });
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
     * @apiParam {String} name Name of the category.
     * @apiParam {String} description Full description of the category.
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
    createCategory: function(req, res) {
        KnowledgebaseCategory.create(req.body).exec(function(err, category) {
            if (err) {
                sails.log.error(err);
                return res.json(err.status, { err: err });
            }

            if (category) {
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
    deleteCategory: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Category id provided!' });
        } else {
            KnowledgebaseCategory.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!doc) {
                    return res.json(404, { status: 'error', err: 'No Category with such id existing' });
                } else {
                    KnowledgebaseCategory.destroy({ id: req.param('id') }).exec(function(err) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Category with id ' + req.param('id') + ' has been deleted' });
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
    updateCategory: function(req, res) {
        if (!req.param('id')) {
            return res.json(401, { status: 'error', err: 'No Category id provided!' });
        } else {
            KnowledgebaseCategory.findOne({ select: 'title', where: { id: req.param('id') } }).exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!doc) {
                    return res.json(404, { status: 'error', err: 'No Category with such id existing' });
                } else {
                    KnowledgebaseCategory.update({ id: req.param('id') }, req.body).exec(function(err, data) {
                        if (err) {
                            sails.log.error(err);
                            return res.json(err.status, { err: err });
                        }

                        return res.json(200, { status: 'success', message: 'Category with id ' + req.param('id') + ' has been updated' });
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
     * @apiParam {Number} [id] Category id.
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
    getCategory: function(req, res) {
        if (req.param('id')) {
            KnowledgebaseCategory.findOne({ id: req.param('id') }).exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                if (!doc) {
                    return res.json(404, { status: 'error', err: 'No Category with such id existing' });
                } else {
                    return res.json(200, doc);
                }
            });
        } else {
            KnowledgebaseCategory.find().exec(function(err, doc) {
                if (err) {
                    sails.log.error(err);
                    return res.json(err.status, { err: err });
                }

                return res.json(200, doc);
            });
        }
    }

};