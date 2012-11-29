steal(
	'sigma/stock/controls/details/details.js'
,	'sigma/stock/controls/details/drilldown.js'
,	'sigma/stock/controls/details/comments.js'
,	'sigma/stock/controls/details/adapters.js'
,	'sigma/stock/controls/details/fixtures.js'
).then(
	function()
	{
		test(
			"Vista Detalle - Details"
		,	function()
			{
				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.DetailsView.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'details':
								{
									Handler: Sigma.Hypermedia.Details
								,	options:
									{
										target: 'details'
									// enlace a symlink no funciona - dunno why
									//,	view: '//sigma/stock/views/details/details.mustache'
									,	view: '//sigma/stock/controls/details/views/details.mustache'
									}
								}
							,	'drilldown':
								{
									Handler: Sigma.Hypermedia.DrillDown
								,	options:
									{
										target: 'drilldown'
									,	view_drilldown: '//sigma/stock/controls/details/views/drilldown.mustache'
									,	view_breadcrumb: '//sigma/stock/controls/details/views/breadcrumb.mustache'
									}
								}
							,	'reply':
								{
									Handler: Sigma.Hypermedia.Comments
								,	options:
									{
										target: 'comments'
									// enlace a symlink no funciona - dunno why
									//,	view: '//sigma/stock/views/details/reply.mustache'
									,	view: '//sigma/stock/controls/details/views/reply.mustache'
									}
								}
							}
						}
					}
				,	{
					}
				)

				var details = can.$('<div id="detailsContainer">')

				var details_container = new Sigma.Hypermedia.DetailsView.Container(
					details
				,	{
						id:'Details'
					,	target: 'Details'
					,	slot: Sigma.Model.HAL.Resource.Details.getRoot(1)
					}
				)

				var comments = can.$('<div id="replyContainer">')

				var comments_container =  new Sigma.Hypermedia.DetailsView.Container(
					comments
				,	{
						id:'Reply'
					,	target: 'Reply'
					,	slot: Sigma.Model.HAL.Resource.Comments.getRoot(1)
					}
				)

				var drilldown = can.$('<div id="drillDownContainer">')

				var drilldown_container =  new Sigma.Hypermedia.DetailsView.Container(
					drilldown
				,	{
						id:'DrillDown'
					,	target: 'DrillDown'
					,	slot: Sigma.Model.HAL.Resource.DrillDown.getRoot('/bebidas')
					}
				)

				//TESTs

				stop()
				details_container.options.slot
					.then(
						function(data)
						{
							equal(details_container.options.id,"Details","ID Generated")
							start()
							equal(data.constructor.fullName,"Sigma.Model.HAL.Resource.Details","Resource Generated")
							equal(details.length,1,"Details Generated")
						}
					)
				stop()
				comments_container.options.slot
					.then(
						function(data)
						{
							equal(comments_container.options.id,"Reply","ID Generated")
							start()
							equal(data.constructor.fullName,"Sigma.Model.HAL.Resource.Comments","Resource Generated")
							equal(comments.length,1,"Comment Generated")
						}
					)
				stop()
				drilldown_container.options.slot
					.then(
						function(data)
						{
							equal(drilldown_container.options.id,"DrillDown","ID Generated")
							start()
							equal(data.constructor.fullName,"Sigma.Model.HAL.Resource.DrillDown","Resource Generated")
							equal(drilldown.length,1,"DrillDown Generated")
						}
					)
			}
		)
	}
)