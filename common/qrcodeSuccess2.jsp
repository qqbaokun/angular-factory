<%@ page language="java" pageEncoding="utf-8"%>
<%@ include file="../include.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0">
    <link rel="stylesheet" type="text/css" href="<%=basePath %>component1000/corp/sohu/style/sohu/qrcode.css"  />
    <script type="text/javascript" src="<%=basePath %>javascript/jquery/jquery-1.8.2.min.js"></script>
    <style type="text/css">
    </style>
    <title>扫码登录</title>
 <script type="text/javascript">
   function login(){
	   $("#form1").submit();
   }
   
   function closeWindow(){
	   $.get('<as:tokenUrl value="/%{corpCode}/web/index/codeLogin!codeCancelLogin"/>&state=${state}',function(data){
			 if(data==null || data==''){
				 return;
			 }
		 });
	   WeixinJSBridge.call('closeWindow');
   }
 </script>
</head>
<body class="sh-default">
 <form action="<as:url value='/${corpCode}/web/index/codeLogin' />" method="post" id="form1">
    <input type="hidden" value="${state}" name="state"/>
    <input type="hidden" value="${openId}" name="openId"/>
    <input type="hidden" value="${recruitType}" name="recruitType"/>
    <input type="hidden" value="400" name="webStyle"/>
 </form>
    <div class="sh-main" <s:if test='webStyle=="400"'>style="display:none;"</s:if>>
           <div class="sh_img">
               <img src="<%=basePath %>component1000/corp/sohu/images/pic1.png" alt="" style="height:25%">
               <p>即将在电脑上登录<br/>请确认是否本人操作</p>
           </div>
           <div class="nav">
                <ul class="clearfix">
                	<s:if test="isHas==0">
	                    <li><a href="javascript:void(0);" onclick="login()" style="background:#31A4F7">确认登录</a></li>
	                    <li><a href="javascript:void(0);" onclick="closeWindow()" class="link_fff">取消登录</a></li>
                	</s:if>
                </ul>	
            </div>
    </div>
</body>
<script type="text/javascript">
	function bind(flg){
		 $("#form1").attr("action","<as:url value='/${corpCode}/web/index/codeToBind' />?isHas="+flg);
		 $("#form1").submit();
	}
	document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
	
	window.onload = function(){
		<s:if test='isHas==0 && webStyle=="400"'>
			login();
		</s:if>
	}
</script>
</html>