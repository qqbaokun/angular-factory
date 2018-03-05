/**
 * Created by bbk on 2017/2/8.
 */
if(!window.console){
	window.console = {
		    log: function(){

		    }
		};
}

var ServerURL = (window.location.href).split('/web')[0];

var copyCode = ServerURL.split('/');
copyCode = copyCode[copyCode.length-1];

var userInfo;
//数据字典
var dataSourceValue;
//页签名字
var pageName = {
		applyPosition: "创建简历",
		activeAccount: webTitleName,//"账号激活",
		deliveryFail: webTitleName,//"投递失败",
		deliverySuccess: webTitleName,//"投递成功",
		editResume: "编辑简历",
		homePage: webTitleName,//"首页",
		personalCenter: webTitleName,//"个人中心",
		position: webTitleName,//"职位列表",
		previewResume: webTitleName,//"预览简历",
		searchResult: webTitleName,//"搜索",
		xuanjianghui: webTitleName,//"宣讲会",
		corporateCulture: webTitleName,//"企业文化"
};
/**
 * 定义全局高度
 */
//var height = "662";
var height = $(window).height();
var width = $(window).width();
/**
 * 语言
 */
var language;
var lanType = localStorage.getItem("lanType");
if(!lanType){
	lanType = 1;
}
function changeLanguage(type){
	$.ajax({
	    type: "GET",
	    url: "json/language.json",
	    dataType: 'json',
	    async: false,
	    success: function(data){
	    	if(type == 1){
		    	language = data.cn;
	    	}else{
	    		language = data.en;
	    	}
	    }
	});
}
changeLanguage(lanType);

/**
 * 定义主色，辅色
 * #63b504,#ff9f15
 */
var mainColor,secondaryColor;
//利用缓存保存nav数据
var mainData;
/**
 * jQuery
 * deferred缓存全局数据
 */
var deferred = $.Deferred();
function getMainData(){
	var needReload = false;
	var url;
	if(lanType == 1){
		url = "/wt/htmlPages/" + copyCode + "/initWebsite/webBusinessRule400_"+brandCode+"_cn_"+versionNumber+".json";
	}else{
		url = "/wt/htmlPages/" + copyCode + "/initWebsite/webBusinessRule400_"+brandCode+"_en_"+versionNumber+".json";
	}
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        async: false,
        success: function(data){
            if(data.home){
            	//处理数据
            	//去除无效站点
            	if(siteSerch[0].validSiteJson){
            		var validSiteJson = siteSerch[0].validSiteJson;
	            	if(data.campus && data.campus.positionSearch && data.campus.positionSearch.site){	//校园
	            		$.each(data.campus.positionSearch.site,function(key,value){ 
	            			console.log("key:"+key+";value:"+value.codeValue);
	            			if(typeof(validSiteJson[value.codeValue]) == "undefined"){ 
	            				delete data.campus.positionSearch.site[key];
            				} 
	        			}); 
	            	}
	            	if(data.social && data.social.positionSearch && data.social.positionSearch.site){	//社会
	            		$.each(data.social.positionSearch.site,function(key,value){ 
	            			console.log("key:"+key+";value:"+value.codeValue);
	            			if(typeof(validSiteJson[value.codeValue]) == "undefined"){ 
	            				delete data.social.positionSearch.site[key];
            				} 
	        			}); 
	            	}
	            	if(data.intern && data.intern.positionSearch && data.intern.positionSearch.site){	//实习生
	            		$.each(data.intern.positionSearch.site,function(key,value){ 
	            			console.log("key:"+key+";value:"+value.codeValue);
	            			if(typeof(validSiteJson[value.codeValue]) == "undefined"){ 
	            				delete data.intern.positionSearch.site[key];
            				} 
	        			}); 
	            	}
	            	if(data.overseas && data.overseas.positionSearch && data.overseas.positionSearch.site){	//海外
	            		$.each(data.overseas.positionSearch.site,function(key,value){ 
	            			console.log("key:"+key+";value:"+value.codeValue);
	            			if(typeof(validSiteJson[value.codeValue]) == "undefined"){ 
	            				delete data.overseas.positionSearch.site[key];
            				} 
	        			}); 
	            	}
	            	if(data.positionSearch && data.positionSearch && data.positionSearch.site){	//所有类型
	            		$.each(data.positionSearch.site,function(key,value){ 
	            			console.log("key:"+key+";value:"+value.codeValue);
	            			if(typeof(validSiteJson[value.codeValue]) == "undefined"){ 
	            				delete data.positionSearch.site[key];
            				} 
	        			}); 
	            	}
            	}
                deferred.resolve(data);

            }else{
                deferred.reject(data);
            }
        },
        error: function(err){
        	needReload = true;
            //console.log(err);
        }
    });
    if(needReload){
    	setTimeout("window.location.reload();",1000);
    	return;
    }
    return deferred.promise()
}
getMainData().done(function(data){
    console.log(data);
    mainData = data;
    if(!data.mcolor){
        mainColor = "#63b504";
    }else{
        mainColor = data.mcolor;
    }
    if(!data.scolor){
        secondaryColor = "blue";
    }else{
        secondaryColor = data.scolor;
    }

});

