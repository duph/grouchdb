var cradle = require('cradle')
var grouch = exports;

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
			grouch.log('database found');
	    } else {
			grouch.log('database not found');
			db.create();
			/* populate design documents */
	    }
	});
}


//print node to console
grouch.Connection.prototype.get = function(key)
{
	grouch.cradle_db.get(key, function(err, doc) {
		grouch.log(doc);
	});
}

//print edges to console
grouch.Connection.prototype.get_edges = function(key)
{
	grouch.cradle_db.get(key, function(err, doc) {
		grouch.log(doc.edges);
	});
}