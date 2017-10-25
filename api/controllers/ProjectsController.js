/**
 * ProjectsController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 /**
 * @apiDefine ProjectNotFoundError
 *
 * @apiError ProjectNotFound The Project was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "error",
 *       "message": 'No Project with such id existing'
 *     }
 */

  /** 
 * @apiDefine ProjectIdNotProvidedError
 *
 * @apiError ProjectIdNotProvided No Project id provided.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "status": "error",
 *       "err": "No Project id provided!"
 *     }
 */

module.exports = {
	


  /**
   * `ProjectsController.create()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {post} /api/v1/projects Create a new project
   * @apiName CreateProject
   * @apiDescription This is where a new project is created.
   * @apiGroup Projects
   *
   * @apiParam {String} [title] Title of the project.
   * @apiParam {String} [banner] Cloud Url of Picture banner for the project.
   * @apiParam {String} [description] Full description of the project.
   * @apiParam {String} date Date/Duration of the project.
   * @apiParam {String} venue Venue of the project.
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
   * @apiError ProjectInfoNotComplete Post info not complete.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 401 Not Found
   *     {
   *       "status": "error",
   *       "err": "No { title | banner | description } provided!"
   *     }
   */
  create: function (req, res) {
    
    Projects.create(req.body).exec(function (err, project) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If project is created successfuly we return project id and title
      if (project) {
        // NOTE: payload is { id: project.id}
        res.json(200, {
          status: 'success',
          id: project.title
        });
      }
    });
  },


  /**
   * `ProjectsController.delete()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {delete} /api/v1/projects/:id Delete a project
   * @apiName DeleteProject
   * @apiDescription This is where a project is deleted
   * @apiGroup Project
   *
   * @apiParam {Number} id Post ID.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Project with id 59dce9d56b54d91c38847825 has been deleted'"
   *     }
   *
   * @apiUse ProjectIdNotProvidedError
   * 
   * @apiUse ProjectNotFoundError
   */
  delete: function (req, res) {
    if (!req.param('id')) {
      return res.json(401, {status: 'error', err: 'No Project id provided!'});
    }else{
      Projects.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, project){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!project){
          return res.json(404, {status: 'error', message: 'No Project with such id existing'})
        }else{
          Projects.destroy({id : req.param('id')}).exec(function (err){
            if (err) {
              return res.json(err.status, {err: err});
            }
    
            return res.json(200, {status: 'success', message: 'Project with id '+req.param('id')+' has been deleted'});
          });
        }
      });
    }
  },


  /**
   * `ProjectsController.update()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {put} /api/v1/projects Update a project
   * @apiName UpdateProject
   * @apiDescription This is where a project is updated.
   * @apiGroup Projects
   *
   * @apiParam {String} title Title of the project.
   * @apiParam {String} banner Cloud Url of Picture banner for the project.
   * @apiParam {String} description Full description of the project.
   * @apiParam {String} date Date/Duration of the project.
   * @apiParam {String} venue Venue of the project.
   *
   * @apiSuccess {String} status Status of the response from API.
   * @apiSuccess {String} message  Success message response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "status": "success",
   *       "message": "Project with id 59dce9d56b54d91c38847825 has been updated'"
   *     }
   * 
   *
   * @apiUse ProjectIdNotProvidedError
   * 
   * @apiUse ProjectNotFoundError
   */
  update: function (req, res) {
    if(!req.param('id')){
      return res.json(401, {status: 'error', err: 'No Project id provided!'});
    }else{
      Projects.findOne({select: 'title', where : {id : req.param('id')}}).exec(function (err, project){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!project){
          return res.json(404, {status: 'error', message: 'No Project with such id existing'})
        }else{
          Projects.update({id: req.param('id')}, req.body).exec(function(err, data){
            if(err){
              return res.json(err.status, {err: err});
            }
      
            return res.json(200, {status: 'success', message: 'Project with id '+req.param('id')+' has been updated'});
          });
        }
      });
    }
  },


  /**
   * `ProjectsController.get()`
   * 
   * ----------------------------------------------------------------------------------
   * @api {get} /api/v1/projects/:id Get project(s)
   * @apiName Get
   * @apiDescription This is where projects are retrieved.
   * @apiGroup Project
   *
   * @apiParam {Number} id Project id.
   *
   * @apiSuccess {String} project Post response from API.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id": "59dce9d56b54d91c38847825",
   *       ".........": "...................."
   *        .................................
   *     }
   * 
   * @apiUse ProjectNotFoundError
   */
  get: function (req, res) {
    if(req.param('id')){
      Projects.findOne({id : req.param('id')}).exec(function (err, project){
        if (err) {
          return res.json(err.status, {err: err});
        }

        if(!project){
          return res.json(404, {status: 'error', message: 'No Project with such id existing'})
        }else{
          return res.json(200, project);
        }
      });
    }else{
      Projects.find().exec(function (err, project){
        if (err) {
          return res.json(err.status, {err: err});
        }
  
        return res.json(200, project);
      });
    }
  }
};