function getVersionNumber(){
	$.ajax({
        type: "GET",
        url: ServerURL+'/web/mode400/getVersionNumber?r='+Math.random(),
        dataType: "json",
        async: false,
        success: function(data){
        	if(data.code == '00'){					
				if(data.data.versionNumber != versionNumber){
					window.location = ServerURL + "/web/index";						
					window.location.reload();
				}
			}
        },
        error: function(){
        	window.location.reload();
        }
    });
}

/**
 * 获取浏览器窗口高度
 */
function getHeight(){
    if(height <= 500){
        $(".page").css({'height': 500 + 'px'});
        $(".video-bg").css({'height': 500 + 'px'});
    }else{
        $(".page").css({'height': height-56 + 'px'});
        $(".video-bg").css({'height': height-56 + 'px'});
    }
}

$(window).resize(function(){
    height = $(window).height();
    getHeight();
});
/*
 * 新开页面
 * */
function goJumpPage($state,stateName,stateOption,selfOrBlank){
	var url = (window.location.href).split('#')[0] + $state.href(stateName,{
        'option': utf8ToBase64(JSON.stringify(stateOption))
    });
	if(selfOrBlank == true){
		window.open(url,'_blank');
	}else{
		window.open(url,'_self');
	}
    
}
function getUrlData(obj){
	return JSON.parse(base64ToUtf8(obj));
}
function utf8ToBase64(str){
	if(window.btoa){
		return btoa(unescape(encodeURIComponent(str)));
	}else{
		return unescape(encodeURIComponent(str));
	}	
}
function base64ToUtf8(str){
	if(window.atob){
		return decodeURIComponent(escape(atob(str)));
	}else{
		return decodeURIComponent(escape(str));
	}	
}
/**
 * 获取表单格式正则
 * @params id
 */
function getFormat(id){
	switch(id*1){
		case 36:
			//手机号
			return /^1[345789]\d{9}$/;
			break;
		case 37:
			//邮箱
			return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			break;
		case 100:
			//身份证
			return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
			break;	                 
	}
}
/**
 * 16进制颜色转为RGB格式
 * var sRgbColor = sHex.colorRgb();
 */
String.prototype.colorRgb = function(){
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = this.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return sColorChange.join(",");
    }else{
        return sColor;
    }
};
/**
 * 获取url参数
 * @params name
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return  unescape(r[2]); return null;
}
/**
 * 获取id对象
 */
function isNull(id){
    return document.getElementsByClassName(id);
}
function clickToTarget(){
    $('.right-bar-b').click(function(){
        $('html,body').animate({scrollTop:0}, 300);
    });
}

/**
 * 改变颜色nav
 */
