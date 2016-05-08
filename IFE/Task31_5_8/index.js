window.onload = function(){
	var city = ["北京","上海", "杭州", "武汉"],
		university = [
			["北京大学", "清华大学", "北京航空航天大学"],
			["上海交通大学", "复旦大学", "上海大学"],
			["浙江大学", "浙江工业大学","杭州电子科技大学"],
			["华中科技大学", "武汉大学","武汉理工大学"]
		],
		cityElem = $("city"),
		univElem = $("university"),
		choice = document.querySelector(".choice"),
		school = document.querySelector(".school"),
		company = document.querySelector(".company");
	city.forEach(function(item, index){
		var option = document.createElement("option");
		option.innerText = item;
		option.value = index;
		cityElem.appendChild(option);
	})
	university[0].forEach(function(item, index){
		var option = document.createElement("option");
			option.innerText = item;
			option.value = index;
			univElem.appendChild(option);
	})
	addEvent(cityElem, "change", function(event){
		var event = event || window.event,
			target = event.target || event.srcElement,
			index = target.selectedIndex,
			univers;
		univElem.innerHTML = "";
		univers = university[index];
		univers.forEach(function(item, index){
			var option = document.createElement("option");
			option.innerText = item;
			option.value = index;
			univElem.appendChild(option);
		})
	})
	addEvent(choice, "change", function(event){
		var event = event || window.event,
			target = event.target || event.srcElement,
			index = target.value;
		if(index == 1){
			school.style.display = "block";
			company.style.display = "none";
		}else if(index == 2){
			school.style.display = "none";
			company.style.display = "block";
		}

	})

}