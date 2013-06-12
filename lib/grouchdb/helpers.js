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
	},

	format_bridge_data_bridge_edges: function(bridge_edges)
	{
		ret = [];
		for (var key in bridge_edges)
		{
			for (var i in bridge_edges[key])
			{
				ret.push([key, bridge_edges[key][i]])
			}
		}
		return ret;
	}
}

