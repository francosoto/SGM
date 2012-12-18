steal(
	'sigma/lib/hal'
,	'sigma/fixtures'
,	'underscore'
,	'can'
).then(	'sigma/hal/hal_builder.js'
,	function()
	{
		module("sigma/hal/builder")
		test("HAL document Builder"
		,	function()
			{
			var	doc
			=	new Sigma.fixtures
				.hal_builder({the_data:true},'/')
				.link({yes:{href:'/ok'}},true)
				.link({no:{href:'/no'}},false)
				.link({array:[{href:'/1'},{href:'/2'}]},true)
				.embedded(
					{
						the_embedded:
							new Sigma.fixtures
							.hal_builder(
								{
									inner_data:1
								}
							,	'/innerSingularData'
							)
					,	the_embeddeds:
							[
								new Sigma.fixtures
								.hal_builder(
									{
										inner_data:2
									}
								,	'/innerPluralData'
								)
							,	new Sigma.fixtures
								.hal_builder(
									{
										inner_data:3
									}
								,	'/innerPluralData'
								)
							]
					}
				)
				.get_document()
				ok(doc._links, "links OK")
				ok(doc._links.yes, "conditional positive link OK")
				ok(!doc._links.no, "conditional negative link OK")
				ok(doc._embedded, "embedded OK")
				ok(doc._embedded.the_embedded, "_embedded.the_embedded (singular) OK")
				equal(doc._embedded.the_embedded.length,undefined, "length of singular embeddeds OK")
				ok(doc._embedded.the_embeddeds, "_embedded.the_embeddeds (plural) OK")
				equal(doc._embedded.the_embeddeds.length,2, "length of plural embeddeds OK")
				ok(doc.the_data, "data OK")
				//array
				ok(doc._links.array, "array links OK")
				equal(doc._links.array.length,2, "length of array links OK")
			}
		)
	}
)
