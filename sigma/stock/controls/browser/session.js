steal(
	'sigma/lib'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Session'
		,	{}
		,	{
				_render_content:
					function(data_to_render)
					{
						this.element.trigger(
							'browse'
						,	{
								links:data_to_render.links
							,	rel:'profile'
							,	name:undefined
							,	target:this.options.target
							}
						)
					}
			}
		)

	}
)
