
/* 数据格式演示
	var aqiSourceData = {
	  "北京": {
	    "2016-01-01": 10,
	    "2016-01-02": 10,
	    "2016-01-03": 10,
	    "2016-01-04": 10
	  }
	};
	

	// 按日格式返回
	{
	    "2016-01-01": 10,
	    "2016-01-02": 10,
	    "2016-01-03": 10,
	    "2016-01-04": 10
	}

	// 按周格式返回
	{
		1: 10,
		2: 10,
		3: 10,
		..
	}
	
	// 按月格式返回
	{
		2016-01: 10,
		2016-02: 10,
		2016-03: 10,
		..
	}

*/

define(function(){

	//  以下两个函数用于随机模拟生成测试数据
	function getDateStr(dat) {
	  	var y = dat.getFullYear();
	  	var m = dat.getMonth() + 1;
	  	m = m < 10 ? '0' + m : m;
	  	var d = dat.getDate();
	  	d = d < 10 ? '0' + d : d;
	  	return y + '-' + m + '-' + d;
	}

	function randomBuildData(seed) {
  		var returnData = {};
	  	var dat = new Date("2016-01-01");
	  	var datStr = ''
	  	for (var i = 1; i < 92; i++) {
	    	datStr = getDateStr(dat);
	    	returnData[datStr] = Math.ceil(Math.random() * seed);
	    	dat.setDate(dat.getDate() + 1);
	  	}
	  	return returnData;
	}

	var cities = (function(){

		var aqiSourceData = {
		  	"北京": randomBuildData(500),
		  	"上海": randomBuildData(300),
		  	"广州": randomBuildData(200),
		  	"深圳": randomBuildData(100),
		  	"成都": randomBuildData(300),
		  	"西安": randomBuildData(500),
		  	"福州": randomBuildData(100),
		  	"厦门": randomBuildData(100),
		  	"沈阳": randomBuildData(500)
		};

		return {
			getCityList: function(){
				var cityList = [];
				var city;
				for(city in aqiSourceData){
					if (aqiSourceData.hasOwnProperty(city)) {
						cityList.push(city);
					};
				}
				return cityList;
			},
			/**
			 * graTime: 0 - 日
			 * graTime: 1 - 周
			 * graTime: 2 - 月
			 * city: 城市名 ( "北京" )
			 */
			getCityData: function(city, graTime){
				var data = aqiSourceData[city];
				var newData = {};

				var date;
				
				var numOfItems = 0;

				var time = 1;

				var length = 0;
				var tempValue = 0;
				
				var currentYear = -1;
				var currentMonth = -1;

				switch(graTime){
					case 0:
						// 日-无需处理
						for(date in data){
							if (data.hasOwnProperty(date)) {
								numOfItems++;
							};
						}
						newData = data;
						newData.length = numOfItems;
						break;
					case 1:
						// 周-按周处理
						newData.length = 0;
						for(date in data){
							if (data.hasOwnProperty(date)) {
								
								tempValue += data[date];
								length++;

								date = new Date(date);	
								if (date.getDay() === 0) {
									newData[time] = (tempValue/length).toFixed(2);
									newData.length++;
									tempValue = 0;
									length = 0;
									time++;
								};
							};
						}
						if (tempValue) {
							newData.length++;
							newData[time] = (tempValue/length).toFixed(2);
						};		
						break;
					case 2:
						// 月-按月处理
						newData.length = 0;
						for(date in data){
							if (data.hasOwnProperty(date)) {
								
								tempValue += data[date]; 
								length++;

								date = new Date(date);

								if (currentMonth === -1 && currentYear === -1) {
									currentMonth = date.getMonth();
									currentYear = date.getFullYear();
								}else if (currentMonth !== date.getMonth() || currentYear !== date.getFullYear()) {
									time = currentYear + "-" + (currentMonth + 1);
									newData[time] = (tempValue/length).toFixed(2);
									newData.length++;
									tempValue = 0;
									length = 0;
									currentMonth = date.getMonth();
									currentYear = date.getFullYear();
								};
							};
						}
						if (tempValue) {
							time = currentYear + "-" + (currentMonth + 1);
							newData[time] = (tempValue/length).toFixed(2);
							newData.length++;
						};
						break;
				}
				return newData;
			}

		}

	})();

	return {
		cities: cities
	};

});
