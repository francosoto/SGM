steal(
	'sigma/stock/controls/lib'
,	'sigma/stock/controls/details/drilldown.js'
,	'sigma/stock/controls/details/comments.js'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.Details'
		,	{
				defaults: {}
			}
		,	{
				init: function(element,options)
				{
					element.append('Details')
				}
			}
		)
	}
)
