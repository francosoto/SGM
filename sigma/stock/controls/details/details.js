steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.Details'
		,	{
				defaults: {
					view : false
				,	p_css: {
						'line-height' : '25px'
					}
				,	h4_css: {
						'margin-top': '10px'
					,	'margin-bottom': '10px'
					}
				,	icon_css: {
						'margin-top': '10px'
					,	'text-align': 'center'
					,	'padding': '10px'
					,	'border-radius': '10px'
					,	'line-height': '1'
					,	'background-color': '#9D261D'
					,	'font-size': '40px'
					,	'text-shadow': '2px 2px 3px #222'
					,	'color': 'white'
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

					element.find('a.media-icon').css(
						this.options.icon_css
					)

					element.find('h4.media-heading').css(
						this.options.h4_css
					)

					element.find('p').css(
						this.options.p_css
					)
				}
			}
		)
	}
)
