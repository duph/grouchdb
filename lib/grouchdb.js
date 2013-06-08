var cradle = require('cradle')

var grouch = exports;

//Require function from different file (example)
// grouch.myfunction = require('./grouchdb/myfunction').func_name
grouch.Helpers = require('./grouchdb/helpers').Helpers;
grouch.Basic = require('./grouchdb/basic').Basic;

grouch.cradle_connection = null;
grouch.cradle_db = null;

grouch.log = function(output)
{
	console.log(output);
}

grouch.Connection = function(/* variable args */)
{
	grouch.cradle_connection = new(cradle.Connection)(arguments);
	grouch.cradle_db = grouch.cradle_connection.database('grouch');

	grouch.cradle_db.exists(function (err, exists) {
	    if (err) {
			grouch.log('error', err);
	    } else if (exists) {
			grouch.log('database found. Press Enter to continue.');
	    } else {
			grouch.log('database not found. Press Enter to continue.');
			grouch.cradle_db.create();
			/* populate design documents */
	    }
	});
}