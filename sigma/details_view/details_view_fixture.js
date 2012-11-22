steal(
	'sigma/hal/hal_builder.js'
,	function ()
	{
		can.fixture(
			'GET /details'
		,	function()
			{
				return  new Sigma.fixtures
						.hal_builder(
							{
							}
						,	'/details'
						).get_document()
			}
		)
	}
)