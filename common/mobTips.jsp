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
    <title>提示</title>
 <script type="text/javascript">
   function closeWin(){
	   WeixinJSBridge.call('closeWindow');
   }
 </script>
</head>
<body class="sh-default">
    <div class="sh-main">
           <div class="sh_img">
               <img src="<%=basePath %>component1000/corp/sohu/images/pic1.png" alt="" style="height:25%">
               <p><s:if test="haveMessage || message != null">
                    <s:property value="message" escapeHtml="false" />
                </s:if>
                <s:else>登录成功!</s:else><br/></p>
           </div>
           <div class="nav"></div>
    </div>
</body>
<script type="text/javascript">
	document.addEventListener('touchmove', function(e){e.preventDefault()}, false);
</script>
</html>