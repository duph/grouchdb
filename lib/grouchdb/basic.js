grouch = require('../grouchdb');

this.Basic = {
	get: function(key, callback)
	{
		grouch.cradle_db.get(key, callback);
	},

	// get edges of node with key
	get_edges: function(key, callback)
	{
		grouch.cradle_db.get(key, function(err, doc) {
			callback(err, {edges: doc.edges});
		});
	},

	// merges the properties of doc to node with key
	merge: function(key, doc, callback)
	{
		doc = grouch.Helpers.correct_node_format(doc);

		grouch.cradle_db.merge(key, doc, callback);
	},

	// overwrites properties of node with key with doc
	create_node: function(key, doc, callback)
	{
		doc = grouch.Helpers.correct_node_format(doc);

		grouch.cradle_db.remove(key, function (err, res) {
	    	grouch.cradle_db.save(key, doc, callback);
	  	});
	},

	// adds edge with value value from node with from_key to node with to_key
	add_edge: function(from_key, to_key, value, callback)
	{
		env.get_edges(from_key, function(err, doc){
			doc = grouch.Helpers.correct_node_format(doc);
			doc.edges[to_key] = value;
			env.merge(from_key, doc, callback);
		});
	},

	delete_edge: function(from_key, to_key, callback)
	{
		env.get_edges(from_key, function(err, doc){
			doc = grouch.Helpers.correct_node_format(doc);
			delete doc.edges[to_key];
			env.merge(from_key, doc, callback);
		});
	}
}