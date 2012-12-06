steal(
	'sigma/lib'
,	'sigma/util'
).then(
	function() {
		can.Control(
			'Sigma.Controls.Login'
		,	{
				defaults:
					{
						parent:false
					,	target:false
					,	view: '//sigma/stock/views/login/init.ejs'
					}
			}
		,	{
				init:
					function(element,options)
					{
					var	getMessage
						=	function(link)
							{
							return	'Ingrese con su cuenta de '+link.title
							}
						can.extend(
							options
						,	{
								legend:'Ingrese su usuario y contraseña'
							,	username_label:'Usuario'
							,	username_hint:'usuario...'
							,	password_label:'Contraseña'
							,	password_hint:'contraseña...'
							,	login_label:'Entrar'
							}
						,	{
								login:options.links.login
							,	open_ids:
									can.map(
										options.links.open_ids
									,	function(link)
										{
										return	{	name: link.name
											,	title:link.title
											,	icon:link.icon
											,	href:link.href
											,	message:getMessage(link)
											,	relation:link.rel
											}
										}
									)
							}
						)
						this.element.html(can.view(this.options.view,options));
					}
			,	'[data-relation] click':
					function(el, ev)
					{
						ev.preventDefault()
						this.element.trigger(
							'browse'
						,	{
								links:this.options.links
							,	rel:el.data('relation')
							,	name:el.data('name')
							,	target:this.options.target
							}
						)
					}
			}
		)

	}
)
