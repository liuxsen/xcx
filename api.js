exports.api =  {
	whether: function(location){
		//经纬度 例如：location=39.93:116.40（纬度前经度在后，冒号分隔）
		//latitude	纬度
		//longitude	经度
		var latitude = location.latitude;
		var longitude = location.longitude;
		var end = latitude+':'+longitude;
		console.log(location)
		return 'https://api.thinkpage.cn/v3/weather/now.json?key=ffklphjo04jnakm8&location='+end+'&language=zh-Hans&unit=c'
	},
	allWhether: function(location){
		//经纬度 例如：location=39.93:116.40（纬度前经度在后，冒号分隔）
		//latitude	纬度
		//longitude	经度
		var latitude = location.latitude;
		var longitude = location.longitude;
		var end = latitude+':'+longitude;
		console.log(location)
		//https://api.thinkpage.cn/v3/weather/daily.json?key=ffklphjo04jnakm8&location=beijing&language=zh-Hans&unit=c&start=0&days=5
		return 'https://api.thinkpage.cn/v3/weather/daily.json?key=ffklphjo04jnakm8&location='+end+'&language=zh-Hans&unit=c&start=0&days=5'
	},
	getTimeCha:function(str){
		var oldTime = new Date(str).getTime();
		var nowTime = new Date();
		var chaTime = nowTime-oldTime;
		console.log(chaTime);
		var mimutes = Math.floor(chaTime/(1000*60));
		if(mimutes<5){
			return '刚刚'
		}
		return mimutes;
	}
}