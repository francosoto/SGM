steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.DrillDown'
		,	{
				defaults: {}
			}
		,	{
				init: function(element,options)
				{
					element.append('DrillDown')
				}
			}
		)
	}
)
