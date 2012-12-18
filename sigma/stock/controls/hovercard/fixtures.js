steal(
	'can/util/fixture'
,	'sigma/hal/hal_builder.js'
,	function()
	{
		can.fixture(
			'GET /hovercardDemo'
		,	function()
			{
				return 	new Sigma.fixtures
						.hal_builder(
							{
								title: 'owner'
							,	description: 'descripcion'
							,	img: 'img'
							}
						,	'/hovercard/owner'
						).get_document()
			}
		)

		can.fixture(
			'GET /posts'
		,	function()
			{
			var 	genHovercard
			= 	function(owner)
				{
					var card =  can.grep(
						[
							{owner: 'Yao Ming', img: 'http://placehold.it/76x76', descripcion: 'Me la suda'}
						,	{owner: 'Nerdencio', img: 'http://placehold.it/76x76', descripcion: 'E=MC^2'}
						,	{owner: 'Frikencio', img: 'http://placehold.it/76x76', descripcion: 'Que la fuerza te acompañe'}
						,	{owner: 'Tragalibrencio', img: 'http://placehold.it/76x76', descripcion: 'Soy un empollon'}
						,	{owner: 'Trollencio', img: 'http://placehold.it/76x76', descripcion: 'Imanes G_G'}
						,	{owner: 'Forever Alone', img: 'http://placehold.it/76x76', descripcion: 'Necesito que me apapachen'}
						,	{owner: 'Putencia', img: 'http://placehold.it/76x76', descripcion: 'PUTA DOT COM'}
						,	{owner: 'Black Catter', img: 'http://placehold.it/76x76', descripcion: 'FIESTA FIESTA FIESTA'}
						,	{owner: 'Bad Luck Brian', img: 'http://placehold.it/76x76', descripcion: 'Que es eso!?'}
						]
					,	function(card) 
						{
							return owner == card.owner 
						}
					)
					return 	new Sigma.fixtures
							.hal_builder(
								{
									title: card[0].owner
								,	description: card[0].descripcion
								,	img: card[0].img
								}
							,	'/hovercard/'+card[0].owner
							)
				}

			var	genActions
			=	function(url)
				{
				return can
					.map(
						[
							{id: 'me-gusta', value:'Me Gusta', icon: 'thumbs-up'}
						,	{id:'plusone', value:'1', icon: 'plus'}
						]
					,	function(action)
						{
						return	{
								title: action.value
							,	icon: action.icon
							,	align: 'right'
							,	href: url+'/actions/'+action.id
							}
						}
					)
				}

			var	genComments
			=	function(url,i)
				{
				return	can.map(
						can.grep(
							[
								{of: 0, owner: 'Tragalibrencio', value: 'Yo me se todo!' ,icon: 'heart' }
							,	{of: 0, owner: 'Trollencio', value: 'Machetes listos' ,icon: 'film'}
							,	{of: 1, owner: 'Forever Alone', value: 'Alquien quiere ir conmigo?' ,icon: 'ok' }
							,	{of: 1, owner: 'Putencia', value: 'Oh Pinochio!' ,icon: 'off'}
							,	{of: 1, owner: 'Black Catter', value: 'Me parecio aver visto un lindo gatito' ,icon: 'home' }
							,	{of: 2, owner: 'Bad Luck Brian', value: 'Me lo compre y me trajo tornillos adentro' ,icon: 'lock' }
							]
						,	function(comment)
							{
								return comment.of == i
							}
						)
					,	function(comment,index)
						{
						return  new Sigma.fixtures
							.hal_builder(
								{
									title: comment.owner
								,	icon: comment.icon
								,	description: comment.value
								,	icon_align: (index % 2) ? 'right' : 'left'
								}
							,	url+'/comments'+'/'+comment.owner
							).link(
								{
									'actions': genActions(url+'/comments'+'/'+comment.owner)
								,	'hovercard': 
									{
										href: url+'/comments'+'/'+comment.owner+'/hovercard'
									}
								}
							).embedded(
								{
									'hovercard': genHovercard(comment.owner)
								}
							)
						}
					)
				}

			var genPost
			=	function()
				{
				return can
					.map(
						[
							{owner: 'Yao Ming', value: 'Hoy tengo examen', icon: 'print'}
						,	{owner: 'Nerdencio', value: 'Hoy se estrena Star Wars VII: El ataque de Ponchio', icon: 'camera'}
						,	{owner: 'Frikencio', value: 'Ya tengo el nuevo Iphone, a solo 16k', icon: 'book'}
						]
					,	function(post,index)
						{
						return 	new Sigma.fixtures
							.hal_builder(
								{
									title: post.owner
								,	icon:  post.icon
								,	description: post.value
								,	align: 'left'
								,	icon_align: 'left'
								}
							,	'/posts/'+post.owner
							).link(
								{
									'comments':
									{
										href:'/posts/'+post.owner+'/comments'
									}
								,	'actions': genActions('/posts/'+post.owner)
								,	'hovercard': 
									{
										href:'/posts/'+post.owner+'/hovercard'
									}
								}
							).embedded(
								{
									'comments': genComments('/posts/'+post.owner,index)
								,	'hovercard': genHovercard(post.owner)
								}
							)
						}
					)
				}
			return	new Sigma.fixtures
				.hal_builder(
					{
					}
				,	'/stream'
				).link(
					{
						'posts':
							{
								href:'/posts'
							}
					}
				).embedded(
					{
						'posts': genPost()
					}
				).get_document()
			}
		)
	}
)
