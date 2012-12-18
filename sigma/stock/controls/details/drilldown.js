steal(
	'sigma/stock/controls/lib'
).then(
	function()
	{
		Sigma.HypermediaControl(
			'Sigma.Hypermedia.DrillDown'
		,	{
				defaults: {
					view_drilldown: false
				,	view_breadcrumb: false
				}
			}
		,	{
				init: function(element,options)
				{
					var exists = 	element.find('ul').hasClass('breadcrumb') 
						     	|| element.find('ul').hasClass('drilldown')

					if (!exists)
						this._init()
					this.update()
				}


			,	_init: function()
				{	
					can.addClass(
						this.element
					,	'well media span5'
					)	

					can.$('<ul class="breadcrumb">')
						.appendTo(this.element)

					can.$('<li><i class="icon-home">')
						.appendTo(this.element.find('ul.breadcrumb'))

					can.$('<div class="span3 bs-docs-sidebar drilldown">')
						.appendTo(this.element)

				}

			,	_update: function() 
				{
					this.updateBreadcrumb()

					this.updateDrilldown()
				}

			,	updateBreadcrumb: function()
				{
					var self = this, control = false

					this.element
						.find('ul.breadcrumb')
						.find('li')
						.each(
							function()
							{
								if (control)
									can.$(this).remove()
								else 
									if (can.$(this).attr('id') == 'breadcrumb-'+self.options.slot.attr('id'))
										control = true
							}
						)
					if (!control)
					{
						this.element
							.find('ul.breadcrumb')
							.find('li')
							.addClass('active')

						can.append(
							this.element
								.find('ul.breadcrumb')
						,	can.view(
								this.options.view_breadcrumb
							,	this.options.slot
							)
						)	
					}
				}

			,	updateDrilldown: function() 
				{
					this.element
						.find('div.drilldown')
						.find('ul')
						.remove()

					can.append(
						this.element
							.find('div.drilldown')
					,	can.view(
							this.options.view_drilldown
						,	this.options.slot
						)
					)
				}

			,	'.drilldown ul li click': function(element,event)
				{
					
					var self = this
					Sigma.Model.HAL.Resource.DrillDown.getRoot(element.attr('href'))
					.then(
						function(slot)
						{
							self.options.slot = slot
							self._update(
								element
							,	self.options
							)
						}
					)
				}

			,	'.breadcrumb li.active click': function(element,event)
				{
					this.options.slot = element.data('breadcrumb')
					this._update(
						element
					,	this.options
					)
				}
			}
		)
	}
)
