Sigma.HypermediaControl(
	'Sigma.Hypermedia.Action'
,	{
		defaults:
		{
			title:'3'
		,	view:'//sigma/stock/views/stream/actions.ejs'
		//,	view:'views/actions.ejs'
		,	css:
				{
					'font-size':'20px'
				,	'padding':'5px'
				,	'border-radius':'5px'
				}
		,	css_list:
				{
					'float':'right'
				,	'list-style-type': 'none'
				}
		}
	}
,	{
		init: function(element,options)
		{
			var self = this
			var AC = function(el,actions)
			{
				el.data('actions',actions)
				return	el
					.list(
						{
							loading : function() { return 'Cargando'; }
						,	empty   : function() { return 'Nada!' }
						,	view    : function(action)
							{
								var li =
									$('<li>')
										.append(can.view('//sigma/stock/views/stream/actions.ejs',action))
										.css(self.options.css_list)
								return li
							}
						,	list    : actions
						}
					)
			}

			var $body = element
					.html(
						can.view(
							this.options.view
						,	this.options.data
						,	{
								ActionsControl : AC
							}
						)
					)
		}
	}
)
