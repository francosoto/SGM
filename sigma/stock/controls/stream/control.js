Sigma.HypermediaControl(
	'Sigma.Hypermedia.Stream'
,	{
		defaults: {}
	}
,	{
		init: function(element,options)
		{
			var	existing=
					element.hasClass('media')
				||	element.hasClass('medias')
			,	is_list=
					(this.options.slot.length > 0)
			,	tag=
					is_list
						?'<ul>'
						:'<div>'
			,	klass=
					is_list
						?'medias'
						:'media'
				this.$media=
					existing
						?element
						:$(tag)
							.addClass(klass)
							.appendTo(this.element)
				this[
					is_list
						?'_render_medias'
						:'_render_media'
				](this.$media,this.options.slot)
		}
	,	_render_medias:	function(element,data)
		{	
			var	self=this
			return	element
				.list(
					{
						loading : function() { return 'Cargando'; }
					,	empty : function() { return 'Nada!' }
					,	view:function(data)
							{
							var	element
									=$('<li>')
									.addClass(data.identity())
									.addClass('media')
									new Sigma.Hypermedia.Stream(element,{slot:data})
							return	element
							}
					,	list:data
					}
				)
		}
	,	_render_media:	function(element,data)
		{
			element.addClass(data.identity())
			this.media_controls = can.map(
				[
					{
						control: Sigma.Hypermedia.Object
					,	class:'media-object'
					}
				,	{
						control: Sigma.Hypermedia.Body
					,	class:'media-body'
					}
				,	{
						control: Sigma.Hypermedia.Action
					,	class:'media-actions'
					}
				]
			,	function(opt)
				{
					return	new opt.control(
							$('<div>')
								.addClass(opt.class)
								.appendTo(element)
						,	{data:data}
						)
				}
			)
			return	element
		}
	}
)