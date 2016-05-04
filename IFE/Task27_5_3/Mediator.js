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
			log("warning: 发送的消息丢失");
			return;
		}
		setTimeout(function(){
			console.log(self.subscribers);
			self.subscribers.forEach(function(item){
				setTimeout(function(){
					item.onCommandRev(message);
				}, 1000);
			})
		}, 1000);
	}
}