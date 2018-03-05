<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="../include.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<meta charset="UTF-8">
<meta name='HandheldFriendly' content='True' />
<meta name='viewport' content='user-scalable=0' />
<meta name="viewport" content="width=device-width" />
<title>微信绑定</title>
<link rel="stylesheet" href="<as:cssUrl value="/v8/static/styles/mobweb/common.css"/>"/>
<link rel="stylesheet" href="<as:cssUrl value="/v8/static/styles/mobweb/weui.min.css"/>"/>
<link rel="stylesheet" href="<as:cssUrl value="/v8/static/styles/mobweb/jquery-weui.min.css"/>"/>
<link rel="stylesheet" href="<as:cssUrl value="/v8/static/styles/mobweb/bottmoMenu.css"/>">
<link rel="stylesheet" href="<s:url value="/v8/static/styles/mobweb/weibo.css"/>">
<script src="<as:jsUrl value="/javascript/mobweb/jquery-1.8.2.min.js"/>" type="text/javascript" ></script>
<script src="<as:jsUrl value="/v8/static/javascript/mobweb/jquery-weui.min.js"/>"></script>
<script type="text/javascript" src="<as:jsUrl value="/javascript/web/common.js"/>"></script>
<script src="<as:jsUrl value="/v8/static/javascript/mobweb/scale.js"/>"></script>
<style>
.weui-dialog {
    width: 256px;
    left: 50%;
    margin-left: -128px;
    top: 15%;
    border-radius: 15px;
    font-family: '微软雅黑';
}
.weui-dialog__title {
    font-size: 14px;
    color: #666666;
}
.weui-dialog .weui-dialog__btn.default {
    font-size: 14px;
    color: #3399ff;
}
.yanjin{
	/* font-size:14px; */
	float:right;
}
.weui-picker-modal{
	height:8rem;
}
.weui-picker-modal .picker-modal-inner{
	height:8.3rem;
}
.toolbar, .toolbar .title{
	font-size: .65rem;
}
.toolbar .title {
    line-height: 1.7rem;
}
.weui-picker-modal .picker-items{
	font-size:.77rem
}
.common_input_style {
    width: 9.22rem;
    height: 1.46rem;
    line-height: 1.46rem;
    border: 0.02rem solid #d1d6e2;
    border-radius: 65px;
    padding: 0 0.6rem;
    margin: 0 auto;
    margin-top: 0.07rem;
    position: relative;
}
.tetxInfo{
    width: 9.8rem;
    margin: 0 auto;
    margin-top: 4px;
    color: #f66;
}
.common_input_style input {
    width: 70%;
    height: 94%;
    border: 0;
    outline: none;
    position: absolute;
    top: 2px;
    font-size: 0.48rem;
    color: #aaaaaa;
}
.weui-picker-modal .picker-item.picker-selected,.weui-picker-modal .picker-item{
	font-size:18px;
}
</style>
</head>
<body>
	 <div class="wrapper">
        <div class="nav">
           <s:if test="isHas==1">
	            <div class="nav_title">注册并绑定微信</div>
           </s:if>
           <s:else>
	            <div class="nav_title">登录并绑定微信</div>
           </s:else>
           <div class="nav_more"></div>
        </div>
        <div class="container">
         <form action="<as:url value="/${corpCode}/web/index/codeDoBind"/>"   id="id_form" method="post" >
         	<input type="hidden" id="wx_open_id" 	name="openId" value="<s:property value='openId'/>">
         	<input type="hidden" id="wx_state" 	name="state" value="<s:property value='state'/>">
         	<input type="hidden" id="wx_isHas" 	name="isHas" value="<s:property value='isHas'/>">
         	<input type="hidden" value="${recruitType}" name="recruitType"/>
            <!-- 完善基本信息 -->
            <div class="base_info common_form_style" style="display:block;">
                <s:if test="isHas==1"><!-- 注册并绑定 -->
                	<s:if test="recruitType != null && recruitType == 0">
		                <div class="email  common_input_style">
			                <i class="icon iconfont">&#xe639;</i>  
			                <input id="email" name="webUser.email"  type="text" placeholder="<s:text name="label.candidate.email"/>">
		                </div>
		                <div class="tetxInfo">
		                	请正确填写邮箱
		                </div>
	                </s:if>
	                <s:else>
		                <div class="  common_input_style">
		                	<i class="icon iconfont">&#xe635;</i>
		                		<input type="text" id="userName" name="webUser.userName"  placeholder="<s:text name="label.netTalent.userName"/>">
		                </div>
			            <div class="tetxInfo">
			               	<s:if test="userNameRule==1">
		                     	<s:text name="tips.mobile.websit.register.user.name.email"/>
		                  	</s:if>
				          	<s:elseif test="userNameRule==2">
				                <s:text name="tips.mobile.websit.register.user.name.ID"/>
				            </s:elseif>
				            <s:elseif test="userNameRule==3">
				                <s:text name="tips.mobile.websit.register.user.name.emailOrID"/>
				            </s:elseif>
				            <s:elseif test="userNameRule==5">
				                <s:text name="web.userNameRule.error.phoneNumber"/>
				            </s:elseif>
				            <s:else>
				                <s:text name="tips.mobile.websit.register.user.name.str"/>
				            </s:else>
			            </div>
		            </s:else>
	                <div class="userpass  common_input_style">
	                	<i class="icon iconfont">&#xe628;</i>
	               		<input id="password" name="webUser.password"  type="password" placeholder="<s:text name="label.externalSystem.password"/>">
	               		<i class="icon iconfont1 icon-yanjing1 yanjin"></i>
	               	</div>
	               	<div  class="tetxInfo">
	                	密码由8-20位的字母、数字以及下划线组成
	                </div>
	                <s:if test="recruitType == null || recruitType != 0">
		                <div class="email  common_input_style">
			                <i class="icon iconfont">&#xe639;</i>  
			                <input id="email" name="webUser.email"  type="text" placeholder="<s:text name="label.candidate.email"/>">
		                </div>
		                <div class="tetxInfo">
		                	请正确填写邮箱
		                </div>
	                </s:if>
                	<div class="confirm_btn common_btn_style" style="cursor: pointer;" onclick="doBind(1);">注册绑定</div>
                </s:if>
                <s:else><!-- 登录并绑定 -->
                	<div class=" common_input_style">
	                		<i class="icon iconfont">&#xe635;</i>
	                		<input type="text" id="userName" name="webUser.userName"  placeholder="<s:text name="请输入用户名"/>">
	                </div>
		            <div class="tetxInfo">
		                	<!--  请输入用户名或邮箱-->
		            </div>
	                <div class="userpass  common_input_style">
	                	<i class="icon iconfont">&#xe628;</i>
	               		<input id="password" name="webUser.password"  type="password" placeholder="<s:text name="请输入密码"/>">
	               		<i class="icon iconfont1 icon-yanjing1 yanjin"></i>
	               	</div>
	               	<div  class="tetxInfo">
	               			<!--  登录密码-->
	                </div>
                	<div class="confirm_btn common_btn_style" style="cursor: pointer;" onclick="doBind(0);">登录绑定</div>
                </s:else>
                
            </div>
	        </form>
        </div>
    </div>
