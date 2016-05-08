window.onload = function(){
	var form = $("info");
		//blur 和 focus不冒泡,需要使用冒泡的focusin 和 focusout
		addEvent(form, "focusin", function(event){
			var event = event || window.event,
				target = event.target || event.srcElement,
				parent,
				pNodes,
				i,
				len;
			if(target.tagName == "INPUT" && (target.type == "text" || 
				target.type == "password" || target.type == "email" || target.type == "phone")){
				parent = target.parentNode;
				pNodes = parent.getElementsByTagName("p");
				for(i = 0, len = pNodes.length; i < len; i++){
					pNodes[i].style.display  = "none";
				}
				pNodes[0].style.display = "block";
				target.style.borderColor = "#ababab";
			}	
		})
		addEvent(form, "focusout", function(event){
			var event = event || window.event,
				target = event.target || event.srcElement,
				type,
				value,
				checker,
				parent,
				pNodes,
				message;
			if(target.tagName == "INPUT" && (target.type == "text" || 
				target.type == "password" || target.type == "email" || target.type == "phone")){
				var i, len;
				parent = target.parentNode;
				pNodes = parent.getElementsByTagName("p");
				type = target.getAttribute("data-type");
				value = target.value;
				message = Validator.validate(type, value);
				for(i = 0, len = pNodes.length; i < len; i++){
					pNodes[i].style.display  = "none";
				}
				pNodes[message.index].style.display = "block";
				if(message.status === "success"){
					pNodes[message.index].style.color = "green";
					target.style.borderColor = "green";
				}else if(message.status === "error"){
					pNodes[message.index].style.color = "red";
					pNodes[message.index].innerText = message.message;
					target.style.borderColor = "red";
				}

			}
		})
		
		var Validator = {
			types:{},
			config:{},
			validate: function(type, value){
				var self = this,
					checker = self.config[type];
				return self.types[checker].validate(value);
			}
		};
		Validator.config = {
			"name": "isNameValid",
			"passd": "isPassdValid",
			"passd_sec": "isPsdSecValid",
			"email": "isEmailValid",
			"phone": "isPhoneValid"
		}
		Validator.types.isNameValid = {
			validate: function(value){
				var self = this,
					len = value.length,
					i = 0,
					result = len;
				for(i=0;i<len;i++){
					if(value.charCodeAt(i) > 255){
						result++;
					}
				}
				if(result >= 4 && result <= 16){
					return {
						index: 2,
						status: "success"
					}
				}else{
					if(!result){
						return {
							"index": 1,
							"status": "error",
							"message": "名称不能为空"
						}
					}else{
						return {
							index: 1,
							status: "error",
							message: "名称长度为4~16"
						}
					}
				}
			}
		}
		Validator.types.isPassdValid = {
			validate: function(value){
				var self = this,
					len = value.length,
					i = 0,
					result = len;
				for(i=0;i<len;i++){
					if(value.charCodeAt(i) > 255){
						result++;
					}
				}
				if(result >= 6 && result <= 16){
					return {
						index: 2,
						status: "success"
					}
				}else{
					if(!result){
						return {
							"index": 1,
							"status": "error",
							"message": "密码不能为空"
						}
					}else{
						return {
							index: 1,
							status: "error",
							message: "密码长度为6~16"
						}
					}
				}
			}
		}
		Validator.types.isPsdSecValid = {
			validate: function(value){
				var self = this,
					len = value.length,
					password = "";
				if(!len){
					return {
						index: 1,
						status: "error",
						message: "请再次填写密码"
					}
				}else{
					password = document.querySelector(".psd").value;
					if(password !== value){
						return {
							index: 1,
							status: "error",
							message: "两次密码不一致"
						}
					}else{
						return {
							index: 2,
							status: "success"
						}
					}
				}
			}
		}
		Validator.types.isEmailValid = {
			validate: function(value){
				if(!value){
					return {
						index: 1,
						status: "error",
						message: "邮箱不能为空"

					}
				}else{
					var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
					if(reg.test(value)){
						return {
							index: 2,
							status: "success"
						}
					}else{
						return{
							index: 1,
							status: "error",
							message: "邮箱格式不正确"
						}
					}
				}
			}
		}
		Validator.types.isPhoneValid = {
			validate: function(value){
				if(!value){
					return {
						index: 1,
						status: "error",
						message: "手机号不能为空"
					}
				}else{
					var reg = /^1[3578]\d{9}$/;
					if(reg.test(value)){
						return {
							index: 2,
							status: "success"
						}
					}else{
						return{
							index: 1,
							status: "error",
							message: "手机号码格式不正确"
						}
					}
				}
			}
		}
		addEvent(form,"submit", function(event){
			var event = event || window.event,
				inputs = document.querySelectorAll(".rqverify"),
				dialog = document.querySelector(".dialog"),
				i,j,
				len = inputs.length,
				parent,
				pNodes,
				plen,
				flag = true;
			dialog.style.display = "none";
			for(i=0; i < len; i++){
				parent = inputs[i].parentNode;
				pNodes = parent.getElementsByTagName("p");
				type = inputs[i].getAttribute("data-type");
				value = inputs[i].value;
				message = Validator.validate(type, value);
				for(j = 0, plen = pNodes.length; j < plen; j++){
					pNodes[j].style.display  = "none";
				}
				pNodes[message.index].style.display = "block";
				if(message.status === "success"){
					pNodes[message.index].style.color = "green";
					inputs[i].style.borderColor = "green";
				}else if(message.status === "error"){
					pNodes[message.index].style.color = "red";
					pNodes[message.index].innerText = message.message;
					inputs[i].style.borderColor = "red";
					flag = false;
				}
			}
			if(!flag){
				dialog.style.display = "block";
				$("detail").innerText = "输入有误,请重新输入";
				
			}else {
				dialog.style.display = "block";
				$("detail").innerText = "确认提交";
			}
			if(event.preventDefault){
				event.preventDefault();
			}else{
				event.returnValue = false;
			}
		})
		addEvent($("sure"), "click", function(){
			var dialog = document.querySelector(".dialog");
			dialog.style.display = "none";
		})
		addEvent($("fho"), "click", function(){
			var dialog = document.querySelector(".dialog");
			dialog.style.display = "none";
		})
}