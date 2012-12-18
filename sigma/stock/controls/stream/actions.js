Sigma.HypermediaControl(
	'Sigma.Hypermedia.Actions'
,	{
		defaults: {
			view : false
		}
	}
,	{
		init: function(element,options)
		{
			/* Remplasable por el llamado de una nueva vista dentro de la vista pasada al HControl, 
			   pasandole como argumento el action a renderizar...
			
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
			
			*/
			
			can.append(
				element
			,	can.view(
					this.options.view
				,	this.options.data
				)
			)
		}
	}
)