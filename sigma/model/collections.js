steal(	'sigma/model/hal.js'
,	function()
	{

		Sigma.Model.HAL.Resource(
			"Sigma.Model.HAL.Collection"
		,	{
				Request: 
					function(url, type, data)
					{
					return	can.ajax(
							{
								url: 	url
							,	type: 	type
							,	data: 	data
							}
						)
						.then(
							function(data)
							{
								return Sigma.Model.HAL.Collection.model(data)
							}
						)
					}
			,	Put: 
					function(url,data)
					{
					return	this.Request(url, 'PUT', data)
					}
			,	Post: 
					function(url,data)
					{
					return	this.Request(url, 'POST', data)
					}
			,	Delete : 
					function(url)
					{
					return	this.Request(url, 'DELETE')

					}
			}
		,	{
				getCollection:
					function()
					{
					return	this.embedded.attr('collection')
					}
			,	getMore: 
					function()
					{
					return 	this.links.attr('more')
					}
			,	getPrev: 
					function()
					{
					return 	this.links.attr('prev')
					}
			,	getNext: 
					function()
					{
					return 	this.links.attr('next')
					}
			,	request: 
					function(type, data)
					{
					return	can.ajax(
							{
								url: 	this.links.self.href
							,	type: 	type
							,	data: 	data
							}
						)
					}
			,	post: 
					function(data)
					{
					var 	self = this
					return	this.request('POST',data)
						.done(
							function(obj)
							{
								self.embedded.collection.push(Sigma.Model.HAL.Collection.model(obj))
							}
						)
						.then(
							function(data)
							{
								return Sigma.Model.HAL.Collection.model(data)
							}
						)

					}
			,	put: 
					function(data)
					{
					var 	self = this
					return	this.request('PUT',data)
						.done(
							function()
							{
								Sigma.Model.HAL.set_attributes(self, data)	
							}
						)
					}
			,	delete : 
					function()
					{
					var 	self = this
					return	this.request('DELETE')
						.done(
							function()
							{
								self.destroyed()
							}
						)

					}
			}
		);
		can.Model.List( 'Sigma.Model.HAL.Collection.List');
	}
)
