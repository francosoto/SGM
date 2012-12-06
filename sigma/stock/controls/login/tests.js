steal(
	'sigma/stock/controls/login'
,	'sigma/stock/controls/login/fixtures.js'
).then(
	function()
	{
		test(
			"Login - Test Ladri"
		,	function()
			{

				the_root=Sigma.Model.HAL.Resource.getRoot('/api')
				the_root.then(
					function(data)
					{
						new	Sigma.Controls.Login(
								$('#login')
							,	{
									links:data.links
								}
							)
					}
				)
			}
		)
	}
)
