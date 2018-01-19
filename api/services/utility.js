/**
 * Utility
 *
 * @description :: Utility Service for sails. This is where usefull functions are made
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

// Delete blob from a container
module.exports.membershipId = function() {

	User.count().exec(function(err, usercount) {
		if (err) {
			sails.log.error(err);
		}

		var num = 1567 + usercount + 1;

		return 'ABUCCI/MEM/' + num;
	});
};
