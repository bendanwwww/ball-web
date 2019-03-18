function topList(state, inDay){
	mui.ajax(ip + 'newsTopList',{
		type : 'POST',
		dataType : 'json',
		async: false,
		data : {state:state,inDay:inDay},
		success : function(data, status) {
			if(state == 0){
				for(var i = 0 ; i < data.newsList.length ; i++){
				var abstract1 = data.newsList[i].abstract1;
					if(abstract1.length > 24){
						abstract1 = abstract1.substring(0,24) + "...";
					}
					var title = data.newsList[i].title;
					if(title.length > 14){
						title = title.substring(0,14) + "...";
					}
					$("#topNewsList").append("<li class='mui-table-view-cell mui-media'>"+
												"<a id='"+ data.newsList[i].id +"' class='mui-navigate-right'>"+
													"<img class='mui-media-object mui-pull-left' src='"+ wbeIcon[data.newsList[i].source] +"'>"+
													"<div class='mui-media-body'>"+
														title +
														"<p class='mui-ellipsis'>"+ abstract1 +"</p>"+
													"</div>"+
												"</a>"+
											"</li>");
				}
			}
			var day = new Date();
			day.setTime(day.getTime() + ((Number(inDay)) * 24 * 60 * 60 * 1000));
			var nextDay = new Date();
			nextDay.setTime(nextDay.getTime() + ((Number(inDay) + 1) * 24 * 60 * 60 * 1000));
			var html = "<div class='title'>"+
							"<font size='3'>"+ (day.getMonth() + 1) +"月"+ day.getDate() +"日</font>"+
						"</div>"+
						"<ul class='mui-table-view'>";
			if(data.thisDayList != null && data.thisDayList.length > 0){
				for(var i = 0 ; i < data.thisDayList.length ; i++){
					var point = "";
					if(data.thisDayList[i].isComplete == 1){
						point = data.thisDayList[i].gameTime;
					}else{
						point = "<b><font color='#112946'>" + data.thisDayList[i].vvPoints + ":" + data.thisDayList[i].hhPoints + "</font></b>";
					}
					if(data.thisDayList[i].isComplete == 0){
						point = point + "(完赛)"
					}
					html = html + "<li class='mui-table-view-cell mui-media'>"+
										"<a id='"+ data.thisDayList[i].id +"'>"+
											"<img style='margin-left: 10%;' class='mui-media-object mui-pull-left' src='"+ teamsIcon[data.thisDayList[i].vvTeamsId - 1] +"'>"+
											"<img style='margin-right: 10%;' class='mui-media-object mui-pull-right' src='"+ teamsIcon[data.thisDayList[i].hhTeamsId - 1] +"'>"+
											"<div style='text-align:center; vertical-align:middle;' class='mui-media-body'>"+
												data.thisDayList[i].vvTeamsName + "VS" + data.thisDayList[i].hhTeamsName +
												"<p class='mui-ellipsis'>"+ point +"</p>"+
											"</div>"+
										"</a>"+
									"</li>";
				}
			}
			html = html + "</ul>"+
							"<div class='title'>"+
								"<font size='3'>"+ (nextDay.getMonth() + 1) +"月"+ nextDay.getDate() +"日</font>"+
							"</div>"+
							"<ul class='mui-table-view'>";
			if(data.nextDayList != null && data.nextDayList.length > 0){
				for(var i = 0 ; i < data.nextDayList.length ; i++){
					var point = "";
					if(data.nextDayList[i].isComplete == 1){
						point = data.nextDayList[i].gameTime;
					}else{
						point = "<b>" + data.nextDayList[i].vvPoints + ":" + data.nextDayList[i].hhPoints + "</b>";
					}
					if(data.nextDayList[i].isComplete == 0){
						point = point + "(完赛)"
					}
					html = html + "<li class='mui-table-view-cell mui-media'>"+
										"<a id='"+ data.nextDayList[i].id +"'>"+
											"<img style='margin-left: 10%;' class='mui-media-object mui-pull-left' src='"+ teamsIcon[data.nextDayList[i].vvTeamsId - 1] +"'>"+
											"<img style='margin-right: 10%;' class='mui-media-object mui-pull-right' src='"+ teamsIcon[data.nextDayList[i].hhTeamsId - 1] +"'>"+
											"<div style='text-align:center; vertical-align:middle;' class='mui-media-body'>"+
												data.nextDayList[i].vvTeamsName + "VS" + data.nextDayList[i].hhTeamsName +
												"<p class='mui-ellipsis'>"+ point +"</p>"+
											"</div>"+
										"</a>"+
									"</li>";
				}
			}
			html = html + "</ul>";
			$("#gameList").append(html);
			$("#inDay").attr("value", Number(inDay) + 2);
		},
		error : function(data, status, e) {
		}
	});
}

function signalList(id){
	mui.ajax(ip + 'signalList',{
		type : 'POST',
		dataType : 'json',
		async: false,
		data : {id:id},
		success : function(data, status) {
			if(data.gamessignalList != null && data.gamessignalList.length > 0){
				for(var i = 0 ; i < data.gamessignalList.length ; i++){
					$("#signalList").append("<li id='"+ data.gamessignalList[i].signalSrc +"' class='mui-table-view-cell'>"+ signalFrom[data.gamessignalList[i].signalId - 1] +"</li>");
				}
			}
		},
		error : function(data, status, e) {
		}
	});
}
