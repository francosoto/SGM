steal(
	'sigma/model/hal.js'
,	'sigma/lib' // /fixtures.js'
,	'sigma/hal/store.js'
,	'sigma/model/json2hal.js'
).then(
	function()
	{
		module(
			"sigma/model/json2hal"
		,	{
				setup:
					function()
					{
						can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
						can.fixture('GET /instituciones-univ',steal.idToUri("//stock/fixtures/data/json/instituciones-univ.json").path)
						can.fixture('GET /transforms.json',steal.idToUri("//stock/fixtures/specs/transforms.json").path)
						//can.fixture('GET /transforms.json',"../sgm-nodejs/tools/test/specs/transforms.json")
					}
			}
		)
		test(
			"transform"
		,	function()
			{
				stop();
				can.when(
					new Sigma.fixtures
						.store(
							[
								{name:'provincias',url:'/provincias'}
							,	{name:'institutions',url:'/instituciones-univ'}
							]
						)
				,		can.ajax(
							'/transforms.json'
						)
				).then(
					function(store,spec)
					{
					var	transformers
					=	Sigma.fixtures.transformers(store,spec[0])
					,	provincia
					=	transformers['provincias'](store.prefetchs.provincias[0])
						ok(provincia,'OK')
						equal(provincia._links.self.href,'/api/data/provincias/BUE','provincia.id OK')
						equal(provincia._embedded['institutions'].length,8,'provincia.intitutions OK')
						equal(provincia._embedded['institutions'][0].id,'UDESA','provincia.intitutions embeded OK')
						start()
					}
				)
			}
		)
	}
)
