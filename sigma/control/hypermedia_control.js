steal(	'sigma/lib'
,	'sigma/util'
,	'sigma/control/updatable_control.js'
,	'canui/list'
,	'sigma/control/view/hypermedia_generic.ejs'
//,	'http://cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify.js'
//,	'http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.js'
//,	'http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.css'
).then(
	function()
	{
		can.view.ejs(
			'hc_generic_list_ejs'
		,	'<li tabindex=0>'
		+		'<a href="<%= attr(\'href\') %>">'
		+			'<% if( attr(\'icon\')) { %>'
		+				'<i class="icon-<%= attr(\'icon\') %>"></i>'
		+			'<%}%>'
		+			'<%= attr(\'title\') %>'
		+		'</a>'
		+	'</li>'
		);
		can.view.ejs(
			'hc_generic_ejs'
		,	'<a href="<%= attr(\'href\') %>">'
		+		'<% if( attr(\'icon\')) { %>'
		+			'<i class="icon-<%= attr(\'icon\') %>"></i>'
		+		'<%}%>'
		+		'<%= attr(\'title\') %>'
		+	'</a>'
		);
		Sigma.UpdatableControl(
			'Sigma.HypermediaControl'
		,	{
				pluginName:'hc_generic'
			,	defaults:{
					view: 'sigma/control/view/hypermedia_generic.ejs'
				,	list_view: 'hc_generic_list_ejs'
				}
			}
		,	{
				init:	function(el,options)
					{
						this._super.apply(this,arguments)
					}
			,	_render_content:
					function(data)
					{
						if(data instanceof can.Observe.List)
							this._render_list(data)
						else
							this._super(data)
						//prettyPrint()
					}
			,	_render_list:
					function(observe_list)
					{
					var	self=this
						this.element
						.list(
							{
								loading : function() { return 'Cargando'; }
							,	empty : function() { return 'Nadaaaaa!' }
							,	view:
									function(obs)
									{
									return	can.view(self.options.list_view,obs)
									}
							,	list:observe_list
							}
						)
					}
			,	'[data-relation] click':
					function(el, ev)
					{
						ev.preventDefault()
						this.element.trigger(
							'browse'
						,	{
								links:this.options.data.links
							,	rel:el.data('relation')
							,	name:el.data('name')
							,	target:this.options.target
							}
						)
						return false
					}
			}
		)
	}
)
