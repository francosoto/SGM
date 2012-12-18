Sigma.HypermediaControl(
	'Sigma.Hypermedia.Body'
,	{
		defaults: {
			view : false
		}
	}
,	{
		init: function(element,options)
		{
			element.addClass('media-box')

			can.append(
				element
			,	can.view(
					this.options.view
				,	this.options.data
				)
			)

			can.each(
				options.data.attr('handler')
			,	function(handler,attr_rel)
				{
					new Sigma.Controls[handler.control](
						element.find(handler.target).parent()
					,	{
							data : options.data.attr(attr_rel)
						,	target : handler.target
						,	view : handler.view 
						}
					)
				}
			)

			if (options.data.attr('subitems') && options.data.attr('subitems').length > 0 ) {
				new Sigma.Hypermedia.Stream(
					element
				,	{ 
						slot: options.data.attr('subitems')
					}
				)
			}

		}
	}
)