var Mediator = {
	subscribers: [],
	addSubscribe: function(obj) {
		this.subscribers.push(obj);
	},
	removeSubscriber: function(obj){
		var pos = this.subscribers.indexOf(obj);
		if(pos !== -1){
			this.subscribers.splice(pos, 1);
		}
	},
	sendMessage: function(message){
		//对信息进行编码
		message = CodeAdaper.encode(message);
		DC.onCmdReceive(message);
	},
	publish: function(message) {
		//这里需要将message翻译成二进制形式
		var self = this,
			command = CodeAdaper.stringToBit(message.id + message.command);
		log("command: " + command);
		if(Math.random() < 0.3) {
			log("warning: 命令丢失，尝试重新发送");
			Mediator.publish(message);
			return;
		}
		log("success: 命令发送成功");
		setTimeout(function(){
			self.subscribers.forEach(function(item){
				setTimeout(function(){
					item.onCommandRev(command);
				}, 1000);
			})
		}, 300);
	}
}