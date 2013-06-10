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
				res[0].value.forEach(function (value) {
					console.log("  - %s", value)
				})
			}
			else {
				console.log("No results found.");
			}
		}
	)}
}
