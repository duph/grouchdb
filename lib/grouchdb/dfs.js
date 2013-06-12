var Basic = require('./basic').Basic;
var Helpers = require('./helpers').Helpers;


this.DFS = {}
var DFS = this.DFS;
DFS.modify_node = {}

//private
var dfs_data = null;

var dfs_template = function(last_visited, visit_order){
	return {
	last_visitor: last_visited,
	visit_order: visit_order
	};
} 

//public
DFS.init = function(callback)
{
	Basic.create('dfs_data', {
		visitor_tag: Helpers.random_string(30),
		queue: []
	}, callback);
}

DFS.modify_node.clr = {
	visited: function(doc, prev_key, callback){ callback(); },
	not_visited: function(doc, prev_key, callback){ callback(); }
}

DFS.push_edge = function(edge, callback)
{
	Basic.get('dfs_data', function(err, doc){
	dfs_data.queue.push(edge);
	callback();
	});
}

DFS.dfs = function(key, prev_key, params, n, modify_node, callback)
{
	Basic.get('dfs_data', function(err, doc){
	dfs_data = doc;

	
	Basic.get(key, function(err, doc){
	if(!("dfs" in doc))
		doc.dfs = dfs_template(null, null);

	if (doc.dfs.last_visitor != dfs_data.visitor_tag)
	{
		doc.dfs.last_visitor = dfs_data.visitor_tag;
		doc.dfs.visit_order = n;
		n += 1;

		if (!params.manual_edge_select)
		{
			var edges = Object.keys(doc.edges);
			for (var i in edges)
			{	
				if (edges[i] != prev_key)
				dfs_data.queue.push({from: key, to: edges[i]});
			}
		}

		

		modify_node.not_visited(doc, prev_key, function(){
		if (dfs_data.queue.length > 0)
		{
			var next_edge = dfs_data.queue.pop();
		}
		else
		{ 
			callback();
			return;
		}
		Basic.merge(key, doc, function(){
		Basic.merge('dfs_data', dfs_data, function(){
		
		DFS.dfs(next_edge.to, next_edge.from, params, n, modify_node, callback);
		});});});
	}
	else
	{
		
		modify_node.visited(doc, prev_key, function(){
		
		if (dfs_data.queue.length > 0)
			var next_edge = dfs_data.queue.pop();
		else
		{ 
			callback();
			return;
		}

		DFS.dfs(next_edge.to, next_edge.from, params, n, modify_node, callback);
		});
	}
	});});
}
