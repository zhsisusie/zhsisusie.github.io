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
	publish: function(message) {
		var self = this;
		if(Math.random() < 0.3) {
			log("warning: 发送的消息丢失，尝试重新发送");
			Mediator.publish(message);
			return;
		}
		log("success: 消息发送成功");
		setTimeout(function(){
			self.subscribers.forEach(function(item){
				setTimeout(function(){
					item.onCommandRev(message);
				}, 1000);
			})
		}, 300);
	}
}