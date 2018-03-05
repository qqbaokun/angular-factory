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
    <title>激活成功</title>
    
    <script type="text/javascript" src="<as:jsUrl value="/javascript/jquery/jquery-1.8.2.min.js"/>"></script>
    
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/common.css"/>"/>
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/swiper.min.css"/>"/>
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/activateAccountSuccess.css"/>">
    <link rel="stylesheet" href="<as:cssUrl value="/jsp/web/templets/templet400/css/style.css"/>"/>
	
	<style type="text/css">
        .startMain{
            padding-top: 0;
            box-sizing: border-box;
            height: auto;
            padding-bottom: 40px;
        }
        .startMain p{
            font-size: 15px;
            color: #b5b5b8;
        }
        .startMain-img{
            margin-top: 20px;
        }
        h2{
            margin-top: 40px;
        }
        .button{
            margin: 30px 20px 0;
        }
        .logo-img{
            border-bottom: 1px solid #cccccc;
            text-align: left;
            margin: 0 40px;
            padding: 20px 0;
        }
        .diamond-main{
            padding: 5px 0;
        }
        .diamond-main span:nth-child(odd){
            background-color: #ffa488;
        }
        .diamond-main span:nth-child(even){
            background-color: #5984b2;
        }
        .diamond{
            display: inline-block;
            width: 40px;
            height: 10px;
            margin: 0 6px;
            transform: skew(-40deg);
        }
        .button--winona::after {
            top: -2px;
        }
        #a1:hover { 
			color: blue;
		}
    </style>
	
</head>
<body>

	<div class="startMain" style="margin: 0px auto 20px;">
        <div class="diamond-main">
            <img id src="<as:imgUrl  value="/v8/static/images/email/letterbg.png"/>" alt="" width="100%"/>
        </div>

        <div class="logo-img">
            <img src="<as:imgUrl value="/htmlPages/${corpCode}/initWebsite/${logoId}.jpeg" />" alt="" style="max-height: 40px; max-width: 160px;"/>
        </div>
		<s:if test="actionMessage != null">
			<img class="startMain-img" src="<as:imgUrl  value="/v8/static/images/webStyle400/activation-success.png"/>"/>
	        <h2>${actionMessage}</h2>
		</s:if>
		<s:else>
			<img class="startMain-img" src="<as:imgUrl  value="/v8/static/images/webStyle400/activation-success.png"/>"/>
	        <h2>激活成功</h2>
		</s:else>
		<p>若不能直接点击登录，可以复制以下链接到浏览器。</p>
        <a id="a1" href="/wt/${corpCode}/web/index" target="_blank"></a>
        <div class="btnCon">
            <button class="button width320 mc-bgc" data-text="直接登录" onclick="window.open('/wt/${corpCode}/web/index')">
                <span>直接登录</span>
            </button>
        </div>
    </div>
    
    <script type="text/javascript">
    	$("#a1").html("http://"+window.location.host + "/wt/${corpCode}/web/index");
    </script>

</body>

	<script type="text/javascript" src="<as:jsUrl value="/jsp/web/templets/templet400/js/swiper.min.js"/>"></script>
	<script type="text/javascript" src="<as:jsUrl value="/jsp/web/templets/templet400/js/common.js"/>"></script>

</html>