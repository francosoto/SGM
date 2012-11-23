steal(
	'sigma/lib'
,	'sigma/lib/hypermedia.js'
,	'sigma/util'
,	'canui/list'
).then(
	function()
	{
		can.Construct('Sigma.Media')
	}
).then(
	'sigma/stock/controls/stream/actions.js'
,	'sigma/stock/controls/stream/object.js'
,	'sigma/stock/controls/stream/body.js'
).then(
	'sigma/stock/controls/stream/control.js'
)
