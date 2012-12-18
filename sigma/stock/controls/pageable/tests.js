steal(
	'sigma/stock/controls/pageable'
,	'sigma/stock/controls/pageable/adapters.js'
).then(
	function()
	{
		module(
			"sigma/stock/controls"
		)
		test(
			"Pageable"
		,	function()
			{
				var 	pageable_container
				,	pageableHTML = can.$('<div id="paginableContainer">')

				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.Pageable.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'pageable':
								{
									Handler: Sigma.Controls.Pageable
								,	options:
									{
										target: 'paginable'
									,	view_links: '//stock/views/pageable/links.mustache'
									,	view_content: '//stock/views/pageable/content.mustache'
									}
								}
							}
						}
					}
				,	{
					}
				)

				Sigma.fixtures.collection(
					'Pageable'
				,	{}
				,	{}
				)

				can.fixture('GET /pageable-scrollable',steal.idToUri("//stock/fixtures/data/json/pageable-scrollable.json").path)
				stop()
				Sigma.fixtures.collection.pageable.getCollectionsFixturator(
						Pageable.getCollection("/pageable-scrollable")
				).then(
					function()
					{
						start()
						pageable_container = new Sigma.Hypermedia.Pageable.Container(
							pageableHTML
						,	{
								id: 'Pageable'
							,	target: 'Pageable'
							,	slot: Sigma.Model.HAL.Collection.getRoot('/pageable-scrollable?page=1&items-per-page=5','pageable')
							}
						)

						equal(pageable_container.options.id,"Pageable","ID Generated")

						stop()
						pageable_container.options.slot
							.then(
								function(page1)
								{
									start()
									ok(page1.links, "links OK");
									ok(page1.embedded, "embedded OK");
									ok(page1.links.next, "links.next OK");
									ok(page1.embedded.collection, "_embedded.items OK");
									stop()
									page1.links.next.fetch()
										.then(
											function(page2)
											{
												start()
												ok(page2.links, "links OK");
												ok(page2.embedded, "embedded OK");
												ok(page2.links.prev, "links.prev OK");
												ok(page2.links.next, "links.next OK");
												ok(page2.embedded.collection, "_embedded.items OK");
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
