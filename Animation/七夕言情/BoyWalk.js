function BoyWalk() {
	this.container = $('#content');
	this.visualWidth = this.container.width();
	this.visualHeight = this.container.height();
	this.$boy = $('#boy');
	this.instanceX = 0;
	return BoyWalk.prototype.init();
}
BoyWalk.prototype = {
	constructor: BoyWalk,
	init: function() {
		var yPos = this.pathY();
		this.$boy = $('#boy');
		this.$boy.css('top', yPos - this.$boy.height());
	},
	getValue: function(className) {
		var $elem = $('' + className + '');
		return {
			top: $elem.position().top,
			height: $elem.height()
		}
	},
	pathY: function() {
		var result = this.getValue('.a_background_middle');
		return result.top + result.height / 2;
	},
	stopWalk: function() {
		this.$boy.addClass('pauseWalk');
	},
	//恢复走路
	restoreWalk: function() {
		this.$boy.removeClass('pauseWalk');
	},
	//小男孩的动作变换
	slowWalk: function() {
		this.$boy.addClass('slowWalk');
	},
	//计算移动的距离
	calculateDist: function(direction, proportion) {
		return ((direction === 'x')?this.visualWidth:this.visualHeight) * proportion;
	},
	//用transition做运动
	startRun: function(options, runTime) {
		var deferred = $.Deferred();
		this.restoreWalk();
		this.slowWalk();
		this.$boy.transition(options, runTime, 'linear', function(){
			deferred.resolve();
		});
		return deferred; 
	},
	//开始走路
	walkRun: function(time, proportionX, proportionY) {
		var self = this,
		    distX = this.calculateDist('x', proportionX),
		    distY = this.calculateDist('y', proportionY),
		    d1 = self.startRun({'left': distX, 'top': distY?distY: undefined}, time);
		return d1;
	},
	setColor: function(color) {
		this.$boy.css('background', color);
	},
	//走进商店
	walkToShop: function(runTime) {
		var self = this,
			defer = $.Deferred(),
			doorObj = $('.door'),
			offsetDoor = doorObj.offset(),
			doorOffsetLeft = offsetDoor.left,
			offsetBoy = self.$boy.offset(),
			boyOffsetLeft = offsetBoy.left;
		//当前需要移动的距离
		self.instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + self.$boy.width() / 2);
		console.log(self.instanceX);
		var walkRun = self.startRun({transform: 'translateX(' + self.instanceX + 'px),scale(0.3, 0.3)',
						opacity: 0.1},
						runTime);
		walkRun.done(function() {
			self.$boy.css('opacity',0);
			defer.resolve();
		})
		return defer;
	},
	walkOutShop: function(runTime) {
		var self = this,
			defer = $.Deferred();
		self.restoreWalk();
		// var instanceX = (doorOffsetLeft + doorObj.width() / 2) - (boyOffsetLeft + self.$boy.width() / 2);
		var walkRun = self.startRun({
			transform: 'translateX('+ (self.instanceX + 10) +'px),scale(1, 1)',
			opacity: 1
		}, runTime);
		walkRun.done(function() {
			defer.resolve();
		});
		return defer;
	},
	getFlower: function() {
		var self = this,
			defer = $.Deferred();
		setTimeout(function() {
			self.$boy.addClass('slowFlowerWalk');
			defer.resolve();
		}, 1000);
		return defer;
	},
	bridgePathY: function(){
		var data = this.getValue('.a_background_middle');
		return data.top + data.height / 2;
	},
	getWidth: function() {
		return this.$boy.width();
	},
	//复位初始状态
	resetOriginal: function() {
		this.stopWalk();
		//恢复图片
		this.$boy.removeClass('slowWalk slowFlowerWalk').addClass('boyOriginal');
	},
	//转身
	rotate: function() {
		this.restoreWalk();
		this.$boy.addClass('boy-rotate');
	}
}
BoyWalk.prototype.init.prototype = BoyWalk.prototype;