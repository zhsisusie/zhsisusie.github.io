var SpaceManager = {
	spaceshipArr : [false, false, false, false],
	spaceships: [],
	t: [],
	shpList:[],
	energy:[],
	carrier: [],
	createSpaceShip: function(id) {
		var carrier = document.createElement("div"),
			ship = document.createElement("div"),
			bar = document.createElement("span"), 
			id = "orbit_" + id,
			orbit = $(id),
			space = $("space"),
			star = $("star"),
			style;
		carrier.className = "carrier stop";
		carrier.id = "ship_" + id;
		//获得当前轨道的计算样式
		orbitStyle = getStyle(orbit);
		carrier.style.width = parseInt(orbitStyle.width)/2 + "px";
		ship.className = "ship";
		bar.id = "energy_bar_" + id;
		bar.innerText = "100%";
		space.appendChild(carrier);
		carrier.appendChild(ship);
		ship.appendChild(bar);
	},
	Mediator : {
		sendMessage: function(message) {
			SpaceManager.carrier[message.id - 1] = $("ship_orbit_" + message.id);
			if(Math.random() < 0.3) {
				log("Mediator：消息传送过程中丢包");
				if(message.command === "destory") {
					SpaceManager.spaceshipArr[message.id] = false;
				}
				return;
			}
			setTimeout(function() {
				switch(message.command) {
					case "create":
						SpaceManager.Mediator.createSpaceShip(message.id);
						setInterval(function() {
							SpaceManager.spaceships[message.id-1].energy.add(1);
							SpaceManager.energy[message.id-1] = SpaceManager.spaceships[message.id-1].energy.get();
							$("energy_bar_orbit_" + message.id).innerText = SpaceManager.energy[message.id-1] + "%";
							$("energy_bar_orbit_" + message.id).style.height = SpaceManager.energy[message.id-1] / 100 * 80 + "px";
						},1000);
						break;
					case "start":
						if(SpaceManager.spaceships[message.id-1].energy.get() == 0){
							return;
						}
						removeClass(SpaceManager.carrier[message.id - 1], "stop");
						addClass(SpaceManager.carrier[message.id - 1], "fly");
						// SpaceManager.spaceships[message.id-1].drive.start();
						SpaceManager.spaceships[message.id-1].onCmdReceive(message);
						SpaceManager.t[message.id-1] = setInterval(function(){
							SpaceManager.spaceships[message.id-1].energy.consume(10);
							SpaceManager.energy[message.id-1] = SpaceManager.spaceships[message.id-1].energy.get();
							$("energy_bar_orbit_"+message.id).innerText = SpaceManager.energy[message.id-1] + "%";
							$("energy_bar_orbit_" + message.id).style.height = SpaceManager.energy[message.id-1] / 100 * 80 + "px";
							if(SpaceManager.energy[message.id-1] <= 0){
								addClass(SpaceManager.carrier[message.id - 1], "stop");
								clearInterval(SpaceManager.t[message.id-1]);
							}
						}, 1000);
						//console.log(SpaceManager.spaceships[message.id-1]._status);
						break;
					case "stop":
						clearInterval(SpaceManager.t[message.id-1]);
						addClass(SpaceManager.carrier[message.id - 1], "stop");
						// SpaceManager.spaceships[message.id-1].drive.stop();
						SpaceManager.spaceships[message.id-1].onCmdReceive(message);
						break;
					case "destory":
						if(SpaceManager.spaceshipArr[message.id]) {
							SpaceManager.spaceships.splice(message.id-1, 1);
							SpaceManager.spaceships[message.id-1].onCmdReceive(message);
							SpaceManager.carrier[message.id - 1].parentNode.removeChild(SpaceManager.carrier[message.id - 1]);
							console.log(SpaceManager.spaceships[message.id-1]._status);
						}else{
							log("轨道" + message.id + "上没有飞船，不能销毁");
						}
						break;
				}
			}, 1000);
		},
		createSpaceShip: function(id) {
			if(SpaceManager.spaceshipArr[id]) {
				log("轨道" + id + "上的飞船已经存在");
				return;
			}else {
				SpaceManager.spaceships[id-1] = Spaceship(id);
				SpaceManager.createSpaceShip(id);
				SpaceManager.spaceshipArr[id] = true;
			}
		}

	}
}