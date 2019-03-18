function teamContent(teamId){
	mui.ajax(ip + 'teamContent',{
		type : 'POST',
		dataType : 'json',
		//async: false,
		data : {id:teamId},
		success : function(data, status) {
			var coach = data.team.teamCoach;
			var n = coach.indexOf("生日");
			coach = coach.substring(0, (Number(n) - 1)) + "<br />" + coach.substring(Number(n), Number(coach.length));
			$("#title").append(data.team.teamName);
			$("#teamName").append(data.team.teamName);
			$("#teamCity").append(data.team.teamCity);
			$("#teamPartition").append(data.team.teamPartition);
			$("#teamBoss").append(data.team.teamBoss);
			$("#teamVenue").append(data.team.teamVenue);
			$("#teamIntoNba").append(data.team.teamIntoNba);
			$("#teamChampionTimes").append(data.team.teamChampionTimes);
			$("#teamCoach").append(coach);
			$("#teamRanking").append(data.team.teamRanking);
			
			$("#tp").append(data.teamsdataList[0].score);
			$("#tb").append(data.teamsdataList[0].backboard);
			$("#ta").append(data.teamsdataList[0].assists);
			$("#ts").append(data.teamsdataList[0].shoot + "%");
			$("#otp").append(data.teamsdataList[1].score);
			$("#otb").append(data.teamsdataList[1].backboard);
			$("#ota").append(data.teamsdataList[1].assists);
			$("#ots").append(data.teamsdataList[1].shoot + "%");
			
			$("#nf").append(data.playersdatas[0][2]);
			$("#pf").append(data.playersdatas[0][4]);
			$("#ns").append(data.playersdatas[1][2]);
			$("#ps").append(data.playersdatas[1][4]);
			$("#nt").append(data.playersdatas[2][2]);
			$("#pt").append(data.playersdatas[2][4]);
			
			$("#nf").parent().attr("id", data.playersdatas[0][0]);
			$("#ns").parent().attr("id", data.playersdatas[1][0]);
			$("#nt").parent().attr("id", data.playersdatas[2][0]);
			
			for(var i = 3 ; i < data.playersdatas.length ; i++){
				$("#nextList").append("<li id='"+ data.playersdatas[i][0] +"' class='mui-table-view-cell'>"+
										"<span style='right: auto; top: 48%;' class='mui-badge'>"+ (Number(i) + 1) +"</span>"+
										"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font>"+ data.playersdatas[i][2] +"</font>"+
										"<span class='mui-badge mui-badge-inverted'><font size='3'>"+ data.playersdatas[i][4] +"</font></span>"+
									"</li>");
			}
			$("#nextList").append("<li class='mui-table-view-cell'>"+
									"<br />"+
								"</li>");
		},
		error : function(data, status, e) {
		}
	});
}

function teamsNews(teamId, pageNo){
	var b;
	mui.ajax(ip + 'teamsNewsList',{
		type : 'POST',
		dataType : 'json',
		async: false,
		data : {id:teamId,pageString:pageNo},
		success : function(data, status) {
			if(data.newsList == null || data.newsList.length == 0){
				b = true;
			}else{
				for(var i = 0 ; i < data.newsList.length ; i++){
					var dateTime = data.newsList[i].getdate.split("T")[0].split("-");
					$("#news").append("<li id='"+ data.newsList[i].id +"' class='mui-table-view-cell'>"+
							            "<div class='mui-table'>"+
							                "<div class='mui-table-cell mui-col-xs-10'>"+
							                    "<h4 class='mui-ellipsis-3'><font size='3'>"+ data.newsList[i].title +"</font></h4>"+
							                    "<p class='mui-h6 mui-ellipsis'>"+ data.newsList[i].abstract1 +"</p>"+
							                "</div>"+
							                "<div class='mui-table-cell mui-col-xs-2 mui-text-right'>"+
							                    "<span class='mui-h5'>"+ dateTime[1] + "-" + dateTime[2] +"</span>"+
							                "</div>"+
							            "</div>"+
							        "</li>");
				}
				b = false;
			}
		},
		error : function(data, status, e) {
		}
	});
	return b;
}

