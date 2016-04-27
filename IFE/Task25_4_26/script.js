window.onload = function() {
	var container = $("container"),
		lastSelected = null,//记录上一次选中的p标签
		dfsInput = document.getElementById("dinp"),
		bfsInput = document.getElementById("binp"),
		flag = false,//深度搜素的退出判断
		t = null;
	function $(id) {
		return document.getElementById(id);
	}
	
	function createFileTree(data, container) {
		var i, len;
		for(i=0,len=data.length; i < len; i++) {
			var ulTag = document.createElement("ul"),
				liTag = document.createElement("li"),
				pTag = document.createElement("p"),
				spanWrap,
				span;
			pTag.innerText = data[i].text;
			pTag.id = data[i].id;
			liTag.appendChild(pTag);
			liTag.className = data[i].state;
			ulTag.appendChild(liTag);
			container.appendChild(ulTag);
			spanWrap = document.createElement("span");
			spanWrap.id = "swp";
			pTag.appendChild(spanWrap);
			span = document.createElement("span");
			span.innerText = ">";
			span.className = "open";
			spanWrap.appendChild(span);
			span = document.createElement("span");
			span.innerText = "x";
			span.className = "delete";
			spanWrap.appendChild(span);
			span = document.createElement("span");
			span.innerText = "+";
			span.className = "add";
			spanWrap.appendChild(span);
			if(data[i].children) {
				createFileTree(data[i].children, ulTag);
			}
		}
	}
	
	function preOrderSearch(data, arr, value) {
		var i,len;
		
		for(i=0, len = data.length; i < len; i++) {
			id = data[i].id;
			curElement = document.getElementById(id);
			arr.push(curElement);
			if(data[i].text == value) {
				flag = true;
				return;
			}
			if(data[i].children) {
				preOrderSearch(data[i].children, arr, value);
				if(flag) {
					return;
				}
			}
		}
	}
	function bfs(data, arr, value) {
		var i, len,
			queue = [],
			cur,
			id,
			elem;
		queue.push(data[0]);
		while(queue.length > 0) {
			cur = queue.shift();
			elem = document.getElementById(cur.id);
			arr.push(elem);
			if(cur.text == value) {
				flag = true;
				return;
			}
			if(cur.children) {
				for(i=0, len = cur.children.length; i < len; i++) {
					queue.push(cur.children[i]);
				}
			}
		}

	}
	function animation(arr) {
		var i = 0,
			spanTag;
		if(lastSelected) {
			spanTag = lastSelected.lastChild;
			spanTag.style.visibility = "hidden";
			removeClass(lastSelected, "clicked");
		}
		if(t) {
			clearInterval(t);
		}
		t = setInterval(function() {
			if(i > 0) {
				spanTag = arr[i-1].lastChild;
				removeClass(arr[i-1], "clicked");
				spanTag.style.visibility = "hidden";
			}
			if(i === arr.length) {
				lastSelected = arr[i-1];
				clearInterval(t);
				if(flag) {
					spanTag = arr[i-1].lastChild;
					addClass(arr[i-1], "clicked");
					spanTag.style.visibility = "visible";
				}else {
					alert("没有找到");
				}
				
			}else {
				if(arr[i].parentNode.className.indexOf("fold") > -1) {
					removeClass(arr[i].parentNode, "fold");
					addClass(arr[i].parentNode, "unfold");
					arr[i].parentNode.parentNode.style.display="block";
				}
				arr[i].parentNode
				spanTag = arr[i].lastChild;
				addClass(arr[i], "clicked");
				spanTag.style.visibility = "visible";
				i++;
			}
		}, 600);
	}
	createFileTree(data, container);
	addEvent(container, "click", function(evt) {
		var evt = evt || window.event,
			target = evt.target || evt.srcElement,
			spanTag,
			i,
			len,
			parent,
			children,
			dialog = document.getElementById("dialog");
		if(target.tagName === "P"){
			if(!lastSelected) {
				addClass(target, "clicked");
			}else {
				if(lastSelected !== target) {
					removeClass(lastSelected, "clicked");
					spanTag = lastSelected.lastChild;
					spanTag.style.visibility = "hidden";
					addClass(target, "clicked");
				}
			}
			spanTag = target.lastChild;
			spanTag.style.visibility = "visible";
			lastSelected = target;

		}
		if(target.tagName === "SPAN"){
			parent = target.parentNode.parentNode.parentNode;//指向父节点li标签
			
			if(target.className.indexOf("add") > -1) {
				dialog.style.display = "block";
			}
			if(target.className.indexOf("delete") > -1) {
				parent.parentNode.parentNode.removeChild(parent.parentNode);
			}
			if(target.className.indexOf("open") > -1) {
				var ulParent = parent.parentNode,
					ulChildren = ulParent.getElementsByTagName("ul");
				if(parent.className.indexOf("unfold") > -1){
					if(ulChildren.length > 0) {
						for(i=0, len = ulChildren.length; i < len; i++) {
							ulChildren[i].style.display = "none";
						}
						target.innerText = "<";
						removeClass(parent, "unfold");
						addClass(parent, "fold");
					}
				}else if(parent.className.indexOf("fold") > -1){
					if(ulChildren.length > 0) {
						for(i=0, len = ulChildren.length; i < len; i++) {
						ulChildren[i].style.display = "block";
					}
					target.innerText = ">";
					removeClass(parent, "fold");
					addClass(parent, "unfold");
					}
				}
			}
		}

	})
	addEvent($("cancel"), "click", function() {
		$("dialog").style.display = "none";
	})
	addEvent($("sure"), "click", function() {
		var value = $("addCon").value,
			parent,
			ulTag,
			liTag,
			pTag,
			spanWrap,
			span;
		if(!value) {
			alert("请先输入增加的节点内容");
		}else {	
			parent = lastSelected.parentNode.parentNode;
			ulTag = document.createElement("ul");
			liTag = document.createElement("li");
			liTag.className = "unfold";
			pTag = document.createElement("p");
			pTag.innerText = value;
			liTag.appendChild(pTag);
			ulTag.appendChild(liTag);
			parent.appendChild(ulTag);
			spanWrap = document.createElement("span");
			spanWrap.id = "swp";
			pTag.appendChild(spanWrap);
			span = document.createElement("span");
			span.innerText = ">";
			span.className = "open";
			spanWrap.appendChild(span);
			span = document.createElement("span");
			span.innerText = "x";
			span.className = "delete";
			spanWrap.appendChild(span);
			span = document.createElement("span");
			span.innerText = "+";
			span.className = "add";
			spanWrap.appendChild(span);
			$("dialog").style.display = "none";
		}
	})
	addEvent(dfsInput, "keypress", function(evt) {
		var evt = evt || window.evt,
			dfsArr = [],
			value = dfsInput.value;
		value = value.replace(/^\s*|\s*$/gi,"");
		if(evt.keyCode === 13) {
			flag = false;
			preOrderSearch(data, dfsArr, value);
			animation(dfsArr);
		}

	})
	addEvent(bfsInput, "keypress", function(evt) {
		var evt = evt || window.evt,
			bfsArr = [],
			value = bfsInput.value;
			value = value.replace(/^\s*|\s*$/gi,"");
		if(evt.keyCode === 13) {
			flag = false;
			bfs(data, bfsArr, value);
			animation(bfsArr);
		}
	})
}