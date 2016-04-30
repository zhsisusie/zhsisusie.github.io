//打印信息到日志台
window.onload = function() {
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
			Commander[command](id);
		}
	})
}
