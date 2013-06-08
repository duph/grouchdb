grouch = require('../grouchdb')

this.Friends = {
	of_friend: function(aKey, callback)
	{
		grouch.cradle_db.view('friends/friends_of_friend', {key: aKey, group: true, reduce: true}, function (err, res) {
			return res;
		}
	)}
}