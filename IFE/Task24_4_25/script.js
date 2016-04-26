(function() {
	var data = {
		'root':{
			'a':{
				'a1': 'a1',
				'a2': 'a2'
			},
			'b':{
				'b1':{
					'b1_1': 'b1_1',
					'b1_2': 'b1_2',
					'b1_3': {
						'b1_3_1': 'b1_3_1'
					}
				},
				'b2': {
					'b2_1': 'b2_1',
					'b2_2': 'b2_2'
				}
			}
		}
	};
	
	var $ = function(id) {
		return document.getElementById(id);
	}
	function addEvent(element, event, handler) {
		if(element.addEventListener) {
			element.addEventListener(event, handler, false);
		}else if(element.attachEvent){
			element.attachEvent("on"+event, handler);
		}else {
			element["on"+event] = handler;
		}
	}
	function detachEvent(element,event,handler) {
		if(element.removeEventListener){
			element.removeEventListener(event, handler);
		}else if(element.detachEvent) {
			element.detachEvent("on"+event, handler);
		}else {
			element["on"+event] = null;
		}
	}
	function initTree() {
		var root = $('container');
		renderTree(data, root);
	}
	function bgInit(root) {
		root.style.background = "#fff";
		var children = root.getElementsByTagName("*"),
			i,
			len;
		for(i=0,len = children.length; i < len; i++) {
			children[i].style.background = "#fff";
		}

	}
	function renderTree(data, parentElement) {
		if(typeof data !== 'object') {
			return;
		}
		var key;
		for(key in data) {
			if(data.hasOwnProperty(key)) {
				var elem = document.createElement('div');
				elem.id = key;
				parentElement.appendChild(elem);
				elem.innerText = key;
				if(data[key]) {
					renderTree(data[key], elem);
				}
			}
		}
	}
	initTree();
	var arrDfs = [],
		arrBfs = [],
		preArr = [],
		postArr = [],
		root = $("root"),
		container = $("container"),
		t = null,
		//先序遍历按钮
		preBtn = document.getElementById("preBtn"),
		//后序遍历按钮
		postBtn = document.getElementById("postBtn"),
		//深度遍历按钮
		dfsBtn = document.getElementById("dfsBtn"),
		//广度遍历
		bfsBtn = document.getElementById("bfsBtn"),
		input = document.getElementById("method"),
		searchFlag = false;//区分当前是在遍历还是在搜索
	function animation(arr, callback) {
		bgInit(root);
		clearInterval(t);
		var i = 0, flag = false;
		t = setInterval(function() {
			if(i > 0) {
				arr[i-1].style.background = "#fff";
			}
			if(callback) {
				if(arr[i]) {
					flag = callback(arr[i]);
				}
			}
			if(i === arr.length) {
				clearInterval(t);
				if(searchFlag) {
					alert("未找到元素");
				}
			}else {
				if(flag) {
					arr[i].style.background = "blue";
				}else {
					arr[i].style.background = "red";
				}
				i++;
			}
			
			

		}, 500);
	}
	
	function traverseDF(root, arrDfs) {
		arrDfs.push(root);
		var children = root.children,
			i,len;
		for(i=0, len = children.length; i < len; i++) {
			traverseDF(children[i], arrDfs);
		}
	}
	function traverseBF(root, arrBfs) {
		var queue = [],
			elem, 
			children,
			i,
			len;
		arrBfs.push(root);
		queue.push(root);
		while(queue.length > 0) {
			elem = queue.shift();
			arrBfs.push(elem);
			children = elem.children;
			for(i=0,len = children.length;i < len; i++) {
				queue.push(children[i]);
			}
		}
	}
	function preOrder(root, arr) {
		arr.push(root);
		var children = root.children,
			i,
			len;
		for(i = 0, len = children.length; i < len; i++) {
			preOrder(children[i], arr);
		}
	}
	function postOrder(root, arr) {
		var children = root.children,
			i,
			len;
		if(!children) {
			return;
		}
		for(i=0, len = children.length; i < len; i++) {
			postOrder(children[i], arr);
			arr.push(children[i]);
		}
	}
	// traverseDF(root, arrDfs);
	// traverseBF(root, arrBfs);
	// preOrder(root, preArr);
	// postOrder(root, postArr);
	// postArr.push(root);
	addEvent(preBtn, "click", function() {
		preArr = [];
		searchFlag = false;;
		preOrder(root, preArr);
		animation(preArr);
	});
	addEvent(postBtn, "click", function() {
		postArr = [];
		searchFlag = false;
		postOrder(root, postArr);
		postArr.push(root);
		animation(postArr);
	});
	addEvent(dfsBtn, "click", function() {
		searchFlag = false;
		traverseDF(root, arrDfs);
		animation(arrDfs);
	});
	addEvent(bfsBtn, "click", function() {
		searchFlag = false;
		traverseBF(root, arrBfs);
		animation(arrBfs);
	});
	addEvent($("preSearch"), "click", function() {
		searchFlag = true;
		preArr = [];
		preOrder(root, preArr);
		animation(preArr, function(curElem) {
			var id = input.value;
			if(curElem.id === id) {
				clearInterval(t);
				return true;
			}else {
				return false;
			}
		});
	});
	addEvent($("postSearch"), "click", function() {
		postArr = [];
		postOrder(root, postArr);
		searchFlag = true;
		animation(postArr, function(curElem) {
			var id = input.value;
			if(curElem.id === id) {
				clearInterval(t);
				return true;
			}else {
				return false;
			}
		});
	});
	var elemSelected = null;
	var handler = function(event) {
		var evt = event || window.event,
			target = evt.target || evt.srcElement,
			allNodes = root.getElementsByTagName("div"),
			i,
			len;
		for(i=0,len = allNodes.length ; i < len; i++) {
			allNodes[i].style.background = "#fff";
		}
		target.style.background = "red";
		elemSelected = target;
	}
	addEvent(root, "click", handler);
	addEvent($("delBtn"), "click", function() {
		if(!elemSelected) {
			return;
		}else {
			detachEvent(elemSelected,"click",handler);
			elemSelected.outerHTML = null;
		}
	});
	addEvent($("addBtn"), "click", function() {
		if(!elemSelected) {
			return;
		}else {
			elemSelected.style.background = "#fff";
			var value = input.value;
			var div = document.createElement("div");
			div.innerText = value;
			div.style.cssText = "flex: 1; border: 1px solid darkgreen;height: 100%;"
			elemSelected.appendChild(div);
		}
	})

})();