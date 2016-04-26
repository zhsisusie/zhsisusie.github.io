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
				var p = document.createElement("p");
				p.innerText = key;
				elem.appendChild(p);
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
		input = document.getElementById("method");
	function animation(arr, callback) {
		bgInit(root);
		clearInterval(t);
		var i = 0, flag = false;
		t = setInterval(function() {
			if(callback) {
				flag = callback(arr[i]);
			}
			if(i > 0) {
				var p1 = arr[i-1].getElementsByTagName('p')[0];
				arr[i-1].style.background = "#fff";
				p1.style.background = "#fff";
				p1.style.color = "darkgreen";
			}
			if(i === arr.length) {
				clearInterval(t);
			}else {
				var p2 = arr[i].getElementsByTagName('p')[0];
				if(flag) {
					arr[i].style.background = "blue";
					p2.style.background = "blue";
					p2.style.color = "#fff";
				}else {
					arr[i].style.background = "red";
					p2.style.background = "red";
					p2.style.color = "#fff";
				}
				i++;
			}
			

		}, 500);
	}
	
	function traverseDF(root, arrDfs) {
		arrDfs.push(root);
		var children = root.childNodes,
			i,len;
		for(i=0, len = children.length; i < len; i++) {
			if(children[i].tagName !== 'P'){
				traverseDF(children[i], arrDfs);
			}
			
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
			children = elem.childNodes;
			for(i=0,len = children.length;i < len; i++) {
				if(children[i].tagName !== 'P') {
					queue.push(children[i]);
				}
				
			}
		}
	}
	function preOrder(root, arr) {
		arr.push(root);
		var children = root.childNodes,
			i,
			len;
		for(i = 0, len = children.length; i < len; i++) {
			if(children[i].tagName !== 'P') {
				preOrder(children[i], arr);
			}
		}
	}
	function postOrder(root, arr) {
		var children = root.childNodes,
			i,
			len;
		if(!children) {
			return;
		}
		for(i=0, len = children.length; i < len; i++) {
			if(children[i].tagName !== 'P') {
				postOrder(children[i], arr);
				arr.push(children[i]);
			}
			
		}
	}
	traverseDF(root, arrDfs);
	traverseBF(root, arrBfs);
	preOrder(root, preArr);
	postOrder(root, postArr);
	postArr.push(root);
	addEvent(preBtn, "click", function() {
		animation(preArr);
	});
	addEvent(postBtn, "click", function() {
		animation(postArr);
	});
	addEvent(dfsBtn, "click", function() {
		animation(arrDfs);
	});
	addEvent(bfsBtn, "click", function() {
		animation(arrBfs);
	});
	addEvent($("preSearch"), "click", function() {
		animation(arrBfs, function(curElem) {
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
})();