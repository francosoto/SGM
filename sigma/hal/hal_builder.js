steal(
	'sigma/lib/hal'
,	'underscore'
,	'sigma/fixtures'
).then(
	'sgm-nodejs/lib/hal_builder.js'
,	function()
	{
		Sigma.fixtures
		.hal_builder
		=	Sigma.portable
			.make_hal_builder(_,hal)
	}
)
