Sigma.HypermediaControl(
	'Sigma.Hypermedia.Object'
,	{
		defaults:
		{
			align:'left'
		,	title:'4'
		,	view:'//sigma/stock/views/stream/object.ejs'
		,	css:
				{	'text-align':'center'
				,	'padding':'10px'
				,	'border-radius':'10px'
				,	'line-height':'1'
				,	'background-color':'#9D261D'
				,	'font-size':'40px'
				,	'text-shadow':'2px 2px 3px #222'
				,	'color':'white'
				}
		}
	}
,	{
		init: function(element,options)
		{
			var $object = element
					.html(can.view(this.options.view,this.options.data))
					.find('.media-object')
					.css(this.options.css )
		}
	}
)
