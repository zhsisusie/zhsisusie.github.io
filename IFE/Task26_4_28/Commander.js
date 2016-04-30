function log(message){
	var ulTag = document.getElementById("mesWrap"),
		liTag = document.createElement("li");
	liTag.innerText = message;
	ulTag.appendChild(liTag);
}
var Commander = {
	create: function(id){
		SpaceManager.Mediator.sendMessage({
			id: id,
			command: "create"
		})
	},
	start: function(id) {
		SpaceManager.Mediator.sendMessage({
			id: id,
			command: "start"
		})
	},
	stop: function(id) {
		SpaceManager.Mediator.sendMessage({
			id: id,
			command: "stop"
		})
	},
	destory: function(id) {
		SpaceManager.Mediator.sendMessage({
			id: id,
			command: "destory"
		})
	}
}
