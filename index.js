var parse = require('./lib/parse');
var pinboard = require('./lib/pinboard');

/**
 * @return {Promise}
 */
module.exports = function () {

	return parse()
		.then(function ( items ) {
			return pinboard(items);
		});

};
