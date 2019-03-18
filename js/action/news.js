function newsList(pageNo){
	var b;
	mui.ajax(ip + 'newsList',{
		type : 'POST',
		dataType : 'json',
		async: false,
		data : {pageString:pageNo},
		success : function(data, status) {
			if(data.newsList == null || data.newsList.length == 0){
				b = true
			}else{
				for (var i = 0 ; i < data.newsList.length ; i++) {
					var abstract1 = data.newsList[i].abstract1;
					if(abstract1.length > 34){
						abstract1 = abstract1.substring(0,34) + "...";
					}
					$('#newsList').append("<li class='mui-table-view-cell'>"+
							"<div class='mui-slider-cell'>"+
								"<div class='oa-contact-cell mui-table'>"+
									"<div class='oa-contact-avatar mui-table-cell'>"+
										"<img src='"+ wbeIcon[data.newsList[i].source] +"' />"+
									"</div>"+
									"<a id='"+ data.newsList[i].id +"'>"+
										"<div class='oa-contact-content mui-table-cell'>"+
											"<div class='mui-clearfix'>"+
												"<h4 class='oa-contact-name'><font color='#000000' size='3'>"+ data.newsList[i].title +"</font></h4>"+
											"</div>"+
											"<p class='oa-contact-email mui-h6'>"+ abstract1 +
											"</p>"+
										"</div>"+
									"</a>"+
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

function newContent(newsId){
	mui.ajax(ip + 'newsContent',{
		type : 'POST',
		dataType : 'json',
		//async: false,
		data : {id:newsId},
		success : function(data, status) {
			if(data.grippinglist.newspic != "" && data.grippinglist.newspic != null){
				$("#img").append("<img style='width:100%; height:auto;' src='"+ data.grippinglist.newspic +"' /><br /><br />");
			}
			$("#content").append(data.grippinglist.content);
			$("#title").text(data.grippinglist.title);
			$("#fromwhere").text(wbeFrom[data.grippinglist.source]);
		},
		error : function(data, status) {
		}
	});
}

function showNewComment(newsId){
	mui.ajax(ip + 'showNewsComment',{
		type : 'POST',
		dataType : 'json',
		async: false,
		data : {id:newsId},
		success : function(data, status) {
			if(data.commentList.length == 0){
				$("#comment").append("<div style='text-align:center;height: 76px;'><h4 style='line-height: 76px;'>暂无评论</h4></div>");
			}else{
				var isAddUl = {};
				for(var i = 0 ; i < data.commentList.length ; i++){
					isAddUl[data.commentList[i].id] = false;
					$("#comment").append("<li class='mui-table-view-cell'>"+
								            "<div class='mui-table'>"+
								                "<div class='mui-table-cell mui-col-xs-10'>"+
								                    "<font style='font-weight: 480; font-size: 16;' color='#6da0da'>"+ data.commentList[i].contentUserName +"</font>"+
								                    "<h5>"+ data.commentList[i].contentTime.replace("T", " ") +"</h5>"+
								                    "<p>&nbsp;&nbsp;&nbsp;&nbsp;<font color='#000000'>"+ data.commentList[i].content +"</font></p>"+
								                "</div>"+
								                "<div class='mui-table-cell mui-col-xs-2 mui-text-right'>"+
								                    "<span id='"+ data.commentList[i].contentUserId +","+ data.commentList[i].contentUserName +","+ data.commentList[i].id +"' style='color:#677b92' class='mui-icon mui-icon mui-icon-chatboxes'></span>"+
								                "</div>"+
								            "</div>"+
								            "<div id='"+ data.commentList[i].id +"' style='border-left:1px solid #dbdae0; border-right:1px solid #dbdae0'>"+
									        "</div>"+
								        "</li>");
				}
				for(var i = 0 ; i < data.replyCommentList.length ; i++){
					if(!isAddUl[data.replyCommentList[i].replyCommentId]){
						$("#" + data.replyCommentList[i].replyCommentId).append("<ul style='background-color: #e2e2e7;' class='mui-table-view mui-table-view-striped mui-table-view-condensed'></ul>");
						isAddUl[data.replyCommentList[i].replyCommentId] = true;
					}
					$("#" + data.replyCommentList[i].replyCommentId + " ul").append("<li class='mui-table-view-cell'>"+
																				            "<div class='mui-table'>"+
																				                "<div class='mui-table-cell mui-col-xs-10'>"+
																				                    "<font style='font-weight: 480; font-size: 16;' color='#6da0da'>"+ data.replyCommentList[i].contentUserName +"</font>"+
																				                    "<h5>"+ data.replyCommentList[i].contentTime.replace("T", " ") +"</h5>"+
																				                    "<p>&nbsp;&nbsp;&nbsp;&nbsp;<font color='#000000'>"+ data.replyCommentList[i].content +"</font></p>"+
																				                "</div>"+
																				            "</div>"+
																				        "</li>");
				}
			}
		},
		error : function(data, status) {
		}
	});
}

function saveNewComment(newsId, userName, replyUserId, commentId, comment){
	mui.ajax(ip + 'saveNewsComment',{
		type : 'POST',
		dataType : 'json',
		//async: false,
		data : {id:newsId, userName:userName, replyUserId:replyUserId, comment:comment, commentId:commentId},
		success : function(data, status) {
			if(data.state == "0"){
				if(replyUserId == -1){
					mui.toast("留言成功");
				}else{
					mui.toast("回复成功");
				}
				location.reload();
			}else{
				if(replyUserId == -1){
					mui.toast("留言失败");
				}else{
					mui.toast("回复失败");
				}
			}
			
		},
		error : function(data, status) {
		}
	});
}