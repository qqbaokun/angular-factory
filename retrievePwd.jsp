<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="include.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<cpt:initWebsite brandCode="${brandCode}"/>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>设置登录密码</title>
	
	<script type="text/javascript" src="<as:jsUrl value="/javascript/jquery/jquery-1.8.2.min.js"/>"></script>
	
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/common.css"/>"/>
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/swiper.min.css"/>"/>
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/activateAccountSuccess.css"/>">
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/style.css"/>"/>
	<style type="text/css">
        * {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }
        
        a {
            text-decoration: none;
        }
        
        html,
        body {
            width: 100%;
            font-family: "微软雅黑";
            line-height: 1;
        }
        
        .wrapper {
            width: 100%;
            padding: 40px 0 67px 0;
            position: relative;
            background: #f9f9f9;
        }
        
        .container {
            box-sizing: border-box;
            border: 1px solid #e1e1e1;
            background: white;
            margin: 0 auto;
            padding: 32px 0 0 42px;
        }
        
        @media screen and (min-width: 1366px) and (max-width: 1920px) {
            .container {
                width: 1200px;
                height: 827px;
            }
        }
        
        @media screen and (max-width: 1366px) {
            .container {
                width: 900px;
                height: 584px;
            }
        }
        
        .liucheng_tips {
            width: 476px;
            height: 31px;
            line-height: 31px;
            text-align: center;
            margin: 0 auto;
            margin-top: 40px;
			font-size: 16px;
			font-weight: bolder;
        }
        
        .user_info {
            width: 438px;
            margin: 0 auto;
            overflow: hidden;
            padding-right: 107px;
        }
        
        .password input,
        .password_again input {
            width: 308px;
            height: 42px;
            outline: none;
            border: 0;
            padding-left: 10px;
            background: rgb(237, 236, 237);
        }
        
        .password,
        .password_again {
            margin-top: 38px;
            float: right;
        }
        
        .next_btn {
            width: 320px;
            height: 44px;
            background: rgb(220, 219, 220);
            border-radius: 4px;
            color: black;
            float: right;
            margin-top: 38px;
            text-align: center;
            line-height: 44px;
            cursor: pointer;
        }
        .startMain{
			width: 100%;
			border: none;
			min-height: 170px;
            padding-top: 0;
            box-sizing: border-box;
            height: auto;
            padding-bottom: 40px;
			margin: 0;
        }
        .startMain p{
            font-size: 15px;
            color: #b5b5b8;
        }
        .startMain-img{
            margin-top: 20px;
        }
		.button {
			margin: 30px 20px 0;
		}
    </style>
	
</head>
<body>
<!-- 最外层使用table，为了适应outlook -->
<table style="width:1200px;font-family:'Microsoft YaHei';color: #777777;background-color:#fff;font-size: 14px;border: 1px solid #eaeaea;margin: 0 auto;">
    <!--图片-->
    <tr>
        <td align="center">
            <img id src="<as:imgUrl  value="/v8/static/images/email/letterbg.png"/>" alt="" width="100%"/>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding:20px;"><div style="width:100%;text-align:left;">
		<div class="logo-img" style="border-bottom: 1px solid #cccccc; text-align: left; margin: 0 10px; padding: 20px 0;"><img src="<as:imgUrl value="/htmlPages/${corpCode}/initWebsite/${logoId}.jpeg" />" alt="" style="max-height: 40px; max-width: 160px;"></div>
			<div id="edtDiv">
			<s:if test="errorMessage == null">
				<div class="container_liucheng" style="display:block; padding-bottom: 30px;">
	                <div class="liucheng_tips">设置您的登陆密码</div>
	                <div class="user_info">
	                    <div class="password">
	                        <input id="newpassword" type="password" placeholder="请输入登陆密码，6位以上">
	                    </div>
	                    <div class="password_again">
	                        <input id="newpassword2" type="password" placeholder="请再次输入登陆密码">
	                    </div>
	                    <input type="hidden" id="userEmail" value="<s:property value="userEmail"/>">
	                    <input type="hidden" id="timestamp" value="<s:property value="tstamp"/>">
	                    <input type="hidden" id="authid" value="<s:property value="authid"/>">
	                    <div id="sub_btn" class="next_btn">确认</div>
	                </div>
	            </div>
			</s:if>
			<s:else>
				<input type="hidden" id="errorMessage" value="<s:property value="errorMessage"/>">
				<h2 style="text-align: center;margin-top: 40px;">链接已失效</h2>
			</s:else>
			</div>
			<div id="msgDiv" class="startMain" style="display: none;">
				<h2 id="msg" style="text-align: center;margin-top: 40px;"></h2>
			</div>
		</div></td>
    </tr>
</table>

<s:if test="errorMessage == null">
<script>
	$("#sub_btn").click(function(){
		var newpassword = $("#newpassword").val();
		var newpassword2 = $("#newpassword2").val();
		if(newpassword == ""){
			alert("请输入密码！");
			$("#newpassword").focus();
			return;
		}else{
	  		if (newpassword.length < 6){
		   		alert("密码要求为6位及以上");
		   		$("#newpassword").focus();
		    	return;
		  	}
		}
		if(newpassword2 == ""){
			alert("请输入确认密码！");
			$("#newpassword2").focus();
			return;
		}
		if(newpassword2 != newpassword){
			alert("密码不一致！");
			$("#newpassword2").focus();
			return;
		}
		
		var userEmail = $("#userEmail").val();
		var timestamp = $("#timestamp").val();
		var authid = $("#authid").val();
		var corpCode = '<s:property value="corpCode"/>';
		$.ajax({
            url : '<as:tokenUrl value="/${corpCode}/web/mode400/changePassword" />',
            data : {newpassword:newpassword,userEmail:userEmail,timestamp:timestamp,
            	authid:authid,corpCode:corpCode} ,
            dataType: "json",
            type : "post",
            success : function(data) {
                if(data.code == '00'){
                	$("#edtDiv").hide();
                	$("#msgDiv").show();
                	$("#msgDiv").html("<h2 id=\"msg\" style=\"text-align: center;margin-top: 40px;\">修改成功！</h2>"
               					 	+"<p>若不能直接点击登录，可以复制以下链接到浏览器。</p>"
               					 	+"<a id=\"a1\" href=\"/wt/${corpCode}/web/index\" target=\"_blank\">"
               					 		+"http://"+window.location.host + "/wt/${corpCode}/web/index"	
               					 	+"</a>"
               					 	+"<div class=\"btnCon\">"
               					 	+"<button class=\"button width320 mc-bgc\" data-text=\"直接登录\" onclick=\"window.open('/wt/${corpCode}/web/index')\">"
               					 		+"<span>直接登录</span>"
               					    +"</button>");
                }else{
                	alert(data.msg);
                }              
            },
            error : function() {
            	alert('<s:text name="mobweb.position.bad.internet.connection" /> !');
            }
        });
	});
</script>
</s:if>

</body>
</html>