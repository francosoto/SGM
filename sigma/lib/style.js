var	use_less=false
;(
	(use_less)
		?steal(	'steal/less'
		,	'canui/style/bootstrap/less/bootstrap.less'
		,	'canui/style/bootstrap/less/responsive.less'
		)
		:steal(	'canui/style/bootstrap/less/bootstrap.css'
		,	'canui/style/bootstrap/less/responsive.css'
		)
)
.then(	'bootstrap/js/bootstrap-collapse.js'
,	'bootstrap/js/bootstrap-dropdown.js'
)