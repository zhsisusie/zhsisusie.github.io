


	function ajax(url, success, fail){
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		}else{
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhr.open("GET", url, false);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
					success(xhr.responseText);
				}else {
					fail(xhr.status);
				}
			}
		}
	}
	function addEvent(element, type,handler) {
		if(element.addEventListener) {
			element.addEventListener(type, handler, false);
		}else if(element.attachEvent) {
			element.attachEvent("on"+type, handler);
		}else {
			element["on"+type] = handler;
		}
	}
	function addClass(element, newClass) {
		var className = element.className;

		if(!className) {
			element.className = newClass;
		}else {
			if(className.indexOf(newClass) === -1) {
				className = " " + className + " ";
				className += newClass;
				element.className = className;
			}
		}
		
	}
	function removeClass(element, newClass) {
		var className = element.className;
		if(className.indexOf(newClass) > -1) {
			var reg = new RegExp("\s*" + newClass  + "\s*", "gi");
			className = className.replace(reg, " ");
			element.className = className;
		}
	}
	function $(id){
		return document.getElementById(id);
	}
	function getStyle(element) {
		if(window.getComputedStyle) {
			return window.getComputedStyle(element);
		}else if(element.currentStyle) {
			return element.currentStyle;
		}
	}