steal(	'sigma/model'
,	'sigma/lib/uritemplates.js'
,	function()
	{
		can.Construct('Sigma.Model')
		Sigma.Model.HAL=
			new can.Observe(
					{
						model_by_rel:
							function(rel)
							{
							return	this[can.capitalize(can.camelCase(rel))]
							}
					,	lookup:
							function(what,relation,index_or_name)
							{
							var	found=what[relation]
								if(found&&found.length)
								{
									found=	can.isNumeric(index_or_name)
										?what[relation][index_or_name]
										:can.grep(
											what[relation]
										,	function(item)
											{
											return	item.name==index_or_name
											}
										)[0]
									if(!found)
										throw	'algo esta mal con el resource'
								}
							return found
							}
					,	set_attributes:
							function(item, attributes)
							{
								can.each(
									attributes,
									function(val, index)
									{
										item[index] = val
									}
								)
								return item
							}							
					}
				,	{}
				)
		can.Observe(
			'Sigma.Model.HAL.LinksItem'
		,	{
				url:
					function()
					{
					//TODO: sobrecarga
					return	uritemplate(this.href).expand(this.parent.resource.attr())
					}
			,	follow:
					function()
					{
					//TODO: sobrecarga
					return	this.parent.get(this.rel,this.name)
					}
			,	get:
					function()
					{
					return	this.parent.get(this.rel,this.name)
					}
			,	fetch:
					function()
					{
					return	this.parent.fetch(this.rel,this.name)
					}
			}
		);
		can.Observe.List(
			'Sigma.Model.HAL.LinksItem.List'
		,	{
				setup:
					function(data)
					{
						this._super( data )
						can.map(
							this
						,	function(item,index)
							{
							return Sigma.Model.HAL.set_attributes(
									item
								,	{index: index, name: item.name||index}
								)
							}
						)
					}
			,	get:
					function(name)
					{
					return	this.parent.get(this.rel,name)
					}
			,	fetch:
					function(name)
					{
					return	this.parent.fetch(this.rel,name)
					}
			}
		);
		can.Model(
			"Sigma.Model.HAL.Links"
		,	{
				setup:
					function(data,resource)
					{
						this._super()
					var	self=this
						this.resource=resource
						can.each(
							data
						,	function(item,key)
							{
								self.attr(key
								,	can.isArray(item)
										?new Sigma.Model.HAL.LinksItem
											.List(
												item.map(
													function(link_item,link_index)
													{
													var	result= new Sigma.Model.HAL.LinksItem(link_item)
													return Sigma.Model.HAL.set_attributes(
															result
														,	{
																parent: self
															,	rel: key
															,	name: result.name||link_index
															}
														)
													}
												)
											)
										:new Sigma.Model.HAL.LinksItem(item)
								)//not observed
								self[key].parent=self
								self[key].rel=key
							}
						)
					}
			,	get:
					function(relation,name)
					{
					var	smh=Sigma.Model.HAL
					return	smh.lookup(this.resource.embedded,relation,name) 
					|| (
						smh.lookup(this.resource.links,relation,name) 
					&& 	(smh.model_by_rel(relation)||smh.Resource)
						.store[smh.lookup(this.resource.links,relation,name).url()]
					)
					}
			,	fetch:
					function(relation,name)
					{
					return	this.resource.Linked(relation,name)
					}
			}
		);

		can.Model(
			'Sigma.Model.HAL.Resource'
		,	{
				model:	function(data)
					{
						this._reqs++
						data.id
							=(	data.id
							||	data._links.self.href
							).split('/')
							.pop()
					var	the_model = this._super(data)
						the_model.links = new Sigma.Model.HAL.Links(data._links, the_model)
						the_model.embedded
						=	(can.isArray(data._embedded))
								?(Sigma.Model.HAL.Resource).models(data._embedded)
								:(
									function(obs)
									{
										can.each(
											data._embedded
										,	function(propv,relation)
											{
												obs.attr(
													relation
												,	(	Sigma.Model.HAL.model_by_rel(relation)
													||	Sigma.Model.HAL.Resource
													)[
														can.isArray(propv)
														?'models'
														:'model'
													](propv)
												)
											}
										)
									return	obs
									}
								)(new can.Observe({}))
					return	the_model
					}
			,	Fetch: function(url, rel)
				{
					var self=this
					return	can.ajax(
						{
							url:url
						}
					).pipe(
						function(raw)
						{
							raw.rel = (rel==undefined)?'root':rel
							return	self.model(raw)
						}
					)
				}
			,	getRoot: function(url,rel)
				{
					return this.Fetch(url,rel)
				}
			}
		,	{
				getHref:
					function()
					{
					return	uritemplate(this.links.attr('self.href')).expand(this.attr())
					}
			,	Linked:
					function(relation,name)
					{
					var	link=Sigma.Model.HAL.lookup(this.links,relation,name)
					,	cached= this.links.get(relation,name)
					,	model=	(Sigma.Model.HAL.model_by_rel(relation)||Sigma.Model.HAL.Resource)
					return	(cached)
							?can.Deferred().resolve(cached)
							:link
								?model.Fetch(link.url())
								:can.Deferred.reject(
										'invalid relation: "' + relation + '"'
								)
					}
			,	Fetch:
					function()
					{
					var	self=this
					return	can.ajax(
							{
								url:this.links.self.url()
							}
						).pipe(
							function(raw)
							{
								return	self.constructor.model(raw)
							}
						)
					}
			}
		);
		Sigma.Model.HAL.Resource.List( 'Sigma.Model.HAL.Resource.List',{},{})
	}
)