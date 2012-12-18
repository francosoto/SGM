steal(
	'sigma/lib'
,	'./session'
).then(
	function() {
		//can.fixture.on = false;
		Sigma.HypermediaControl(
			'Sigma.Controls.Browser'
		,	{
				defaults:
					{
						view: '//stock/views/browser/init.ejs'
					,	view_login: '//stock/views/login/init.ejs'
					}
			}
		,	{
				_render_content:
					function(data)
					{
						this._super(data)
						this.$login
						=	$('<div id="login_controls">')
							.appendTo(this.element)
							.hide()
						this._render_login(
							this.$login
						,	{
								links:	data.links
							,	container:this.options.container
							,	target:this.options.login_target
							}
						)
					}
			,	_render_login:
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
						element.html(can.view(this.options.view_login,options));
					}
			,	'#login click':
					function()
					{
						this.$login.show()
						$('#wellcome').hide()
					}
			,	'[data-re---lation] click':
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
