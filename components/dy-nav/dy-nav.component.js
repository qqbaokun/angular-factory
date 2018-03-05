'use strict';

angular.module('byComponent').component('dyNav', {
    bindings: {

    },
    templateUrl: 'components/dy-nav/dy-nav.template.html',
    controller: function($scope,$rootScope,$timeout, queryData, $http,$location,$state) {
        var self = this;
        $scope.language = language;
        $scope.bindSuccess = false;	

        $scope.$watch('searchResult',function(){
            $rootScope.searchResult = $scope.searchResult;
        });

        //检查用户是否登录
        $http.get(ServerURL+'/web/mode400/checkWebUserLogin?r='+Math.random()).success(function(data){
            if(data.code == '07'){
                $scope.userName = false;
            }else{
                $scope.userName = true;
                $scope.canBindCode = data.data.canBindCode;
            	$scope.canChangePassword = data.data.canChangePassword;
            	if(data.data.headimgUrl){
            		$scope.headimgUrl = data.data.headimgUrl;
            	}else{
            		$scope.headimgUrl = 'images/defaultHeadImage.png';
            	}         	
            }
        }).error(function(){
        	window.location.reload();
        });

        deferred.done(function(data){
            $scope.nav = data.menu.data;
            $scope.corpLogoUrl = data.corpLogoUrl;
            var navType = data.menu.type;
            //nav显示样式
            if(navType*1 == 1){
                $scope.className =true;
            }else{
                $scope.className =false;
            }
        });
        //点击nav效果
        $scope.changeOffset = function(index,type){
            sessionStorage.setItem("targetIndex",index);
            switch (type){
                case 1:
                    $('html,body').animate({scrollTop: (height-56)*index}, 300);
                    break;
                case 2:
                    $state.go("index");
                    break;
            }

        };
        //返回首页
        $scope.gotoHomepage = function(){
        	sessionStorage.removeItem("targetIndex");
        	window.location = ServerURL+"/web/index";
        };
        //点击登录按钮
        $scope.login = function() {
        	showLoginPage(1);
        };
        /*个人中心*/
        $scope.personCenter = function() {
        	console.log($state.current.name);
        	if($state.current.name == "personalCenter"){
        		$state.reload($state.current.name);
        	}else{
        		$state.go("personalCenter");
        	}           
        };
        /*绑定微信*/
        $scope.boundWeChat = function() {        	
        	$('#bind-wechat').modal('show'); 
        	var qrImgTime = new Date().getTime();
        	var setIntBind;
        	$scope.bindImg = ServerURL + '/web/index/codeCreate?recruitType=0&operateType=bindCode&t=' + qrImgTime + '&r='+Math.random();
        	
        	$scope.boundWeChatInterval = function(){   		
                var flg = true;                             
                setIntBind=setInterval(function(){
                	if(flg){
                		$.ajax({
    					    type: "GET",
    					    url: ServerURL + '/web/index/codeQuery?recruitType=0&operateType=bindCode&t=' + qrImgTime + '&r='+Math.random(),
    					    async: false,
    					    success: function(ret){
    					    	var jo=JSON.parse(ret);
    						    if(jo.retCode=="0"){	
    						    	//绑定成功
    						    	$timeout(function(){
                                        flg=false;
        						        $scope.bindSuccess = true;  
    						    	},0);
    						    	$timeout(function(){
    						    	    $('#bind-wechat').modal('hide');
        						        window.location.reload();  
    						    	},1000);   
    						    }else if(jo.retCode=="-1"){		
    						    	//错误信息
    						    	clearInterval(setIntBind);
    						    	alert(jo.retMsg,function(){
    						    		qrImgTime = new Date().getTime();
    						        	$scope.bindImg = ServerURL + '/web/index/codeCreate?recruitType=0&operateType=bindCode&t=' + qrImgTime + '&r='+Math.random();
    						        	$timeout(function(){
    						        		$scope.boundWeChatInterval();
    						        	},1000);
    						    		
    						    	});
    						    }
    					    }
    					});
    				}		
        		 },2000);
        	};
        	
        	$scope.boundWeChatInterval();
        };
        /*修改密码*/
        $scope.modifyPassword = function() {
        	$('#change-password').modal('show');
        	$scope.changePassword = function(modifyOldPass,modifyOnePass){
        		var params = {
                        oldpassword: modifyOldPass,
                        newpassword: modifyOnePass
                    };
        		queryData.getData('/web/mode400/editPassword',params).then(function(data){
                    console.log(data);
                    if(data.code == '00'){
                        alert(data.content);
                    	$('#change-password').modal('hide');
                    }else{
                    	$scope.modifyOldPass = '';
                    	alert(data.content);
                    }
                });
        	}
        };
        /*退出*/
        $scope.exitLogin = function() {
        	$('#exit-login').modal('show');
        	$scope.logoutLogin = function(){
        		console.log(1);
        		queryData.getData('/web/mode400/webUserLogout').then(function(data){
                    if(data.code == '00'){
                    	$('#exit-login').modal('hide');
                        $scope.userName = false;
                        sessionStorage.setItem("targetIndex",0);
                        window.location = "/wt/"+copyCode+"/web/index";
                    }
                });
        	}
        };

        
        $(document).ready(function(){
        	$(".main input").each(function(i,v){
                $(v).focus(function(){
                    $(this).css({background:"#fff"}).attr("placeholder","");
                });
                $(v).blur(function(){
                    var placeholderText = $(this).attr("data-text");
                    if($(this).val()){
                        $(this).css({background:"#fff"});
                    }else{
                        $(this).css({background:"#efefef"}).attr("placeholder",placeholderText);
                    }
                });
            });
        });
    }
});