//虚拟宇宙单例类

var Universe = (function(){
	//局部内容
	//4艘飞船 索引1-4代表轨道号，0不使用
	var ships = [null, null, null, null, null]; 
	/**
	 * 根据message内容创建飞船
	 * @param  {object} message message包含 ship_id obrit_id energy_type, power_type
	 */
	function createShip(message){
		//解码
		message = Universe.Adapter.decode(message, "create");
		//界面上创建飞船
		console.log(message);
		Tool.ship.createShip(message.ship_id, message.orbit_id);
		//创建飞船对象
		var ship = new Ship(message.ship_id, message.orbit_id, message.energy_type, message.power_type);
		ships[message.orbit_id] = ship;
	}
	//向飞船发送信息
	function sendMessage(message){
		for(var i=1; i<=4; i++){
			if(ships[i]!=null && ships[i].isLive()){
				ships[i].receiveMessageAdapter(message);
			}
		}
	}
	//编码解码对应关系
	var CREATE_ENCODE_RELATION = {
		"orbit":{
			1:"00",2:"01",3:"10",4:"11"
		},
		"energy":{
			0:"0000",1:"0001",2:"0010"
		},
		"power":{
			0:"0000",1:"0001",2:"0010"
		}
	};
	var CREATE_DECODE_RELATION = {
		"orbit":{
			"00":1,"01":2,"10":3,"11":4
		},
		"energy":{
			"0000":0,"0001":1,"0010":2
		},
		"power":{
			"0000":0,"0001":1,"0010":2
		}
	};
	var OPRATE_ENCODE_RELATION = {
		"commond":{
			"move":"00", "stop":"01", "destroy":"10"
		}
	};
	var OPRATE_DECODE_RELATION = {
		"commond":{
			"00":"move", "01":"stop", "10":"destroy"
		}
	};
	/**
	 * 创建类指令编码
	 * @param  {object} message 指令内容
	 * @return {string}     指令编码后的二进制串
	 */
	function createEncode(message){
		var result = "";
		//指令由16位组成 前2位轨道号 然后6位飞船号 然后4位动力系统号 然后 4位 能源系统号
		result += CREATE_ENCODE_RELATION["orbit"][message.orbit_id];
		var ship_id = message.ship_id;
		for(var i=5; i>=0; i--){
			result += Math.floor(ship_id/(Math.pow(2,i)));
			ship_id = ship_id % Math.pow(2,i);
		}
		result += CREATE_ENCODE_RELATION["power"][message.power_type];
		result += CREATE_ENCODE_RELATION["energy"][message.energy_type];
		return result;
	}
	/**
	 * 创建类指令解码
	 * @param  {string} message 指令内容
	 * @return {object}     指令解码后的内容
	 */
	function createDecode(message){
		var obj = {};
		var orbit_id = message.substr(0,2);
		var ship_id = message.substr(2,6);
		var power_type = message.substr(8,4);
		var energy_type = message.substr(12,4);

		var ship_ids = ship_id.split("");
		var id = 0;
		for(var i=0;i<6;i++){
			id += parseInt(ship_ids[i])*(Math.pow(2,5-i));
		}
		obj.ship_id = id;
		obj.orbit_id = CREATE_DECODE_RELATION["orbit"][orbit_id];
		obj.power_type = CREATE_DECODE_RELATION["power"][power_type];
		obj.energy_type = CREATE_DECODE_RELATION["energy"][energy_type];
		return obj;
	}
	/**
	 * 操作类指令编码
	 * @param  {object} message 指令内容
	 * @return {string}     指令编码后的二进制串
	 */
	function oprateEncode(message){
		var result = "";
		//指令8位组成 前6位飞船id 后两位 指令
		var ship_id = message.ship_id;
		for(var i=5; i>=0; i--){
			result += Math.floor(ship_id/(Math.pow(2,i)));
			ship_id = ship_id % Math.pow(2,i);
		}

		result += OPRATE_ENCODE_RELATION["commond"][message.commond];
		return result;
	}
	/**
	 * 操作类指令解码
	 * @param  {string} message 指令内容
	 * @return {object}     指令解码后的内容
	 */
	function oprateDecode(message){
		var obj = {};
		var ship_id = message.substr(0,6);
		var commond = message.substr(6,2);

		var ship_ids = ship_id.split("");
		var id = 0;
		for(var i=0;i<6;i++){
			id += parseInt(ship_ids[i])*(Math.pow(2,5-i));
		}
		obj.ship_id = id;
		obj.commond = OPRATE_DECODE_RELATION["commond"][commond];
		return obj;
	} 
	//使用mediator介质传播信息
	var Mediator = {
			receive: {
				/**
				 * 获取创建一艘新飞船信息
				 * @param  {json} message [description]
				 * @return {[type]}         [description]
				 */
				createMessage: function(message){
					//1s后接收到消息
					setTimeout(function(){
						//丢包模拟
						if(Math.random() <= 0.3){
							Tool.logAdapter("danger","create",message,0);
							return;
						}
						//没有丢包
						Tool.logAdapter("success","create",message,1);
						createShip(message);
					},1000);
				},
				/**
				 * 通过介质接收指令 移动 停止 删除等
				 * @param  {json} message 发送的指令
				 */
				oprateMessage: function(message){
					//1s后接收到消息
					setTimeout(function(){
						//丢包模拟
						if(Math.random() <= 0.3){
							Tool.logAdapter("danger","oprate",message,0);
							return;
						}
						Tool.logAdapter("success","oprate",message,1);
						sendMessage(message);
					},1000);
				}

			}
	}
	//使用BUS介质传播信息
	var BUS = {
			receive:{
				createMessage: function(message) {
					//300ms后接收信息
					setTimeout(function(){
						//模拟丢包
						if(Math.random() <= 0.1){
							Tool.logAdapter("danger","create",message,0);
							setTimeout(function(){
								BUS.receive.createMessage(message);
							},300);
							return;
						}
						//没有丢包
						Tool.logAdapter("success","create",message,1);
						createShip(message);
					},300);
				},
				oprateMessage: function(message) {
					//300ms后接收信息
					setTimeout(function(){
						//模拟丢包
						if(Math.random() <= 0.1){
							Tool.logAdapter("danger","oprate",message,0);
							setTimeout(function(){
								BUS.receive.oprateMessage(message);
							},300);
							return;
						}
						//没有丢包
						Tool.logAdapter("success","oprate",message,1);
						sendMessage(message);
					},300);
				}
			}
	}
	//对外接口
	return {
		/**
		 * 介质使用此进行传输
		 * 提供一个总对外的方法，内部实现方法的更改不会造成外部代码的更改
		 */
		Media:{
			receive:{
				createMessage: function(message){
					BUS.receive.createMessage(message);
				},
				oprateMessage: function(message){
					BUS.receive.oprateMessage(message);
				}
			}
		},
		/**
		 * 编码与解码器
		 * @type {Object}
		 */
		Adapter:{
			/**
			 * 编码器
			 * @param  {object} message 需编码的信息
			 * @param  {string} type    根据类型决定编码方法
			 * return {string} 将message编码后返回
			 */
			encode: function(message, type){
				var result = "";
				switch (type) {
					case "create":
						result = createEncode(message);
						break;
					case "oprate":
						result = oprateEncode(message);
						break;
				}
				return result;
			},
			/**
			 * 解码器
			 * @param  {string} message 编码过后的信息
			 * @param  {string} type    根据类型决定解码方法
			 * return {object}  将message解码后返回
			 */
			decode: function(message, type){
				var obj = null;
				switch (type) {
					case "create":
						obj = createDecode(message);
						break;
					case "oprate":
						obj = oprateDecode(message);
						break;
				}
				return obj;
			}
		}
	};
})();