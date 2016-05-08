define(function(require, exports, module){
	module.exports = {
		addEvent : function (element, type,handler) {
			if(element.addEventListener) {
				element.addEventListener(type, handler, false);
			}else if(element.attachEvent) {
				element.attachEvent("on"+type, handler);
			}else {
				element["on"+type] = handler;
			}
		},
		addClass: function(element, newClass) {
			var className = element.className;
			if(!className) {
				element.className = newClass;
			}else {
				if(className.indexOf(newClass) === -1) {
					className = className + " ";
					className += newClass;
					element.className = className;
				}
			}
		},
		removeClass: function(element, newClass){
			var className = element.className;
			if(className.indexOf(newClass) > -1) {
				var reg = new RegExp("\s*" + newClass  + "\s*", "gi");
				className = className.replace(reg, " ");
				element.className = className;
			}
		},
		hasClass: function(element, cls){
			var className = element.className;
			if(className.indexOf(cls) > -1){
				return true;
			}
			return false;
		},
		$: function(id){
			return document.getElementById(id);
		},
		getStyle: function(element) {
			if(window.getComputedStyle) {
				return window.getComputedStyle(element);
			}else if(element.currentStyle) {
				return element.currentStyle;
			}
		}
	}
})