/**
 * Utility
 *
 * @description :: Utility Service for sails. This is where usefull functions are made
 * @help        :: See https://github.com/auth0/node-jsonwebtoken & http://sailsjs.org/#!/documentation/concepts/Services
 */

// Delete blob from a container
module.exports.membershipId = function() {

	// User.count().exec(function(err, usercount) {
	// 	if (err) {
	// 		sails.log.error(err);
	// 	}

	// 	var num = usercount + 1;

	// 	return 'ABUCCI/MEM/' + num;
	// });

	return 'ABUCCI/MEM/000000';

	// User.findOne({select: ['membershipId']}).sort('membershipId DESC').exec(function(err, member){
	// 	if (err) {
	// 		sails.log.error(err);
	// 	}

	// 	if(member){
	// 		var id = member.membershipId;
	// 		var serialNumber = id.split('/')[2];
	// 		serialNumber = parseInt(serialNumber);

	// 		serialNumber = serialNumber++;

	// 		return 'ABUCCI/MEM/' + serialNumber;
	// 	}
	// });
};
