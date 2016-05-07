window.onload = function() {
	//var commander = new Commander();
	addEvent($("ulbtn"), "click", function(event) {
		var event = event || window.event,
			target = event.target || event.srcElement,
			parent,
			id,
			command;
		if(target.tagName === "DIV"){
			parent = target.parentNode;
			id = parent.getAttribute("data-orbit");
			command = target.getAttribute("data-name");
			console.log("轨道: "+id + "命令: " + command);
			if(command === "create"){
				Commander.createSpaceship(id);
			}else{
				Commander[command](id);
			}
		}
	})
	setInterval(function(){
		Mediator.subscribers.forEach(function(item){
			item.sendStatus();
		})
	},1000);
}