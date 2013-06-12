var Basic = require('./basic').Basic;
var DFS = require('./dfs').DFS;
var Helpers = require('./helpers').Helpers;

this.Bridge = {};
var Bridge = this.Bridge;

Bridge.modify_node = {};
Bridge.params = {};
Bridge.metadata = {
	bridge_edges: []
};

var bridge_template = function(forward_edges, backward_edges){
	return {
		forward_edges: forward_edges,
		back_edges: backward_edges
	};
}

Bridge.init = function(callback){
	Basic.create('bridge_data', {
		bridge_edges: {},
		back_edges: []
	}, callback);
}

//Create cycle graph
Bridge.params.cycle_graph = {
	manual_edge_select: false
}

Bridge.modify_node.cycle_graph = {};
Bridge.modify_node.cycle_graph.update_bridge_data = function(key, prev_key, callback)
{
	Basic.get("bridge_data", function(err, doc){
	if (key != null & prev_key != null)
	{
		doc.back_edges.push(prev_key);
		if(!(key in doc.bridge_edges))
			doc.bridge_edges[key] = [prev_key];
		else
			doc.bridge_edges[key].push(prev_key);
	}

	Basic.merge('bridge_data', doc, function(){
	callback();
	});});
}

Bridge.modify_node.cycle_graph.visited = function(doc, prev_key, callback){
	doc.bridge.back_edges.push(prev_key);
	var key = doc._id;

	Bridge.modify_node.cycle_graph.update_bridge_data(key, prev_key, callback);
}
Bridge.modify_node.cycle_graph.not_visited = function(doc, prev_key, callback){
	doc.bridge = bridge_template([prev_key], []);
	var key = doc._id;

	Bridge.modify_node.cycle_graph.update_bridge_data(key, prev_key, callback);
}

//Remove cycle edges from bridge_data
Bridge.weed_cycle_edges_init = function(callback)
{
	DFS.init(function(){
	
	Basic.get('bridge_data', function(err, doc){
	// console.log(doc);
	Bridge.weed_cycle_edges(doc, callback);

	});});
}

Bridge.params.weed_cycle_edges = {
	manual_edge_select: true
}

Bridge.modify_node.weed_cycle_edges = {};

Bridge.modify_node.weed_cycle_edges.visited = function(doc, prev_key, callback){

	if (doc.dfs.visit_order == 0 && doc.bridge.back_edges.length > 0)
	{
		var edge = {from: doc._id, to:doc.bridge.back_edges.pop()};
		Bridge.not_bridge(edge, function(){
		Basic.merge(doc._id, doc, function(){
		// console.log("visited 0");
		// console.log(edge);
		DFS.push_edge(edge, callback);
		});});
	}
	else
	{
		callback();
	}
}

Bridge.modify_node.weed_cycle_edges.not_visited = function(doc, prev_key, callback){
		if (doc.dfs.visit_order == 0 && doc.bridge.back_edges.length > 0)
		{
			var edge = {from: doc._id, to:doc.bridge.back_edges.pop()};
			Bridge.not_bridge(edge, function(){
			Basic.merge(doc._id, doc, function(){
			// console.log("not_visited 0");
			// console.log(edge);
			DFS.push_edge(edge, callback);
			});});
		}
		else if (doc.dfs.visit_order == 0 && doc.bridge.back_edges.length == 0)
			callback();
		else
		{
			var edge = {from: doc._id, to:doc.bridge.forward_edges.pop()};
			Bridge.not_bridge(edge, function(){
			Basic.merge(doc._id, doc, function(){
			// console.log("not_visited 1");
			// console.log(edge);
			DFS.push_edge(edge, callback);
			});});
		}
}


Bridge.weed_cycle_edges = function(bridge_data, callback)
{
	if (bridge_data.back_edges.length > 0)
	{ 
		var back_edge = bridge_data.back_edges.pop();
		DFS.dfs(back_edge, null, Bridge.params.weed_cycle_edges, 0, Bridge.modify_node.weed_cycle_edges, function(){
		Bridge.weed_cycle_edges(bridge_data, callback);
		});
	}
	else
		callback();
}

Bridge.not_bridge = function(edge, callback)
{
	Basic.get('bridge_data', function(err, doc){
	// if(edge.from in doc.bridge_edges)

	if (edge.from in doc.bridge_edges && doc.bridge_edges[edge.from].indexOf(edge.to) > -1)
	{
		var i = doc.bridge_edges[edge.from].indexOf(edge.to);
		doc.bridge_edges[edge.from].splice(i,1);
	}
	if (edge.to in doc.bridge_edges && doc.bridge_edges[edge.to].indexOf(edge.from) > -1)
	{
		var i = doc.bridge_edges[edge.to].indexOf(edge.from);
		doc.bridge_edges[edge.to].splice(i,1);
	}
	Basic.merge('bridge_data', doc, callback);
	})
}



Bridge.get = function(key, callback)
{
	Bridge.init(function(){
	DFS.init(function(){
	DFS.dfs(key, null, Bridge.params.cycle_graph, 0, Bridge.modify_node.cycle_graph, function(){

	Bridge.weed_cycle_edges_init(function(){

	Basic.get('bridge_data', function(err, doc){
	callback(null, Helpers.format_bridge_data_bridge_edges(doc.bridge_edges));
	});});});});});
}
//