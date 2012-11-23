steal.config({
	map: {
		"*": {
			'jquery/jquery.js' : "jquery"
		,	"can/util/util.js": "can/util/jquery/jquery.js"
		}
	},
	paths: {
		"jquery": "can/util/jquery/jquery.1.8.2.js"
	,	"//stock/views/": "//sigma/stock/views/"
	,	"sigma/lib/hal/": "js-hal/"
	,	'sigma/lib/store2/':'https://raw.github.com/gist/3982154/'
	},
	ext: {
		js: "js",
		css: "css",
		less: "steal/less/less.js",
		coffee: "steal/coffee/coffee.js",
		ejs: "can/view/ejs/ejs.js"
	}
})