function teamPlayers(teamId, search){
	mui.ajax(ip + 'teamPlayersOrder',{
		type : 'POST',
		dataType : 'json',
		//async: false,
		data : {id:teamId, search:search},
		success : function(data, status) {
			
			$("#nf").html(data.playersdatas[0][2]);
			$("#pf").html(data.playersdatas[0][4]);
			$("#ns").html(data.playersdatas[1][2]);
			$("#ps").html(data.playersdatas[1][4]);
			$("#nt").html(data.playersdatas[2][2]);
			$("#pt").html(data.playersdatas[2][4]);
			
			$("#nf").parent().attr("id", data.playersdatas[0][0]);
			$("#ns").parent().attr("id", data.playersdatas[1][0]);
			$("#nt").parent().attr("id", data.playersdatas[2][0]);
			
			$("#nextList").html("");
			for(var i = 3 ; i < data.playersdatas.length ; i++){
				$("#nextList").append("<li id='"+ data.playersdatas[i][0] +"' class='mui-table-view-cell'>"+
										"<span style='right: auto; top: 48%;' class='mui-badge'>"+ (Number(i) + 1) +"</span>"+
										"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font>"+ data.playersdatas[i][2] +"</font>"+
										"<span class='mui-badge mui-badge-inverted'><font size='3'>"+ data.playersdatas[i][4] +"</font></span>"+
									"</li>");
			}
			$("#nextList").append("<li class='mui-table-view-cell'>"+
									"<br />"+
								"</li>");
		},
		error : function(data, status, e) {
		}
	});
}

function teamGames(teamId, year, month){
	mui.ajax(ip + 'teamGames',{
		type : 'POST',
		dataType : 'json',
		//async: false,
		data : {id:teamId, year:year, month:month},
		success : function(data, status) {
			if(data.gamesbyteams.length == 0){
				$("#games").append("<br /><li style='text-align: center;'><h2>暂无数据</h2></li>");
			}
			for(var i = 0 ; i < data.gamesbyteams.length ; i++){
				var c = "";
				if(data.gamesbyteams[i].isHome == 0){
					if(data.gamesbyteams[i].isComplete == 0){
						c = data.gamesbyteams[i].gameLosePoints + ":" + data.gamesbyteams[i].gameGetPoints
					}else{
						c = "VS";
					}
					$("#games").append("<li class='mui-table-view-cell mui-media'>"+
									"<a>"+
										"<img style='height:20%; max-width:20%;' class='mui-media-object mui-pull-left' src='"+ teamsIcon[data.gamesbyteams[i].oppTeamsId - 1] +"'>"+
										"<img style='height:20%; max-width:20%;' class='mui-media-object mui-pull-right' src='"+ teamsIcon[data.gamesbyteams[i].teamsId - 1] +"'>"+
										"<div style='text-align:center; vertical-align:middle;' class='mui-media-body'>"+
											"<h2><font size='5'>"+ c +"</font></h2>"+
											"<h5><font size='3'>"+ data.gamesbyteams[i].gameMonth + "-" + data.gamesbyteams[i].gameDay + " " + data.gamesbyteams[i].gameTime +"</font></h5>"+
										"</div>"+
									"</a>"+
								"</li>");
				}else{
					if(data.gamesbyteams[i].isComplete == 0){
						c = data.gamesbyteams[i].gameGetPoints + ":" + data.gamesbyteams[i].gameLosePoints
					}else{
						c = "VS";
					}
					$("#games").append("<li class='mui-table-view-cell mui-media'>"+
									"<a>"+
										"<img style='height:20%; max-width:20%;' class='mui-media-object mui-pull-left' src='"+ teamsIcon[data.gamesbyteams[i].teamsId - 1] +"'>"+
										"<img style='height:20%; max-width:20%;' class='mui-media-object mui-pull-right' src='"+ teamsIcon[data.gamesbyteams[i].oppTeamsId - 1] +"'>"+
										"<div style='text-align:center; vertical-align:middle;' class='mui-media-body'>"+
											"<h2><font size='5'>"+ c +"</font></h2>"+
											"<h5><font size='3'>"+ data.gamesbyteams[i].gameMonth + "-" + data.gamesbyteams[i].gameDay + " " + data.gamesbyteams[i].gameTime +"</font></h5>"+
										"</div>"+
									"</a>"+
								"</li>");
				}
			}
			$("#games").append("<li class='mui-table-view-cell mui-media'></li><li class='mui-table-view-cell mui-media'></li>");
		},
		error : function(data, status, e) {
		}
	});
}