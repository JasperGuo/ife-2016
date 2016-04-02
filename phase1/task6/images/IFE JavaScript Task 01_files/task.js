/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 封装了检验事件, 分别公开检验city和检验value的事件
 * @param  {[type]} ){	var validateChinese [description]
 * @return {[type]}         [description]
 */
var validator = (function(){

	var validateChinese = function(test){
		return /^[\u4e00-\u9fa5]+$/.test(test);
	}

	var validateEnglish = function(test){
		return /^[a-zA-Z]/.test(test);
	}

	var isInt = function(test){
		var patrn = /^[0-9]*$/;  
    	if (patrn.exec(test) == null || test == "") {  
       	 	return false;
    	} else {
        	return true;
   		}
	}

	return {
		validateCity: function(test){
			return validateEnglish(test) || validateChinese(test);
		},
		isInt: isInt
	};

})();

var isCityValid = false;
var isValueValid = false;

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value.trim();
	var value = parseInt(document.getElementById("aqi-value-input").value);
	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  if (isCityValid && isValueValid) {
	addAqiData();
  	renderAqiList();
  };
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.

  renderAqiList();
}

/**
 * 城市输入框失去焦点后，触发的检验逻辑
 * [cityBlueHandler description]
 * @return {[type]} [description]
 */
function cityBlurHandler(){
	isCityValid = validator.validateCity(document.getElementById("aqi-city-input").value);
	if (isCityValid) {
		renderHint("city-input-hint", "");
	}else{
		renderHint("city-input-hint", "请输入中文或英文");
	}
}

/**
 * 空气质量输入框失去焦点后，触发的检验逻辑
 * [valueBlurHandler description]
 * @return {[type]} [description]
 */
function valueBlurHandler(){
	isValueValid = validator.isInt(document.getElementById("aqi-value-input").value);
	if (isValueValid) {
		renderHint("value-input-hint", "");
	}else{
		renderHint("value-input-hint", "请输入整数");
	}
}

/**
 * 设置提示符
 * @param  {[type]} node [description]
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
function renderHint(node, text){
	document.getElementById(node).innerHTML = text;
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

  document.getElementById("aqi-city-input").onblur = cityBlurHandler;
  document.getElementById("aqi-value-input").onblur = valueBlurHandler;
  document.getElementById("add-btn").onclick = addBtnHandle;

}

/**
 * 判断对象是否为空
 * @param  {[type]}  json [description]
 * @return {Boolean}      [description]
 */
function isEmptyObj(obj){
	var attr;
	for(attr in obj){
		return false;
	};
	return true;
};

String.prototype.trim = function(){
	return this.replace(/[(^\s+)(\s+$)]/g, "");
}

init();