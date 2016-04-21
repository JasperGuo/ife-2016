function Validator(){

}


/**
 * 去除两边多余空格
 */
Validator.prototype.trim = function(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}


/**
 * 检查字段是否为空
 */
Validator.prototype.isEmpty = function(str){
	str = this.trim(str);
	if (str.length === 0) {
		return 1;
	}else{
		return 0;
	}
}


/**
 * param = {
 * 	min: 最小长度
 * 	max: 最大长度
 * }
 */
Validator.prototype.validateLength = function(str, param){
	console.log(str, param);
	var min = param.min || 0;
	var max = param.max || 10;
	var length;
	// console.log(str);
	str = this.trim(str);
	str = str.replace(/[^x00-xff]/g, "aa");
	length = str.length;
	if (length < min) {
		return 1;
	}else if (length > max) {
		return 2;
	}else{
		return 0;
	}
}

/**
* param = {
* 	min: 最小长度
* 	max: 最大长度
* }
* passwd1 与 passwd2 是否相同
*/
Validator.prototype.configPasswd = function(passwd1, passwd2, param){
	if (!this.validateLength(passwd1, param) && !this.validateLength(passwd2, param)) {
		if (passwd1 === passwd2) {
			return 0;
		}else{
			return 2;
		}
	}else{
		return 1;
	}
}

/**
* 是否符合邮箱格式要求
*/
Validator.prototype.isEmail = function(email){
	var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	if (reg.test(email)) {
		return 0;
	}else{
		return 1;
	}
}

/**
* 是否符合手机号码要求
* param{
* 	min: 最小长度
* 	max: 最大长度
* }
*/
Validator.prototype.isPhone = function(phone){
	phone = this.trim(phone);
	if (phone.length === 11) {
		var reg = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
		if (reg.test(phone)) {
			return 0;
		}else{
			return 1;
		}	
	}else{
		return 2;
	}
		
}