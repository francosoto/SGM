steal(
	'can'
,	'underscore'
,	'sigma/lib'
,	'sigma/fixtures'
).then(
	function()
	{
		can.Construct(
			'Sigma.fixtures.store'
		,	{
			}
		,	{
				init:
					function(urls)
					{
					var	self
					=	this
						this.prefetchs=[]
						this.deferred=can.Deferred()
						this.deferred.promise(this)
						can.when
						.apply(
							null
						,	can.map(
								urls
							,	this.proxy('get')
							)
						).then(
							function()
							{
							self.deferred.resolve(self)
							}
						)
					}
			,	filter:
					function(what,by_key,by_id)
					{
					return	_
						.filter(
							this.prefetchs[what]
						,	function(item)
							{
							return	item[by_key]==by_id
							}
						)
					}
			,	find:
					function(what,by_key,id_to_find)
					{
					return	_
						.find(
							this.prefetchs[what]
						,	function(item,key)
							{
							return	item[by_key]==id_to_find
							}
						)
					}
			,	get:
					function(what)
					{
					var	self
					=	this
					,	url
					=	_.isString(what)
							?what
							:what.url
					,	name
					=	_.isString(what)
							?what
							:what.name
					return	this._get_one(url)
						.pipe(
							function(data)
							{
								self.prefetchs[name]
								=	data
							return	data
							}
						)
					}
			,	_get_one:
					function(what)
					{
					return	can
						.ajax(what)
						//.pipe(toJson)
					}
			}
		)
	}
)
