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
        '/api/v1/auth/': 'AuthController.index',
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
    'POST /api/v1/auth/oldmember': 'AuthController.oldMemberLogin',
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

    'POST /api/v1/user/reset': 'UserController.forgotPassword',
    'PUT /api/v1/user/change': 'UserController.changePassword',
    
    'PUT /api/v1/user/:id': 'UserController.update',
    'DELETE /api/v1/user/:id': 'UserController.delete',
    'GET /api/v1/user/:id': 'UserController.get',
    'GET /api/v1/user': 'UserController.get',
    'GET /api/v1/usercount': 'UserController.getCount',

    'GET /api/v1/useractivity/:id': 'UserController.getActivity',
    'GET /api/v1/userfriends/:id': 'UserController.getFriends',

    'POST /api/v1/alertreferee': 'UserController.alertReferee',
    'POST /api/v1/validatereferee': 'UserController.validateReferee',

    'GET /api/v1/searchuser/:searchTerm/:page/:limit': 'UserController.searchUser',

    'POST /api/v1/oldmember': 'UserController.getOldMember',

    /**
     * Projects routes
     */
    'POST /api/v1/projects': 'ProjectsController.create',
    'POST /api/v1/projects/upload': 'ProjectsController.uploadBanner',
    'PUT /api/v1/projects/:id': 'ProjectsController.update',
    'DELETE /api/v1/projects/:id': 'ProjectsController.delete',

    'GET /api/v1/projects/completed/:id': 'ProjectsController.getCompleted',
    'GET /api/v1/projects/completed': 'ProjectsController.getCompleted',

    'GET /api/v1/projects/ongoing/:id': 'ProjectsController.getOngoing',
    'GET /api/v1/projects/ongoing': 'ProjectsController.getOngoing',

    'GET /api/v1/searchprojects/:id/:page/:limit': 'ProjectsController.searchProjects',

    'GET /api/v1/getprojects': 'ProjectsController.getProjects',
    'GET /api/v1/getprojects/:id': 'ProjectsController.getProjects',

    /**
     * Training routes
     */
    'POST /api/v1/training': 'TrainingController.createTraining',
    'POST /api/v1/training/upload': 'TrainingController.uploadBanner',
    'PUT /api/v1/training/:id': 'TrainingController.updateTraining',
    'DELETE /api/v1/training/:id': 'TrainingController.deleteTraining',

    'GET /api/v1/training/completed/:id': 'TrainingController.getCompleted',
    'GET /api/v1/training/completed': 'TrainingController.getCompleted',

    'GET /api/v1/training/ongoing/:id': 'TrainingController.getOngoing',
    'GET /api/v1/training/ongoing': 'TrainingController.getOngoing',

    'GET /api/v1/mytrainings/:id': 'TrainingController.myTrainings',
    'GET /api/v1/searchtrainings/:id/:page/:limit': 'TrainingController.searchTrainings',

    'GET /api/v1/gettrainings': 'TrainingController.getTrainings',
    'GET /api/v1/gettrainings/:id': 'TrainingController.getTrainings',

    /**
     * Event routes
     */
    'POST /api/v1/events': 'EventsController.createEvent',
    'POST /api/v1/events/upload': 'EventsController.uploadBanner',
    'PUT /api/v1/events/:id': 'EventsController.updateEvent',
    'DELETE /api/v1/events/:id': 'EventsController.deleteEvent',

    'GET /api/v1/events/completed/:id': 'EventsController.getCompleted',
    'GET /api/v1/events/completed': 'EventsController.getCompleted',

    'GET /api/v1/events/ongoing/:id': 'EventsController.getOngoing',
    'GET /api/v1/events/ongoing': 'EventsController.getOngoing',

    'GET /api/v1/myevents/:id': 'EventsController.myEvents',
    'GET /api/v1/searchevents/:id/:page/:limit': 'EventsController.searchEvents',

    'GET /api/v1/getevents': 'EventsController.getEvents',
    'GET /api/v1/getevents/:id': 'EventsController.getEvents',

    /**
     * Advert routes
     */
    'POST /api/v1/advert': 'AdvertController.createAdvert',
    'POST /api/v1/advert/upload': 'AdvertController.uploadBanner',
    'PUT /api/v1/advert/:id': 'AdvertController.updateAdvert',
    'DELETE /api/v1/advert/:id': 'AdvertController.deleteAdvert',
    'GET /api/v1/advert/:id': 'AdvertController.getAdvert',
    'GET /api/v1/advert': 'AdvertController.getAdvert',

    /**
     * Donation routes
     */
    'POST /api/v1/donation': 'DonationController.createDonation',
    'POST /api/v1/donation/upload': 'DonationController.uploadBanner',
    'PUT /api/v1/donation/:id': 'DonationController.updateDonation',
    'DELETE /api/v1/donation/:id': 'DonationController.deleteDonation',

    'GET /api/v1/donation/completed/:id': 'DonationController.getCompleted',
    'GET /api/v1/donation/completed': 'DonationController.getCompleted',

    'GET /api/v1/donation/ongoing/:id': 'DonationController.getOngoing',
    'GET /api/v1/donation/ongoing': 'DonationController.getOngoing',

    'GET /api/v1/mydonations/:id': 'DonationController.myDonations',
    'GET /api/v1/searchdonations/:id/:page/:limit': 'DonationController.searchDonations',

    'GET /api/v1/getdonations': 'DonationController.getDonations',
    'GET /api/v1/getdonations/:id': 'DonationController.getDonations',

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
    'GET /api/v1/doccount': 'KnowledgeBaseController.getCount',
    'GET /api/v1/searchdocuments/:id/:page/:limit': 'KnowledgeBaseController.searchDocuments',

    'POST /api/v1/knowledgebase/category': 'KnowledgeBaseController.createCategory',
    'PUT /api/v1/knowledgebase/category/:id': 'KnowledgeBaseController.updateCategory',
    'DELETE /api/v1/knowledgebase/category/:id': 'KnowledgeBaseController.deleteCategory',
    'GET /api/v1/knowledgebase/category/:id': 'KnowledgeBaseController.getCategory',
    'GET /api/v1/knowledgebase/category': 'KnowledgeBaseController.getCategory',

    /**
     * Verifier routes
     */
    'POST /api/v1/verifier': 'VerifierController.verify',
    'DELETE /api/v1/verifier/:id/:reason': 'VerifierController.reject',
    'GET /api/v1/verifier/:id': 'VerifierController.get',
    'GET /api/v1/verifier': 'VerifierController.get',

    /**
     * Approver routes
     */
    'POST /api/v1/approver': 'ApproverController.approve',
    'DELETE /api/v1/approver/:id/:reason': 'ApproverController.reject',
    'GET /api/v1/approver/:id': 'ApproverController.get',
    'GET /api/v1/approver': 'ApproverController.get',

    /**
     * Referrer routes
     */
    'POST /api/v1/referrer': 'ReferrerController.confirm',
    'DELETE /api/v1/referrer/:id/:refereeId': 'ReferrerController.reject',
    'GET /api/v1/referrer/:id': 'ReferrerController.get',
    'GET /api/v1/referrer': 'ReferrerController.get',

    /**
     * Social routes
     */
    'GET /api/v1/socialcount': 'SocialController.getCount',
    'GET /api/v1/social/requests/:id': 'SocialController.getRequests',

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
    'GET /api/v1/social/postsearch': 'SocialController.searchPost',

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
    'GET /api/v1/social/requests/:requestee': 'SocialController.getRequsts',

    // Social feed routes
    'GET /api/v1/social/feed/:id': 'SocialController.getFeed',

    // Notifiction routes
    'POST /api/v1/notifications': 'NotificationsController.create',
    'DELETE /api/v1/notifications/:id': 'NotificationsController.delete',
    'GET /api/v1/notifications/:id': 'NotificationsController.get',
    'GET /api/v1/notifications': 'NotificationsController.get',

    /**
     * Forum routes
    */
    'GET /api/v1/forumcount': 'ForumController.getCount',

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

    //Forum censor routes
    'PUT /api/v1/forum/censor/:id/:action': 'ForumController.censorPost',
    'GET /api/v1/forum/censor': 'ForumController.getCensoredPost',

    // Paystack routes
    'POST /api/v1/paystack': 'PaystackController.verify',

    // Payment routes
    'GET /api/v1/payments': 'PaymentsController.get',
    'GET /api/v1/payments/totals': 'PaymentsController.getTotals',
    'GET /api/v1/payments/donations': 'PaymentsController.donations',
    'GET /api/v1/payments/events': 'PaymentsController.events',
    'GET /api/v1/payments/trainings': 'PaymentsController.trainings',
    'GET /api/v1/payments/registrations': 'PaymentsController.registrations',
    'GET /api/v1/payments/memberships': 'PaymentsController.memberships',
    'GET /api/v1/payments/dues': 'PaymentsController.dues',

    'POST /api/v1/payments/excel': 'PaymentsController.getExcel',
    'POST /api/v1/payments/donation/excel': 'PaymentsController.getDonationExcel',
    'POST /api/v1/payments/event/excel': 'PaymentsController.getEventExcel',
    'POST /api/v1/payments/training/excel': 'PaymentsController.getTrainingExcel',
    'POST /api/v1/payments/registration/excel': 'PaymentsController.getRegistrationExcel',
    'POST /api/v1/payments/membership/excel': 'PaymentsController.getMembershipExcel',
    'POST /api/v1/payments/due/excel': 'PaymentsController.getDueExcel',

    // User payments routes
    'GET /api/v1/userpayments/donations/:id': 'UserPaymentsController.userDonations',
    'GET /api/v1/userpayments/events/:id': 'UserPaymentsController.userEvents',
    'GET /api/v1/userpayments/trainings/:id': 'UserPaymentsController.userTrainings',
    'GET /api/v1/userpayments/memberships/:id': 'UserPaymentsController.userMemberships',
    'GET /api/v1/userpayments/dues/:id': 'UserPaymentsController.userDues',

    // Audit routes
    'GET /api/v1/audit': 'AuditController.get',
    'POST /api/v1/audit/excel': 'AuditController.getExcel',


    // Test routes
    'POST /api/v1/testemail': 'TestController.testEmail',
    'POST /api/v1/testam': 'TestController.testPage',
    'POST /api/v1/olddata': 'TestController.oldData',
    'POST /api/v1/alertoldmembers': 'TestController.alertOldMembers',
};