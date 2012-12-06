steal('can/construct/super')
.then('sigma/demo_om/demo_om.js')
.then(
	function()
	{
		module("sigma/demo_om/demo_om")
		test(
			"Model Links"
		,	function()
			{
				stop();
				var hal_sample = new Pepe.Model.ModeloPrueba({data:{h:"Una prueba"}},{otra_cosa: "otra cosa mariposa"})
				console.log(hal_sample)
				ok(hal_sample.data, "modelo OK");
				equals(hal_sample.constructor.fullName, "Pepe.Model.ModeloPrueba", "Model type ok");
				equals(hal_sample.otra_cosa.otra_cosa, "otra cosa mariposa", "otra_cosa is ok");
				equals(hal_sample.data.h, "Una prueba", "data is ok");
				start();
			}
		)
		test(
			"Observe Links"
		,	function()
			{
				stop();
				var hal_sample = new Pepe.Model.Observable({data:{h:"Una prueba"}},{otra_cosa: "otra cosa mariposa"})
				console.log(hal_sample)
				ok(hal_sample.data, "observe OK");
				equals(hal_sample.constructor.fullName, "Pepe.Model.Observable", "Observed type ok");
				start();
			}
		)

	}
)
