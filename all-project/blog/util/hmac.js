const crypto = require('crypto');

module.exports = (str)=>{
	const hmac = crypto.createHmac('sha256','lili');
	hmac.updata(str);
	return hmac.digest('hex');
}