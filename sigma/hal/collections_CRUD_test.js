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
		test(
			"getCollection Scrollable"
		,	function()
			{
				stop()
				can.when(
					Sigma.fixtures.collection.getCollection("/provincias")
				).then(
					function(collection)
					{
						collection.items=collection.items.slice(1,6)
					var	scrollpage1
					=	Sigma.fixtures.collection.scrollable
						.getPage(
							collection
						,	{
								currentPage:1
							,	itemsPerPage:2
							,	collectionUrl:'/provincias'
							}
						)
						ok(scrollpage1._links, "links OK");
						ok(scrollpage1._embedded, "embedded OK");
						ok(scrollpage1._links.more, "links.more OK");
						ok(scrollpage1._embedded.collection, "_embedded.items OK");
						equal(scrollpage1._embedded.collection[0]._links.self.href,'/provincias/0', "_embedded href OK");
						equal(scrollpage1._embedded.collection.length,2, "length OK");
						start()
					}
				)
			}
		)
		test(
			"Sigma.Model.HAL.Collection Pageable"
		,	function()
			{
				stop()
				Sigma.fixtures.collection.pageable.getCollectionsFixturator(
					Sigma.fixtures.collection.getCollection("/provincias")
					.pipe(
						function(collection)
						{
							collection.items=collection.items.slice(1,6)
						return	collection
						}
					)
				).then(
					function(collection)
					{
					var	the_first
					=	Sigma.Model.HAL.Resource("Sigma.Model.HAL.Collection")
						.getRoot('/provincias?items-per-page=2');
						can.Model.List( 'Sigma.Model.HAL.Collection.List');
						the_first.then(
							function(first)
							{
								stop()
								equals(first.constructor.fullName, "Sigma.Model.HAL.Collection", "links type ok");
								equals(first.embedded.collection.constructor.fullName, "Sigma.Model.HAL.Collection.List", "embedded type ok");
-								ok(first.links.next, "first next OK");
								ok(!first.links.prev, "no first prev OK");
								equal(first.embedded.collection.length,2, "length OK");
							var	the_next = first.links.next.fetch()
								the_next.then(
									function(next)
									{
										stop()
										equal(next.embedded.collection.length,2, "length OK");
										ok(next.links.next, "next next OK");
										ok(next.links.prev, "next prev OK");
									var	the_last = next.links.next.fetch()
										the_last.then(
											function(last)
											{
												equal(last.embedded.collection.length,1, "length OK");
												ok(!last.links.next, "no last next OK");
-												ok(last.links.prev, "last prev OK");
												start()
											}
										)
										start()
									}
								)
								start()
							}
						)
					}
				)
			}
		)
		test(
			"Sigma.Model.HAL.Collection Scrollable"
		,	function()
			{
				stop()
				Sigma.fixtures.collection.scrollable.getCollectionsFixturator(
					Sigma.fixtures.collection.getCollection("/provincias")
					.pipe(
						function(collection)
						{
							collection.items=collection.items.slice(1,6)
						return	collection
						}
					)
				).then(
					function(collection)
					{
						Sigma.Model.HAL.Resource(
							"Sigma.Model.HAL.Collection"
						,	{
								getRoot: function()
									{
									return	Sigma.Model.HAL.Collection.model({_links:{self:{href:'/provincias?items-per-page=2'}}}).Fetch()
									}
							}
						,	{}
						)
						can.Model.List( 'Sigma.Model.HAL.Collection.List');
						var the_first = Sigma.Model.HAL.Collection.getRoot()
						the_first.then(
							function(first)
							{
								stop()
								equals(first.constructor.fullName, "Sigma.Model.HAL.Collection", "links type ok");
								equals(first.embedded.collection.constructor.fullName, "Sigma.Model.HAL.Collection.List", "embedded type ok");
								ok(first.links.more, "first more OK");
								ok(!first.links.next, "no first next OK");
								ok(!first.links.prev, "no first prev OK");
								equal(first.embedded.collection.length,2, "length OK");
								var the_next = first.links.more.fetch()
								the_next.then(
									function(next)
									{
										stop()
										equal(next.embedded.collection.length,2, "length OK");
										ok(next.links.more, "next more OK");
										ok(!first.links.next, "no first next OK");
										ok(!first.links.prev, "no first prev OK");
										var the_last = next.links.more.fetch()
										the_last.then(
											function(last)
											{
												equal(last.embedded.collection.length,1, "length OK");
												ok(!next.links.more, "no last more OK");
												ok(!last.links.next, "no last next OK");
												ok(!last.links.prev, "no last prev OK");
												start()
											}
										)
										start()
									}
								)
								start()
							}
						)
					}
				)
			}
		)
	}
)
