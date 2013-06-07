var cradle = require('cradle')

var grouch = exports;


//Require function from different file (example)
grouch.myfunction = require('./grouchdb/myfunction').func_name

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
			db.create('grouch');
			/* populate design documents */
	    }
	});
}

var env = grouch.Connection.prototype;


// get node with key
grouch.Connection.prototype.get = function(key, callback)
{
	grouch.cradle_db.get(key, callback);
}

// get edges of node with key
grouch.Connection.prototype.get_edges = function(key, callback)
{
	grouch.cradle_db.get(key, function(err, doc) {
		callback(err, {edges: doc.edges});
	});
}

// merges the properties of doc to node with key
grouch.Connection.prototype.merge = function(key, doc, callback)
{
	grouch.cradle_db.merge(key, doc, callback);
}

// overwrites properties of node with key with doc
grouch.Connection.prototype.create = function(key, doc, callback)
{
	if (!doc.edges)
		doc.edges = {};
	grouch.cradle_db.save(key, doc, callback);
}

// adds edge with value value from node with from_key to node with to_key
grouch.Connection.prototype.add_edge = function(from_key, to_key, value, callback)
{

	env.get_edges(from_key, function(err, doc){

		doc.edges[to_key] = value;
		env.merge(from_key, doc, callback);
	});
}