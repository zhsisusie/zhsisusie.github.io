var Spaceship = function(orbit) {
	var obj = {
		_energy : 100,
		_status : "STOP",
		_orbit: orbit,
		_destory: false,
		_rate: 1,
		_angle: 0,
		//能源系统，提供能源，通过太阳能充电
		energy: {
			add: function(num) {
				obj._energy += num;
				if(obj._energy > 100) {
					obj._energy = 100;
				}
			},
			consume: function(num) {
				obj._energy -= num;
				if(obj._energy <= 0) {
					obj._energy = 0;
					obj._status = "STOP";
				}
			},
			get: function() {
				return obj._energy;
			}
		},
		//动力系统
		drive :{
			start: function() {
				if(obj._energy > 0) {
					obj._status = "START";
				}
				//飞行过程中会按一定的速率消耗能源
			},
			stop: function(){
				obj._status = "STOP";
			}
			//控制飞行角度
			// fly: function() {
			// 	if(obj._status === "START"){
			// 		obj._angle += obj._rate * 360;
			// 	}
			// }
		},
		//自爆系统
		destory: function(){
			_destory = true;
		},
		//信号接收处理系统,用于接收行星上的信号
		onCmdReceive: function(message) {
			if(message.id != obj._orbit) {
				return;
			}
			switch(message.command) {
				case 'start':
					obj.drive.start();
					break;
				case 'stop':
					obj.drive.stop();
					break;
				case 'destory':
					obj.destory();
					break;
			}
		}
	}
	return obj;
}