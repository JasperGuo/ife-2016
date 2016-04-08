MAX = 100;
MIN = 10;
MAX_NUM = 60;

var nums = (function(){

	var numList = [];

	function checkNum(num){
		return /^(\+|-)?\d+($|\.\d+$)/.test(num);
	}

	function checkInt(num){
		return /^\d+$/.test(num);
	}

	return {
		randomInit: function(){
			var length = getRandomNum(10, 60);
			for (var i = 0; i < length; i++) {
				numList[i] = getRandomNum(MIN, MAX);
			};
		},
		pushFront: function(num){
			// 进行检测
			
			if(numList.length <= MAX_NUM){
				if(checkNum(num)){
					if (num >= 10 && num <= 100) {
						num = Number(num);
						numList.unshift(num);
						return 0;	
					}else{
						return 3;
					}
				}else{
					return 2;
				}
			}else{
				return 1;
			}
		},
		pushBack: function(num){
			// 进行检测
			if(numList.length <= MAX_NUM){
				if(checkNum(num)){
					if (num >= 10 && num <= 100) {
						num = Number(num);
						numList.push(num);
						return 0;	
					}else{
						return 3;
					}
				}else{
					return 2;
				}
			}else{
				return 1;
			}
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
		},
		getNums: function(){
			return numList;
		},
		getLength: function(){
			return numList.length;
		},
		compare: function(i, j){
			if (numList[i] > numList[j]) {
				return 0;
			}else{
				return 1;
			}
		},
		swap: function(i, j){
			var temp = numList[i];
			numList[i] = numList[j];
			numList[j] = temp;
		},
		getNum: function(i){
			return numList[i];
		},
		getList: function(){
			return numList;
		}
	}

})();

function advancedBubbleSort(nums, iterTime, index, func){
	var i = iterTime;
	var j = index;
	var length = nums.getLength();
	var render = func;

	var sort = function(){
		//console.log(i, j, nums);
		if (j === length - i) {
			i++;
			j = 0;
		};
		if (i<length - 1) {
			if (j < length - i) {
				if (!nums.compare(j, j+1)) {
					render(j, j+1);
					nums.swap(j, j+1)
					// 交换前后位置
				};
				j++;
			}
			setTimeout(sort, 50);
		}else if (i >= length - 1) {
			// console.log(nums);
			return;
		};
	}

	return sort;
}


function swapRender(i, j){
	swapBar(i, j);
	swapDisplayResult(i, j);
}


function swapBar(i, j){
	var graph = document.getElementById("resultGraph");
	var children = graph.children;
	var iBar = children[i];
	var jBar = children[j];
	var tempHeght = iBar.style.height;
	iBar.style.height = jBar.style.height;
	jBar.style.height = tempHeght;
}

function swapDisplayResult(i, j){
	var result = document.getElementById("displayResult");
	var children = result.children;
	var iResult = children[i];
	var jResult = children[j];
	var temp = iResult.removeChild(iResult.firstChild);
	iResult.appendChild(jResult.removeChild(jResult.firstChild));
	jResult.appendChild(temp);
}

/**
 * util getRandomColor
 * 随机生成颜色
 */
var getRandomColor = function() {
	return '#' + (function(color) {
    	//这个写法比较有意思,Math.floor(Math.random()*16);
    	//返回的是一个小于或等于16的数.然后作为0123456789abcdef的下标,这样每次就会得到一个这个字符串当中的一个字符
		return (color += '0123456789abcdef' [Math.floor(Math.random() * 16)]) 
		//然后判断这个新字符串的长度是否到6,因为16进制的颜色是由6个字符组成的,如果到6了,就返回这6个字符拼成的字符串,如果没有就执行arguments.callee(color)也就是函数本身.
    		&& (color.length == 6) ? color: arguments.callee(color); //将''字符串传给color
	})('');
}

/**
 * util gRandomNum
 * 生成随机数
 */
function getRandomNum(Min,Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   

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


function getNewBar(num){
	var bar = document.createElement('div');
	var height = (num/MAX) * 100;
	bar.className = "bar";
	bar.style.height = height + "%";
	bar.style.background = getRandomColor();
	return bar;
}


/**
 * 添加数字, 同时添加对应bar到graph中
 * pos: 0 --- 队首
 * pos: -1 --- 队尾
 */
function insertNum(num, pos){

	var parent = document.getElementById("displayResult");
	var graph = document.getElementById("resultGraph");
	var node = getNewNode(num);
	var bar = getNewBar(num);
	switch(pos){
		case 0:
			// 队首
			parent.insertBefore(node, parent.firstChild);
			graph.insertBefore(bar, graph.firstChild);
			break;
		case -1: 
			parent.appendChild(node);
			graph.appendChild(bar);
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
	var graph = document.getElementById("resultGraph");
	var length;
	switch(pos){
		case 0:
			// 队首
			parent.removeChild(parent.children[0]);
			graph.removeChild(graph.children[0]);
			break;
		case -1: 
			var children = parent.children;
			var barChildren = graph.children;
			parent.removeChild(children[children.length-1]);
			graph.removeChild(barChildren[barChildren.length-1]);
			break;
		default:
			length = parent.children.length
			if ( pos > 0 && pos < length) {
				parent.removeChild(parent.children[pos]);
				graph.removeChild(graph.children[pos]);
			};
			break;
	}
}

function leftInBtnHandler(){
	var num = getInput();
	switch(nums.pushFront(num)){
		case 0:
			insertNum(num,0);
			break;
		case 1:
			alert("最多不能超过60个数");
			break;
		case 2:
			alert("请输入数字");
			break;
		case 3:
			alert("输入的数字在10-100");
			break;
	}
}

function rightInBtnHandler(){
	var num = getInput();
	switch(nums.pushBack(num)){
		case 0:
			insertNum(num,-1);
			break;
		case 1:
			alert("最多不能超过60个数");
			break;
		case 2:
			alert("请输入数字");
			break;
		case 3:
			alert("输入的数字在10-100");
			break;
	}
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

function sortBtnHandler(){
	advancedBubbleSort(nums, 0, 0, swapRender)();
}

function randomInitBtnHandler(){
	document.getElementById("resultGraph").innerHTML = "";
	document.getElementById("displayResult").innerHTML ="";
	nums.randomInit();
	var length = nums.getLength();
	for (var i = 0; i < length; i++) {
		insertNum(nums.getNum(i), -1);
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

function resultGraphOnClickHandler(event){
	if (event.target && event.target.className === "bar") {
		var index = [].indexOf.call(event.target.parentNode.children, 
			event.target);
		if (nums.removeNum(index)) {
			removeNum(index);
		};
	};
}

function init(){
	document.getElementById("leftIn").onclick = leftInBtnHandler;
	document.getElementById("leftOut").onclick = leftOutBtnHandler;
	document.getElementById("rightOut").onclick = rightOutBtnHandler;
	document.getElementById("rightIn").onclick = rightInBtnHandler;
	document.getElementById("resultGraph").onclick = resultGraphOnClickHandler;
	document.getElementById("displayResult").onclick = displayNumOnClickHandler;
	document.getElementById("sort").onclick = sortBtnHandler;
	document.getElementById("randomInit").onclick = randomInitBtnHandler;
}

init();