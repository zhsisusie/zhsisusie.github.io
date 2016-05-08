define(function(require, exports, module){
	var common = require("common"),
		square = document.querySelector(".square"),
		btn = document.querySelector(".bttn"),
		input = document.querySelector(".comd"),
		box = document.querySelector(".box"),
		degree = 0,
		style = common.getStyle(square),
		boxStyle = common.getStyle(box);
	square.style.left = "45px";
	square.style.top = "45px";
	console.log(boxStyle.width);
	common.addEvent(btn, "click", function(){
		var value = input.value,
			left = 0,
			top = 0;
		switch(value){
			case "GO":
				left = parseInt(style.left);
				top = parseInt(style.top);
				switch(degree%4){
					case 0 :
					case -0:
						if(top <= 0){
							break;
						}
						square.style.top = top - 46 +"px";
						break;
					case -1:
					case 3:
						if(left <= 0){
							break;
						}
						square.style.left = left - 46 + "px";
						console.log(square.style.top);
						break;
					case -3:
					case 1:
						if(left >= 368){
							break;
						}
						square.style.left = left + 46 + "px";
						break;
					case -2:
					case 2:
						if(top >= 368){
							break;
						}
						square.style.top = top + 46 + "px";
						break;
					default: 
						break;

				}
				break;
			case "TUN LEF":
				degree--;
				square.style.transform ="rotate(" + degree * 90 +"deg)";
				break;
			case "TUN RIG":
				degree++;
				square.style.transform ="rotate(" + degree * 90 +"deg)";
				break;
			case "TUN BAC":
				degree += 2;
				square.style.transform ="rotate(" + degree * 90 +"deg)";
				break;
		}
	})
	// console.log(style.left);
	// console.log(style.top);
})