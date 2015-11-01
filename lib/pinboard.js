var Pinboard = require('node-pinboard');
var apiToken = process.env.PINBOARD_API_TOKEN;
var pinboard;

if ( !apiToken ) {
	throw new Error('Pinboard API token is not provided.');
}

pinboard = new Pinboard(apiToken);

/**
 * @param  {Object} item
 *
 * @return {Promise}
 */
function request ( item ) {
	return new Promise(function ( resolve ) {
		pinboard.add({
			url: item.url,
			description: item.title,
			toread: 'yes'
		}, resolve);
	});
}

/**
 * @param  {Object[]} items
 *
 * @return {Promise}
 */
module.exports = function ( items ) {
	var arr = [];
	items.forEach(function ( item ) {
		arr.push(request(item));
	});
	return Promise.all(arr);
};
