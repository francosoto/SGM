steal(
	'can/util/fixture'
,	'sigma/hal/hal_builder.js'
).then(
	function()
	{		
		var comments = can.map(
			[1,2,3,4,5,6,7,8,9,10]
		,	function(it)
			{	
				return {
					title: 'Comentarista '+it
				,	icon: 'star'
				,	description: 'Comentario numero '+it
				}
			}
		)

		var posts = can.map(
			[1,2,3,4,5,6]
		,	function(it) 
			{
				return  {
					title: 'Posteador '+it
				,	icon:  'off'
				,	description: 'Post numero '+it
				,	align: 'left'
				,	icon_align: 'left'
				}
			}
		)

		var genDetails = function(comment_id)
		{
			return 	{
				id : comment_id	
			,	title: 'Propetario : '+comments[comment_id].title
			,	description: comments[comment_id].description
			,	icon: comments[comment_id].icon
			,	date: new Date()
			,	likes: Math.floor((Math.random()*8)+1)
			, 	shared: Math.floor((Math.random()*2)+1)
			}
		} 

		can.fixture(
			'GET /details/{id}'
		,	function(data)
			{	
				return  new Sigma.fixtures
						.hal_builder(
							genDetails(data.url.split('/').reverse()[0])
						,	'/details'
						).get_document()
			}
		)

		var genCommentsActions = function()
		{
			return can.map(
				[
					{id: 'adjuntar', value:'Adjuntar', icon: 'file'}
				,	{id: 'con', value:'Junto A', icon: 'user'}
				,	{id: 'lugar', value:'Posicion', icon: 'globe'}
				]
			,	function(action)
				{
					return	{
						title: action.value
					,	icon: action.icon
					,	align: 'right'
					,	href: '/actions/'+action.id
					}
				}
			)
		}

		can.fixture(
			'GET /comments/{id}'
		,	function(data)
			{	
				return  new Sigma.fixtures
						.hal_builder(
							{
								place_holder: 'Ingrese un comentario'
							,	button_text: 'Comentar'
							}
						,	'/comments'
						).link(
							{
								'actions': genCommentsActions()
							}
						).get_document()
			}
		)

		can.fixture(
			'GET /bebidas/conalcohol/fernet'
		,	function()
			{
				var genFernets = function(url)
				{
					return can.map(
						['Branca','1982','F-Nandito Septimo','Leucera']
					,	function (desc)
						{
							return new Sigma.fixtures
									.hal_builder(
									{
										label: desc
									}
									,	url+desc.replace(' ','').toLowerCase()
									)
						}
					)
				}

				return 	new Sigma.fixtures
						.hal_builder(
						{
								href: '/bebidas/conalcohol/fernet'
							,	label: 'Fernets'
							,	divider: '/'
							}
						,	'/bebidas/conalcohol/fernet'
						).link(
							{
								'drilldown':
								{
									href:'/bebidas/conalcohol/fernet'
								}
							}
						).embedded(
							{
								'drilldown': genFernets('/bebidas/conalcohol/fernet/')
							}
						).get_document()
			}
		)

		can.fixture(
			'GET /bebidas/conalcohol/cerveza'
		,	function()
			{
				var genCerveza = function(url)
				{
					return can.map(
						['Quilmes','Isenbec','Heineken','Stella Artois']
					,	function (desc)
						{
							return new Sigma.fixtures
									.hal_builder(
									{
										label: desc
									}
									,	url+desc.replace(' ','').toLowerCase()
									)
						}
					)
				}

				return 	new Sigma.fixtures
						.hal_builder(
						{
								href: '/bebidas/conalcohol/cerveza'
							,	label: 'Cerveza'
							,	divider: '/'
							}
						,	'/bebidas/conalcohol/cerveza'
						).link(
							{
								'drilldown':
								{
									href:'/bebidas/conalcohol/cerveza'
								}
							}
						).embedded(
							{
								'drilldown': genCerveza('/bebidas/conalcohol/cerveza/')
							}
						).get_document()
			}
		)

		can.fixture(
			'GET /bebidas/conalcohol/gancia'
		,	function()
			{
				var genGancia = function(url)
				{
					return can.map(
						['Gancia','Manon']
					,	function (desc)
						{
							return new Sigma.fixtures
									.hal_builder(
									{
										label: desc
									}
									,	url+desc.replace(' ','').toLowerCase()
									)
						}
					)
				}

				return 	new Sigma.fixtures
						.hal_builder(
						{
								href: '/bebidas/conalcohol/gancia'
							,	label: 'Grancia'
							,	divider: '/'
							}
						,	'/bebidas/conalcohol/gancia'
						).link(
							{
								'drilldown':
								{
									href:'/bebidas/conalcohol/gancia'
								}
							}
						).embedded(
							{
								'drilldown': genGancia('/bebidas/conalcohol/gancia/')
							}
						).get_document()
			}
		)

		can.fixture(
			'GET /bebidas/conalcohol'
		,	function()
			{
				var genConAlcohol = function(url)
				{
					return can.map(
						['Fernet','Cerveza','Gancia']
					,	function (desc)
						{
							return new Sigma.fixtures
									.hal_builder(
									{
										label: desc
									}
									,	url+desc.replace(' ','').toLowerCase()
									)
						}
					)
				}

				return 	new Sigma.fixtures
						.hal_builder(
						{
								href: '/bebidas/conalcohol'
							,	label: 'Con Alcohol'
							,	divider: '/'
							}
						,	'/bebidas/conalcohol'
						).link(
							{
								'drilldown':
								{
									href:'/bebidas/conalcohol'
								}
							}
						).embedded(
							{
								'drilldown': genConAlcohol('/bebidas/conalcohol/')
							}
						).get_document()
			}
		)

		can.fixture(
			'GET /bebidas/sinalcohol'
		,	function()
			{
				var genSinAlcohol = function(url)
				{
					return can.map(
						['Gaseosa Coca','Gaseosa Lima Limon','Jugos','Agua']
					,	function (desc)
						{
							return new Sigma.fixtures
									.hal_builder(
									{
										label: desc
									}
									,	url+desc.replace(' ','').toLowerCase()
									)
						}
					)
				}

				return 	new Sigma.fixtures
						.hal_builder(
							{
								href: '/bebidas/sinalcohol'
							,	label: 'Sin Alcohol'
							,	divider: '/'
							}
						,	'/bebidas/sinalcohol'
						).link(
							{
								'drilldown':
								{
									href:'/bebidas/sinalcohol'
								}
							}
						).embedded(
							{
								'drilldown': genSinAlcohol('/bebidas/sinalcohol/')
							}
						).get_document()
			}
		)

		can.fixture(
			'GET /bebidas'
		,	function()
			{
				var genBebidas = function()
				{
					return can.map(
						['Sin Alcohol','Con Alcohol']
					,	function (desc)
						{
							return new Sigma.fixtures
									.hal_builder(
									{
										label: desc
									,	divider: '/'
									,	href: '/bebidas/'+desc.replace(' ','').toLowerCase()
									}
									,	'/bebidas/'+desc.replace(' ','').toLowerCase()
									)
						}
					)
				}

				return 	new Sigma.fixtures
						.hal_builder(
							{
								href: '/bebidas'
							,	label: 'Bebidas'
							,	divider: '/'
							}
						,	'/bebidas'
						).link(
							{
								'drilldown':
								{
									href:'/drilldown'
								}
							}
						).embedded(
							{
								'drilldown': genBebidas('/bebidas')
							}
						).get_document()
			}
		)
	}
)
