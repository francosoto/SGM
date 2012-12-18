steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/hal/collections.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Scrollable'
		,	{
				defaults:{
					view_more: '//stock/views/scrollable/more.mustache'
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
					,	can.$('<div class="more">')
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
							.find('div.more')
					,	can.view(
							this.options.view_more
						,	this.options.slot
						)
					)
				}

			,	update: function()
				{
					this.updateContent()
					this.updateMore()
				}

			, 	updateContent: function ()
				{
					can.append(
						this.element
							.find('div.content')
					,	can.view(
							this.options.view_content
						,	this.options.slot
						)
					)
				}

			,	updateMore: function()
				{
					this.element
						.find('div.more')
						.empty()

					can.append(
						this.element
							.find('div.more')
					,	can.view(
							this.options.view_more
						,	this.options.slot
						)
					)
			}

			,	'button.more click' : function(element,event)
				{
					var self = this
					Sigma.Model.HAL.Collection.getRoot(element.attr('scroll-href'),'scrollable')
					.then(
						function(slot)
						{
							self.options.slot = slot
							self.update()
						}
					)
				}

			,	'{window} scroll': function(el,ev)
				{
					if (can.$(el).height() + can.$(el).scrollTop() == can.$(document).height() && this.options.slot.attr('more'))
					{
						var self = this
						Sigma.Model.HAL.Collection.getRoot(self.options.slot.attr('more').attr('href'),'scrollable')
						.then(
							function(slot)
							{
								self.options.slot = slot 
								self.update()
							}
						)
					}
				}
			}
		)
	}
)