function changeColor(){
    if(isNull('home-page')){
        var scrollHeight = $(window).scrollTop(); //这个方法是当前滚动条滚动的距离
        var type = mainData.menu.type;
        var flag;

        $('#nav .nav-main-main').find('.ng-scope').each(function(i,v){

            if(scrollHeight>=(i*2-1)/2*(height-55) && scrollHeight< (i*2+1)/2*(height-55)){
                //滚动记录浏览器位置，设置50防止刷新触发滚动事件
                /*if(scrollHeight >= 50){
                    sessionStorage.setItem("targetIndex",i);
                }*/

                if(mainData.menu.type*1 == 1){
                    $(v).find('a').css({'color':'white','background-color': mainColor});
                    $(v).siblings().find('a').css({'color':'black','background-color': 'white'});
                }else {
                    $(v).find('a').css({'color': 'white', 'border-top': '5px solid', 'border-color': 'white', 'line-height': '45px','opacity': '1'});
                    $(v).siblings().find('a').css({'color': 'white', 'border-color': mainColor, 'line-height': '45px', 'opacity': '.7'});
                }
            }
        });
    }
}

//弹出登录窗口
function showLoginPage(type){
    var $loginMain = $(".login-main");
    var loginMainHeight;
    switch (type){
        //关闭
        case 0:
            $('.loginContent,.loginContentBack').hide();
            break;
        //登录
        case 1:
            $('.loginContent,.login-page,.login-main,.loginContentBack').show();
            $(".activateAccount,.register,.findPass").hide();
            loginMainHeight = $loginMain.height() + 50;
            $loginMain.css({"margin-top":"-"+loginMainHeight/2+"px"});
            break;
        //注册
        case 2:
            $(".register,.findPass,.login-page").css("display","none");
            $(".login-main,.login-logo,.register").css("display","block");
            loginMainHeight = $loginMain.height() + 50;
            $loginMain.css({"margin-top":"-"+loginMainHeight/2+"px"});
            break;
        //忘记密码
        case 3:
            var $findPass = $(".findPass");
            $loginMain.css("display","none");
            $findPass.css({"display":"block","margin-top":"-"+$findPass.height()/2+"px"});
            break;
        //注册成功
        case 4:
            $(".register").css("display","none");
            $(".activateAccount,.activateAccountHint-1").css("display","block");
            loginMainHeight = $loginMain.height() + 50;
            $loginMain.css({"margin-top":"-"+loginMainHeight/2+"px"});
            break;
        //密码重置成功
        case 5:
            $(".register,.findPass,.login-logo,.login-page").css("display","none");
            $(".activateAccount,.login-main,.activateAccountHint-2").css("display","block");
            loginMainHeight = $loginMain.height() + 50;
            $loginMain.css({"margin-top":"-"+loginMainHeight/2+"px"});
            break;

    }

}

function clearNavColor(){
    $('#nav .nav-main-other').find('.ng-scope').each(function(i,v){
        if(mainData.menu.type*1 == 1){
            $(v).find('a').css({'color':'black','background-color': 'white'});
        }else {
            $(v).find('a').css({'color': 'white', 'border-color': mainColor, 'line-height': '45px', 'opacity': '.7'});
        }
    });
}
function setNavColor(recruitType){
    for(var j=0;j<mainData.menu.data.length;j++){
        if(mainData.menu.data[j].id == recruitType){
            $('#nav .nav-main-other').find('.ng-scope').each(function(i,v){
                if(mainData.menu.type*1 == 1){
                    if(j == i){
                        $(v).find('a').css({'color':'white','background-color': mainColor});
                        $(v).siblings().find('a').css({'color':'black','background-color': 'white'});
                    }
                }else {
                    if(j == i){
                        $(v).find('a').css({'color': 'white', 'border-top': '5px solid', 'border-color': 'white', 'line-height': '45px','opacity': '1'});
                        $(v).siblings().find('a').css({'color': 'white', 'border-color': mainColor, 'line-height': '45px', 'opacity': '.7'});
                    }
                }
            });
        }
    }
}
/**
 * 鼠标浮动显示二维码
 */
