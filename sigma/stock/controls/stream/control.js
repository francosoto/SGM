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
						?'media-list'
						:'media'
				this.$media=
					existing
						?element
						:can.$(tag)
							.addClass(klass)
							.appendTo(this.element)
				this[
					is_list
						?'_render_medias'
						:'_render_media'
				](this.$media,this.options.slot)
		}

	,	_render_medias:	function(element,slots)
		{	
			can.each(
				slots
			,	function(media)
				{
					new Sigma.Hypermedia.Stream(
						can.$('<li>')
							.addClass('media')
							.addClass(media.identity())
							.appendTo(element)
					,	{ 
							slot: media
						}
					)
				}
			)
			
			return element
		}

	,	_render_media:	function(element,data)
		{
			can.each(
				[
					{
						control: Sigma.Hypermedia.Object
					,	class:'media-object'
					//,	view: '//sigma/stock/views/stream/object.ejs'
					,	view: '//sigma/stock/views/stream/object.mustache'
					}
				,	{
						control: Sigma.Hypermedia.Body
					,	class:'media-body'
					//,	view: '//sigma/stock/views/stream/body.ejs'
					,	view: '//sigma/stock/views/stream/body.mustache'
					}
				,	{
						control: Sigma.Hypermedia.Actions
					,	class:'media-actions'
					//,	view: '//sigma/stock/views/stream/actions.ejs'
					,	view: '//sigma/stock/views/stream/actions.mustache'
					}
				]
			,	function(media)
				{
					new media.control(
						$('<div>')
							.addClass(media.class)
							.appendTo(element)
					,	{
							data : data
						,	view : media.view
						}
					)
				}
			)

			return	element
		}
	}
)