import data from "./ss.json" assert { type: 'json' }



for (let i = 8888; i < 10000; i++){
	console.log(data["Sheet1"][i]['时间']);
} 