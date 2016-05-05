function SpaceShip(orbit, identity){
	this.state = "STOP";
	this.energy = 100;
	this.orbit = orbit;//飞船所在的轨道
	this.identity = identity;//每个飞船唯一的标识
	this.isDestory = false;
	this.count = 1;//用于判断当前飞船是否收到了销毁命令，若为0说明收到了，可以在该轨道上创建另一个飞船
	this.timeId = null;//飞船飞行中耗电的timeId
	this.timeAddId = null;//飞船充电的timeId
	this.engineSystem = 1;
	this.energySystem = 1;
	this.init();
}
SpaceShip.prototype = {
	constructor: "SpaceShip",
	init: function(){
		var self = this;
		self.timeAddId = setInterval(function(){
			switch(self.energySystem){
				case 1:
					self.add(2);
					break;
				case 2:
					self.add(3);
					break;
				case 3:
					self.add(4);
					break;
				default:
					break;
			}
			$("energy_bar_"+ self.identity).innerText = self.energy + "%";
			$("energy_bar_" + self.identity).style.height = self.energy / 100 * 80 + "px";
		}, 1000);
	},
	start: function(){
		var self = this;
		console.log(self.state);
		if(self.state === "START"){
			log("warning: 轨道" + self.orbit + "上的飞船正在飞行中");
			return;
		}
		self.state = "START";
		if(self.energy == 0){
			log("warning: 轨道" + self.orbit + "上的飞船能量不足，无法飞行");
			return;
		}
		var ship = $("ship_" + self.identity);
		removeClass(ship, "stop");
		self.timeId = setInterval(function(){
			self.consume(self.engineSystem * 5);
			if(self.energy == 0){
				log("warning: 轨道" + self.orbit + "上的飞船能量不足，无法飞行");
				//clearInterval(self.timeId);
				self.stop();
			}else {
				$("energy_bar_" + self.identity).innerText = self.energy + "%";
				$("energy_bar_" + self.identity).style.height = self.energy / 100 * 80 + "px";
			}
		}, 1000);
	},
	stop: function(){
		var self = this;
		if(self.state == "STOP"){
			log("轨道" + self.orbit + "上的飞船已经停止");
			return;
		}
		console.log("stop");
		self.state = "STOP";
		console.log("轨道" + self.orbit + "上的飞船停止飞行");
		var ship = $("ship_" + self.identity);
		addClass(ship, "stop");
		if(self.timeId){
			clearInterval(self.timeId);
		}
	},
	destory: function(){
		var self = this,
			ship = $("ship_" + self.identity);
		self.state = "STOP";
		self.isDestory = true;
		console.log("轨道" + self.orbit + "上的飞船被销毁");
		clearInterval(self.timeAddId);
		clearInterval(self.timeId);
		$("space").removeChild(ship);
		/**这里之前存在一个先后的问题，当destory第一个后，self此时已经变成了第二个飞船
		   所以，下面的代码其实是将第二个飞船从监听者列表中移除了,因此导致，第二个飞船并没有执行destory
		   所以我在Mediator的push中循环执行subscribers中的订阅的的方法时，设置了一个定时器，让两者之间
		   存在一定的时间间隔，我在想可不可以用异步来解决
		*/
		Mediator.removeSubscriber(self);
	},
	add: function(num){
		var self = this;
		self.energy += num;
		if(self.energy > 100){
			self.energy = 100;
		}
	},
	consume: function(num){
		var self = this;
		self.energy -= num;
		if(self.energy < 0) {
			self.energy = 0;
		}
	},
	onCommandRev: function(mes){
		var self = this;
		if(mes.id == self.orbit){
			self[mes.command]();
		}
	}
}