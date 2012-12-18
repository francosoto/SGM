steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Pageable'
		,	{
				defaults:{
					view_links: false
				,	view_content: false
				}
			}
		,	{
				init: function(element,options)
				{
					this._super.apply(this,arguments)
					can.append(
						this.element
					,	can.$('<div class="content">')
					)

					can.append(
						this.element
					,	can.$('<div class="links">')
					)

					can.append(
						this.element
							.find('div.content')
					,	can.view(
							this.options.view_content
						,	this.options.slot
						)
					)

					can.append(
						this.element
							.find('div.links')
					,	can.view(
							this.options.view_links
						,	this.options.slot
						)
					)
				}

			,	update: function()
				{
					this.updateContent()
					this.updateLinks()
				}

			, 	updateContent: function ()
				{
					this.element
						.find('div.content')
						.empty()

					can.append(
						this.element
							.find('div.content')
					,	can.view(
							this.options.view_content
						,	this.options.slot
						)
					)
				}

			,	updateLinks: function()
				{
					this.element
						.find('div.links')
						.empty()

					can.append(
						this.element
							.find('div.links')
					,	can.view(
							this.options.view_links
						,	this.options.slot
						)
					)

					if (this.options.slot.attr('prev'))
						this.element
							.find('ul.paginable')
							.find('li.previous')
							.removeClass('disabled')
					else
						this.element
							.find('ul.paginable')
							.find('li.previous')
							.addClass('disabled')

				        if (this.options.slot.attr('next'))
						this.element
							.find('ul.paginable')
							.find('li.next')
							.removeClass('disabled')
					else
						this.element
							.find('ul.paginable')
							.find('li.next')
							.addClass('disabled')
			}

			,	'ul.paginable li:not(".disabled") click' : function(element,event)
				{
					var self = this
					Sigma.Model.HAL.Collection.getRoot(element.attr('href'),'paginable')
					.then(
						function(slot)
						{
							self.options.slot = slot
							self.update()
						}
					)
				}
			}
		)
	}
)