function onMouseOver(){
    $('.right-bar-t,.right-bar-code').mouseover(function(){
        $('.right-bar-code').show();
    });
    $('.right-bar-t,.right-bar-code').mouseleave(function(){
        $('.right-bar-code').hide();
    });
    $(".right-bar>div").on("mouseover", function() {
        $(this).css("background-color", mainColor);
        $(this).find('i').addClass('w-c');
    });
    $(".right-bar>div").on("mouseout", function() {
        $(this).css("background-color", "#c4c4c4");
        $(this).find('i').removeClass('w-c');
    });
}

/**
 * 导入页面
 */
function doHtml(url){
    $(document).ready(function(){
        $.ajax({
            type: "GET",
            url: url,
            cache:false,
            async:false,
            success: function(data){
                return data;
            }});
    });
}

/**
 * 配置iframe
 */
function ceateModel(option) {
    var config = $.extend({
        skin: 'demo-class',
        type: 2,
        shadeClose: false,
        fixed: true,
        scrollbar: false,
        resize: false,
        move: false,
        anim: 5
    },option || {});

    layer.open(config);
}

/**
 * 配置日期控件
 */
function chooseDate(obj,option){
    var config = $.extend({
        //language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: true,
        format:'yyyy-mm-dd'
    },option || {});
    obj.datetimepicker(config);
}

/**
 * 六边形鼠标移入变色
 */
function hexagonColor(){
    $('.hexagon-title').find('polygon').css({'fill': mainColor});
    $('.hexagon').find('\*').css({'stroke':mainColor});
    $('.hexagon').each(function(i,v){
        $(v).mousemove(function(){
            $(this).find('polygon').css({'animation': 'hexHover .5s'});
            $(this).css({'z-index': '20'});

            $(this).find('.hexagon-text').css({'transform':'scale(1.5)'});
            $(this).find('.hexagon-text').find('p').css({'color': mainColor});
        });
        $(v).mouseout(function(){
            $(this).find('polygon').css({'animation': ''});
            $(this).css({'z-index': '10'});

            $(this).find('.hexagon-text').css({'transform':'scale(1)'});
            $(this).find('.hexagon-text').find('p').css({'color': '#c4c4c4'});
        });
    });
    $('.hexagon-text').each(function(i,v){
        $(v).mouseover(function(e){
            e.stopPropagation();
            e.preventDefault();
        });
    });
}

/**
 * 正方形鼠标移动自定义颜色
 */
function squareColor(){
    /*正方形自定义鼠标浮动颜色*/
    var mouseStyle = "<style>"
        + ".square-l:before, .square-l:after {border-color:"
        +secondaryColor
        +";}.square-l div:before, .square-l div:after {border-color: "
        +secondaryColor
        +";}";
    $('.square-l').before(mouseStyle);

    $(".square-l-02").css({"background-color":mainColor,'filter': 'Alpha(opacity=70)','-moz-opacity':'0.7', 'opacity':'0.7' });
    $(".square-l-04").css({"background-color":mainColor,'filter': 'Alpha(opacity=70)','-moz-opacity':'0.7', 'opacity':'0.7' });
}
/**
 * 配置angular-loading-bar
 */
function configuredLoadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 1000;
    cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner" style="position: fixed; width: 100%; height: 100%; left: 0;top: 0; background: rgba(0, 0, 0, .7);">' +
        '<div class="item" style="position: relative; top: 50%; left: 50%;margin-left: -109px;margin-top: -90px;">' +
        '<div class="item-inner">' +
        '<div class="item-loader-container">' +
        '<div class="la-ball-climbing-dot la-2x">' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

/**
 * 简历表单中-删除文件
 * */
