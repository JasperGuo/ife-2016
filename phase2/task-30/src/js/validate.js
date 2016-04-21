
/**
 * 自定义检验规则
 * name 为form中input的name属性
 */
function Validate(form, param){

	this.require = {};
	this.form = form;
	this.validator = new Validator();

	// 解析规则
	for(var name in param){
		if (param.hasOwnProperty(name)) {
			this.require[name] = [];
			// console.log(param[name]);
			for(var func in param[name]){
				if(param[name].hasOwnProperty(func)){
					switch(func){
						case "require":
							this.require[name].push({
								func: this.validator.isEmpty,
								param: param[name][func],
								ruleName: func
							})
							break;
						case "length":
							this.require[name].push({
								func: this.validator.validateLength,
								param: param[name][func],
								ruleName: func
							})
							break;
						case "configPasswd":
							this.require[name].push({
								func: this.validator.configPasswd,
								param: param[name][func],
								ruleName: func
							})
							break;
						case "email":
							this.require[name].push({
								func: this.validator.isEmail,
								param: param[name][func],
								ruleName: func
							})
							break;
						case "phone":
							this.require[name].push({
								func: this.validator.isPhone,
								param: param[name][func],
								ruleName: func
							})
							break;
						default: 
							break;
					}
				}
			}
		};
	}

}


/**
 * 
 */
Validate.prototype.validate = function(node){
	// 指定某一个查询
	var element;
	var results = [];

	if (node) {
		if (this.require[node]) {
			element = document.getElementById(node);
			if (this.form.contains(element)) {
				results.push(this.check(element, node));
			}else{
				results.push({
					node: node,
					message: "No such node",
					value: -1
				})
			}
		}else{
			// 没有相应规则
			results.push({
				node: node,
				message: "No rules available",
				value: -2
			})
		}
	}else{
		// 整个form查询
		for(node in this.require){
			if (this.require.hasOwnProperty(node)) {
				element = document.getElementById(node);
				// 检查每一个node
				if (this.form.contains(element)) {
					results.push(this.check(element, node));
				}else{
					continue;
				}
			};
		}
	}
	return results;
}


Validate.prototype.check = function(element, node){
	var value = element.value;
	var arrayLength = this.require[node].length;
	var functionality;	
	var cmpElement;
	var result;
	for (var i = 0; i < arrayLength; i++) {
		functionality = this.require[node][i];
		console.log(functionality);
		if (functionality.func === this.validator.configPasswd) {
			cmpElement = document.getElementById(functionality.param.id);
			result = functionality.func.call(this.validator, value, cmpElement.value, functionality.param.length);
		}else{
			// console.log("not configPasswd");
			result = functionality.func.call(this.validator, value, functionality.param);
		}
		if (result) {
			return {
				node: node,
				message: functionality.ruleName,
				value: result,
			}
		};
	};

	if (i === arrayLength) {
		return {
			node: node,
			message: "Success",
			value: 0
		};
	};
}