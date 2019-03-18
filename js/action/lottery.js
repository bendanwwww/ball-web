var chooseObj = new Dictionary();

function lotteryList(season){
	mui.ajax(ip + 'lotteryList',{
		type : 'POST',
		dataType : 'json',
		async: false,
		data : {season:season},
		success : function(data, status) {
			var d = "";
			var week = "";
			var num = 0;
			var html = "";
			for(var i = 0 ; i < data.lotteryinfoList.length ; i++){
				var ownerName = "";
				var on = "";
				var visitorName = "";
				var vn = "";
				
				if(data.lotteryinfoList[i].ownerTeamName.length < 3 || data.lotteryinfoList[i].ownerTeamName == "76人"){
					ownerName = data.lotteryinfoList[i].ownerTeamName
				}else{
					if(data.lotteryinfoList[i].ownerTeamName.length < 4){
						ownerName = "<font size = '1'>&nbsp;&nbsp;"+ data.lotteryinfoList[i].ownerTeamName;
						on = "&nbsp;&nbsp;</font>";
					}else{
						ownerName = "<font size = '1'>"+ data.lotteryinfoList[i].ownerTeamName;
						on = "</font>";
					}
				}
				if(data.lotteryinfoList[i].visitorTeamName.length < 3 || data.lotteryinfoList[i].visitorTeamName == "76人"){
					visitorName = data.lotteryinfoList[i].visitorTeamName
				}else{
					if(data.lotteryinfoList[i].visitorTeamName.length < 4){
						visitorName = "<font size = '1'>&nbsp;&nbsp;"+ data.lotteryinfoList[i].visitorTeamName;
						vn = "</font>&nbsp;&nbsp;";
					}else{
						visitorName = "<font size = '1'>"+ data.lotteryinfoList[i].visitorTeamName;
						vn = "</font>";
					}
				}
				
				if(d != data.lotteryinfoList[i].gameTime.split(" ")[0]){
					if(html.trim() != ""){
						html = "<li class='mui-table-view-cell mui-collapse'>"+
								"<a class='mui-navigate-right' href='#'>"+ d + " " + week +"("+ num +"场比赛)</a>"+
								"<ul class='mui-table-view'>" + html + "</ul></li>";
						$("#lotteryList").append(html);
					}
					d = data.lotteryinfoList[i].gameTime.split(" ")[0];
					week = weekArray[new Date(d).getDay()];
					week2 = weekArray2[new Date(d).getDay()];
					num = 1;
					html = "<li class='mui-table-view-cell'>"+
								"<div style='margin-top: 6px; float:left;'>"+
									"<h5>"+ week2 +"30"+ num +"&nbsp;&nbsp;&nbsp;</h5>"+
								"</div>"+
								"<div id='"+ d +"30"+ num +"' style='padding: 2px 1px; margin-left: 50px;'>"+
									"<button id='"+ data.lotteryinfoList[i].visitorWinProbability1 +"' name='visiter' onclick='javascript:lbClick(this);' type='button' class='mui-btn mui-btn-royal mui-btn-outlined'>"+
										visitorName + "("+ new String(data.lotteryinfoList[i].visitorOdds).substring(0,4) +")" + vn +
									"</button>&nbsp;&nbsp;"+
										"<font size='3'><b>vs</b></font> &nbsp;"+
									"<button id='"+ data.lotteryinfoList[i].ownerWinProbability1 +"' name='owner' onclick='javascript:lbClick(this);' type='button' class='mui-btn mui-btn-royal mui-btn-outlined'>"+
										ownerName + "("+ new String(data.lotteryinfoList[i].ownerOdds).substring(0,4) +")" + on +
									"</button>"+
								"</div>"+
							"</li>";
					
				}else{
					num++;
					html = html + "<li class='mui-table-view-cell'>"+
								"<div style='margin-top: 6px; float:left;'>"+
									"<h5>"+ week2 +"30"+ num +"&nbsp;&nbsp;&nbsp;</h5>"+
								"</div>"+
								"<div id='"+ d +"30"+ num +"' style='padding: 2px 1px; margin-left: 50px;'>"+
									"<button id='"+ data.lotteryinfoList[i].visitorWinProbability1 +"' name='visiter' onclick='javascript:lbClick(this);' type='button' class='mui-btn mui-btn-royal mui-btn-outlined'>"+
										visitorName + "("+ new String(data.lotteryinfoList[i].visitorOdds).substring(0,4) +")" + vn +
									"</button>&nbsp;&nbsp;"+
										"<font size='3'><b>vs</b></font> &nbsp;"+
									"<button id='"+ data.lotteryinfoList[i].ownerWinProbability1 +"' name='owner' onclick='javascript:lbClick(this);' type='button' class='mui-btn mui-btn-royal mui-btn-outlined'>"+
										ownerName + "("+ new String(data.lotteryinfoList[i].ownerOdds).substring(0,4) +")" + on +
									"</button>"+
								"</div>"+
							"</li>";
				}
			}
		},
		error : function(data, status, e) {
		}
	});
}

function lbClick(button){
	var playNo = $(button).parent().attr("id");
	var vOo = $(button).attr("name");
	var tmp = chooseObj.get(playNo);
	if($(button).attr("class") == "mui-btn mui-btn-royal mui-btn-outlined"){
		var tmpCopy = new Array(tmp.length);
		for(var i = 0 ; i < tmp.length ; i++){
			tmpCopy[i] = tmp[i];
		}
		if(vOo == "visiter"){
			tmp[0] = $(button).attr("id");
		}else{
			tmp[1] = $(button).attr("id");
		}
		chooseObj.put(playNo, tmp);
		if(chooseObj.size() > 8){
			alert("只能选择8场以内的比赛");
			chooseObj.put(playNo, tmpCopy);
			return;
		}
		$(button).attr("class", "mui-btn mui-btn-royal");
	}else{
		if(vOo == "visiter"){
			tmp[0] = -1;
		}else{
			tmp[1] = -1;
		}
		chooseObj.put(playNo, tmp);
		$(button).attr("class", "mui-btn mui-btn-royal mui-btn-outlined");
	}
	var size = chooseObj.size();
	if(size == 0){
		$("#choose").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
						"已选择0场比赛,点此查看智能预测结果"+
						"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
	}else{
		var proArr = calculationProbability();
		$("#choose").text("已选择"+ size +"场比赛,预计中奖概率为"+ proArr[0] +"%-"+ proArr[proArr.length - 1] +"%,点此查看详情");
	}
}

function calculationProbability(){
	var probabilityArray = new Array();
	var objKey = chooseObj.getKey();
	var stack = new Array();
	var n = -1;
	for(var i = 0 ; i < objKey.length ; i++){
		stack.push(0);
	}
	n = calculation(stack, objKey);
	if(n != -1){
		probabilityArray.push(n);
	}
	while(stack.length > 0){
		if(stack.pop() == 0){
			stack.push(1);
			for(var x = stack.length ; x < objKey.length ; x++){
				stack.push(0);
			}
			n = calculation(stack, objKey);
			if(n != -1){
				probabilityArray.push(n);
			}
		}
			
	}
	return probabilityArray.sort(function(a, b){
		return a - b;
	});
}

function calculation(stack, objKey){
	var num = 100;
	for(var i = 0 ; i < stack.length ; i++){
		if(chooseObj.get(objKey[i])[stack[i]] == -1){
			return -1;
		}
		num = (num / 100) * (chooseObj.get(objKey[i])[stack[i]] / 100) * 100;
	}
	return num < 10 ? num.toFixed(2) : num.toFixed(1);
}
