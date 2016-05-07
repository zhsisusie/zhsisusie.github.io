var DC = {
	transStatus:{"START": "飞行", "STOP":"停止","DESTORY": "即将销毁"},
	//接收消息,
	onCmdReceive: function(message){
		//对消息进行解码
		var self = this;
		message = CodeAdaper.decode(message);
		self.viewRefresh(message);
	},
	display: function(id, spaceship){
		var self = this,
			cstr = "s_"+id,
			elem = $(cstr),
			spans = document.querySelectorAll("." + cstr);
		elem.style.display = "block";
		spans[1].innerText = Commander.re[spaceship.engineSystem-1];
		spans[2].innerText = Commander.ey[spaceship.energySystem-1];
		spans[3].innerText = "停止";
		spans[4].innerText = "100%";
	},
	remove: function(id){
		var elem = $("s_"+id);
		setTimeout(function(){
			elem.style.display = "none";
		}, 3000);
	},
	viewRefresh: function(message){
		var self = this,
			str = "s_" + message.ship,
			elem = $(str),
			spans = document.querySelectorAll("."+str);
		spans[3].innerText = self.transStatus[message.status];
		spans[4].innerText = message.energy + "%";
	}
}