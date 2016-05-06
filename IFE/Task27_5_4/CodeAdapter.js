var CodeAdaper = {
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
		console.log(result);
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
		console.log(str);
		return {
			id: parseInt(str.charAt(0)),
			command: str.substr(1)
		}
		
	}
}