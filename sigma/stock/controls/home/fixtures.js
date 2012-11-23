steal('can/util/fixture'
,	'sigma/hal/hal_builder.js'
).then(
    function()
	{
		can.fixture("GET /api/{username}"
		,	function(original)
			{
			var	getProfile
			=	function(ajax_params)
				{
				var	uname
				=	ajax_params.url.match('.*/\(.*\)$')[1]
				return	{
						username: uname
					,	greeting:'Hola '+uname
					//,	applications: SRU.fixtures.profile_data.applications_array
					//,	reports: SRU.fixtures.profile_data.reports
					}
				}
			   var	profile=getProfile(original)
			return	new Sigma.fixtures
				.hal_builder(
					{
						username:profile.username
					,	name:'home'
					,	icon:'home'
					,	greeting:profile.greeting
					}
				,	'/api/'+profile.username
				).get_document()
			}
		)
	}
)
