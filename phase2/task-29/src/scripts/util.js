var validate = (function(){

	var checkLength = function(str, min, max){
		str = trim(str);
		str = str.replace(/[^x00-xff]/g, "aa");
		var length = str.length;
		if (length >= 4 && length <= 16) {
			return length;
		}else if(length === 0){
			return 0;
		}else{
			return -1;
		}
	};

	var trim = function(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	};

	return {
		checkLength: checkLength
	};

})();