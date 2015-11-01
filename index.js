var parse = require('./lib/parse');
var pinboard = require('./lib/pinboard');

parse()
	.then(function ( items ) {
		return pinboard(items);
	})
	.then(function ( items ) {
		var count = items.length;
		console.log('Saved ' + count + ' ' + (count === 1 ? 'link' : 'links') + '.');
	});
