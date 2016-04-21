function validateBtnHandler(){
	var text = document.getElementById("text").value;
	var flag = validate.checkLength(text, 4, 16);
	console.log(flag);
	switch(flag){
		case 0:
			renderHint(1);
			break;
		case -1:
			renderHint(2);
			break;
		default:
			renderHint(0);
			break;
	}
}

function renderHint(type){
	
	var hint = document.getElementById("msg");
	var text = document.getElementById("text");
	console.log("hhhhh");
	switch(type){
		case 0:
			hint.innerHTML = "格式正确";
			hint.className = "success-hint";
			text.className = "success-text";
			break;
		case 1:
			hint.innerHTML = "姓名不能为空";
			hint.className = "error-hint";
			text.className = "error-text";
			break;
		case 2:
			hint.innerHTML = "字符数应为4~16位";
			hint.className = "error-hint";
			text.className = "error-text";
			break;
	}

}

function init(){
	document.getElementById("validateBtn").onclick = validateBtnHandler;
}

init();