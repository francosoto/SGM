steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.Comments'
		,	{
				defaults: {
					view : false
				,	input_css: {
						'float': 'left'
					}
				,	ul_css: {
						'float':'right'
					,	'list-style-type': 'none'
					,	'margin-right': '5%'
					}
				}
			}
		,	{
				init: function(element,options)
				{
					can.addClass(
						element
					,	'well media span5'
					)	

					can.append(
						element
					,	can.view(
							this.options.view
						,	this.options.slot
						)
					)
					element.find('input').css(this.options.input_css)

					element.find('ul').css(this.options.ul_css)
				}
			}
		)
	}
)