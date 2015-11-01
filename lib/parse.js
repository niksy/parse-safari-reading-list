var plist = require('simple-plist');
var path = require('path');
var file = path.join(process.env.HOME, '/Library/Safari/Bookmarks.plist');

/**
 * @param  {Object}   data
 * @param  {Function} cb
 *
 * @return {Object}
 */
function getList ( data, cb ) {
	return data.Children.filter(function ( item ) {
		if ( item.Title === 'com.apple.ReadingList' ) {
			if ( cb ) {
				cb.call(null, item);
			}
			return true;
		}
		return false;
	})[0];
}

function clearReadingList () {
	var data = plist.readFileSync(file);
	getList(data, function ( item ) {
		item.Children = [];
	});
	plist.writeFileSync(file, data);
}

/**
 * @return {Promise}
 */
module.exports = function () {

	var data = plist.readFileSync(file);
	var item = getList(data);

	return new Promise(function ( resolve ) {

		var urls = [];

		if ( item && item.Children ) {
			urls = item.Children.map(function ( urlItem ) {
				var additionalData = urlItem.ReadingListNonSync;
				var url = urlItem.URLString;
				return {
					title: additionalData && additionalData.Title ? additionalData.Title : url,
					url: url
				};
			});
			clearReadingList();
		}

		resolve(urls);

	});

};
