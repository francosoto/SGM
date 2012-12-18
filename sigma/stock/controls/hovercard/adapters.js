steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		var HovercardAdapter
		=	Sigma.Model.HAL.Resource(
				{
					align:'left'
				,	action_align: 'right'
				,	subitems_rel: false
				,	actions_rel: false
				,	hovercard_rel : false
				,	handlers: false
				}
			,	{
				getSubitems:function()
					{
					return	this.constructor.subitems_rel
						&&	this.embedded.attr(this.constructor.subitems_rel)
					}
			,	getHovercard:function()
					{
					return	this.constructor.hovercard_rel
						&&	this.embedded.attr(this.constructor.hovercard_rel)
					}
			,	getActions:function()
					{
					return	this.constructor.actions_rel
						&&	this.links.attr(this.constructor.actions_rel)
					}
			,	getAlign:function()
					{
					return	this.constructor.align
					}
			,	getHref:function()
					{
					return	this.links.attr('self.href')
					}
			,	getIcon:function()
					{
					return	this.icon
					||	(
							(this._init!=1)
						&&	this.links.attr('self.icon')
						)
					||	'bolt'
					}
			,	getText:function()
					{
					return	this.attr('description')
					}
			,	getHandler:function()
					{
					return	this.constructor.handlers
					}
			}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.Resource.Stream'
		,	{
				subitems_rel:'posts'
			,	getRoot: function(rel)
					{
						return this.Fetch('/posts',rel)
					}
			}
		,	{}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.Posts'
		,	{
				subitems_rel:'comments'
			,	actions_rel: 'actions'
			,	hovercard_rel: 'hovercard'
			,	handlers: 
				{
					'hovercard' : 
					{
						control: 'Hovercard'
					,	target: '.hovercard'
					,	view: '//sigma/stock/views/hovercard/hovercard.mustache'
					}
				}
			}
		,	{}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.Comments'
		,	{
				actions_rel: 'actions'
			,	hovercard_rel: 'hovercard'
			,	handlers: 
				{
					'hovercard' : 
					{
						control: 'Hovercard'
					,	target: '.hovercard'
					,	view: '//sigma/stock/views/hovercard/hovercard.mustache'
					}
				}
			}
		,	{}
		)

		HovercardAdapter(
			'Sigma.Model.HAL.Hovercard'
		,	{
			getRoot: function(url,rel)
				{
					return this.Fetch(url,rel)
				}
			}
		,	{}
		)
	}
)
