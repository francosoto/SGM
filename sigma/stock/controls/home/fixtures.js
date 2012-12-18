steal('sigma/fixtures'
,	'sigma/hal/hal_builder.js'
).then(
	function()
	{
		can.fixture("GET /api/{username}"
		,	function(original)
			{
			var	profile
			=	Sigma.fixtures.getProfile(original)
			return	new Sigma.fixtures
				.hal_builder(
					{
						username:profile.username
					,	name:'home'
					,	icon:'home'
					,	greeting:profile.greeting
					}
				,	'/api/'+profile.username
				).link(
					{
						applications:
							Sigma.fixtures.genApplications(profile)
					}
				).get_document()
			}
		)
	}
)
