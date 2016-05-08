define(function(require, exports, module){
	var common = require("common");
	var elem = common.$("formbtn");
	common.addEvent(elem, "click", function(event){
		var event = event || window.event,
			target = event.target || event.srcElement;
		console.log(111);
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	});
})