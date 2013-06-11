var Basic = require('./basic').Basic;
var Helpers = require('./helpers').Helpers;
var BST = require('./bst').BST


this.Transitive = {}

var Transitive = this.Transitive;

//var BST = new grouch.BST()


this.Transitive = {};
var Transitive = this.Transitive;
	// init: function(aKey)
	// {
	// 	this.id = grouch.Helpers.new_trace();	
	// },
	
	Transitive.create = function(key)
	{
		Transitive.bsf(key, grouch.Helpers.new_trace());
	}
	
	Transitive.closure = function()
	{		
		var closure = {}
		grouch.cradle_db.view('friends/friends_of_friend',{group:true}, function(err,res) {
			if (err)
				console.log(err);
			else
			{
				//set up adjacency matrix
				for (var k in res) {
					closure[res[k].key] = {};
					for (var i in res) {
						closure[res[k].key][res[i].key] = 0
					}
					closure[res[k].key][res[k].key] = 1

					for (var edge in res[k].value) {
						if (res[k].value[edge] != null) {
							closure[res[k].key][res[k].value[edge]] = 1;
						}
					}
				}
				// warshall closure algorithm
				for (var k in res) {
					for (var i in res) {
						for (var j in res) {
							if ((closure[res[i].key][res[j].key] == 1) || ((closure[res[i].key][res[k].key]) && (closure[res[k].key][res[j].key]))) {
								closure[res[i].key][res[j].key] = 1;
							} 	
						}
					}
				}
			}
			console.log(closure);
		})		
	}		
		
//		var closure = new grouch.BST();



	// build: function(...)
	// {
	// 	// this function receives a closure root and an edge key
	// 	// it searches the tree for the edge_id
	// 	// if it isn't the tree, it gets the doc from the DB
	// 	// adds it to the tree, marks the doc w. the trace ID
	// 	// then recursively calls the build function on all the doc.edge
	//