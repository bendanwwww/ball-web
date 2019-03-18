function playerContent(playerId){
	mui.ajax(ip + 'playersContent',{
		type : 'POST',
		dataType : 'json',
		//async: false,
		data : {id:playerId},
		success : function(data, status) {
			$("#pic").attr("src", data.players.pic);
			$("#chineseName").html(data.players.chineseName);
			$("#englishName").html(data.players.englishName);
			$("#country").html(data.players.country);
			$("#number").html(data.players.number + "号");
			$("#position").html(data.players.position);
			$("#birthday").html(data.players.birthday);
			$("#height").html(data.players.heightM + "米/" + data.players.heightFT + "英尺");
			$("#weight").html(data.players.weightKG + "公斤/" + data.players.weightLB + "英磅");
			$("#school").html(data.players.school);
			$("#draft").html(data.players.draft);
			$("#salary").html(data.players.salary);
			$("#contract").html(data.players.contract);
			
			$("#showTime").html("出场：" + data.playersdata.showTime);
			$("#theFirst").html("首发：" + data.playersdata.theFirst);
			$("#times").html("时间：" + Math.round(data.playersdata.times * 100)/100);
			$("#shoot").html("投篮：" + Math.round(data.playersdata.shoot * 10000)/100 + "%");
			$("#hit").html("命中：" + Math.round(data.playersdata.hit * 100)/100);
			$("#shot").html("出手：" + Math.round(data.playersdata.shot * 100)/100);
			$("#threeShoot").html("三分：" +  Math.round(data.playersdata.threeShoot * 10000)/100 + "%");
			$("#threeHit").html("命中：" + Math.round(data.playersdata.threeHit * 100)/100);
			$("#threeShot").html("出手：" + Math.round(data.playersdata.threeShot * 100)/100);
			$("#foulShoot").html("罚球：" + Math.round(data.playersdata.foulShoot * 10000)/100 + "%");
			$("#foulHit").html("命中：" + Math.round(data.playersdata.foulHit * 100)/100);
			$("#foulShot").html("出手：" + Math.round(data.playersdata.foulShot * 100)/100);
			$("#backboard").html("篮板：" + Math.round(data.playersdata.backboard * 100)/100);
			$("#ffBackboard").html("前场：" + Math.round(data.playersdata.ffBackboard * 100)/100);
			$("#bbBackboard").html("后场：" + Math.round(data.playersdata.bbBackboard * 100)/100);
			$("#assists").html("助攻：" + Math.round(data.playersdata.assists * 100)/100);
			$("#steals").html("抢断：" + Math.round(data.playersdata.steals * 100)/100);
			$("#block").html("盖帽：" + Math.round(data.playersdata.block * 100)/100);
			$("#fault").html("失误：" + Math.round(data.playersdata.fault * 100)/100);
			$("#foul").html("犯规：" + Math.round(data.playersdata.foul * 100)/100);
			$("#score").html("得分：" + Math.round(data.playersdata.score * 100)/100);
			
			$("#trr").html("篮板率：" + Math.round(data.playersdata.trr * 100)/100 + "%");
			$("#ftrr").html("进攻板：" + Math.round(data.playersdata.ftrr * 100)/100 + "%");
			$("#btrr").html("防守板：" + Math.round(data.playersdata.btrr * 100)/100 + "%");
			$("#arr").html("助攻率：" + Math.round(data.playersdata.arr * 100)/100 + "%");
			$("#srr").html("抢断率：" + Math.round(data.playersdata.srr * 100)/100 + "%");
			$("#brr").html("盖帽率：" + Math.round(data.playersdata.brr * 100)/100 + "%");
			$("#frr").html("失误率：" + Math.round(data.playersdata.frr * 100)/100 + "%");
			$("#urr").html("使用率：" + Math.round(data.playersdata.urr * 100)/100 + "%");
			$("#oerr").html("进攻效率：" + data.playersdata.oerr);
			$("#drr").html("防守效率：" + data.playersdata.drr);
			$("#ws").html("WS：" + data.playersdata.ws);
			$("#oews").html("进攻WS：" + data.playersdata.oews);
			$("#dws").html("防守WS：" + data.playersdata.dws);
			$("#per").html("PER：" + data.playersdata.per);
			$("#dunk").html("扣篮：" + data.playersdata.dunk);
			$("#ttao").html("2/3+1：" + data.playersdata.ttao);
			$("#sd").html("出手距离：" + data.playersdata.sd);
			$("#tvShoot").html("篮下命中率：" + Math.round(data.playersdata.tvShoot * 10000)/100 + "%");
			$("#tvHit").html("出手：" + Math.round(data.playersdata.tvHit * 100)/100);
			$("#tvShot").html("命中：" + Math.round(data.playersdata.tvShot * 100)/100);
			$("#ssShoot").html("近距两分：" + Math.round(data.playersdata.ssShoot * 10000)/100 + "%");
			$("#ssHit").html("命中：" + Math.round(data.playersdata.ssHit * 100)/100);
			$("#ssShot").html("出手：" + Math.round(data.playersdata.ssShot * 100)/100);
			$("#mmShoot").html("中距两分：" + Math.round(data.playersdata.mmShoot * 10000)/100 + "%");
			$("#mmHit").html("命中：" + Math.round(data.playersdata.mmHit * 100)/100);
			$("#mmShot").html("出手：" + Math.round(data.playersdata.mmShot * 100)/100);
			$("#hhShoot").html("远距两分：" + Math.round(data.playersdata.hhShoot * 10000)/100 + "%");
			$("#hhHit").html("命中：" + Math.round(data.playersdata.hhHit * 100)/100);
			$("#hhShot").html("出手：" + Math.round(data.playersdata.hhShot * 100)/100);
			$("#trueShoot").html("真实命中率：" + Math.round(data.playersdata.trueShoot * 10000)/100 + "%");
			$("#se").html("投篮效率：" + Math.round(data.playersdata.se * 10000)/100 + "%");
		},
		error : function(data, status, e) {
		}
	});
}
