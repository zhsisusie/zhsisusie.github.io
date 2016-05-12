define(function(require, exports, module){
	var common = require("common"),
		canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d'),
		rectWidth = 50,
		lineWidth = 0.5,
		rectNumber = 11,
		executeBtn = document.querySelector(".bttn"),
		refreshBtn = document.querySelector(".refresh"),
		textarea = document.querySelector(".com-wp"),
		ul = document.querySelector(".idx"),
		liTags = ul.getElementsByTagName("li"),
		t = null,
		commandArr = ["GO","TRA LEF", "TRA TOP", "TRA RIG", "TRA BOT", "MOV LEF", "MOV TOP", "MOV RIG"
		, "MOV BOT"];
	drawPanel();
	var rect = {
		width: 50,
		x: Math.floor(Math.random() * 10 + 1),
		y: Math.floor(Math.random() * 10 + 1),
		r: 0,
		draw: function(){
			ctx.save();
			//这里加上了this.width/2是为了将坐标原定移到方块的中心，有利于旋转
			ctx.translate(this.x * this.width + this.width / 2, this.y * this.width + this.width / 2);
			ctx.rotate(this.r*Math.PI/180);
			var lingrad = ctx.createLinearGradient(-this.width/2,-this.width/2,-this.width/2,this.width/2);
			lingrad.addColorStop(0, 'red');
			lingrad.addColorStop(0.8, 'red');
			lingrad.addColorStop(0.8, 'blue');
			lingrad.addColorStop(1, 'blue');
			ctx.fillStyle = lingrad;
			ctx.fillRect(-this.width/2,-this.width/2,this.width, this.width);
			ctx.restore();
		}
	}
	function clearAll(){
		ctx.restore();
		ctx.clearRect(0,0,600,600);
	}
	function drawLine(originX, originY, endX, endY){
		//忘了加beginPath和closePath导致strokeStyle不发挥作用
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.lineJoin = 'round';
		ctx.moveTo(originX, originY);
		ctx.lineTo(endX, endY);
		ctx.stroke();
		ctx.closePath();
	}
	function drawPanel(){
		var v;
		for(v = 0;v < rectNumber; v++){
			if(v < 10){
				ctx.font = "20px Arial";
				ctx.fillText(v+1, rectWidth *(v+1) + rectWidth / 2 - 10, rectWidth / 2);
			}
			ctx.strokeStyle = (v==0||v==10)?'#000': '#aaa';
			drawLine(rectWidth * (v+1), rectWidth, rectWidth * (v+1), rectWidth*rectNumber);
		}
		for(v=0; v < rectNumber; v++){
			if(v < 10){
				ctx.fillText(v+1, rectWidth/2 - 10, rectWidth*(v+1) + rectWidth/2 - 10);
			}
			ctx.strokeStyle = (v==0 || v == 10)?'#000':'#aaa';
			drawLine(rectWidth, rectWidth*(v+1), rectWidth * rectNumber, rectWidth * (v+1));
		}
	}
	rect.draw();
	
	common.addEvent(textarea, "focus", function(event){
		var li = ul.getElementsByTagName("li"),
			elem;
		if(!li.length){
			elem = document.createElement("li");
			elem.innerText = 1;
			ul.appendChild(elem);
		}
	})
	common.addEvent(textarea, "keyup", function(event){
		event = event || window.event;
		var value = textarea.value.split("\n"),
			rows = value.length,
			li = ul.getElementsByTagName("li"),
			liNum = li.length,
			i = liNum,
			elem,
			textStyle = common.getStyle(textarea),
			j;
		//每次回退时，将错误行的颜色去除,这样总比每次重新创建标签要好一些
		for(j=0;j<liNum;j++){
			if(li[j].style.background !== "#ddd"){
				li[j].style.background = "#ddd";
				li[j].style.color = "black";
			}
		}

		//什么时候需要减少一行
		if(event.keyCode == 8){
			if(liNum > rows && liNum > 1){
				ul.removeChild(ul.lastChild);
			}
		}
		if(event.keyCode == 13){
			while(i < rows){
				elem = document.createElement("li");
				elem.innerText = i+1;
				ul.appendChild(elem);
				i++;
			}
		}
	})
	common.addEvent(textarea, "scroll", function(){
		var scrollTop = textarea.scrollTop;
		ul.style.marginTop = (-scrollTop) + "px"; 
	})
	common.addEvent(executeBtn, "click", function(){
		var commands = textarea.value.split("\n"),
			len ,
			i = 1,
			mes,
			t = null,
			j,
			liNum,
			validCommands = [];
		for(j = 0, liNum = liTags.length;j < liNum; j++){
			liTags[j].style.background = "#ddd";
			liTags[j].style.color = "black";
		}

		if(textarea.value.length == 0){
			return;
		}
		//搜集有效的指令
		commands.forEach(function(item, index){
			if(item){
				mes = getCommdStep(item);
				console.log(mes);
				if(isCommandValid(mes)){
					validCommands.push(mes);
				}else{
					liTags[index].style.background = "red";
					liTags[index].style.color = "#fff";
				}
			}
		})
		len = validCommands.length;
		if(len>=1){
			execute(validCommands[0], 0);
		}else{
			return;
		}
		//用setInterval来执行每条指令，这里要保证setInterval的时间间隔大于大于每条指令的执行时间
		t = setInterval(function(){
			if(i == len){
				clearInterval(t);
				return;
			}
			execute(validCommands[i], i);
			i++;
			
		},2000);
		
	})
	common.addEvent(refreshBtn, "click", function(){
		ul.innerHTML = "";
		textarea.value= "";
	})
	//得到指令和步数
	function getCommdStep(item){
		var len,i;
		item = item.replace(/^\s*|\s*$/g, "");
		item = item.split(/\s+/g);
		len = item.length;
		if(item[0] == "GO"){
			return {
				"command": "GO",
				"step": item[1]?parseInt(item[1]):1
			}
		}
		command = item[0] + " " + item[1];
		step = item[2]?parseInt(item[2]):1;
		return {
			"command": command,
			"step": step
		}
	}
	//执行指令
	function execute(mes, i){
		var command = mes.command,
			step = mes.step,
			start,
			end,
			direct;
		switch(command){
			case "GO":
				switch(rect.r){
					case 90://左
						start = rect.x;
						end = rect.x;
						direct = "x";
						if(rect.x > 1){
							end = (rect.x - step < 1)?1: rect.x - step;
						}
						break;
					case 0://向下
						start = rect.y;
						end = rect.y;
						direct = "y";
						if(rect.y < rectNumber-1){
							end = (rect.y + step > 10)?10: rect.y + step;
						}
						break;
					case 180://上
						start = rect.y;
						end = rect.y;
						direct = "y";
						if(rect.y > 1){
							end = (rect.y - step < 1)?1: rect.y - step;
						}
						break;
					case -90://右
						start = rect.x;
						end = rect.x;
						direct = "x";
						if(rect.x < rectNumber-1){
							end = (rect.x + step > 10)?10: rect.x + step;
						}
						break;
					default:
						break;
				}
				break;
				
			case "TRA LEF":
				start = rect.x;
				end = rect.x;
				direct = "x";
				if(rect.x > 1){
					// rect.x = (rect.x - step < 1)?1: rect.x - step;
					end = (rect.x - step < 1)?1: rect.x - step;
				}
				
				break;
			case "TRA TOP":
				start = rect.y;
				end = rect.y;
				direct = "y";
				if(rect.y > 1){
					// rect.y = (rect.y - step < 1)?1: rect.y - step;
					end = (rect.y - step < 1)?1: rect.y - step;
				}
				
				break;
			case "TRA RIG":
				start = rect.x;
				end = rect.x;
				direct = "x";
				if(rect.x < rectNumber-1){
					// rect.x = (rect.x + step > 10)?10: rect.x + step;
					end = (rect.x + step > 10)?10: rect.x + step;
				}
				
				break;
			case "TRA BOT":
				start = rect.y;
				end = rect.y;
				direct = "y";
				if(rect.y < rectNumber-1){
					// rect.y = (rect.y + step > 10)?10: rect.y + step;
					end = (rect.y + step > 10)?10: rect.y + step;
				}
				
				break;
			case "MOV LEF":
				start = rect.x;
				end = rect.x;
				direct = "x";
				rect.r = 90;
				if(rect.x > 1){
					// rect.x = (rect.x - step < 1)?1: rect.x - step;
					end = (rect.x - step < 1)?1: rect.x - step;
				}
				
				break;
			case "MOV TOP":
				start = rect.y;
				end = rect.y;
				direct = "y";
				rect.r = 180;
				if(rect.y > 1){
					// rect.y = (rect.y - step < 1)?1: rect.y - step;
					end = (rect.y - step < 1)?1: rect.y - step;
				}
				
				break;
			case "MOV RIG":
				start = rect.x;
				end = rect.x;
				direct = "x";
				rect.r = -90;
				if(rect.x < rectNumber-1){
					// rect.x = (rect.x + step > 10)?10: rect.x + step;
					end = (rect.x + step > 10)?10: rect.x + step;
				}
				
				break;
			case "MOV BOT":
				start = rect.y;
				end = rect.y;
				direct = "y";
				rect.r = 0;
				if(rect.y < rectNumber-1){
					// rect.y = (rect.y + step > 10)?10: rect.y + step;
					end = (rect.y + step > 10)?10: rect.y + step;
				}
				
				break;
			default:
				
				break;
		}
		anim(direct, start, end);
	}
	function anim(direct, start, end){
		var count = 100,
			speed = (end - start)/count;
		rect[direct] += speed;
		clearAll();
		drawPanel();
		rect.draw();
		if((speed < 0&&rect[direct] <= end) || speed > 0&&rect[direct] >= end){
			rect[direct] = end;
			clearAll();
			drawPanel();
			rect.draw();
			cancelAnimationFrame(t);
			return;
		}
		t = requestAnimationFrame(function(){
				anim(direct, start, end);
			});
	}
	//判断指令是否合法
	function isCommandValid(mes){
		var	command = mes.command,
			step = mes.step,
			i,
			len;
		//若step为NaN，则说明不合法
		if(step!==step){
			return false;
		}
		for(i = 0,len = commandArr.length; i < len; i++){
			if(command == commandArr[i]){
				return true;
			}
		}
		return false;
	}
})