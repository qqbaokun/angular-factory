'use strict';
angular.module('byComponent').component('dyLogin', {
    bindings: {
        userName: "="
    },
    templateUrl: 'components/dy-login/dy-login.template.html',
    controller: ['$scope','queryData','$timeout','$http','$state', function ( $scope,queryData,$timeout,$http,$state) {
        var self = this;
        $scope.language = language;
        
        deferred.done(function(data){
            $scope.corpLogoUrl = data.corpLogoUrl;
        });
        
        $scope.register = {
            email: '',
            validateCode: ''
        };
        
        $scope.loginHook4 = false;
        $scope.loginHook5 = false;
        $scope.loginHook6 = false;
        /**
         * 获取验证码的返回值
         * 定义刷新验证码函数
         * 1.注册，2.忘记密码
         * */
        function refreshValidateCode(type){
            switch (type){
                case 1:
                	$scope.login = {
                    	email: '',
                    	password: ''
                    };
                    $.ajax({
                        type: "GET",
                        url: ServerURL+ '/web/index/webValidateCode?validateCodeKey=regist',
                        cache:false,
                        dataType: "text",
                        async:false,
                        success: function(data){
                            $scope.registerCodeUrl = ServerURL +'/web/index/webUserLogin!genValidateCodeNew?validateCodeKey=regist&code1='+ data + '&code2=' + Math.random();
                        }
                    });
                    break;
                case 2:
                    $.ajax({
                        type: "GET",
                        url: ServerURL+ '/web/index/webValidateCode?validateCodeKey=',
                        cache:false,
                        dataType: "text",
                        async:false,
                        success: function(data){
                            $scope.findPassCodeUrl = ServerURL +'/web/index/webUserLogin!genValidateCodeNew?validateCodeKey=&code1='+ data + '&code2=' + Math.random();
                        }
                    });
                    break;
                case 3:
                	$scope.register = {
                    	email: '',
                    	password: '',
                    	password2: '',
                    	validateCode: ''
                    };
                    break;
            }

        }
        //点击验证码区域刷新验证码
        $scope.refreshCode = function(type){
            refreshValidateCode(type);
        };

        //登录
        $scope.loginUser = function(user){
            var params = user;
            params.userName = user.email;           
            $http.get(ServerURL+"/web/mode400/webUserLogin?r="+Math.random(),{params:params}).success(function(data){
            	console.log(data);
            	if(data.code == '00'){
            		$('.loginContent,.loginContentBack').hide();
                    self.userName = true;
                    window.location.reload();
            	}else if(data.code == '06'){
            		$('.errorPass').show();
            	}    
    		}).error(function(error){
    			
    		});
        };
        //注册
        $scope.registerUser = function(user){
            var params = $.extend(true,{},user);
            params.userName = user.email;
            delete params.password2;
            console.log(params);

            $http.get(ServerURL+'/web/mode400/webUserRegister?r='+Math.random(),{params:params}).success(function(data){
            	console.log(data);
                if(data.code == '00'){
                    showLoginPage(4);
                }else{
                	$timeout(function(){               		
                        refreshValidateCode(1);
                        user.validateCode = '';  
                    });
                	alert(data.content);
                }
                var $loginMain = $(".login-main");
                $loginMain.css({"margin-top":"-"+$loginMain.height()/2+"px"});
            }).error(function(){
            	
            });          
        };
        //忘记密码
        $scope.findPassUser = function(user){
            var params = user;
            params.brandCode = 1;
            $http.get(ServerURL+'/web/mode400/retrievePwdUrlByEmail?r='+Math.random(),{params:params}).success(function(data){
            	console.log(params);
                console.log(data);
                if(data.code == '00'){
                    showLoginPage(5);
                    //清空密码
                    $scope.login.password = '';
                    $scope.register.email = params.userEmail;
                }else{
                	$timeout(function(){
                        refreshValidateCode(2);
                        alert(data.content);
                    });
                }

            }).error(function(){
            	
            });
        };
        //邮箱验证 正则表达式
        var ret = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

        var loginContent = $('.loginContent');
        var loginPage = $('.login-page');//登录部分
        var register = $(".register");//注册部分
        //登录部分验证信息
        var noFindEmail = loginPage.find(".noFindEmail");
        var loginhook2 = loginPage.find(".login-hook2");
        var loginHook5 = loginPage.find(".login-hook5");
        //注册部分验证信息
        var reNoFindEmail = register.find(".noFindEmailThe");
        var reLoginhook2 = register.find(".login-hookOen");
        var reLoginHook6 = register.find(".login-hook6");
        
        $(document).ready(function(){
            $('.goRight').css({'border-left-color': mainColor});
            //控制旋转的变量
            var kai;
            $(".right").on("click",function(){            	
                $('.container-fluid').find('.login-hook2,.login-hook5,.noFindEmail,.errorPass').hide();
                $('.container-fluid').find('input[name=email]').css({background:"#efefef"}).attr("placeholder",$('.container-fluid').find('input[name=email]').attr("data-text"));
                $('.container-fluid').find('input[name=login]').css({background:"#efefef"}).attr("placeholder",$('.container-fluid').find('input[name=login]').attr("data-text"));
                
                reNoFindEmail.hide();
                reLoginhook2.hide();
                reLoginHook6.hide();
                
                if($(".login-page").css("display") == "block"){
                    kai = true;
                }else{
                    kai = false;
                }
                var $loginMain = $(".login-main");
                $(".login-main").addClass("switching");
                setTimeout(function(){
                    $(".login-main").removeClass("switching")
                },800);
                setTimeout(function(){
                    if(kai){
                        $(".login-page").css("display","none");
                        $(".register").css("display","block");
                        $loginMain.css("margin-top","-"+$loginMain.height()/2+"px");
                        kai = !kai;
                        return
                    }
                    else{
                        $(".login-page").css("display","block");
                        $(".register").css("display","none");
                        $loginMain.css("margin-top","-"+$loginMain.height()/2+"px");
                        $(".registerEmail").trigger("blur");
                    	$(".registerPassword").trigger("blur");
                    	$(".registerPassword2").trigger("blur");
                    	$(".captchaInput").trigger("blur");
                    	$(".contrastCipher").hide();
                    	$scope.myFormRegister.password2.$dirty = false;
                        kai = !kai;
                        return
                    }
                },400);

            });


            //  关闭按钮，移除来解决关闭问题。
            $(".closeBtn").on("click",function(){
                showLoginPage(0);
               // $state.go('index');
            });

            $(".activateAccountKnow").on("click",function(){
                showLoginPage(0);
            });
        
            //切换登录方式
            var running = true;
            var qrImgTime = new Date().getTime();
            var setInt;
            $scope.qrImg = ServerURL + '/web/index/codeCreate?recruitType=0&t=' + qrImgTime + '&r='+Math.random();  
            $(".qh-QR").on("click",function(){
            	//二维码登录     
                var flg = true;
                setInt=setInterval(function(){
                	if(flg){
        			    $.get(ServerURL + '/web/index/codeQuery?recruitType=0&t=' + qrImgTime + '&r='+Math.random(),function(ret){
        			    	var jo=JSON.parse(ret);
        				    if(jo.retCode=="0"){	
        				    	//用户登录了
        				        flg=false;
        				        window.location.reload();
        				    }else if(jo.retCode=="-1"){		
        				    	//错误信息
        				    	clearInterval(setInt);
        				    	flg=false;
        				    	alert(jo.retMsg);
        				    }
        			    });
        			}		 
        		 },2000);
            	if(running){
                    running = false;
                    $(".login-page").addClass("div-opacity");//添加有淡入淡出效果的类名
                    $(".QRLogin").css("display","block");

                    $(".passLogin").css("display","block");
                    setTimeout(function(){
                        $(".login-page").removeClass("div-opacity");
                        $(".QRLogin").css("display","block").removeClass("img-2").addClass("img-1");
                        $(".passLogin").css("display","none").removeClass("img-1").addClass("img-2");
                        running = true;
                    },1200);
                }

            });          
            //切换二维码
            $(".qh-pass").on("click",function(){
            	clearInterval(setInt);
                if(running){
                    running = false;
                    $(".login-page").addClass("div-opacity");//添加有淡入淡出效果的类名
                    $(".QRLogin").css("display","block");
                    $(".passLogin").css("display","block");
                    setTimeout(function(){
                        $(".login-page").removeClass("div-opacity");
                        $(".passLogin").css("display","block").removeClass("img-2").addClass("img-1");
                        $(".QRLogin").css("display","none").removeClass("img-1").addClass("img-2");
                        running = true;
                    },1200);
                }

            });
            //登录部分交互效果start
            $(".row input").each(function(i,v){
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
            //忘记密码
            $(".forgetPass").on("click",function(){
                showLoginPage(3);
            });
            //想起密码
            $('.rememberPass').on("click", function () {
                showLoginPage(1);
                $scope.findPass = {
                		userEmail:'',
                		validateCode:''
                };
                $('.findPass').find('input[name=userEmail]').css({background:"#efefef"}).attr("placeholder",$('.findPass').find('input[name=userEmail]').attr("data-text"));
                $('.findPass').find('input[name=validateCode]').css({background:"#efefef"}).attr("placeholder",$('.findPass').find('input[name=validateCode]').attr("data-text"));
                $('.findPass').find('.login-hook4').addClass('ng-hide');
                $('.findPass').find('.login-hook3').addClass('ng-hide');
            });
            $('.userPass').focus(function(){
            	$('.errorPass').hide();
            });
            
//          监测文本框的失焦事件
            $scope.$watch('focus',function(){
        		if(loginContent.css("display") == "block" && loginPage.css("display") != "none"){
        			var strEmail = $('.login-page .userName').val();
                	if(!$scope.focus && strEmail != "" && strEmail != undefined){
                		if(ret.test(strEmail)){
            				noFindEmail.hide();
                    		$http.get(ServerURL+"/web/mode400/checkUserName",{params:{userName: $('.login-page .userName').val()}}).success(function(data){
                    			if(data.code == '00'){	        				
                    				$scope.loginHook5 = false;
                            		loginHook5.hide();
                    				loginhook2.show();
                    				return
                    			}else if(data.code == '06'){	        				
                    				$scope.loginHook5 = true;
                    			}
                    			if($scope.loginHook5){
                            		loginhook2.hide();
                        			loginHook5.show();
                        			return
                        		}else{}
                    		}).error(function(error){});
                    	}else{
                    		loginhook2.hide();
                    		loginHook5.hide();
                    		noFindEmail.show();
                    		$scope.loginHook5 = true;
                    		return
                    	}
                	}else{
                		noFindEmail.hide();
                		loginhook2.hide();
                		loginHook5.hide();
                		$scope.loginHook5 = true;
                	}
        		}    

            	noFindEmail.hide();
        		loginhook2.hide();
        		loginHook5.hide();
            });
        	
        	$scope.$watch('focus2',function(){
        		if(loginContent.css("display") == "block" && register.css("display") != "none"){
        			var strEmail = $('.register .registerEmail').val();
                	if(!$scope.focus2 && strEmail != "" && strEmail != undefined){
                		if(ret.test(strEmail)){
                			reNoFindEmail.hide();
            		    	$http.get(ServerURL+"/web/mode400/checkUserName",{params:{userName: $(".register .registerEmail").val()}}).success(function(data){
            		    		if(data.code == '00'){
            						$scope.loginHook6 = true;
            						reLoginhook2.hide();
            						reLoginHook6.show();
            						return
            					}else if(data.code == '06'){
            						$scope.loginHook6 = false;
            						reLoginhook2.show();
            						reLoginHook6.hide();
            						return
            					}
            				}).error(function(error){
            				});
                    	}else{
                    		reLoginhook2.hide();
                    		reLoginHook6.hide();
                    		reNoFindEmail.show();
                    		return
                    	}
                	}else{
                		reNoFindEmail.hide();
                		reLoginhook2.hide();
                		reLoginHook6.hide();
                	}
        		} 
        		reNoFindEmail.hide();
        		reLoginhook2.hide();
        		reLoginHook6.hide();       	
            });
        	$scope.$watch('focus3',function(){
        		if(!$scope.focus3){
        			var pass1 = $(".registerPassword").val();
        			var pass2 = $(".registerPassword2").val();
        			if(pass1==pass2){
        				$(".contrastCipher").hide();
        			}else{
        				$(".contrastCipher").show();
        			}
        		}
            });
        	////////////////////placeholder兼容ie9
        	
        	       function placeholder(element){
        	    	   var $ele = $(element);
        	    	   var $input = $ele.find("input");
        	    	   var str1 = "<div class='compatible' style='position:absolute;top:43px;left:77px;color:#aaa;font-size:16px;'>",str2 = "</div>";
        	    	   $input.each(function(){
        	    		  $(this).parent().append(str1+$(this).attr("data-text")+str2);
        	    	   });
        	    	   $(".compatible").on("click",function(){
        	    		  $(this).hide().siblings("input").focus();
        	    	   });
        	    	   //$input.val($(target).attr("data-text")).addClass("inp");
        	    	   $input.focus(function() {
        	           	   $(this).siblings(".compatible").hide();
        	                    
    	                });
        	           $input.blur(function(){
    	                    if(!$(this).val() || $(this).val() == "" || $(this).val() == $(this).attr("data-text")) {
    	                    	$(this).siblings(".compatible").show();
    	                    }
    	                });
        	        }
        	       var input = document.createElement('input');
        	       if("placeholder" in input){
        	           //alert('支持');
        	       }else{
          	        	placeholder(".loginContent .row");
        	       }
        	
        });
    }]
});
