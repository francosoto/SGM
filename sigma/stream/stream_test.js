steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	'sigma/media/stream_fixture.js'
,	'sigma/hal/hal_builder.js'
,	'sigma/media'
,	'sigma/stream/stream_adapter.js'
).then(
	function()
	{
		test(
			"Stream Hypermedia"
		,	function()
			{

				var stream = can.$('<div id="streamContainer">')

				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.Stream.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'comments':
								{
									Handler: Sigma.Hypermedia.Stream
								,	options:{
										target: 'comments'
									}
								}
							}
						}
					}
				,	{
					}
				)

				var stream_container = new Sigma.Hypermedia.Stream.Container(
					stream
				,	{
						id:'Stream'
					,	target: 'Stream'
					,	slot: Sigma.Model.HAL.Resource.Stream.getRoot()
							.pipe(
								function(raw)
								{//solo para el caso de root hay que explicitar el rel (buscar algo mas consistente/elegante)
									raw.rel='comments'
								return	raw
								}
							)
					}
				)
				
				equal(stream_container.options.id,"Stream","ID Generated")


				stop()
				stream_container.options.slot
					.then(
						function(data) 
						{
							start()
							equal(data.constructor.fullName,"Sigma.Model.HAL.Resource.Stream","Resource Generated")
							equal(stream.find('div.media-body h4').length,3,"Comments Length")
							equal(data.embedded.attr('comments').constructor.fullName,"Sigma.Model.HAL.Resource.List","embedded.List type ok")
							equals(data.embedded.attr('comments.0').constructor.fullName,"Sigma.Model.HAL.Comments", "embedded type ok");
							can.each(
								["TED","NERD","Friky"]
							, 	function(title) 
								{
									ok(
										can.grep(
											stream.find('div.media-body h4')
										,	function(item)
											{	
												return can.$(item).text() == title
											}
										).length > 0
									,	"Comment "+title+" Generated"
									)
								}
							)
						}
					)

			}
		)
	}
)