var ip = "http://101.200.50.140:8080/baseketballBack/";
//var ip = "http://192.168.43.33:8080/baseketballBack/";
var wbeIcon = new Array("images/nba_china.png" , "images/hupu.png" , "images/sina.png", "images/sohu.png", "images/qq.png", "images/wangyi.png");
var wbeFrom = new Array("来源：NBA中文网" , "来源：虎扑体育" , "来源：新浪体育", "来源：搜狐体育", "来源：腾讯体育", "来源：网易体育");
var signalFrom = new Array("NBA直播" , "CCTV5", "Feed2all", "风云直播", "纬来体育");
var teamsIcon = new Array("images/qc.png","images/ly.png","images/hf.png","images/rh.png","images/ms.png","images/qs.png","images/bxz.png",
							"images/gn.png","images/hs.png","images/xl.png","images/krtr.png","images/ml.png","images/nks.png",
							"images/76r.png","images/lw.png","images/ys.png","images/kc.png","images/gw.png","images/hr.png",
							"images/ty.png","images/js.png","images/lt.png","images/ktz.png","images/jj.png","images/sll.png",
							"images/mc.png","images/hj.png","images/hx.png","images/xn.png","images/th.png");
var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
var weekArray2 = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");

mui.plusReady(function() {
	onNetChange();
	//alert(plus.device.model);
	/*plus.geolocation.getCurrentPosition(translatePoint,function(e){
        mui.toast("异常:" + e.message);
    });*/
});

function onNetChange() {
	// 获取当前网络类型
	var nt = plus.networkinfo.getCurrentType();
	switch (nt) {
	case plus.networkinfo.CONNECTION_ETHERNET:
	case plus.networkinfo.CONNECTION_WIFI:
		//alert("当前网络为WiFi");
		break;
	case plus.networkinfo.CONNECTION_CELL2G:
	case plus.networkinfo.CONNECTION_CELL3G:
	case plus.networkinfo.CONNECTION_CELL4G:
		//alert("当前网络非WiFi");
		break;
	default:
		alert("当前没有网络");
		break;
	}
}

function getCpuInfo() { 
    var cpuInfo = '/proc/cpuinfo'; 
    var temp = '', 
        cpuHardware; 
    var fileReader = plus.android.importClass("java.io.FileReader"); 
    var bufferedReader = plus.android.importClass("java.io.BufferedReader"); 
    var FileReader = new fileReader(cpuInfo); 
    var BufferedReader = new bufferedReader(FileReader, 8192); 
    while ((temp = BufferedReader.readLine()) != null) { 
        if (-1 != temp.indexOf('Hardware')) { 
            cpuHardware = temp.substr(parseInt(temp.indexOf(":")) + 1); 
        } 
    } 
    return cpuHardware; 
} 

function translatePoint(position){
    var currentLon = position.coords.longitude;
    var currentLat = position.coords.latitude;
    console.log(currentLon);
}

function plusReady() { // 获取本地应用资源版本号
	plus.runtime.getProperty(plus.runtime.appid, function(inf) {
		ver = inf.version;
		var client;
		var ua = navigator.userAgent.toLowerCase();
		/*if(/iphone|ipad|ipod/.test(ua)) {    //苹果手机            
		    $.ajax({
		        type:"get",
		        dataType:'json',
		        url:"https://itunes.apple.com/lookup?id=111030274",//获取当前上架APPStore版本信息
		        data:{            
		            id:111030274 //APP唯一标识ID
		        },
		        contentType:'application/x-www-form-urlencoded;charset=UTF-8',
		        success:function(data){
		            console.log("jsjsjsjs"+json2string(data));
		            $.each(data, function(i,norms) {
		                $.each(norms, function(key,value) {
		                    $.each(value, function(j, normItem) {
		                        if(j=="version"){
		                            if(normItem > ver){                        
		                                 alert("发现新版本:V" + normItem);
		                                   document.location.href='https://itunes.apple.com/cn/app/san-gu-hui/id111030274?mt=8'; //上新APPStore下载地址
		                            }
		                        }                            
		                    });                
		                });
		            });        
		            return;
		        }
		    });    
		}else*/
		if(/android/.test(ua)) {
			mui.ajax(ip + "appUpdate", {
				dataType: 'json',
				type: 'POST',
				timeout: 10000,
				success: function(data) {
					var log = "";
					var logs = data.appupdate.log.split("|");
					for(var l = 0 ; l < logs.length ; l++){
						log = log + logs[l] + "\n"
					}
					if(data.appupdate.appId != ver) {
						var btnArray = ['取消', '更新'];
						mui.confirm("更新日志:\n\n" + log, "发现新版本V" + data.appupdate.appId, btnArray, function(e) {
							if (e.index == 1) {
								var w = plus.nativeUI.showWaiting("正在下载更新...", plus.nativeUI.WaitingOptions);
								var dtask = plus.downloader.createDownload(data.appupdate.addr, {}, function(d, status) {
									if(status == 200) {
										w.close();
										plus.nativeUI.toast("正在准备环境，请稍后！");
										sleep(1000);
										var path = d.filename; //下载apk
										plus.runtime.install(path); // 自动安装apk文件
									} else {
										alert('版本更新失败:' + status);
									}
								});
								dtask.start();
							} else {
								mui.toast("您取消了更新"); //获取远程数据库中上新andriod版本号      
							}
						})
					} else {
						mui.toast('当前版本号已是最新');
						return;
					}
				},
				error: function(xhr, type, errerThrown) {
					mui.toast('网络异常,请稍候再试');
				}
			});
		}
	});
}
 

function findUserName(f){
	var db = openDatabase('balldb', '', 'ball', 204800);
	db.transaction(function(tx){  
		tx.executeSql('select * from user', [], f);  
    });
}

//sql语句执行成功后执行的回调函数 
function onSuccess(tx,rs){  
    //alert("操作成功");  
} 

//sql语句执行失败后执行的回调函数  
function onError(tx,error){  
    alert("操作失败，失败信息："+ error.message);  
}