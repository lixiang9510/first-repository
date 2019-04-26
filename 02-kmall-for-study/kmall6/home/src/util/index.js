





var _util ={
	request:function(options){
		var _this = this;
		$.ajax({
			method:options.method || 'get',
			url:options.url || '',
			dataType:options.dataType || 'json',
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
	goHome:function(){
		window.location.href = '/'
	},
	getParamFormUrl:function(key){
		var query = window.location.search.substr(1);
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		var result = query.match(reg)
		return result ? decodeURIComponent(result[2]) : null;
	},
	validate:function(value,type){
		var value = $.trim(value);
		if(type == 'require'){
			return !!value;
		}
		if(type == 'username'){
			return /^[a-zA-Z0-9_]{3,9}$/.test(value);
		}
		if(type == 'password'){
			return /^[a-zA-Z0-9_]{3,9}$/.test(value);
		}
		if(type == 'phone'){
			return /^1[35689_]\d{9}$/.test(value);
		}
		if(type == 'email'){
			return /^\w+\.\w{2,6}$/.test(value);
		}
	}
}
module.exports = _util