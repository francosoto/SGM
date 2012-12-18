steal(
	'sigma/lib/hal'
,	'underscore'
,	'sigma/fixtures'
,	'sigma/lib/uritemplates.js'
,	'sigma/hal/hal_builder.js'
).then(
	'sgm-nodejs/lib/hal_collection_builder.js'
,	function()
	{
		Sigma.fixtures
		.hal_collection_builder
		=	Sigma.portable
			.make_collection(_,Sigma.fixtures.hal_builder,uritemplate)
	}
)
