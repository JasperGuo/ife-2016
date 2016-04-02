require(["controller",], function(controller, model){
	console.log("load completely");

	/**
	 * 选择日期粒度后的事件处理器
	 * @return {[type]} [description]
	 */
	function selectGraTimeHandler(event){
		if (event.target && event.target.name === "gra-time") {
			var graTime = event.target.value;
			var cityData;
			if (controller.dataController.getGraTime() !== graTime) {
				controller.dataController.setGraTime(graTime);
				cityData = controller.dataController.getCityData();
				drawChart(cityData);
			};
		};
	};

	/**
	 * 选择城市后的事件处理器
	 * @return {[type]} [description]
	 */
	function selectCityHandler(event){
		console.log("something happend");
		controller.dataController.setCity(event.target.value);
		var cityData = controller.dataController.getCityData();
		drawChart(cityData);
	};

	/**
	 * 渲染城市列表
	 * @param  {[type]} cityList [description]
	 * @return {[type]}          [description]
	 */
	function renderCity(cityList){
		function getCityHtml(city){
			return `<option>${city}</option>`;
		}
		var html = "";
		for (var i = 0; i < cityList.length; i++) {
			html += getCityHtml(cityList[i]);
		};
		document.getElementById("city-select").innerHTML = html;
	}

	/**
	 * 绘制柱状图
	 * 
	 */
	function drawChart(cityData){
		var interval;
		var html = "";
		var width = (100/cityData.length).toFixed(2) + "%";
		var height;
		var maxValue = 500;
		var bgColor;
		var title;
		function getDataHtml(width, height, bgColor, data){
			return `<div class = "bar" style = "width: ${width}; height: ${height}; background-color: ${bgColor}" title = ${data}></div>`
		}
 		for(data in cityData){
 			if (cityData.hasOwnProperty(data) && data !== "length") {
 				height = (cityData[data]/maxValue * 100).toFixed(2) + "%";
 				bgColor = getRandomColor();
 				title = data + "/" + cityData[data];
 				console.log(title)
 				html += getDataHtml(width, height, bgColor, title);
 			};
		}
		document.getElementById("chart").innerHTML = html;
	}

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
	 * 初始化事件处理器
	 * 为日期粒度绑定事件处理器
	 * 为城市选择绑定事件处理器
	 * 获取城市列表
	 * @return {[type]} [description]
	 */
	function init(){
		renderCity(controller.dataController.getCityList());
		drawChart(controller.dataController.getCityData());
		document.getElementById("city-select").onchange = selectCityHandler;
		document.getElementById("form-gra-time").onclick = selectGraTimeHandler;
	};

	init();

});

/**
 * addEventHandler方法
 * 兼容浏览器实现事件绑定
 */
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}