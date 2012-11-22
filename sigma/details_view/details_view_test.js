steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	'sigma/details_view/details_view_fixture.js'
,	'sigma/details_view/details.js'
,	'sigma/details_view/drilldown.js'
,	'sigma/details_view/comments.js'
).then(
	function()
	{	
		test(
			"Vista Detalle - Details"
		,	function()
			{

				Sigma.Model.HAL.Resource(
					'Sigma.Model.HAL.Resource.Details'
				,	{
						getRoot: function()
						{
							return this.model({_links:{self:{href:'/details'}}}).Fetch()
						}
					}
				,	{}
				)

				var details = can.$('<div id="detailsContainer">')

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
									}
								}
							,	'drilldown':
								{
									Handler: Sigma.Hypermedia.DrillDown
								,	options:
									{
										target: 'drilldown'
									}
								}
							,	'comments':
								{
									Handler: Sigma.Hypermedia.Comments
								,	options:
									{
										target: 'comments'
									}
								}
							}
						}
					}
				,	{
					}
				)

				details_container = new Sigma.Hypermedia.DetailsView.Container(
					details
				,	{
						id:'Details'
					,	target: 'Details'
					,	slot: Sigma.Model.HAL.Resource.Details.getRoot()
							.pipe(
								function(raw)
								{//solo para el caso de root hay que explicitar el rel (buscar algo mas consistente/elegante)
									raw.rel='details'
								return	raw
								}
							)
					}
				)

				stop()
				details_container.options.slot
				.then(
					function(data) 
					{
						start()
						ok(details.find('div.hc_generic:contains("Hola")'),"Hola Generado")
					}
				)

			}
		)
	}
)