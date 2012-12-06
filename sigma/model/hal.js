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
							return	Sigma.Model.HAL[can.capitalize(can.camelCase(rel))]
							}
					,	lookup:
							function(what,relation,index_or_name)
							{
							var	found=what&&what[relation]
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
					var	result=this.parent.get(this.rel)
					return	result instanceof can.Observe.List
							?result[this.index]
							:result
					}
			,	fetch:
					function()
					{
					var	self=this
					return	this.parent
						.fetch(this.rel,this.name)
					}
			,	post:
					function(data)
					{
					return	this.parent.post(this.rel,data)
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
								item.index=index
								item.name=item.name||index
							return	item
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
			,	post://implement
					function(index,data)
					{
						throw 'no implementado'
					return	this.parent.post(this[index||0].rel,data)
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
								self
								.attr(	key
								,	can.isArray(item)
										?new Sigma.Model.HAL.LinksItem
											.List(
												item.map(
													function(link_item,link_index)
													{
													var	result= new Sigma.Model.HAL.LinksItem(link_item)
														//not observed
														result.parent=self
														result.rel=key
														result.name=result.name||link_index
													return	result
													}
												)
											)
										:new Sigma.Model.HAL.LinksItem(item)
								)
								//not observed
								self[key].parent=self
								self[key].rel=key
							}
						)
					}
			,	get:
					function(relation,name)
					{
					var	link=Sigma.Model.HAL.lookup(this.resource.links,relation,name)
					,	embedded=Sigma.Model.HAL.lookup(this.resource.embedded,relation,name)
					,	model=	(Sigma.Model.HAL.model_by_rel(relation)||Sigma.Model.HAL.Resource)
					return	embedded || (link && model.store[link.url()])
					}
			,	fetch:
					function(relation,name)
					{
					return	this.resource.Linked(relation,name)
					}
			,	post:
					function(relation,data)
					{
					return	this.resource.Post(relation,data)
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
					var	temp_data={}
						can.each(
							['links','embedded']
						,	function(prop)
							{
								temp_data['_'+prop] = data['_'+prop]
								delete data['_'+prop]
							}
						)
					var	the_model = this._super(data)
						the_model.links = new Sigma.Model.HAL.Links(temp_data._links, the_model)
						the_model.embedded
						=	(can.isArray(temp_data._embedded))
								?(
									Sigma.Model.HAL.model_by_rel(relation)
								||	Sigma.Model.HAL.Resource
								).models(temp_data._embedded)
								:(
									function(obs)
									{
										can.each(
											temp_data._embedded
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
					rel = (rel==undefined)?'root':rel
					return this.model({_links:{self:{href:url}}})
							.Fetch()
							.pipe(
								function(raw)
								{
									raw.rel=rel
								return	raw
								}
							)
				}
			}
		,	{
				getHref:
					function()
					{
					return	uritemplate(this.links.attr('self.href'))
							.expand(this.attr())
							//.replace(/\//g,'_')
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
								?model.model({_links:{self:{href:link.url()}}}).Fetch()
								//?model.Fetch("institutions", "lalala")
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
			,	Post:
					function(data)
					{
					var	self=this
					return	can.ajax(
							{
								url:this.links.self.url()
							,	method:'post'
							,	data:data
							}
						)
					}
			}
		);
		Sigma.Model.HAL.Resource.List( 'Sigma.Model.HAL.Resource.List',{},{})
	}
)
