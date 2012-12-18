steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
).then(
	function() {
		Sigma.HypermediaControl(
			'Sigma.Controls.Home'
		,	{
				defaults:{
					target: 'Root'
				,	view: '//stock/views/home/init.ejs'
				}
			}
		,	{}
		)
	}
)
