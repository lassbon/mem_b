/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

    /***************************************************************************
     *                                                                          *
     * Default policy for all controllers and actions (`true` allows public     *
     * access)                                                                  *
     *                                                                          *
     ***************************************************************************/
    '*': ['isAuthenticated'], // Everything resctricted here
    '*': ['isAdmin'], // Everything resctricted here


    /***************************************************************************
     *                                                                          *
     * policy for excluding auth controller and actions from authentication check
     *                                                                          *
     *                                                                          *
     ***************************************************************************/

    'UserController': { // We dont need authorization here, allowing public access
        '*': ['isUser', 'isAuthenticated'],
        'create': true,
        'delete': ['isAdministrator', 'isAdmin', 'isAuthenticated'],
        'getOldMember': ['isUser', 'isAuthenticated'],
    },

    'UserPaymentsController': {
        '*': ['isUser', 'isAuthenticated'],
    },

    'SocialController': { // We dont need authorization here, allowing public access
        '*': ['isUser', 'isAuthenticated'],
    },

    'ForumController': { // We dont need authorization here, allowing public access
        '*': ['isUser', 'isAuthenticated'],
    },

    'ForumController': { // We dont need authorization here, allowing public access
        '*': ['isUser', 'isAuthenticated'],
    },

    'AdminController': {
        '*': ['isAdmin', 'isAuthenticated'],
        'forgotPassword': true,
        'create': ['isAdmin', 'isAdministrator', 'isAuthenticated'],
        'delete': ['isAdmin', 'isSuper', 'isAuthenticated'], 
        'get': ['isAdmin', 'isAdministrator', 'isAuthenticated'],
        'getCount': ['isAdmin', 'isAdministrator', 'isAuthenticated']
    },

    'AuthController': {
        '*': true // We dont need authorization here, allowing public access
    },

    'PaystackController': {
        'verify': true
    },

    'PaymentsController': {
        'get': ['isAdmin', 'isFinance', 'isAuthenticated'],
    },

    'AuditController': {
        '*': ['isAdmin', 'isAdministrator', 'isAuthenticated'],
    },

    'ProjectsController': {
        '*': ['isAdmin', 'isContent', 'isAuthenticated'],
        'getCompleted': ['isUser', 'isAuthenticated'],
        'getOngoing': ['isUser', 'isAuthenticated'],
        'searchProjects': ['isUser', 'isAuthenticated'],
        'getProjects': ['isUser', 'isAuthenticated'],
    },

    'TrainingController': {
        '*': ['isAdmin', 'isContent', 'isAuthenticated'],
        'getCompleted': ['isUser', 'isAuthenticated'],
        'getOngoing': ['isUser', 'isAuthenticated'],
        'myTrainings': ['isUser', 'isAuthenticated'],
        'searchTrainings': ['isUser', 'isAuthenticated'],
        'getTrainings': ['isUser', 'isAuthenticated'],
    },

    'EventsController': {
        '*': ['isAdmin', 'isContent', 'isAuthenticated'],
        'getCompleted': ['isUser', 'isAuthenticated'],
        'getOngoing': ['isUser', 'isAuthenticated'],
        'myEvents': ['isUser', 'isAuthenticated'],
        'searchEvents': ['isUser', 'isAuthenticated'],
        'getEvents': ['isUser', 'isAuthenticated'],
    },

    'DonationController': {
        '*': ['isAdmin', 'isContent', 'isAuthenticated'],
        'getCompleted': ['isUser', 'isAuthenticated'],
        'getOngoing': ['isUser', 'isAuthenticated'],
        'myDonations': ['isUser', 'isAuthenticated'],
        'searchDonations': ['isUser', 'isAuthenticated'],
        'getDonations': ['isUser', 'isAuthenticated'],
    }, 

    'LevelsController': {
        '*': ['isAdmin', 'isAdministrator', 'isAuthenticated'],
        'get': ['isUser', 'isAuthenticated'],
    },

    'AdvertController': {
        '*': ['isAdmin', 'isContent', 'isAuthenticated'],
        'get': ['isUser', 'isAuthenticated'],
    },

    'NotificationsController': {
        '*': ['isUser', 'isAuthenticated'],
    },

    'KnowledgeBaseController': {
        '*': ['isAdmin', 'isContent', 'isAuthenticated'],
        'get': ['isUser', 'isAuthenticated'],

        'create': ['isUser', 'isAuthenticated'],
        'uploadDocument': ['isUser', 'isAuthenticated'],
        'update': ['isUser', 'isAuthenticated'],
        'delete': ['isAdmin', 'isAdministrator', 'isAuthenticated'],
        'getDoc': ['isUser', 'isAuthenticated'],
        'searchDocuments': ['isUser', 'isAuthenticated'],
    },

    'ApproverController': {
        '*': ['isAdmin', 'isApprover', 'isAuthenticated'],
    },

    'VerifierController': {
        '*': ['isAdmin', 'isVerifier', 'isAuthenticated'],
    },

    'ReferrerController': {
        '*': true,
    },

    'TestController': {
        '*': ['isUser', 'isAuthenticated'],
        'testEmail': true,
        'oldData': true,
    },

    /***************************************************************************
     *                                                                          *
     * Here's an example of mapping some policies to run before a controller    *
     * and its actions                                                          *
     *                                                                          *
     ***************************************************************************/
    // RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    // '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    // nurture  : 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    // feed : ['isNiceToAnimals', 'hasRabbitFood']
    // }
};
