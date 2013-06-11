this.Helpers = {
	correct_node_format: function(doc)
	{
		if (!doc.edges)
			doc['edges'] = {}
		return doc;
	},

	new_trace: function() {
        return new Date().getTime();
    },

    random_string: function(length) {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyz'.split('');
    
    if (! length) {
        length = Math.floor(Math.random() * chars.length);
    }
    
    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
	}
}

