require('pages/common/footer');
require('pages/common/logo');
require('./index.css');
var _util = require('util');
$(function(){
	var type = _util.getParamFormUrl('type') || 'default';
	$('.'+type).show()
})