function deleteFile($this,name,fileId,msgName,required,lanType){
	var html = '';
	var lan = {};
	if(lanType == 1){
		lan.file = "未选择任何文件，文件小于5M";
		lan.delete = "删除";
	}else{
		lan.file = "No file is selected and the file is less than 5M";
		lan.delete = "Delete";
	}
    html += "<input id=\""+name+"_file_status\" type=\"hidden\" name=\""+name+"_file_status\" value=\"1\"/>";
    html += "<input type=\"hidden\" name=\""+name+"_file_old\" value=\""+fileId+"\"/>";
    if(required){
    	html += "<input id=\""+name+"\" name=\""+name+"\" msg=\""+msgName+"\" type=\"file\" class=\"get-file-val requireFile\" style=\"position: absolute;opacity: 0;z-index:10;\"/>";
    }else{
    	html += "<input id=\""+name+"\" name=\""+name+"\" msg=\""+msgName+"\" type=\"file\" class=\"get-file-val\" style=\"position: absolute;opacity: 0;z-index:10;\"/>";
    }
    html += "<div class=\"enclosure mc-c\">";
    html += "<span  class=\"iconfont icon-tupian mc-c\"></span>"
    html += msgName; 
    html += "<font> (" + lan.file + ")</font>";
    html += "</div>";
    $($this).parent().parent().empty().html(html);
    var id = '#'+name;
    $(id).change(function(e){
        var file = $(this).get(0).files[0];
        var html = file.name +"<a href=\"javascript: void(0);\" onclick=\"deleteFile(this,'"+name+"','"+fileId+"','"+msgName+"');\">"+
        lan.delete+
            "</a>";

        console.log(file);
        var nameStatus = name+'_file_status';
        $(this).addClass('hidden');
        $(this).siblings("[name="+nameStatus+"]").val('1');
        $(this).siblings('.enclosure').removeClass('enclosure mc-c').addClass('enclosure-g').html(html);
    });
}

/**
 * alert confirm窗口美化
 * alert(""，callback);
 * confirm("你确定删除吗？",function(r){
 *   if(r){
 *       //确定
 *   }else{
 *       //取消
 *   }
});
 */
