steal(
	'sigma/hal/collections.js'
,	'sigma/model/collections.js'
).then(
	function()
	{
		module("sigma/hal/collections")
		test(
			"getCollection Pageable"
		,	function()
			{
				can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
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
				can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
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
				can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
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
					=	Sigma.Model.HAL.Collection.getRoot('/provincias?items-per-page=2');
						//can.Model.List( 'Sigma.Model.HAL.Collection.List');
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
				can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
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
						var the_first = Sigma.Model.HAL.Collection.getRoot('/provincias?items-per-page=2')
						can.Model.List( 'Sigma.Model.HAL.Collection.List');
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
		test(
			"Collection CRUD static"
		,	function()
			{
				can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
				stop()
				Sigma.fixtures.collection.scrollable.getCollectionsFixturator(
					Sigma.fixtures.collection.getCollection("/provincias")
				).then(
					function(collection)
					{
						can.when(Sigma.Model.HAL.Collection.getRoot('/provincias'))
						.then(
							function(provs)
							{
								ok(provs,'GET data collection ok')
								equals(provs.embedded.collection.constructor.fullName,"Sigma.Model.HAL.Collection.List","GET: Collection Fullname type ok")
								equals(provs.embedded.collection.length,24,"GET: Collection length ok")
								start()
							}
						)
						stop()
						can.when(Sigma.Model.HAL.Collection.Post('/provincias',{id: "ANT", desc: "Antartida"}))
						.then(
							function(new_data)
							{
								equals(new_data.constructor.fullName,"Sigma.Model.HAL.Collection","POST: Collection element Fullname type ok")
								equals(new_data.id,"ANT","POST: Data result - attribute id - is OK ")
								equals(new_data.desc,"Antartida", "POST: Data result - attribute desc - is OK")
								start()
							}
						)
						stop()
						can.when(Sigma.Model.HAL.Collection.Put('/provincias/24',{desc: "German Ladri"}))
						.then(
							function(updated_obj)
							{
								equals(updated_obj.constructor.fullName,"Sigma.Model.HAL.Collection","PUT: Collection element Fullname type ok")
								equals(updated_obj.desc,"German Ladri","PUT: Data desc update true")
								equals(updated_obj.id,"ANT","PUT: Data id update true")
								start()
							}
						)
						stop()
						can.when(Sigma.Model.HAL.Collection.Delete('/provincias/24'))
						.then(
							function(remove_obj)
							{
								equals(remove_obj.constructor.fullName,"Sigma.Model.HAL.Collection","DELETE: Collection element Fullname type ok")
								equals(remove_obj.id,"ANT","DELETE: Data desc update true")
								start()
							}
						)
						stop()
						can.when(Sigma.Model.HAL.Collection.getRoot('/provincias'))
						.then(
							function(obj)
							{
								equals(obj.embedded.collection.length,24,"DELETE: Collection length ok")
								equals(obj.embedded.attr('collection.24'),undefined,"DELETE: Data remove from collection true")
								start()
							}
						)
						
					}
				)
			}
		)
		test(
			"Collection CRUD instance"
		,	function()
			{
				can.fixture('GET /provincias',steal.idToUri("//stock/fixtures/data/json/provincias.json").path)
				stop()
				Sigma.fixtures.collection.scrollable.getCollectionsFixturator(
					Sigma.fixtures.collection.getCollection("/provincias")
				).then(
					function(collection)
					{
						can.when(Sigma.Model.HAL.Collection.getRoot("/provincias"))
						.then(
							function(obj)
							{
								ok(obj,"GET data collection ok")
								equals(obj.embedded.collection.constructor.fullName,"Sigma.Model.HAL.Collection.List","Collection Fullname type ok")
								equals(obj.embedded.attr('collection.0').constructor.fullName,"Sigma.Model.HAL.Collection","Collection element Fullname type ok")
								equals(obj.embedded.collection.length,24,"Collection length ok")
								can.when(obj.post({id: "ANT", desc: "Antartida"}))
								.then(
									function()
									{
										equals(obj.embedded.attr('collection').length,25,"Collection length ok")
										equals(obj.embedded.attr('collection.24').constructor.fullName,"Sigma.Model.HAL.Collection","Collection new element Fullname type ok")
										equals(obj.embedded.attr('collection.24').desc,"Antartida","Data true")
										can.when(obj.embedded.attr('collection.24').put({desc: "German Ladri"}))
										.then(
											function(objs)
											{
												equals(obj.embedded.attr('collection.24').desc,"German Ladri","Data desc update true")
												start()
												stop()
												can.when(obj.embedded.attr('collection.24').delete())
												.then(
													function()
													{
														equals(obj.embedded.collection.length,24,"Collection length ok")
														equals(obj.embedded.attr('collection.24'),undefined,"Data remove from collection true")
														start()
													}
												)
											}
										)
									}
								)
							}
						)
					}
				)
			}
		)

	}
)
