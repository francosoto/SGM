steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.Comments'
		,	{
				defaults: {}
			}
		,	{
				init: function(element,options)
				{
					element.append('Comments')
				}
			}
		)
	}
)
