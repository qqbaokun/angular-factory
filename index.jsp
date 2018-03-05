<!DOCTYPE html>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="include.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<cpt:initWebsite brandCode="${brandCode}"/>

<html ng-app="myApp" ng-controller="myCtrl" id="myApp" ng-cloak class="ng-cloak">

<head lang="en">
    <meta charset="UTF-8">

    <title ng-bind="pageName"></title>
    <base href="<%=basePath%>jsp/web/templets/templet400/"></base>
    <!--icon图标-->
    <link rel="stylesheet" href="iconFont/iconfont.css"/>
    <link rel="stylesheet" href="js/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="js/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css"/>
    <link rel="stylesheet" href="css/swiper.min.css" />

    <link rel="stylesheet" href="css/detail.css"/>
    <link rel="stylesheet" href="css/common.css" />
    <link rel="stylesheet" href="css/style.css" />
	<!--[if lt IE 10]>
		<style>
			.modal-dialog{margin-top: 100px;}
		</style>
	<![endif]-->
    <link rel="stylesheet" href="js/bootstrap-select/css/bootstrap-select.css"/>
    
    <script>
    	var versionNumber = '<s:property value="versionNumber"/>';
    	var brandCode = '<s:property value="brandCode"/>';
    	var webTitleName = '<s:property value="webTitleName"/>';
    	if(webTitleName == ''){
    		webTitleName = "首页";
    	}
    	var siteSerch = [<s:property value='siteSerch' escapeHtml='false'/>];
    </script>

    <script src="js/jquery.js"></script>
    <script src="js/common.js"></script>
    <!--angular-->
    <script src="js/angular-1.5.8.js"></script>
    <!--angular 表单验证-->
    <script src="js/angular-messages.js"></script>
    <!--angular ui-router-->
    <script src="js/ui-router.js"></script>
    <!--angular服务-->
    <script src="js/dy.service.js"></script>
    <!--angular指令-->
    <script src="js/dy.directive.js"></script>
    <!--angular过滤器-->
    <script src="js/dy.filter.js"></script>
    <!--文件上传-->
    <script src="js/ng-file-upload/ng-file-upload-shim.js"></script>
    <script src="js/ng-file-upload/ng-file-upload.min.js"></script>
    <!--angular loading bar-->
    <link rel="stylesheet" href="js/angular-loading-bar/loading-bar.css">
    <script src="js/angular-loading-bar/loading-bar.js"></script>



    <!--angular自定义组件-->
    <script src="components/by_component.module.js"></script>
    <script src="components/dy-main/dy-main.component.js"></script>
    <script src="components/dy-nav/dy-nav.component.js"></script>
    <script src="components/dy-footer/dy-footer.component.js"></script>
    <script src="components/dy-home-page/dy-home-page.componnet.js"></script>
    <script src="components/dy-recruitment-type/dy-recruitment-type.component.js"></script>
    <script src="components/dy-about-us/dy-about-us.component.js"></script>
    <script src="components/dy-right-bar/dy-right-bar.component.js"></script>
    <script src="components/dy-login/dy-login.component.js"></script>
    <script src="components/dy-aside/dy-aside.component.js"></script>
    <script src="components/dy-position/dy-position.component.js"></script>
    <script src="components/dy-xuanjianghui/dy-xuanjianghui.component.js"></script>
    <script src="components/dy-personal-center/dy-personal-center.component.js"></script>
    <script src="components/dy-preview-resume/dy-preview-resume.component.js"></script>
    <script src="components/dy-activate-account/dy-activate-account.component.js"></script>
    <script src="components/dy-edit-resume/dy-edit-resume.component.js"></script>
    <script src="components/dy-form/dy-form.component.js"></script>
    <script src="components/dy-form-special/dy-form-special.component.js"></script>
    <script src="components/dy-search-result/dy-search-result.component.js"></script>
    <script src="components/dy-resume-list/dy-resume-list.component.js"></script>
    <script src="components/dy-apply-position/dy-apply-position.component.js"></script>
    <script src="components/dy-delivery-success/dy-delivery-success.component.js"></script>
    <script src="components/dy-delivery-fail/dy-delivery-fail.component.js"></script>
    <script src="components/dy-corporate-culture/dy-corporate-culture.component.js"></script>
    <script src="components/dy-assessment-tips/dy-assessment-tips.component.js"></script>
    <!--获取配置信息-->
    <script type="text/javascript">
        var myApp = angular.module("myApp", ["ui.router","dy.service","dy.directive","dy.filter", "byComponent","angular-loading-bar","ngFileUpload"]);

        myApp.config(function ($stateProvider, $urlRouterProvider,cfpLoadingBarProvider) {
            //配置loading
            configuredLoadingBar(cfpLoadingBarProvider);
            //配置路由
            $urlRouterProvider.otherwise("/");
            $urlRouterProvider.rule(function ($injector, $location,queryData) {
            	//后台生成新模板时刷新
            	getVersionNumber();         
            });
            $stateProvider
                    //主页
                    .state("index", {
                        url: "/",
                        template: '<dy-main></dy-main>'
                    })
                    //职位列表
                    .state("position", {
                        url: "/position/:option",
                        template: '<dy-aside></dy-aside>'
                    })
                    //个人中心
                    .state("personalCenter", {
                        url: "/pc",
                        template: '<dy-personal-center></dy-personal-center>'
                    })
                    //没有应聘
                    .state("noApply", {
                        url: "/na",
                        template: '<dy-no-apply></dy-no-apply>'
                    })
                    //简历预览
                    .state("previewResume", {
                        url: "/pr/:option",
                        template: '<dy-preview-resume></dy-preview-resume>'
                    })
                    //激活账号
                    .state("activateAccount", {
                        url: "/aa",
                        template: '<dy-activate-account></dy-activate-account>'
                    })
                    //编辑简历
                    .state("editResume", {
                        url: "/er/:option",
                        template: '<dy-edit-resume></dy-edit-resume>'
                    })
                    //搜索结果
                    .state("searchResult", {
                        url: "/sr/:option",
                        template: '<dy-search-result></dy-search-result>'
                    })
                    //申请职位
                    .state("applyPosition", {
                        url: "/ap/:option",
                        template: '<dy-apply-position></dy-apply-position>'
                    })
                    //投递成功提示
                    .state("deliverySuccess", {
                        url: "/ds/:option",
                        template: '<dy-delivery-success></dy-delivery-success>'
                    })
                    //投递失败提示
                    .state("deliveryFail", {
                        url: "/df/:option",
                        template: '<dy-delivery-fail></dy-delivery-fail>'
                    })
                     //测评提示
                    .state("assessmentTips", {
                        url: "/at/:option",
                        template: '<dy-assessment-tips></dy-assessment-tips>'
                    })
                    //企业文化
                    .state("corporateulture", {
                        url: "/cc/:option",
                        template: '<dy-corporate-culture></dy-corporate-culture>'
                    })

        });
        myApp.controller("myCtrl", function($rootScope,$scope,queryData,$timeout,$http,$location,$q,cfpLoadingBar,$stateParams,$state) {
			
        });
    </script>
</head>

<body define-color>
    <!--Start--导航-->
    <dy-nav></dy-nav>
    <!--End--导航-->

    <!--Start--内容区-->
    <div id="main-content" ui-view></div>
    <!--End--内容区-->

    <!--Start--版权所有-->
    <dy-footer></dy-footer>
    <!--End--版权所有-->

</body>
<script src="js/bootstrap/js/bootstrap.js"></script>
<script src="js/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js" charset="UTF-8"></script>
<script src="js/bootstrap-datetimepicker/js/bootstrap-datetimepicker.zh-CN.js"></script>
<script src="js/swiper.min.js"></script>
<script src="js/bootstrap-select/js/bootstrap-select.min.js"></script>
</html>