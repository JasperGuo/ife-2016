var SHIP_SPEED = [80, 100, 140];
var SHIP_ENERGY_COST = [5, 7, 10];
var SHIP_ENERGY_RECOVERY = [2, 3, 4];
var ENERGY_NAME = ["劲量型", "光能型", "永久型"];
var POWER_NAME = ["前进号", "奔腾号", "超越号"];
var ORBIT_DIAMETER = [0, 250, 400, 550, 700];//轨道直径



var Tool = {
	/**
	 * 将信息打印到信息面板
	 * @param {string} type 根据type来确定生成信息的颜色
	 * 有 success danger warning info 共4种
	 * @param {string} text 输出的文本
	 */
	Log: function(type, text){
		var $console_list = $(".console-list");
		var $item = $("<li class='console-item "+type.trim()+"-message'>" + text.trim() + "</li>");
		$console_list.append($item);
		//获取高度将滚动条置于最后
		var board_height = $console_list.parent().height();
		var list_height = $console_list.height();

		$console_list.parent().scrollTop(list_height - board_height + 20);
	},
	/**
	 * Log 的一个适配器
	 * @param  {string} color_type   信息颜色
	 * @param  {string} message_type 信息类型
	 * @param  {object} message      信息内容
	 * @param  {int} status       信息状态
	 */
	logAdapter: function(color_type, message_type, message, status){
		if(arguments.length == 3) status = -1;
		//解码
		message = Universe.Adapter.decode(message, message_type);
		var text = Tool.getTime() + ": ";
		switch (message_type) {
			case "create": 
				text += "向"
					+ message.orbit_id + "号轨道发送创建" 
					+ message.ship_id + "号飞船的指令";
				if (status!=-1)
					text += status==1?"成功":"丢包了  重新发送·····";
				break;
			case "oprate": 
				text += "向" 
					+ message.ship_id + "号飞船发送 "
					+ message.commond + " 指令"; 
				if (status!=-1)
					text += status==1?"成功":"丢包了  重新发送·····";
				break;
			case "broadcast":
				text += message.ship_id + "号飞船广播:";
				text += "status: " + message.ship_status;
				text += " fuel: " + message.ship_fuel + "%";
				if (status != -1)
					text += status==1?" 接收成功":" 丢包了 重新发送·····";
				break;
			default:  
				text += "指令类型错误: " 
						+ JSON.stringify(message);
				color_type = "danger";	
		}
		Tool.Log(color_type, text);
	},
	/**
	 * 获取当前的时间 
	 * @return {string} 格式2016-04-01 10:07:53.368
	 */
	getTime: function(){
		var date = new Date();
		var year = ("0000" + date.getFullYear()).substr(-4);
    	var month = ("00" + (date.getMonth() + 1)).substr(-2);
    	var day = ("00" + date.getDay()).substr(-2);
    	var hour = ("00" + date.getHours()).substr(-2);
    	var minute = ("00" + date.getMinutes()).substr(-2);
    	var second = ("00" + date.getSeconds()).substr(-2);
    	var millisecond = ("000" + date.getMilliseconds()).substr(-3);
    	return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + millisecond;
	},
	//飞船相关dom操作
	ship:{
		//飞船id的前缀
		shipIdFormat:"ship",
		/**
		 * 将飞船在dom上显示出来
		 * @param  {number} ship_id 飞船编号
		 * @param  {number} orbit   飞船轨道号
		 */
		createShip: function(ship_id, orbit){
			var $universe = $("#universe");
			var $ship_box = $("<div class='space-ship space-ship-"+orbit+"' id='"+Tool.ship.shipIdFormat+ship_id+"'></div>");
			var $ship_energy = $("<div class='ship-energy ship-energy-success'></div>");
			var $ship_info = $("<div class='ship-info'>"+ship_id+"号<br><span>100</span>%</div>");
			$universe.append($ship_box);
			$ship_box.append($ship_energy);
			$ship_box.append($ship_info);
		},
		/**
		 * 飞船中能源变化显示
		 * @param  {number} ship_id 飞船编号
		 * @param  {number} energy   飞船能源
		 */
		changeEnergy: function(ship_id, energy){
			var ship_id_str = "#"+Tool.ship.shipIdFormat+ship_id;
			var $ship_box = $(ship_id_str);
			var $ship_energy = $ship_box.find('.ship-energy');
			var height = $ship_box.css("height");
			//总高度
			try{
				height = height.substr(0, height.length-2);	
			}catch(err){
				height = 0;
			}
			

			//应有高度
			height = height*energy/100 + "px";
			$ship_energy.css("height", height);
			$ship_box.find("div.ship-info span").html(energy);
		},
		changeEnergyColor: function(ship_id, old_color, color){
			var ship_id_str = "#"+Tool.ship.shipIdFormat+ship_id;
			var $ship_box = $(ship_id_str);
			var $ship_energy = $ship_box.find('.ship-energy');
			var energyColor = "ship-energy-";
			$ship_energy.removeClass(energyColor+old_color);
			$ship_energy.addClass(energyColor+color);
		},
		/**
		 * 飞船移动控制
		 * @param  {number} ship_id 飞船编号
		 * @param  {number} deg  飞船角度
		 */
		changePos: function(ship_id, deg){
			var ship_id_str = "#"+Tool.ship.shipIdFormat+ship_id;
			var $ship_box = $(ship_id_str);
			var $ship_energy = $ship_box.find('.ship-energy');
			var $ship_info = $ship_box.find('.ship-info');
			$ship_box.css("transform","rotate("+deg+"deg)");
			var abDeg = 360 - deg;
			//$ship_energy.css("transform","rotate("+abDeg+"deg)");
			$ship_info.css("transform","rotate("+abDeg+"deg)");
		},
		/**
		 * 飞船从dom中删去
		 * @param  {number} ship_id 飞船编号
		 */
		destroyShip: function(ship_id){
			var ship_id_str = "#"+Tool.ship.shipIdFormat+ship_id;
			var $ship_box = $(ship_id_str);
			$ship_box.remove();
		}
	},
	//飞船控制台相关dom操作
	control:{
		controlIdFormat: "control-ship",
		/**
		 * 创建一个条新的指令控制面板
		 * @param  {string} title   标题显示的文字
		 * @param  {number} ship_id 飞船标号
		 */
		createControl: function(title, ship_id){
			var $control = $(".ship-list");
			var $item = $("<li class='ship-item' id='" + Tool.control.controlIdFormat + ship_id + "'></li>");
			var $title = $("<h2 class='item-title'>" + title + "</h2>");
			var $oprate_box = $("<div class='item-oprate'></div>");
			var $oprate_status = $("<div class='ship-status' title='" + ship_id + "'>"
									+ "<input name='' type='checkbox'/>"
			  		  				+ "<label></label>"
									+"</div>");
			var $oprate_destroy = $("<div class='ship-destroy' title='" + ship_id + "'>销毁</div>");
			
			$control.append($item);
			$item.append($title);
			$item.append($oprate_box);
			$oprate_box.append($oprate_status);
			$oprate_box.append($oprate_destroy);
		},
		/**
		 * 删除一条指令控制面板
		 * @param  {number} ship_id 飞船编号
		 */
		destroyControl: function(ship_id){
			var control_id_str = "#" + Tool.control.controlIdFormat + ship_id;
			var $item = $(control_id_str);
			$item.remove();
		},
		changeControl: function(ship_id){
			var control_id_str = "#" + Tool.control.controlIdFormat + ship_id;
			var $item = $(control_id_str);
			$item.find("div.ship-status input").attr("checked", false);
		}
	},
	/**
	 * 监控面板相关dom操作
	 */
	monitor:{
		monitorIdFormat: "monitor-ship",
		shipStatus:["停止", "飞行中"],
		/**
		 * 发射飞船时创建一条监控信息
		 * @param  {number} ship_id   
		 * @param  {number} power_type 
		 * @param  {number} energy_type 
		 */
		createMonitor: function (ship_id, power_type, energy_type) {
			var $monitor_container = $(".monitor-table tbody");
			var $item = $("<tr id='"+Tool.monitor.monitorIdFormat+ship_id+"'></tr>");
			var $item_ship = $("<td class='color-info'>"+ship_id+"号</td>");
			var $item_power = $("<td class='color-info'>"+POWER_NAME[power_type]+"</td>");
			var $item_energy = $("<td class='color-info'>"+ENERGY_NAME[energy_type]+"</td>");
			var $item_status = $("<td class='color-warning monitor-item-status'>"+Tool.monitor.shipStatus[0]+"</td>");
			var $item_fuel = $("<td class='color-success monitor-item-fuel'>100</td>");
			//开始加入dom中
			$monitor_container.append($item);
			$item.append($item_ship);
			$item.append($item_power);
			$item.append($item_energy);
			$item.append($item_status);
			$item.append($item_fuel);

		},
		/**
		 * 更改飞船监控信息——飞行状态和能量
		 * @param  {number} ship_id    
		 * @param  {numebr} ship_status 飞船当前状态
		 * @param  {number} ship_energy 飞船当前剩余能量
		 */
		changeMonitor: function(ship_id, ship_status, ship_fuel) {
			var id_str = "#"+Tool.monitor.monitorIdFormat+ship_id;
			var $monitor_item = $(id_str);
			if(ship_status)
				$monitor_item.find(".monitor-item-status").html(Tool.monitor.shipStatus[ship_status]).removeClass("color-warning").addClass('color-success');
			else
				$monitor_item.find(".monitor-item-status").html(Tool.monitor.shipStatus[ship_status]).removeClass("color-success").addClass('color-warning');
			$monitor_item.find('.monitor-item-fuel').html(ship_fuel);
		},
		changeMonitorColor: function(ship_id, old_color, color){
			var id_str = "#"+Tool.monitor.monitorIdFormat+ship_id;
			var $monitor_item = $(id_str);
			$monitor_item.find(".monitor-item-fuel").removeClass("color-"+old_color).addClass("color-"+color);
		},
		/**
		 * 销毁监控信息
		 * @param  {number} ship_id 
		 */
		destroyMonitor: function(ship_id) {
			var id_str = "#"+Tool.monitor.monitorIdFormat+ship_id;
			var $monitor_item = $(id_str);
			$monitor_item.remove();
		}
	},
	/**
	 * 获取飞船的性能
	 * @param  {string} type  获取性能的类型
	 * speed 速度 cost 能源花费速度 recovery 能源恢复速度 
	 * @param  {number} index 动力系统以及能源系统的索引
	 * @return {number} 获取的性能 
	 */
	getShipPerformance: function(type, index){
		var result = 0;
		switch (type) {
			case "speed":
				result = SHIP_SPEED[index];
				break;
			case "cost":
				result = SHIP_ENERGY_COST[index];
				break;
			case "recovery":
				result = SHIP_ENERGY_RECOVERY[index];
				break;
		}
		return result;
	},
	/**
	 * 获取轨道相关信息操作
	 */
	getOrbitPerformance: function(type, index) {
		var result = 0;
		switch (type) {
			case "diameter":
				result = ORBIT_DIAMETER[index];
				break;
		}
		return result;
	}
}

