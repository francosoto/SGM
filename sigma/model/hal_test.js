steal(
	'sigma/model/hal.js'
).then(
	function()
	{
		module(
			"sigma/model/hal"
		,	{
				setup: function() {
					can.fixture("GET /single/1"
					,	function()
						{
						return	{
								name:	"Single One"
							,	_links:{
									self:{ href:'/single/1' }
								,	collection:
										[
											{ href:'/single/1/item1' }
										,	{ href:'/single/1/item2' }
										]
								,	next:{ href:'/single/2' }
								}
							,	_embedded:{
									collection:[
										{
											name:	"Single One / item 1"
										,	_links:{
												self:{ href:'/single/1/item1' }
											}
										}
									,	{
											name:	"Single One / item 2"
										,	_links:{
												self:{ href:'/single/1/item2' }
											}
										}
									]
								}
							}
						}
					)
					can.fixture("GET /hal_samples/{id}"
					,	function()
						{
						return	{
								_links:{
									self:{ href:'root' }
								,	collection:
										[
											{ href:'item1' }
										,	{ href:'item2' }
										]
								,	multiples:[
										{
											href:'multiple/1'
										,	name:'uno'
										}
									,	{ href:'multiple/2' }
									,	{ href:'multiple/3' }
									,	{ href:'multiple/4' }
									]
								,	single:{ href:'/single/1' }
								}
							,	_embedded:{
									collection:[
										{
											_links:{
												self:{ href:'item1' }
											,	collection:[ { href:'item1/subitem1' } ]
											}
										}
									,	{
											_links:{
												self:{ href:'item2' }
											,	collection:[ { href:'item1/subitem2' } ]
											}
										}
									]
								,	multiples:[
										{ name:'uno', _links:{ self:{ href:'multiple/{name}' } } }
									,	{ _links:{ self:{ href:'multiple/2' } } }
									,	{ _links:{ self:{ href:'multiple/3' } } }
									]
								,	single:{
											prop:'only here'
										,	_links:{ self:{ href:'/single/1' } }
										}
								,	other:{
											prop:'another here'
										,	_links:{ self:{ href:'/other/1' } }
										}
								}
							}
						}
					)
					Sigma.Model.HAL.Resource
					(
						"Test.HALSample"
					,	{
							getRoot: function(id)
								{
								return	this.Fetch('/hal_samples/'+id)
								}
						}
					,	{ }
					)
				}
			}
		)
		test(
			"Resource model"
		,	function()
			{
				stop();
				var hal_sample = Test.HALSample.getRoot(1)
				hal_sample
				.then(
					function(pr)
					{
						console.log(pr)
						ok(pr.links, "links OK");
						equals(pr.constructor.fullName, "Test.HALSample", "Resource type ok");
						//equals(pr.links.constructor.fullName, "Sigma.Model.HAL.Links", "links type ok");
						ok(pr.embedded, "embedded OK");
						equals(pr.embedded.attr('collection').constructor.fullName,"Sigma.Model.HAL.Resource.List", "embedded.List type ok");
						equals(pr.embedded.attr('collection.0').constructor.fullName,"Sigma.Model.HAL.Resource", "embedded type ok");
						equals(pr.links.self.constructor.fullName, "Sigma.Model.HAL.LinksItem", "linksItem type ok");
						equals(pr.links.collection.constructor.fullName, "Sigma.Model.HAL.LinksItem.List", "linksItem.List type ok");
						equals(pr.links.attr('collection').constructor.fullName, "Sigma.Model.HAL.LinksItem.List", "linksItem.List (by string) type ok");
						equals(pr.links.attr('collection.0').constructor.fullName, "Sigma.Model.HAL.LinksItem", "linksItem (by string) type ok");
						start();
					}
				)
			}
		)
		test(
			"Resource model overrides"
		,	function()
			{
				stop();
				Sigma.Model.HAL.Resource("Sigma.Model.HAL.Single")
				Sigma.Model.HAL.Resource("Sigma.Model.HAL.Collection")
				can.Model.List( 'Sigma.Model.HAL.Collection.List');
				var hal_sample = Test.HALSample.getRoot(1)
				hal_sample
				.then(
					function(pr)
					{
						ok(pr.links, "links OK");
						equals(pr.embedded.attr('single').constructor.fullName, "Sigma.Model.HAL.Single", "embedded single type ok");
						equals(pr.embedded.attr('collection').constructor.fullName, "Sigma.Model.HAL.Collection.List", "embedded.List  list type ok");
						start();
					}
				)
			}
		)
		test(
			"Resource store"
		,	function()
			{
				stop();
				Sigma.Model.HAL.Resource("Sigma.Model.HAL.Single")
				Sigma.Model.HAL.Resource("Sigma.Model.HAL.Collection")
				var hal_sample = Test.HALSample.getRoot(1)
				//Test.HALSample.bind('root',function(what){console.log({created:what})})
				hal_sample
				.then(
					function(pr)
					{
						var handler=function(){}
						pr.bind('embedded',handler)
						ok(Test.HALSample.store['root'], "object store OK");
						pr.embedded.single.bind('links',handler)
						ok(Sigma.Model.HAL.Single.store['1'], "single object store OK");
						var single = pr.links.single.get();
						ok(single, "object OK");
						ok(single===pr.embedded.single, "same in the store OK");
						ok(Sigma.Model.HAL.Single.store['1'], "single object store OK");

						var the_single = pr.Linked('single')
						the_single
						.then(	function(s)
							{
								ok(s, "object OK");
								ok(s===pr.embedded.single, "same in the store OK");
								ok(Sigma.Model.HAL.Single.store['1'], "single object store OK");
								s.Fetch()
								.then(	function(fetched)
									{
										ok(fetched===s, "same in fetched  OK");
										equal(fetched.name,'Single One', "fetched object OK");
										equal(fetched.links.self.url(),'/single/1', "fetched uriTemplate OK");
										start();
									}
								)
							}
						)
					}
				)
			}
		)
		test(
			"Collections"
		,	function()
			{
				stop();
				var hal_sample = Test.HALSample.getRoot(1)
				hal_sample
				.then(
					function(pr)
					{
						//hay que implementar la logica de colecciones
						equals(pr.links.attr('multiples.0').constructor.fullName, "Sigma.Model.HAL.LinksItem", "links collections ok");
						equals(pr.links.attr('multiples').constructor.fullName, "Sigma.Model.HAL.LinksItem.List", "links List collections ok");
						equals(pr.links.attr('multiples.0').get().constructor.fullName, "Sigma.Model.HAL.Resource", "resource collections ok");
						equals(pr.embedded.attr('multiples').get().constructor.fullName, "Sigma.Model.HAL.Resource.List", "resource collections ok");
						start()
					}
				)
			}
		)
		test(
			"Fetch"
		,	function()
			{
				stop();
				var hal_sample = Test.HALSample.getRoot(1)
				hal_sample
				.then(	function(pr)
					{
						//hay que implementar la logica de colecciones
						pr.links.attr('multiples.0')
						.fetch()
						.done(
							function(fetched)
							{
							ok(fetched,  "fetched ok");
							equals(fetched.constructor.fullName, "Sigma.Model.HAL.Resource", "fetched type ok");
							start()
							}
						)
					}
				)
			}
		)
	}
)
