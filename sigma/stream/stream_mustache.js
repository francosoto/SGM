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
					}
				,	{
						control: Sigma.Hypermedia.Body
					,	class:'media-body'
					}
				,	{
						control: Sigma.Hypermedia.Actions
					,	class:'media-actions'
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
						}
					)
				}
			)

			return	element
		}
	}
)

Sigma.HypermediaControl(
	'Sigma.Hypermedia.Object'
,	{
		defaults: {
			view : '//sigma/stream/views/object.mustache'
		}
	}
,	{
		init: function(element,options)
		{
			var icon_align = (options.data.attr('icon_align')) ? options.data.attr('icon_align') : 'left'

			element.addClass('pull-'+icon_align)

			can.append(
				element
			,	can.view(
					this.options.view
				,	this.options.data
				)
			)
		}
	}
)

Sigma.HypermediaControl(
	'Sigma.Hypermedia.Body'
,	{
		defaults: {
			view : '//sigma/stream/views/body.mustache'
		}
	}
,	{
		init: function(element,options)
		{
			element.addClass('media-box')

			can.append(
				element
			,	can.view(
					this.options.view
				,	this.options.data
				)
			)

			if (options.data.attr('subitems') && options.data.attr('subitems').length > 0 ) {
				new Sigma.Hypermedia.Stream(
					element
				,	{ 
						slot: options.data.attr('subitems')
					}
				)
			}

		}
	}
)

Sigma.HypermediaControl(
	'Sigma.Hypermedia.Actions'
,	{
		defaults: {
			view : '//sigma/stream/views/actions.mustache'
		}
	}
,	{
		init: function(element,options)
		{
			can.append(
				element
			,	can.view(
					this.options.view
				,	this.options.data
				)
			)
		}
	}
)