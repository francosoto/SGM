steal(
	'sigma/stock/controls/hovercard'
,	'sigma/stock/controls/hovercard/adapters.js'
,	'sigma/stock/controls/hovercard/fixtures.js'
).then(
	function()
	{
		module(
			"sigma/stock/controls"
		)
		test(
			"Hovercard"
		,	function()
			{
				var hovercardHTML = can.$('<div id="hovercard"><a class="hovercard">')
				
				stop()
				Sigma.Model.HAL.Hovercard.getRoot('/hovercardDemo','hovercard')
					.then(
						function(hovercardData)
						{	
							new Sigma.Controls.Hovercard(
								hovercardHTML
							,	{
									view: '//sigma/stock/views/hovercard/hovercard.mustache'
								,	target: '.hovercard'
								,	data : hovercardData
								}
							)
							start()

							equal(hovercardData.constructor.fullName,"Sigma.Model.HAL.Hovercard","Resource Generated")

							equal(hovercardHTML.find('.popover').length,0,'HoverCard Disabled')

							stop()

							hovercardHTML
								.find('.hovercard')
								.trigger('mouseenter')

							setTimeout(
								function()
								{
									equal(hovercardHTML.find('.popover').length,1,'HoverCard Enabled')
									hovercardHTML
										.find('.hovercard')
										.trigger('mouseleave')
									setTimeout(
										function()
										{
											equal(hovercardHTML.find('.popover').length,0,'HoverCard Disabled')
											start()
										}
									,	200
									)
								}
							,	100
							)
						}
					)
			}
		)
	}
)