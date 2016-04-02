var nums = (function(){

	var numList = [];

	function checkNum(num){
		return /^(\+|-)?\d+($|\.\d+$)/.test(num);
	}

	function checkInt(num){
		return /^\d+$/.test(num);
	}

	return {
		pushFront: function(num){
			// 进行检测
			if (checkNum(num)) {
				// numList.push(num);
				num = Number(num);
				numList.unshift(num);
				return true;
			};
			return false;
		},
		pushBack: function(num){
			// 进行检测
			if (checkNum(num)) {
				num = Number(num);
				numList.push(num);
				return true;
			};
			return false;
		},
		popFront: function(){
			if (numList.length > 0) {
				numList.shift();
				return true;
			};
			return false;
		},
		popBack: function(){
			if (numList.length > 0) {
				numList.pop();
				return true;
			};
			return false;
		},
		removeNum: function(pos){
			if (checkInt(pos) && pos >= 0 && pos < numList.length) {
				numList.splice(pos, 1);
				return true;
			};
			return false;	
		}
	}

})();

function getInput(){
	return document.getElementById("inputNum").value;
}

function getNewNode(num){
	var par = document.createElement("div");
	par.className = "displayNum";
	var textNode = document.createTextNode(num);
	par.appendChild(textNode);
	return par;
}

/**
 * 添加数字
 * pos: 0 --- 队首
 * pos: -1 --- 队尾
 */
function insertNum(num, pos){

	var parent = document.getElementById("displayResult");
	switch(pos){
		case 0:
			// 队首
			var node = getNewNode(num);
			parent.insertBefore(node, parent.firstChild);
			break;
		case -1: 
			var node = getNewNode(num);
			parent.appendChild(node);
			break;
		default:
			break;
	}

}

/**
 * 移除数字
 * pos: 0 --- 队首
 * pos: -1 --- 队尾
 * 非 0 或 -1 且 > 0 且 < length 则在输出中间
 */
function removeNum(pos){

	var parent = document.getElementById("displayResult");
	switch(pos){
		case 0:
			// 队首
			parent.removeChild(parent.children[0]);
			break;
		case -1: 
			var children = parent.children;
			parent.removeChild(children[children.length-1]);
			break;
		default:
			if ( pos > 0 && pos < parent.children.length) {
				parent.removeChild(parent.children[pos]);
			};
			break;
	}
}

function removeNumByNode(node){
	var parent = document.getElementById("displayResult");
	parent.removeChild(node);
}

function leftInBtnHandler(){
	var num = getInput();
	if (nums.pushFront(num)) {
		insertNum(num, 0);
	};
}

function rightInBtnHandler(){
	var num = getInput();
	if (nums.pushBack(num)) {
		insertNum(num, -1);
	};
}

function leftOutBtnHandler(){
	if (nums.popFront()) {
		removeNum(0);
	};
}

function rightOutBtnHandler(){
	if (nums.popBack()) {
		removeNum(-1);
	};
}

function displayNumOnClickHandler(event){
	if (event.target && event.target.className === "displayNum") {
		// console.log(event, event.target);
		var index = [].indexOf.call(event.target.parentNode.children, event.target);
		if(nums.removeNum(index)){
			removeNum(index);
		}
	};
}

function init(){

	document.getElementById("leftIn").onclick = leftInBtnHandler;
	document.getElementById("leftOut").onclick = leftOutBtnHandler;
	document.getElementById("rightOut").onclick = rightOutBtnHandler;
	document.getElementById("rightIn").onclick = rightInBtnHandler;

	document.getElementById("displayResult").onclick = displayNumOnClickHandler;

}

init();