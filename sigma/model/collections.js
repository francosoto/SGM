steal(	'sigma/model/hal.js'
,	function()
	{
		Sigma.Model.HAL.Resource(
			"Sigma.Model.HAL.Collection"
		,	{}
		,	{
				getUrlMode: function(url,data,mode)
					{
						return this.Fetch(url)
						/*return	can.ajax(
							{
								url:url
							,	method: mode
							,	data: data
							}
						)*/
					}
			,	post: function(url,data)
					{
						console.log(this.embedded, url)
						//var	self=this
						//return this.getUrlMode(url,data,'post');
					}
			,	put: function(url,data)
					{
						//var	self=this
						//return this.getUrlMode(url,data,'put');
					}
			,	del: function(url,data)
					{
						//var	self=this
						//return this.getUrlMode(url,data,'delete');
					}
			}
		);
		can.Model.List( 'Sigma.Model.HAL.Collection.List');
	}
)
