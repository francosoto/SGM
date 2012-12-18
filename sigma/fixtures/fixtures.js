steal(
	'sigma/util'
,	'can/util/fixture'
,	'underscore'
,	function()
	{
		NS('Sigma.portable')
		NS('Sigma.fixtures')

		Sigma.fixtures
		.getIcon
		=	function(what)
			{
			return	(
					{
						dashboard:'dashboard'
					,	notices:'exclamation-sign'
					,	profile:'user'
					,	institutions:'flag'
					,	colaborations:'group'
					,	activities:'tasks'
					,	facebook:'facebook'
					,	google_plus:'google-plus'
					,	linkedin:'linkedin'
					,	twitter:'twitter'
					}
				)[what]
			}
		Sigma.fixtures
		.getProfile
		=	function(ajax)
			{
			var	uname
			=	ajax.url.match('.*/\(.*\)$')[1]
			return	{
					username: uname
				,	greeting:'Hola '+uname
				}
			}
		Sigma.fixtures
		.genApplications
		=	function(profile)
			{
			return _
				.map(
					[
						{	name:'dashboard'
						,	title:'Dashboard'
						}
					,	{	name:'notices'
						,	title:'Notices'
						}
					,	{	name:'profile'
						,	title:'Profile'
						}
					]
				,	function(app)
					{
					return	{
							title: app.title
						,	icon: Sigma.fixtures.getIcon(app.name)
						,	name: app.name
						,	href: '/api/'+profile.username+'/'+app.name
						}
					}
				)
			}

	}
)
