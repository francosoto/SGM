Sigma.HypermediaControl(
	'Sigma.Hypermedia.Body'
,	{
		defaults:
		{
			title:'3'
		,	view:'//sigma/stock/views/stream/body.ejs'
		}
	}
,	{
		init: function(element,options)
		{
			var SC = function(el,subitems)
			{
				el.data('subitems',subitems)
				new	Sigma.Hypermedia.Stream(el,{slot: subitems})
			}

			var $body = element
					.html(
						can.view(
								this.options.view
							,	this.options.data
							,	{
									SubitemsControl : SC
								}
						)
					)
					.find('.media-body')
		}
	}
)