(function($) {

    $.alerts = {
        alert: function( message, callback) {
            $.alerts._show(message, null, 'alert', function(result) {
                if( callback ) callback(result);
            });
        },

        confirm: function( message, callback) {
            $.alerts._show( message, null, 'confirm', function(result) {
                if( callback ) callback(result);
            });
        },


        _show: function( msg, value, type, callback) {

            var _html = "";

            _html += '<div id="mb_box"></div><div id="mb_con">' + '<span id="mb_del" class="model-close"><a href="javascript:void(0);" class="mc-bgc"><i class="icon-shanchu1 iconfont"></i></a></span>' + '<div id="mb_btnbox">';
            _html += '<div id="mb_msg">' + msg + '</div><div id="mb_btnbox">';
            if (type == "alert") {
            	_html += "<button id=\"mb_btn_ok\" class=\"button button--winona mc-bgc\" data-text=\""+language.btn.ok+"\"><span>"+language.btn.ok+"</span><div class='after'>"+language.btn.ok+"</div></button>";
            }
            if (type == "confirm") {
            	_html += "<button id=\"mb_btn_no\" class=\"button button--winona mc-bgc\" data-text=\""+language.btn.cancle+"\"><span>"+language.btn.cancle+"</span><div class='after'>"+language.btn.cancle+"</div></button>";            	
            	_html += "<button id=\"mb_btn_ok\" class=\"button button--winona mc-bgc\" data-text=\""+language.btn.ok+"\"><span>"+language.btn.ok+"</span><div class='after'>"+language.btn.ok+"</div></button>";
            }
            _html += '</div></div>';

            //必须先将_html添加到body，再设置Css样式
            $("body").append(_html); GenerateCss();

            switch( type ) {
                case 'alert':

                    $("#mb_btn_ok").click( function() {
                        $.alerts._hide();
                        callback(true);
                    });
                    $("#mb_del").click( function() {
                        $.alerts._hide();
                    });
                    $("#mb_btn_ok").focus().keypress( function(e) {
                        if( e.keyCode == 13 || e.keyCode == 27 ) $("#mb_btn_ok").trigger('click');
                    });
                    break;
                case 'confirm':

                    $("#mb_btn_ok").click( function() {
                        $.alerts._hide();
                        if( callback ) callback(true);
                    });
                    $("#mb_btn_no,#mb_del").click( function() {
                        $.alerts._hide();
                        if( callback ) callback(false);
                    });
                    $("#mb_btn_no").focus();
                    $("#mb_btn_ok, #mb_btn_no").keypress( function(e) {
                        if( e.keyCode == 13 ) $("#mb_btn_ok").trigger('click');
                        if( e.keyCode == 27 ) $("#mb_btn_no").trigger('click');
                    });
                    break;
            }
        },
        _hide: function() {
            $("#mb_box,#mb_con").remove();
        }
    };
    // Shortuct functions zdalert
    window.alert = function( message, callback) {
        $.alerts.alert( message, callback);
    };

    window.confirm = function( message, callback) {
        $.alerts.confirm( message, callback);
    };

    //生成Css
    var GenerateCss = function () {
        $("#mb_box").css({ width: '100%', height: '100%', zIndex: '99999', position: 'fixed',
            filter: 'Alpha(opacity=60)', backgroundColor: 'black', top: '0', left: '0', opacity: '0.6'
        });

        $("#mb_dialog").css({verticalAlign: 'middle', color:'red', marginRight: '5px', fontSize: '18px'});

        $("#mb_con").css({ zIndex: '999999', width: '400px', position: 'fixed',
            backgroundColor: 'White',
            borderRadius: '4px'
        });

        $("#mb_tit").css({ display: 'block', color: '#444', padding: '10px 0',
            margin: '10px',
            backgroundColor: '#fff',
            borderBottom: '1px solid #ccc',
            textAlign: 'left'
        });

        $("#mb_del").css({
        	display: 'none'
        });

        $("#mb_msg").css({ padding: '35px 15px', lineHeight: '25px',
            fontSize: '18px',
            textAlign: 'center'
        });

        $("#mb_ico").css({ display: 'block', position: 'absolute', right: '10px', top: '9px',
            border: '1px solid Gray', width: '18px', height: '18px', textAlign: 'center',
            lineHeight: '16px', cursor: 'pointer', fontFamily: '微软雅黑'
        });

        $("#mb_btnbox").css({ margin: '15px 0', textAlign: 'center' });
        $("#mb_btn_ok,#mb_btn_no").css({height: '30px',lineHeight: '30px', color: 'white', border: 'none','borderRadius':'2px' });
        $("#mb_btn_ok").css({});
        $("#mb_btn_no").css({opacity: '0.5',marginRight: '10px',border: 'none'});


        //右上角关闭按钮hover样式
        $("#mb_ico").hover(function () {
            $(this).css({ backgroundColor: 'Red', color: 'White' });
        }, function () {
            $(this).css({ backgroundColor: '#DDD', color: 'black' });
        });

        var _widht = document.documentElement.clientWidth; //屏幕宽
        var _height = document.documentElement.clientHeight; //屏幕高

        var boxWidth = $("#mb_con").width();
        var boxHeight = $("#mb_con").height();

        //让提示框居中
        $("#mb_con").css({ top: (height - boxHeight) / 2 + "px", left: (_widht - boxWidth) / 2 + "px" });
    }

})(jQuery);



/**
 * 将form里面的内容序列化成json
 * 相同的checkbox用分号拼接起来
 * @param {dom} 指定的选择器
 * @param {obj} 需要拼接在后面的json对象
 * @method serializeJson
 * */
