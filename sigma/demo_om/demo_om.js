steal('sigma/demo_om/model.js')
.then(	function()
	{
		can.Construct('Pepe.Model');

		can.Observe(
			"Pepe.Model.Observable"
		,	{
				setup: function(data, data2){
					this._super(data)
					this.data = data.data
					this.otra_cosa = data2
					this.otro_atributo = "Esto es para probar"
				}
			}
		)

		can.Model(
			"Pepe.Model.ModeloPrueba"
		,	{
				setup: function(data, data2){
					this._super(data)
					this.data = data.data
					this.otra_cosa = data2
				}
			}
		)
		
	}
)
