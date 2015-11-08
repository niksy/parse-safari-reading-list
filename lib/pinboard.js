var Pinboard = require('node-pinboard');
var request = require('request');
var stripUtm = require('strip-utm');
var url = require('url');
var apiToken = process.env.PINBOARD_API_TOKEN;
var pinboard;

if ( !apiToken ) {
	throw new Error('Pinboard API token is not provided.');
}

pinboard = new Pinboard(apiToken);

/**
 * Removes mobile URLs and strips tracking query parameters
 *
 * @param  {String} itemUrl
 *
 * @return {String}
 */
function cleanUrl ( itemUrl ) {
	var parsed = url.parse(itemUrl);
	parsed.hostname = parsed.hostname.replace(/^(?:m|mobile|touch)\./, '');
	delete parsed.host;
	return stripUtm(url.format(parsed));
}

/**
 * @param  {Object} item
 *
 * @return {Promise}
 */
function addToPinboard ( item ) {
	return new Promise(function ( resolve ) {

		request({
			method: 'HEAD',
			url: item.url,
			followAllRedirects: true
		}).on('response', function ( response ) {

			pinboard.add({
				url: cleanUrl(response.request.href),
				description: item.title,
				toread: 'yes'
			}, resolve);

		});

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
		arr.push(addToPinboard(item));
	});
	return Promise.all(arr);
};
