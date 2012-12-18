steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Hovercard'
		,	{
				defaults:{
					view: false
				,	target: false
				,	data : false
				}
			}
		,	{
				init: function(element,options)
				{
					this.options.$element = can.append(
						can.$('<div class="hovercard-content">')
					,	can.view(
							this.options.view
						,	this.options.data
						)
					).find('.popover')
				}

			,	getOffset: function()
				{
					return {
						top: this.getPosition().top - this.options.$element[0].offsetHeight
					,	left: this.getPosition().left + this.getPosition().width / 2 - this.options.$element[0].offsetWidth / 2
					}
				}

			,	getPosition: function (inside) 
				{
					return $.extend(
						this.element.offset()
					, 	{
							width: this.element[0].offsetWidth
						,	height: this.element[0].offsetHeight
						}
					)
				}

			,	'{target}:first mouseenter': function(el,ev)
				{					
					can.append(
						this.element
					,	this.options.$element
							.detach()
							.css(
								{ 
									top: 0
								,	left: 0
								,	display: 'block'
								,	'z-index': 1031 
								}
							)
					)

					this.options.$element
						.offset(this.getOffset())
						.addClass('top')
						.addClass('in')					
				}

			,	'{target}:first mouseleave': function(el)
				{
					this.options.$element
						.detach()
				}	
			}
		)
	}
)