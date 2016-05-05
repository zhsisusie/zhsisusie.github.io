function log(message){
	var ulTag = document.getElementById("mesWrap"),
		liTag = document.createElement("li");
	liTag.innerText = message;
	ulTag.appendChild(liTag);
}
function Commander(){
	this.notebook = {};//记录飞船信息
	this.num = 0;//记录已创建过多少个飞船
	this.ey = ["劲量型", "光能型", "永久型"];
	this.re = ["前进号", "奔腾号", "超越号"];
}
Commander.prototype = {
	constructor: "Commander",
	commandRun: function(shipId){
		var message = {};
		log("命令:飞船" + shipId + "开始飞行");
		message.id = shipId;
		message.command = "start";
		Mediator.publish(message);
		//Mediator.pub(message);
	},
	commandStop: function(shipId) {
		log("命令:飞船" + shipId + "停止飞行");
		var message = {};
		message.id = shipId;
		message.command = "stop";
		Mediator.publish(message);
	},
	commandDestory: function(shipId) {
		var self = this;
		log("命令:销毁轨道" + shipId + "上的飞船");
		if(!this.notebook[shipId]){
			log("warning: 轨道" + shipId + "上没有飞船");
			return;
		}
		//this.notebook[shipId].count = 0;只用于记录是否发出了销毁命令，并不用于记录命令是否丢包
		this.notebook[shipId].count = 0;
		//this.notebook[id].isDestory为true时说明destory命令没有丢包，销毁成功
		if(this.notebook[shipId].isDestory){
			log("warning: 轨道" + shipId + "上的飞船已经被销毁");
			return;
		}
		var message = {};
		message.id = shipId;
		message.command = "destory";
		Mediator.publish(message);
	},
	createSpaceship: function(id){
		var spaceship,
			carrier = document.createElement("div"),
			ship = document.createElement("div"),
			bar = document.createElement("span"),
			head_1 = document.createElement("div"),
			orbit = $("orbit_" + id),
			space = $("space"),
			star = $("star"),
			style,
			engineType,//动力系统类型
			energyType;//能量系统类型

		/**
		this.notebook[id]不为空说明该轨道之前已创建过飞船，
		this.notebook[id].count满足为1说明没有调用过destory命令
		只要调用过destory命令不管丢不丢包，都可在该轨道上继续创建新的飞船
		*/	
		// if(this.notebook[id]&&!this.notebook[id].isDestory&&this.notebook[id].count){
		// 	log("warning: 轨道" + id + "上已有飞船");
		// 	return;
		// }
		if(this.notebook[id]&&this.notebook[id].count){
			log("warning: 轨道" + id + "上已有飞船");
			return;
		}
		this.num++;
		spaceship = new SpaceShip(id, this.num);
		//飞船选择的动力系统和能量系统
		engineType = parseInt(document.querySelector("input[name='engine']:checked").getAttribute("data-type"));
		energyType = parseInt(document.querySelector("input[name='energy']:checked").getAttribute("data-type"));
		spaceship.energySystem = energyType;
		spaceship.engineSystem = engineType;

		log("命令：在轨道" + id + "上创建飞船");
		this.notebook[id] = spaceship;
		this.notebook[id].isDestory = false;
		carrier.className = "carrier stopfly";
		carrier.id = "ship_" + this.num;
		//carrier.id = "ship_" + id;
		//获得当前轨道的计算样式
		style = getStyle(orbit);
		carrier.style.width = parseInt(style.width)/2 + "px";
		space.appendChild(carrier);
		head_1.className = "ship_head_1";
		head_1.innerText = this.re[spaceship.engineSystem-1] + "-" + this.ey[spaceship.energySystem-1];
		switch(engineType){
			case 1:
				if(hasClass(carrier, "fly_low")){
					removeClass(carrier, "fly_low");
				}
				if(hasClass(carrier, "fly_fast")){
					removeClass(carrier, "fly_fast");
				}
				break;
			case 2:
				if(!hasClass(carrier, "fly_low")){
					addClass(carrier, "fly_low");
				}
				if(hasClass(carrier, "fly_fast")){
					removeClass(carrier, "fly_fast");
				}
				break;
			case 3: 
				if(hasClass(carrier, "fly_low")){
					removeClass(carrier, "fly_low");
				}
				if(!hasClass(carrier, "fly_fast")){
					addClass(carrier, "fly_fast");
				}
				break;
			default: 
				break;
		}
		ship.className = "ship";
		bar.id = "energy_bar_" + this.num;
		bar.innerText = "100%";
		carrier.appendChild(ship);
		carrier.appendChild(head_1);
		ship.appendChild(bar);
		Mediator.addSubscribe(spaceship);
	}

}

