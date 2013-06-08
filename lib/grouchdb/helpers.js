this.Helpers = {
	correct_node_format: function(doc)
	{
		if (!doc.edges)
			doc['edges'] = {}
		return doc;
	}
}