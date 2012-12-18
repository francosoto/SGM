steal(
	'can'
).then(
	function()
	{
		window.appendIf
		=	function(el, tag)
			{
				if(el.is(tag) || !tag)
					return el
			var	res
			=	el.find(tag)
				if(res && res.length)
					return res
			return	el.append(can.$('<' + tag + '>')).find(tag)
			}
		can.reduce
		=	function(list,callback,initial)
			{
				if(!can.isArray(list))
						throw 'array list expected'
					if(!can.isFunction(callback))
						throw 'function callback expected'
				var	len
				=	list.length
				,	has_initial
				=	initial!==undefined
				,	acc
				=	has_initial
						?initial
						:list[0]
				,	i
					=	has_initial?0:1
					if(len === 0 && !hasSeed)
						throw 'empty && no initial'
					for (; i < len; i++ )
					{
						acc
						=	callback
							.call(
								list
							,	acc
							,	list[i]
							)
					}
			return	acc
			}
		window.NS
		=	function(namespace)
			{
			return	can
				.reduce(
					namespace.split('.')
				,	function(parent,part)
					{
						parent[part]
						=	parent[part] || {}
					return	parent[part]
					}
				,	window
				)
			}
		NS('Sigma.stock')
		Sigma.stock
		.views
		=	function(path)
			{
			return	steal.idToUri(path).path
			}
	}
)
