var cradle = require('cradle')

var grouch = exports;

//Require function from different file (example)
// grouch.myfunction = require('./grouchdb/myfunction').func_name
grouch.Helpers = require('./grouchdb/helpers').Helpers;
grouch.Basic = require('./grouchdb/basic').Basic;
grouch.DFS = require('./grouchdb/dfs').DFS;
grouch.Friends = require ('./grouchdb/friends').Friends
// grouch.Transitive = require ('./grouchdb/transitive').Transitive
// this.BST = require('./grouchdb/bst').BST;
grouch.Bridge = require ('./grouchdb/bridge').Bridge

grouch.cradle_connection = null;
grouch.cradle_db = null;
grouch.metadata = {}
grouch.metadata.cradle_connection = null
grouch.metadata.cradle_db = null

grouch.log = function(output)
{
	console.log(output);
}

grouch.Connection = function(/* variable args */)
{
	args = [].slice.call(arguments);
	var callback = args.pop();

	grouch.cradle_connection = new(cradle.Connection)(args);
	grouch.cradle_db = grouch.cradle_connection.database('grouch');

	grouch.metadata.cradle_connection = new(cradle.Connection)(args);
	grouch.metadata.cradle_db = grouch.cradle_connection.database('grouch_metadata');

	grouch.cradle_db.exists(function (err, exists) {
	    if (err) {
			grouch.log('error', err);
	    } else if (exists) {
			grouch.log('database found. Press Enter to continue.');
			callback();
	    } else {
			grouch.log('database not found. Press Enter to continue.');
			grouch.cradle_db.create();
			/* populate design documents */
			callback();
	    }

	});
}