steal(
	'sigma/lib/parseuri.js'
,	'sigma/lib/uritemplates.js'
,	'sigma/lib/hal'
,	'sigma/hal/hal_builder.js'
,	'sigma/hal/store.js'
).then(
	function()
	{
		can.Construct(
			'Sigma.fixtures.collection'
		,	{
				defaults:
					{
						assets_path:'hal/fixtures'
					,	ext:'.csv'
					}
			,	getCollection:
					function(uri)
					{
					var	data
					=	parseUri(uri)
					,	name
					=	data.directory.match(/\/?([^\/]*)/)[1]
					return	Sigma.fixtures
						.store.get(this.defaults.assets_path+'/'+name+this.defaults.ext)
						.pipe(
							function(results)
							{
							return	{
									name:name
								,	items: results
								}
							}
						)
				}
			,	getCollectionsFixturator:
					function(collection_dfd)
					{
					var	self=this
					return	collection_dfd
						.then(
							function(collection)
							{
							var	generator
							=	function(original)
								{
								var	parsed
								=	parseUri(original.url)
								,	current_page
								=	parseInt(parsed.queryKey.page)||undefined
								,	items_per_page
								=	parseInt(parsed.queryKey['items-per-page'])||10
								,	name
								=	parsed.path.split('/').pop()
								return	 self
									.getPage(
										collection
									,	{
											currentPage:current_page
										,	itemsPerPage:items_per_page
										,	collectionUrl:'/'+name
										}
									)
								}
								can.fixture("GET /"+collection.name ,	generator)
								can.fixture("GET /"+collection.name+"?page={p}" ,	generator)
								can.fixture("GET /"+collection.name+"?page={p}&items-per-page={ipp}" ,	generator)
								can.fixture("GET /"+collection.name+"?items-per-page={ipp}" ,	generator)
							}
						)
					}
			,	getPage:
					function(collection,options)
					{
					var	current_page
					=	options.currentPage||1
					,	items_per_page
					=	options.itemsPerPage||20
					,	start
					=	(current_page-1)*items_per_page
					,	end
					=	start+items_per_page
					,	url
					=	uritemplate(options.collectionUrl+'{/id}{?page,items-per-page}')
					,	last_page
					=	(collection.items.length+items_per_page-1)/items_per_page
					,	self
					=	{self:{href:url.expand({page:(current_page!=1)?current_page:null})}}
					,	gen_items
					=	function(start,end)
						{
						return	can.map(
								collection.items
							,	function(item,index)
								{
								return	new Sigma.fixtures
									.hal_builder(
										item
									,	url.expand({id:index})
									)
								}
							).slice(start,end)
						}
					,	hal
					=	new Sigma.fixtures
							.hal_builder({},self.href)
							.link({self:{href:url.expand({})}})
							.embedded(
								{
									'collection':gen_items(start,end)
								}
							)
					return	this
						.addLinks(
							hal
						, 	{
								url: url
							,	current_page: current_page
							,	items_per_page: items_per_page
							,	last_page: last_page
							}
						).get_document()
					}
			}
		,	{}
		)
		Sigma.fixtures.collection(
			'Sigma.fixtures.collection.pageable'
		,	{
				addLinks:
					function(hal,config)
					{
					var	next_page
					=	1+config.current_page
					,	prev_page
					=	config.current_page-1
					,	next
					=	{next:{href:config.url.expand({page:next_page,'items-per-page':config.items_per_page})}}
					,	prev
					=	{prev:{href:config.url.expand({page:prev_page,'items-per-page':config.items_per_page})}}
					return	hal
						.link(prev,prev_page>0)
						.link(next,next_page<=config.last_page)
					}
			}
		,	{}
		)
		Sigma.fixtures.collection(
			'Sigma.fixtures.collection.scrollable'
		,	{
				addLinks:
					function(hal,config)
					{
					var	more_page
					=	1+config.current_page
					,	more
					=	{more:{href:config.url.expand({page:more_page,'items-per-page':config.items_per_page})}}
					return	hal.link(more,more_page>0 && more_page<=config.last_page)
					}
			}
			,{}
		)
	}
)