<script type="text/javascript">
	$("#password-or").click(function(){
		var typeVal = $("input[name=password]")[0].type;
		if(typeVal == 'password'){
			$("#password").prop("type","text");
			$("#password-or").css({'background-position-x':'-300px'});
		}else{
			$("#password").prop("type","password");
			$("#password-or").css({'background-position-x':'-320px'});
		}
	});
	
	function	doBind(flg){
		var userName = document.getElementById("userName");
		var password = document.getElementById("password");
		var flag=true;
		if(flg==0){//登录绑定
			if(isEmpty(fTrim(userName.value))){
				showMessage("<s:text name='label.website.ms.regist.userNameNotNull'/>",userName);
				flag = false;
				return ;
			}
			if(isEmpty(fTrim(password.value))){
				showMessage("<s:text name='label.website.ms.regist.password'/>",password);
				flag = false;
				return ;
			}
			
		}else{//注册绑定
			<s:if test="recruitType == null || recruitType != 0">
			// 错误（BUG） #23580  start su_chchen 2018.1.17
			var email = document.getElementById("email");
			var userNameRule = '<s:property value="userNameRule" />';
			
			if(isEmpty(fTrim(userName.value))){
				showMessage("<s:text name='label.website.ms.regist.userNameNotNull'/>",userName);
				flag = false;
				return ;
			}else if(userNameRule=="1"){
	        	if(userName.value!=email.value){
	        		showMessage("<s:text name='web.userNameRule.error.email'/>",userName);
					flag = false;
					return ;
	            }
	        } else if(userNameRule=="2"){
	        	if(!isIdNum(userName.value)){
	        		showMessage("<s:text name='web.userNameRule.error.idNum'/>",userName);
					flag = false;
					return ;
	            }
	        } else if(userNameRule=="3"){
	        	if(!isIdNum(userName.value) && userName.value!=email.value){
	        		showMessage("<s:text name='web.userNameRule.error.emailOrIdNum'/>",userName);
					flag = false;
					return ;
	            }
	        }else if(userNameRule=="5"){
	        	if (!isPhoneNum(userName.value)) {
	                showMessage("<s:text name='web.userNameRule.error.phoneNumberMsg'/>",userName);
					flag = false;
					return ;
	            }
	        }else{
	        	var patrn=/^([a-zA-Z0-9]|[_@.]){6,20}$/;
				if (!patrn.exec(userName.value) ) {
					showMessage("<s:text name='label.User.name.form.error'/>",userName);
					flag = false;
					return ;
				}
	        }
			</s:if>
		// 错误（BUG） #23580  end su_chchen 2018.1.17
			if(isEmpty(fTrim(password.value))){
				showMessage("<s:text name='label.website.ms.regist.password'/>",password);
				flag = false;
				return ;
			}else{
				if (password.value.replace(/(^\s*)|(\s*$)/g, "").length<8||password.value.replace(/(^\s*)|(\s*$)/g, "").length>20 || !hasDigits(password.value) || !hasLetter(password.value)) {
					showMessage("<s:text name='label.Password.form.error'/>",password);
					flag = false;
					return ;
				}
			}
			if(isEmpty(fTrim(email.value))){
				showMessage("<s:text name='web.baidu.emailempty' />",email);
				flag = false;
				return ;
			}else{
				if (!isEmail(email.value)) {
					showMessage("<s:text name='label.Email.Form.Error' />",email);
					flag = false;
					return ;
				}
			}
		}
		$("#id_form").submit();
    }
	
	function doBind2(type){
		var flag = true;
		var userName = document.getElementById("userName");
		var password = document.getElementById("password");
		var email = document.getElementById("email");
		var recruitType = document.getElementById("recruitType");
		var userNameRule = "<s:property value='userNameRule' />";
		if(isEmpty(fTrim(userName.value))){
				showMessage("<s:text name='label.website.ms.regist.userNameNotNull'/>",userName);
				flag = false;
				return ;
		}else{
			var patrn=/^([a-zA-Z0-9]|[_@.]){6,20}$/;
			if (!patrn.exec(userName.value) ) {
				showMessage("<s:text name='label.User.name.form.error'/>",userName);
				flag = false;
				return ;
			}
		}
		if(isEmpty(fTrim(password.value))){
			showMessage("<s:text name='label.website.ms.regist.password'/>",password);
			flag = false;
			return ;
		}else{
			if (password.value.replace(/(^\s*)|(\s*$)/g, "").length<8||password.value.replace(/(^\s*)|(\s*$)/g, "").length>20 || !hasDigits(password.value) || !hasLetter(password.value)) {
				showMessage("<s:text name='label.Password.form.error'/>",password);
				flag = false;
				return ;
			}
		}
		if(isEmpty(fTrim(email.value))){
			showMessage("<s:text name='web.baidu.emailempty' />",email);
			flag = false;
			return ;
		}else{
			if (!isEmail(email.value)) {
				showMessage("<s:text name='label.Email.Form.Error' />",email);
				flag = false;
				return ;
			}
		}
		if(flag){
			doAjaxRegist(userName.value,password.value,email.value,recruitType.value);
		}
	}
	function doAjaxRegist(userName, password, email,recruitType) {
		var param = '<s:property value="param"/>';
		var ajaxUrl = '<as:url value="/%{corpCode}/mobweb/v8/ajaxAccountBinding"/>';
		$.ajax({
			//请求的路径
			url : ajaxUrl,
			//这是参数
			data : {
				userName : userName,
				password : password,
				email : email,
				recruitType : recruitType,
				type : 0
			},
			//是否异步
			async : false,
			//请求的方法
			type : "post",
			timeout : 3000,
			//请求成功时调用
			success : function(msg) {
				//alert(msg);
				var userNameObj = document.getElementById("userName");
				var emailObj = document.getElementById("email");
				if (msg == 'ok') {
					//成功返回个人中心。
					var url = "<as:url value="/%{corpCode}/mobweb/v8/userCenter?brandCode=${brandCode}"/>";
					if(param != ""){
						<s:if test="distance != null">
							url = "<as:url value="/%{corpCode}/mobweb/v8/position/detail?paramStr=%{param}&distance=%{distance}"/>";
						</s:if>
						<s:else>
							url = "<as:url value="/%{corpCode}/mobweb/v8/position/detail?paramStr=%{param}"/>";
						</s:else>
					}
					window.location = url;
				} else if (msg == 'userNoExists') {
					//用户不存在
					showMessage("<s:text name='label.User.is.not.existed' />",userNameObj);
				} else if (msg == 'emailExists') {
					//邮箱已存在
					showMessage("<s:text name='label.Email.has.been.existed' />",emailObj);
				} else if (msg == 'userNameExists') {
					//用户名已存在 
					showMessage("<s:text name='label.User.is.existed' />",userNameObj);
				}
			},
				//请求失败时调用
				error : function() {
					alert("<s:text name = 'label.Network.may.have.problems' />");
				}
		});
	}
	function showMessage(info,obj){
		$.modal({
			title: info,
			buttons: [
				{ text: "<s:text name = 'mobweb.position.ok' />", className: "default",onClick: function(){ obj.focus();}}
			]
		});
	}
	$(".yanjin").on("click",function(){
		var $this = $(this);
		var $idpass = $("#password");
		if($this.hasClass("icon-yanjing1")){
			$this.removeClass("icon-yanjing1").addClass("icon-yanjing");
			//$idpass.attr("type","text");
			$idpass[0].type = "text";
		}else if($this.hasClass("icon-yanjing")){
			$this.removeClass("icon-yanjing").addClass("icon-yanjing1");
			//$idpass.attr("type","password");
			$idpass[0].type = "password";
		}
	});
	
	 function isIdNum(userName){
        var idNum  = /(^(\d{15}|\d{17}[\dxX])$)/;
        return idNum.test(userName);
    }
	 
	 function isPhoneNum(userName){
    	/**
    	 * 验证手机号码
    	 * 
    	 * 移动号码段:139、138、137、136、135、134、150、151、152、157、158、159、182、183、187、188、147
    	 * 联通号码段:130、131、132、136、185、186、145
    	 * 电信号码段:133、153、180、189
    	 * 添加： 170,176,177,178
    	 * @param userName
    	 * @return
    	 */
    	var phoneNum = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[0,6-8])|(18[0,5-9]))\d{8}$/; 
    	return phoneNum.test(userName);
	 }
</script>
</body>
</html>