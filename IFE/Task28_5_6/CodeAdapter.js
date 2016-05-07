var CodeAdaper = {
	shipCode: ["0001","0010","0011", "0100"],
	statusCode:{START:"0001",STOP:"0010",DESTORY: "1100"},
	numfill: function(num, fill, hex){
		var numStr = parseInt(num).toString(2),
			len = numStr.length;
		return Array(len < fill?fill-len+1||0:0).join('0') + numStr;
	},
	stringToBit: function(str) {
		var self = this,
			result;
		result =  str.split('').map(function(item){
			return self.numfill(item.charCodeAt(0), 7, 2);
		}).join('');
		return result;
	},
	bitToString: function(bit){
		var self = this,
			str = "",
			result;
		while(bit.length >= 7){
			result = parseInt(bit.substr(0,7), 2);
			str += String.fromCharCode(result);
			bit = bit.substr(7);
		}
		return {
			id: parseInt(str.charAt(0)),
			command: str.substr(1)
		}
	},
	encode: function(message){
		var self = this,
			str = self.shipCode[message.ship-1] + self.statusCode[message.status] + self.numfill(message.energy, 8, 2);
		return str;
	},
	decode: function(code){
		var self = this,
			message = {},
			ship = "",
			status = "",
			energy = "";
		ship = code.substr(0, 4);
		status = code.substr(4,4);
		energy = code.substr(8);
		self.shipCode.forEach(function(item, index){//发现这里用every，循环还没执行完就执行了下一次
			//问题在于如何退出forEach循环呢
			if(ship === item){
				message.ship = index+1;
			}
		});
		Object.keys(self.statusCode).forEach(function(item){
			if(self.statusCode[item] == status){
				message.status = item;
			}
		})
		message.energy = parseInt(energy, 2);
		return message;

	}
}