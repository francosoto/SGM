steal(	'sigma/model/hal.js'
,	function()
	{
		Sigma.Model.HAL.Resource(
			"Sigma.Model.HAL.Collection"
		,	{}
		,	{
				getCollection:function()
				{
					return	this.embedded.attr('collection')
				}
			,	getMore: function()
				{
					return this.links.attr('more')
				}
			,	getPrev: function()
				{
					return this.links.attr('prev')
				}
			,	getNext: function()
				{
					return this.links.attr('next')
				}
			,	post: function(data)
				{
					return	this.embedded.collection.push(Sigma.Model.HAL.Collection.model(data))
					return  this.getUrlMode(url,data,'post');
				}
			/*,	get: function(data,url)
				{
					console.log(this.embedded, url)
					return	this.embedded.collection.pop(data)
				}*/
			,	put: function(id,data)
				{
					var p = Sigma.Model.HAL.Collection.model(can.extend({id:id},data))
					var index = -1
					can.each(this.embedded.collection,function(i,v){
						index = id==i.attr('id')?i:-1
					})
					return	(index == -1)?false:this.embedded.collection.splice(1,1,p)
					//var	self=this
					//return this.getUrlMode(url,data,'put');
				}
			,	del: function(id)
				{
					var index = -1
					can.each(this.embedded.collection,function(i,v){
						index = id==i.attr('id')?i:-1
					})
					return	(index == -1)?false:this.embedded.collection.splice(1,1)
					//var	self=this
					//return this.getUrlMode(url,data,'delete');

				}
			}
		);
		can.Model.List( 'Sigma.Model.HAL.Collection.List');
	}
)
