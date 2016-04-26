//飘雪花
var snowflakeURI = [
	"images/snowflake/snowflake1.png",
	"images/snowflake/snowflake2.png",
	"images/snowflake/snowflake3.png",
	"images/snowflake/snowflake4.png",
	"images/snowflake/snowflake5.png",
	"images/snowflake/snowflake6.png"
],
	container = $('#content'),
	visualWidth = container.width(),
	visualHeight = container.height();
function snowflake() {
	var $flakeContainer = $('#snowflake');
	function getImagesName() {
		return snowflakeURI[Math.floor(Math.random() * 6)];
	}
	//创建一个雪花元素
	function createSnowBox() {
		var url = getImagesName();
		return $('<div class="snowbox" />').css({
			'position': 'absolute',
			'top': '-41px',
			'width': '41px',
			'height': '41px',
			'backgroundImage': 'url('+ url +')',
			'backgroundSize': 'cover'
		}).addClass('snowRoll');
	}
	//开始飘花
	setInterval(function() {
		var startPositionLeft = Math.random() * visualWidth - 100,
			startOpacity = 1,
			endPositionTop = visualHeight - 40,
			endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
			duration = visualHeight * 10 + Math.random() * 500;
		//随机透明度
		var	randomStart = Math.random();
		randomStart = randomStart < 0.5 ? startOpacity: randomStart;
		//创建一个雪花
		var $flake = createSnowBox();
		//设计起点位置
		$flake.css({
			left: startPositionLeft,
			opacity: randomStart
		});
		//加入到容器
		$flakeContainer.append($flake);
		//开始执行动画
		$flake.transition({
			top: endPositionTop,
			left: endPositionLeft,
			opacity: 0.7
		}, duration, 'ease-out', function() {
			$(this).remove();
		})
 
	}, 200);
}
//音乐配置
var audioConfig = {
	enable: true,//是否开始音乐
	playURI: "music/happy.wav",
	cycleURI: "music/ciculation.wav"
}
//背景音乐
function Html5Audio(url, isloop) {
	var audio = new Audio(url);
	audio.autoPlay = true;
	audio.loop = isloop || false;
	audio.play();
	return {
		end: function(callback) {
			audio.addEventListener('ended', function() {
				callback();
			}, false);
		}
	}
}

