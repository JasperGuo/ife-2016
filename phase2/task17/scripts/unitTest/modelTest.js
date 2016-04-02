define(
	["../model.js"], function(model){
		console.log(model.cities.getCityData("北京", 0));
		console.log(model.cities.getCityData("北京", 1));
		console.log(model.cities.getCityData("北京", 2));
	}
);