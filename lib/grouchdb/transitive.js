var Basic = require('./basic').Basic;
var Helpers = require('./helpers').Helpers;



this.Transitive = {}

var Transitive = this.Transitive;

//var BST = new grouch.BST()


this.Transitive = {
	
	init: function(aKey)
	{
		this.id = grouch.Helpers.new_trace();	
	},

	create: function(key)
	{		
		//var res = function(a,b){return{err: a, doc: b};}
		var result = {};

		grouch.Basic.get("david",function(a,b) {
			result.err = a; 
			result.doc = b;
		}); 

		console.log(result.doc);
//		var closure = new grouch.BST();

		var trace_id = grouch.Helpers.new_trace();
		console.log(result);
	}
}
