steal(
	'sigma/stock/controls/scrollable'
,	'sigma/stock/controls/scrollable/adapters.js'
).then(
	function()
	{
		module(
			"sigma/stock/controls"
		)
		test(
			"Scrollable"
		,	function()
			{
				var 	scrollable_container
				,	scrollableHTML = can.$('<div id="scrollableContainer">')

				Sigma.HypermediaContainer(
					'Sigma.Hypermedia.Scrollable.Container'
				,	{
						defaults:
						{
							media_types:
							{
								'scrollable':
								{
									Handler: Sigma.Controls.Scrollable
								,	options:
									{
										target: 'scrollable'
									,	view_content: '//sigma/stock/controls/scrollable/views/content.mustache'
									}
								}
							}
						}
					}
				,	{
					}
				)

				Sigma.fixtures.collection(
					'Scrollable'
				,	{}
				,	{}
				)

				Scrollable.defaults
				= 	{
						ext:'.json'
					}
				can.fixture('GET /pageable-scrollable',steal.idToUri("//stock/fixtures/data/json/pageable-scrollable.json").path)

				stop()
				Sigma.fixtures.collection.scrollable.getCollectionsFixturator(
						Scrollable.getCollection("/pageable-scrollable")
				).then(
					function()
					{
						start()
						scrollable_container = new Sigma.Hypermedia.Scrollable.Container(
							scrollableHTML
						,	{
								id:'Scrollable'
							,	target: 'Scrollable'
							,	slot: 	Sigma.Model.HAL.Collection.getRoot('/pageable-scrollable?page=1&items-per-page=5','scrollable')
							}
						)

						stop()
						scrollable_container.options.slot
							.then(
								function(page1)
								{
									start()
									ok(page1.links, "links OK");
									ok(page1.embedded, "embedded OK");
									ok(page1.links.more, "links.more OK");
									ok(page1.embedded.collection, "_embedded.items OK");
									stop()
									page1.links.more.fetch()
										.then(
											function(page2)
											{
												start()
												ok(page2.links, "links OK");
												ok(page2.embedded, "embedded OK");
												ok(page2.links.more, "links.more OK");
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
