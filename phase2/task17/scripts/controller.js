/**
 * 定义Controller模块
 * 可以添加依赖
 */
define(["model"], function(model){

	console.log("controller is loaded");

	// console.log(model.cities.getCityData("北京", 0));
	// console.log(model.cities.getCityData("北京", 1));
	// console.log(model.cities.getCityData("北京", 2));
		
	var dataController = (function(){

		var graTime = 0;
		var city = "北京";
		
		/**
		 * 获取当前被选中的城市
		 * @return {[type]} [description]
		 */
		var getCity = function(){
			return city;
		};

		var setCity = function(c){
			city = c;
		};

		/**
		 * 获取当前被选中的时间粒度
		 * @return {[type]} [description]
		 */
		var getGraTime = function(){
			return graTime;
		};

		var setGraTime = function(t){
			graTime = parseInt(t);
		};

		/**
		 * 获取全部城市
		 * @return {[type]} [description]
		 */
		var getCityList = function(){
			return model.cities.getCityList();
		};

		/**
		 * 获取数据
		 * @return {[type]} [description]
		 */
		var getData = function(){
			console.log("getData", city, graTime);
			return model.cities.getCityData(city, graTime);
		};

		return {
			getCity: getCity,
			setCity: setCity,
			getGraTime: getGraTime,
			setGraTime: setGraTime,
			getCityList: getCityList,
			getCityData: getData,
		}

	})();

	// module interface API
	return {
		dataController: dataController
	};

});

