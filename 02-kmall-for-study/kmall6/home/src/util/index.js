


var _util ={
	request:function(options){
		var _this = this;
		$.ajax({
			method:options.method || 'get',
			url:options.url || '',
			dataType:options.dataType || '',
			data:options.data || '',
			success:function(result){
				if(result.code == 0){
					options.success && options.success(result.data)
				}
				else if(result.code == 1){
					options.error && options.error(result.message)
				}
				else if(result.code == 10){
					_this.goLogin()
				}
			},
			error:function(err){
				options.error && options.error(err.statusTxt)
			}
		})
	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	showSuccessMsg:function(msg){
		alert(msg)
	},
	goLogin:function(err){
		window.location.herf = './user-login.html'
	},
	validate:function(value,type){
		var value = $.trim(value);
		if(type == 'require'){
			return !!value;
		}if(type == 'require'){
			return !!value;
		}
	}
}
module.exports = _util