steal(
	'sigma/hal/store.js'
,	'sigma/lib/hal'
,	'underscore'
,	'sigma/lib/uritemplates.js'
,	'sigma/hal/hal_builder.js'
,	'sigma/hal/hal_collection_builder.js'
).then(
	'sgm-nodejs/lib/spec-transform.js'
,	function()
	{
		Sigma.fixtures
		.transformers
		=	Sigma.portable
			.make_transformers(_,hal,Sigma.fixtures.hal_builder,Sigma.fixtures.hal_collection_builder,uritemplate)
	}
)
