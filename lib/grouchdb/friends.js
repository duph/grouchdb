var Basic = require('./basic').Basic;
var Helpers = require('./helpers').Helpers;

this.Friends = {}
var Friends = this.Friends;

this.Friends = {
	of_friend: function(aKey)
	{
		grouch.cradle_db.view('friends/friends_of_friend', {key: aKey, group: true}, function (err, res) {
			if (res[0]) {
				console.log ("\n- %s", res[0].key)
				res[0].value.forEach(function (value) {					//for each value of friends
					if (value != null){									
						Basic.get_edges(value, function(err, doc){		//get the edges of the current node (these are friends of a friend of the passed in node)
							console.log("  - %s", value);				//print current node
							var f_of_f = JSON.stringify(doc.edges);		//convert edges of the current node to string
							console.log("   - %s", f_of_f);				//print the edges of the current node
							});
					}
				})
			}
			else {
				console.log("No results found.");
			}
		}
	)}		
}
