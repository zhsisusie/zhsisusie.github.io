// 页面滑动
/**
* [Swipe description]
* @param {[type]} container [页面容器节点]
* @param {[type]} options [参数]
*/

function Swipe(container) {
	var element = container.find(':first'),//content-wrap
		swipe = {},
		slides = element.find('li'),
		width = container.width(),
		height = container.height();
	element.css({
		width: slides.length * width + 'px',
		height: height + 'px'
	})
	$.each(slides, function(index) {
		var slide = slides.eq(index);
		slide.css({
			width: width + 'px',
			height: height + 'px'
		})
	})
	swipe.slideTo = function(x, speed) {
		element.css({
			'transition-timing-function': 'linear',
			'transition-duration': speed + 'ms',
			'transform': 'translate3d(-' + x + 'px, 0px, 0px)'
		});
		return this;
	}
	return swipe;
}