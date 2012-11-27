steal(
	'sigma/hal/collections.js'
).then(
	function()
	{
		module("sigma/hal/collections")
		test(
			"getCollection Pageable"
		,	function()
			{
				stop()
				can.when(
					Sigma.fixtures.collection.getCollection("/provincias")
				).then(
					function(collection)
					{
						collection.items=collection.items.slice(1,6)
					var	page1
					=	Sigma.fixtures.collection.pageable
						.getPage(
							collection
						,	{
								currentPage:1
							,	itemsPerPage:2
							,	collectionUrl:'/provincias'
							}
						)
						ok(page1._links, "links OK");
						ok(page1._embedded, "embedded OK");
						ok(page1._links.next, "links.next OK");
						ok(page1._embedded.collection, "_embedded.items OK");
						equal(page1._embedded.collection[0]._links.self.href,'/provincias/0', "_embedded href OK");
						equal(page1._embedded.collection.length,2, "length OK");
						start()
					}
				)
			}
		)
	}
)
