define(function(require, exports, module){
	var common = require("common"),
		canvas = document.getElementById('canvas'),
		btn = document.querySelector(".bttn"),
		select = document.querySelector(".comd"),
		dura = document.querySelector(".time"),
		ctx = canvas.getContext('2d'),
		rectWidth = 50,
		lineWidth = 0.5,
		rectNumber = 11,
		FPS = 60,
		offsetX = 0,
		offsetY = 0,
		offsetR = 0;
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
	//动画效果
	var t = null;
	var lastDirec;//记录上次是左右移动还是上下移动
	var lastNg;//记录上次是向上，右移动还是向下或者左移动，即left和top是增还是减
	function anim(sec, direct, ng){
		var times = 10,
			count = 0,
			now = 0,
			//t = null,
			speed = 1/times;
		//模拟jquery中的animation(true, true)，如果当前已经有定时器，则
		//将上一次的动画立即执行到末状态，并清除定时器
		if(t){
			if(lastNg < 0){
				rect[lastDirec] = Math.floor(rect[lastDirec]);
			}else{
				rect[lastDirec] = Math.ceil(rect[lastDirec]);
			}
			clearAll();
			drawPanel();
			rect.draw();
			clearInterval(t);
		}
		//判断是否到达边界条件
		// if(lastDirec == direct && lastNg == ng){
		// 	if(lastNg < 0 && rect[lastDirec] < 2 ){
		// 		console.log(111);
		// 		return;
		// 	}
		// 	if(lastNg > 0 && rect[lastDirec] > (rectNumber-2)){
		// 		return;
		// 	}
		// }
		//这里的判断逻辑有点绕，我将上面的合并成下面这样
		if(lastDirec == direct && lastNg == ng &&
			((lastNg < 0 && rect[lastDirec] < 2) || (lastNg > 0 && rect[lastDirec] > (rectNumber-2)))){
			return;
		}else{
			t = setInterval(function(){
				count++;
				speed = 1 / times;
				if(count == 10){
					clearInterval(t);
				}
				rect[direct] += speed * ng;
				clearAll();
				drawPanel();
				rect.draw();
				lastDirec = direct;
				lastNg = ng;
			}, sec * 1000/times);
		}
		
		
	}
	common.addEvent(btn, "click", function(){
		var choice = select.value,
			time = parseInt(dura.value) || 1,
			flag = null;
		// clearAll();
		// drawPanel();
		//需要解决鼠标快速点击时，方块超出了边界,多次点击时一个函数还没执行完，还没得到最终结果，导致另一个
		//函数也开始执行，所以这里相当于是需要一个同步，等前一次的点击事件执行完毕下一次的点击事件才能执行
		switch(choice){
			case "TRA LEF":
				if(rect.x>1){
					anim(time,'x', -1);
				}
				break;
			case "TRA TOP":
				if(rect.y > 1){
					anim(time,'y', -1);
				}
				break;
			case "TRA RIG":
				if(rect.x < rectNumber-1){
					anim(time,'x', 1);
				}
				break;
			case "TRA BOT":
				if(rect.y < rectNumber-1){
					anim(time,'y', 1);
				}
				break;
			case "MOV LEF":
				rect.r = 90;
				if(rect.x >= 1){
					anim(time,'x', -1);
				}
				break;
			case "MOV TOP":
				rect.r = 180;
				if(rect.y > 1){
					anim(time,'y', -1);
				}
				else{
					clearAll();
					drawPanel();
					rect.draw();
				}
				break;
			case "MOV RIG":
				rect.r = -90;
				if(rect.x < rectNumber-1){
					anim(time,'x', 1);
				}else{
					clearAll();
					drawPanel();
					rect.draw();
				}
				break;
			case "MOV BOT":
				rect.r = 0;
				if(rect.y <= rectNumber-2){
					anim(time,'y', 1);
				}
				else{
					clearAll();
					drawPanel();
					rect.draw();
				}
				break;
			default:
				break;
		}
		
	})

})