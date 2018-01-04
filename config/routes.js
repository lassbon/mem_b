/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
     * etc. depending on your default view engine) your home page.              *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    '/': {
        view: 'homepage'
    },


    /***************************************************************************
     *                                                                          *
     * Custom routes here...                                                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the custom routes above, it   *
     * is matched against Sails route blueprints. See `config/blueprints.js`    *
     * for configuration options and examples.                                  *
     *                                                                          *
     ***************************************************************************/

    /**
     * Auth routes
     */
    'POST /api/v1/auth/user': 'AuthController.userLogin',
    'POST /api/v1/auth/admin': 'AuthController.adminLogin',
    '/api/v1/auth/': 'AuthController.index',

    /**
     * Admin routes
     */
    'POST /api/v1/admin': 'AdminController.create',
    'POST /api/v1/admin/reset': 'AdminController.forgotPassword',
    'PUT /api/v1/admin/change': 'AdminController.changePassword',
    'PUT /api/v1/admin/:id': 'AdminController.update',
    'DELETE /api/v1/admin/:id': 'AdminController.delete',
    'GET /api/v1/admin/:id': 'AdminController.get',
    'GET /api/v1/admin': 'AdminController.get',

    /**
     * User routes
     */
    'POST /api/v1/user': 'UserController.create',
    'POST /api/v1/user/upload': 'UserController.uploadImage',
    'PUT /api/v1/user/:id': 'UserController.update',
    'DELETE /api/v1/user/:id': 'UserController.delete',
    'GET /api/v1/user/:id': 'UserController.get',
    'GET /api/v1/user': 'UserController.get',

    /**
     * Projects routes
     */
    'POST /api/v1/projects': 'ProjectsController.create',
    'POST /api/v1/projects/upload': 'ProjectsController.uploadBanner',
    'PUT /api/v1/projects/:id': 'ProjectsController.update',
    'DELETE /api/v1/projects/:id': 'ProjectsController.delete',
    'GET /api/v1/projects/:id': 'ProjectsController.get',
    'GET /api/v1/projects': 'ProjectsController.get',

    /**
     * Training routes
     */
    'POST /api/v1/training': 'TrainingController.createTraining',
    'POST /api/v1/training/upload': 'TrainingController.uploadBanner',
    'PUT /api/v1/training/:id': 'TrainingController.updateTraining',
    'DELETE /api/v1/training/:id': 'TrainingController.deleteTraining',
    'GET /api/v1/training/:id': 'TrainingController.getTraining',
    'GET /api/v1/training': 'TrainingController.getTraining',

    'POST /api/v1/training/payment': 'TrainingController.createPayment',
    'PUT /api/v1/training/payment/:id': 'TrainingController.updatePayment',
    'GET /api/v1/training/payment/:id': 'TrainingController.getPayment',
    'GET /api/v1/training/payment': 'TrainingController.getPayment',

    /**
     * Event routes
     */
    'POST /api/v1/events': 'EventsController.createEvent',
    'POST /api/v1/events/upload': 'EventsController.uploadBanner',
    'PUT /api/v1/events/:id': 'EventsController.updateEvent',
    'DELETE /api/v1/events/:id': 'EventsController.deleteEvent',
    'GET /api/v1/events/:id': 'EventsController.getEvent',
    'GET /api/v1/events': 'EventsController.getEvent',

    'POST /api/v1/events/payment': 'EventsController.createPayment',
    'PUT /api/v1/events/payment/:id': 'EventsController.updatePayment',
    'GET /api/v1/events/payment/:id': 'EventsController.getPayment',
    'GET /api/v1/events/payment': 'EventsController.getPayment',

    /**
     * Donation routes
     */
    'POST /api/v1/donation': 'DonationController.createDonation',
    'POST /api/v1/donation/upload': 'DonationController.uploadBanner',
    'PUT /api/v1/donation/:id': 'DonationController.updateDonation',
    'DELETE /api/v1/donation/:id': 'DonationController.deleteDonation',
    'GET /api/v1/donation/:id': 'DonationController.getDonation',
    'GET /api/v1/donation': 'DonationController.getDonation',

    'POST /api/v1/donation/payment': 'DonationController.createPayment',
    'PUT /api/v1/donation/payment/:id': 'DonationController.updatePayment',
    'GET /api/v1/donation/payment/:id': 'DonationController.getPayment',
    'GET /api/v1/donation-payment': 'DonationController.getPayment',

    /**
     * Levels routes
     */
    'POST /api/v1/levels': 'LevelsController.create',
    'PUT /api/v1/levels/:id': 'LevelsController.update',
    'DELETE /api/v1/levels/:id': 'LevelsController.delete',
    'GET /api/v1/levels/:id': 'LevelsController.get',
    'GET /api/v1/levels': 'LevelsController.get',

    /**
     * KnowledgeBase routes
     */
    'POST /api/v1/knowledgebase/document': 'KnowledgeBaseController.create',
    'POST /api/v1/knowledgebase/document/upload': 'KnowledgeBaseController.uploadDocument',
    'PUT /api/v1/knowledgebase/document/:id': 'KnowledgeBaseController.update',
    'DELETE /api/v1/knowledgebase/document/:id': 'KnowledgeBaseController.delete',
    'GET /api/v1/knowledgebase/document/:id': 'KnowledgeBaseController.getDoc',
    'GET /api/v1/knowledgebase/document': 'KnowledgeBaseController.getDoc',

    'POST /api/v1/knowledgebase/category': 'KnowledgeBaseController.createCategory',
    'PUT /api/v1/knowledgebase/category/:id': 'KnowledgeBaseController.updateCategory',
    'DELETE /api/v1/knowledgebase/category/:id': 'KnowledgeBaseController.deleteCategory',
    'GET /api/v1/knowledgebase/category/:id': 'KnowledgeBaseController.getCategory',
    'GET /api/v1/knowledgebase/category': 'KnowledgeBaseController.getCategory',

    /**
     * Verifier routes
     */
    'POST /api/v1/verifier': 'VerifierController.verify',
    'DELETE /api/v1/verifier/:id': 'VerifierController.reject',
    'GET /api/v1/verifier/:id': 'VerifierController.get',
    'GET /api/v1/verifier': 'VerifierController.get',

    /**
     * Approver routes
     */
    'POST /api/v1/approver': 'ApproverController.approve',
    'DELETE /api/v1/approver/:id': 'ApproverController.reject',
    'GET /api/v1/approver/:id': 'ApproverController.get',
    'GET /api/v1/approver': 'ApproverController.get',

    /**
     * Referrer routes
     */
    'POST /api/v1/referrer': 'ReferrerController.approve',
    'DELETE /api/v1/referrer/:id': 'ReferrerController.reject',
    'GET /api/v1/referrer/:id': 'ReferrerController.get',
    'GET /api/v1/referrer': 'ReferrerController.get',

    /**
     * Social routes
     */
    'POST /api/v1/social/request': 'SocialController.request',
    'POST /api/v1/social/accept': 'SocialController.accept',
    'POST /api/v1/social/remove': 'SocialController.remove',
    'POST /api/v1/social/cancel': 'SocialController.cancel',

    // Social post routes
    'POST /api/v1/social/post': 'SocialController.createPost',
    'POST /api/v1/social/upload': 'SocialController.uploadImage',
    'DELETE /api/v1/social/post/:id': 'SocialController.deletePost',
    'PUT /api/v1/social/post/:id': 'SocialController.updatePost',
    'GET /api/v1/social/post/:id': 'SocialController.getPost',
    'GET /api/v1/social/post': 'SocialController.getPost',
    'GET /api/v1/social/post/search': 'SocialController.searchPost',

    // Social comment routes
    'POST /api/v1/social/comment': 'SocialController.createComment',
    'DELETE /api/v1/social/comment/:id': 'SocialController.deleteComment',
    'PUT /api/v1/social/comment/:id': 'SocialController.updateComment',
    'GET /api/v1/social/comment/:id': 'SocialController.getComment',
    'GET /api/v1/social/comment': 'SocialController.getComment',
    'GET /api/v1/social/comment/search': 'SocialController.searchComment',

    // Social like/unlike routes
    'POST /api/v1/social/post/like': 'SocialController.likePost',
    'POST /api/v1/social/post/unlike': 'SocialController.unlikePost',

    // Social feed routes
    'GET /api/v1/social/feed/:id': 'SocialController.getFeed',

    /**
     * Forum routes
     */
    // Forum topic routes
    'POST /api/v1/forum/topic': 'ForumController.createTopic',
    'DELETE /api/v1/forum/topic/:id': 'ForumController.deleteTopic',
    'PUT /api/v1/forum/topic/:id': 'ForumController.updateTopic',
    'GET /api/v1/forum/topic/:id': 'ForumController.getTopic',
    'GET /api/v1/forum/topic': 'ForumController.getTopic',

    // Forum post routes
    'POST /api/v1/forum/post': 'ForumController.createPost',
    'DELETE /api/v1/forum/post/:id': 'ForumController.deletePost',
    'PUT /api/v1/forum/post/:id': 'ForumController.updatePost',
    'GET /api/v1/forum/post/:id': 'ForumController.getPost',
    'GET /api/v1/forum/post': 'ForumController.getPost',

    // Forum comment routes
    'POST /api/v1/forum/comment': 'ForumController.createComment',
    'DELETE /api/v1/forum/comment/:id': 'ForumController.deleteComment',
    'PUT /api/v1/forum/comment/:id': 'ForumController.updateComment',
    'GET /api/v1/forum/comment/:id': 'ForumController.getComment',
    'GET /api/v1/forum/comment': 'ForumController.getComment',

    // Paystack routes
    'POST /api/v1/paystack': 'PaystackController.verify',

    // Payment routes
    'GET /api/v1/payments': 'PaymentsController.get',
    'GET /api/v1/payments/totals': 'PaymentsController.getTotals',
    'GET /api/v1/payments/excel': 'DonationController.getExcel',
    'GET /api/v1/payments/donations': 'PaymentsController.donations',
    'GET /api/v1/payments/events': 'PaymentsController.events',

    // Audit routes
    'GET /api/v1/audit': 'AuditController.get',
};