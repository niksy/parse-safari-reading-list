#!/usr/bin/env node

var index = require('./');
var parse = require('./lib/parse');

index()
	.then(function ( items ) {
		var count = items.length;
		parse.clearReadingList();
		console.log('Saved ' + count + ' ' + (count === 1 ? 'link' : 'links') + '.');
	})
	.catch(function ( err ) {
		console.error('Error ocurred: ' + err);
	});
