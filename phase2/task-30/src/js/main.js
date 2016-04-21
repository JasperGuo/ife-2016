
var validator;

var validateEle = {
	name: {
		normal: "必填，长度为4~16个字符",
		success: "名称可用",
		require: "名称不能为空",
		length: "输入字符长度为4~16个字符"
	},
	passwd: {
		normal: "6到16位数字和字母",
		success: "密码可用",
		require: "密码不可为空",
		length: "密码长度为6~16"
	},
	"config-passwd": {
		normal: "再次输入密码",
		success: "密码输入一致",
		require: "密码不可为空",
		length: "密码长度为6~16",
		configPasswd: "密码不一致"
	},
	email: {
		normal: "请输入正确的邮箱",
		success: "邮箱可用",
		require: "邮箱不可为空",
		isEmail: "邮箱格式不正确"
	},
	phone: {
		normal: "请输入11位手机号码",
		success: "手机号码可用",
		require: "手机号码不可为空",
		isPhone: "手机号码格式不正确"
	}

}


function submitBtnHandler(event){
	var results = validator.validate();
	var length = results.length;
	var element;
	var hint;
	var isValid = true;
	for (var i = 0; i < length; i++) {
		if (results[i].value) {
			isValid = false;
			element = document.getElementById(results[i].node);
			hint = element.nextElementSibling;
			errorHandler(element, hint, results[i]);
		};
	};
	if (isValid) {
		alert("提交成功");
	}else{
		alert("输入有误");
	}
}

function eleFocusHandler(event){

	var nextEle = this.nextElementSibling;
	nextEle.className = "hint normal-hint";
	nextEle.innerHTML = validateEle[this.id].normal;

}

function eleBlurHandler(event){
	var result = validator.validate(this.id);
	var hint = this.nextElementSibling;
	console.log(this.id, result);
	if (!result[0].value) {
		this.className = "success-input";
		hint.className = "hint success-hint";
		hint.innerHTML = validateEle[this.id].success;
	}else{
		errorHandler(this, hint, result[0]);
	}
}


function errorHandler(ele, hint, result){
	ele.className = "error-input";
	hint.className = "hint error-hint";
	switch(result.message){
		case "require":
			hint.innerHTML = validateEle[ele.id].require;
			break;
		case "length":
			hint.innerHTML = validateEle[ele.id].length;
			break;
		case "configPasswd":
			hint.innerHTML = validateEle[ele.id].configPasswd;
			break;
		case "isEmail":
			hint.isEmail = validateEle[ele.id].isEmail;
			break;
		case "isPhone":
			hint.isPhone = validateEle[ele.id].isPhone;
			break;
	}	
}


function init(){

	var param = {
		name: {
			require: true,
			length: {
				min: 4,
				max: 16
			}
		},
		passwd: {
			require: true,
			length: {
				min: 4,
				max: 16
			}
		},
		"config-passwd": {
			require: true,
			length: {
				min: 4,
				max: 16
			},
			configPasswd: {
				id: "passwd",
				length: {
					min: 4,
					max: 16
				}
			}
		},
		email: {
			require: true,
			email: true
		},
		phone: {
			require: true,
			phone: true
		}

	};

	validator = new Validate(
		document.getElementById("validateForm"),
		param
	);

	document.getElementById("submit").onclick = submitBtnHandler;

	document.getElementById("name").onfocus = eleFocusHandler;
	document.getElementById("name").onblur = eleBlurHandler;

	document.getElementById("passwd").onfocus = eleFocusHandler;
	document.getElementById("passwd").onblur = eleBlurHandler;

	document.getElementById("config-passwd").onfocus = eleFocusHandler;
	document.getElementById("config-passwd").onblur = eleBlurHandler;

	document.getElementById("email").onfocus = eleFocusHandler;
	document.getElementById("email").onblur = eleBlurHandler;

	document.getElementById("phone").onfocus = eleFocusHandler;
	document.getElementById("phone").onblur = eleBlurHandler;

}

window.onload = function(){
	init();
}