$.fn.serializeJson=function(otherString){
    var serializeObj={},
        array=this.serializeArray();
    //yyyy-MM日期格式正则
    var YearMonth = /^\d{4}-((0[1-9])|(1[0-2]))$/;
    $(array).each(function(){
        if(serializeObj[this.name]){
            serializeObj[this.name]+=';'+this.value;
        }else{
        	if(YearMonth.test(this.value)){
        		serializeObj[this.name]=this.value+'-01';
        	}else{
        		serializeObj[this.name]=this.value;
        	}           
        }
    });

    if(otherString!=undefined){
        var otherArray = otherString.split(';');
        $(otherArray).each(function(){
            var otherSplitArray = this.split(':');
            serializeObj[otherSplitArray[0]]=otherSplitArray[1];
        });
    }
    return serializeObj;
};
/**
 * 将josn对象赋值给form
 * @param {dom} 指定的选择器
 * @param {obj} 需要给form赋值的json对象
 * @method serializeJson
 * */
$.fn.setForm = function(jsonValue,lanType){
    var obj = this;
    $.each(jsonValue,function(name,ival){
        var $oinput = obj.find("input[name="+name+"]");
        if($oinput.attr("type")=="checkbox"){
            if(ival !== null){
                var checkboxObj = $("[name="+name+"]");
                var checkArray = ival.split(";");
                for(var i=0;i<checkboxObj.length;i++){
                    for(var j=0;j<checkArray.length;j++){
                        if(checkboxObj[i].value == checkArray[j]){
                            checkboxObj[i].click();
                        }
                    }
                }
            }
        }
        else if($oinput.attr("type")=="radio"){
            $oinput.each(function(){
                var radioObj = $("[name="+name+"]");
                for(var i=0;i<radioObj.length;i++){
                    if(radioObj[i].value == ival){
                        radioObj[i].click();
                    }
                }
            });
        }
        else if($oinput.attr("type")=="textarea"){
            obj.find("[name="+name+"]").html(ival);
        }
        else if($oinput.attr("type")=="file"){
            console.log(ival);
            var uploadUrl = ServerURL + '/web/mode400/resume/getResumeAttechment?resumeId=' + ival.resumeId + '&fileId=' + ival.fileId
            var lanDelete;
            if(lanType == 1){
            	lanDelete = "删除";
            }else{
            	lanDelete = "Delete";
            }
            var html = "<input type=\"hidden\"name=\""+name+"_file_status\" value=\"0\"/>" +
                "<input type=\"hidden\" name=\""+name+"_file_old\" value=\""+ival.fileId+"\"/>" +
                "<div class=\"enclosure-g\">" +
                "<a href=\""+uploadUrl+"\">"+ival.fileName+"</a>" +
                "<a href=\"javascript: void(0);\" onclick=\"deleteFile(this,'"+name+"','"+ival.fileId+"','"+ival.name+"','"+ival.required+"','"+lanType+"');\">"+
                lanDelete +
                "</a>"+
                "</div>";
            obj.find("[name="+name+"]").parent().parent().empty().html(html);
        }
        else{
            if(ival.constructor == Array){
                obj.find("[name="+name+"]").parent().parent().siblings().find('select').selectpicker('val', ival[0]);
                $.ajax({
                    type: 'GET',
                    url: ServerURL + '/web/mode400/resume/getResumeDicByCode?code=' + ival[0] + '&lanType=' + lanType,
                    success: function (data) {
                        obj.find("[name="+name+"]").empty();
                        $.each(data.data, function (i) {
                            $("<option value='" + data.data[i].code + "'>" + data.data[i].name + "</option>")
                                .appendTo(obj.find("[name="+name+"]"));
                        });
                        obj.find("[name="+name+"]").selectpicker('refresh');
                        obj.find("[name="+name+"]").selectpicker('val', ival[1]);
                    }
                });

            }else{
            	if(ival.fillType){
            		obj.find("input[name="+name+"]").val(ival.value);
                    obj.find("input[name="+name+"]").next().val(ival.valueText);
            	}else{
            		obj.find("[name="+name+"]").val(ival);
            		obj.find("[name="+name+"]").selectpicker('val', ival);
            	}                            
            }
        }

    })
};