var Basic = require('./basic').Basic;
var Helpers = require('./helpers').Helpers;


this.DFS = {}
var DFS = this.DFS;
DFS.evaluate = {}

//private
var visitor_tag = null;

var dfs_template = function(last_visited, visit_order){
	return {
	last_visitor: last_visited,
	visit_order: visit_order
	};
}

var bridge_template = {
	visited: false,
	forward_edges: [],
	backward_edges: []
}

//public
DFS.dfs_init = function(callback)
{

	Basic.create('dfs_data', {
		visitor_tag: Helpers.random_string(30),
		queue: []
	}, callback);
}

DFS.evaluate.clear = function()
{

}

DFS.dfs = function(key, prev_key, doshit, callback)
{
	Basic.get('dfs_data', function(err, doc){
	visitor_tag = doc.visitor_tag;
	Basic.get(key, function(err, doc){
	
	if (doc.dfs.last_visitor != visitor_tag)
	{
		
		doshit(doc, prev_key)
	}
	else
	{

	}

	});});
}
