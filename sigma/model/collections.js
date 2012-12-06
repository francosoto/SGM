steal(	'sigma/model/hal.js'
,	function()
	{
		Sigma.Model.HAL.Resource(
			"Sigma.Model.HAL.Collection"
		,	{
				getUrlMode: function(url,data,mode)
					{
						return	can.ajax(
							{
								url:url
							,	method: mode
							,	data: data
							}
						)
					}
			,	post: function(url,data)
					{
						//var	self=this
						return this.getUrlMode(url,data,'post');
					}
			,	put: function(url,data)
					{
						//var	self=this
						return this.getUrlMode(url,data,'put');
					}
			,	del: function(url,data)
					{
						//var	self=this
						return this.getUrlMode(url,data,'delete');
					}
			},
			{
				
			}
		);
	}
)
