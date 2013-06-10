var Basic = require('./basic').Basic;
var Helpers = require('./helpers').Helpers;

this.Friends = {}
var Friends = this.Friends;

this.Friends = {
	of_friend: function(aKey)
	{
		grouch.cradle_db.view('friends/friends_of_friend', {key: aKey, group: true, reduce: true}, function (err, res) {
			res.forEach(function (row) {
				console.log("%s", row)
			})
		}
	)}
}