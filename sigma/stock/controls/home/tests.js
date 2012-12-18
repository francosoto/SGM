steal(
	'sigma/stock/controls/lib'
,	'sigma/stock/controls/home'
,	'sigma/stock/controls/home/fixtures.js'
).then(
	function()
	{
		module(
			"sigma/stock/controls"
		)
		test(
			"Home"
		,	function()
			{				
				Sigma.HypermediaContainer(
					'HAL.Container'
				,	{
						defaults:
							{
								media_types:
								{
									'profile':
									{
										Handler: Sigma.Controls.Home
									,	options:
										{
											target: 'Root'
										,	view: '//stock/views/home/init.ejs'
										}
									}
								,	'default_media_type':
									{
										Handler: Sigma.HypermediaControl
									,	options:
										{
											target: 'Root'
										//,	view: 'homeEjs'
										}
									}
								}
							}
					}
				,	{
					}
				)

				var home = can.$('<div id="home">')

				var root_container = new HAL.Container(
					home
				,	{
						id:'Root'
					,	slot: Sigma.Model.HAL.Resource.getRoot('/api/jperez','profile')
					}
				)

				stop()
				root_container.options.slot
					.then(
						function(data)
						{
							equal(root_container.options.id,"Root","ID Generated")
							start()
							equal(data.constructor.fullName,"Sigma.Model.HAL.Resource","Resource Generated")
							equal(home.length,1,"Home Generated")
						}
					)
			}
		)
	}
)