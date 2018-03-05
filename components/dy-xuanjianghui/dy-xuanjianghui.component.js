'use strict';

angular.module('byComponent').component('dyXuanjianghui', {
    bindings: {
    	meetingImg:"="
    },
    templateUrl: 'components/dy-xuanjianghui/dy-xuanjianghui.template.html',
    controller: ['$scope', '$timeout', 'queryData', '$http','$rootScope', function($scope, $timeout, queryData, $http,$rootScope) {
    	$rootScope.pageName = pageName.xuanjianghui;
    	$scope.language = language;
    	$scope.selectedCity = '';
    	/*$scope.functionThatReturnsPromise = function() {
    	    return $timeout(angular.noop, 3000);//这里可以设置时间，改文字可以删除
    	};*/
    	deferred.done(function(data){
    		if(data.preachingMeeting){
    			$scope.preachingMeeting = data.preachingMeeting.positionSearch.workCity;
    		}else{
    			$scope.preachingMeeting = [];
    		} 
        });
    	$scope.signUp = {};
    	$scope.option = {};
    	
    	$scope.getCareerList = function(){
    		queryData.getData('/web/mode400/careerFair/list').then(function(data){
        		if(data.code == '00'){
        			console.log(data);
        			$scope.allCareerFair = data.data;
        			var length = $scope.allCareerFair.length;
        			var arr = [];
        			for(var i=0;i<length;i++){
        				arr = arr.concat($scope.allCareerFair[i].data);
        			}
        			$scope.allCareerFairList = arr;
        			//切换城市
        	    	$scope.selectCity = function(name,type){
        	    		if(type == 2){
        	    			$('#preaching-city').modal('hide');
        	    		}
        	    		if(name){
        	    			$scope.selectedCity = name;
        	    			var length = $scope.allCareerFair.length;
        	    			for(var i=0;i<length;i++){
        	    				if(name == $scope.allCareerFair[i].name){
        	    					$scope.allCareerFairList = $scope.allCareerFair[i].data;
        	    					return;
        	    				}else{
        	    					$scope.allCareerFairList = [];
        	    				}
        	    			}
        	    		}else{
        	    			$scope.selectedCity = '';
        					$scope.allCareerFairList = arr;
        				}
        	    	};
        		}
        	});
    	};
    	$scope.getCareerList();
    	
    	//状态1:我要参加 2:已预约 3:已预约(已结束 )4:报名结束
    	$scope.CareerFair = function(a){
    		console.log(a);
    		$scope.careerFairDetail = a;
    		if(a.careerFairDateStatus == 1 || a.careerFairDateStatus == 2){
    			queryData.getData('/web/mode400/careerFair/getUserInfo',{careerFairId:a.careerFairId}).then(function(data){
    				if(data.code == '00'){
    					$scope.option = data.data; 
    					$('#already-signup .main-top-y svg polygon').css({"fill": secondaryColor});
    					//克隆对象
    		            $scope.obj = $.extend(true, {}, $scope.option);
    		            $('#already-signup').modal('show');
    				}else{
    					alert(data.content);
    				}
    			});
    		}
    		
    		//提交
        	$scope.submitForm = function(op){
        		var params;
        		if(op.careerFairDateStatus*1 == 1){
        			$scope.signUp.careerFairId = op.careerFairId;
        			params = $scope.signUp;
        		}else if(op.careerFairDateStatus*1 == 2){
        			$scope.option.careerFairId = op.careerFairId;
        			params = $scope.option;
        		}
        		queryData.getData('/web/mode400/careerFair/saveUserInfo',params).then(function(data){
    				if(data.code == '00'){
    					$('#already-signup').modal('hide');
    					if(op.careerFairDateStatus*1 == 1){
    						//重新获取宣讲会列表
    						$scope.getCareerList();
    						$scope.totalNumber = data.count;
    						$scope.autoCloseModal();
    					}
    			    	
    				}else{
    					alert(data.content);
    				}
    			});
        	};
    		
    	}
    	
    	
    	//自动关闭的弹窗
    	$scope.autoCloseModal = function(){
    		$('#signup-success').modal('show');
    		var time = 5;
    	    var interval = setInterval(function(){
    	        if(time > 1){
    	            time --;
    	            $('.time').text(time);
    	        }else{
    	        	$('#signup-success').modal('hide');
    	        	clearInterval(interval);
    	        	time = 5;
    	        	$('.time').text(time);
    	        }
    	    },1000);
    	};
    	
    	//取消修改
        $scope.cancel = function(index,val){
            switch (index){
                case 1:
                    $scope.option.name = val;
                    break;
                case 2:
                    $scope.option.phone = val;
                    break;
                case 3:
                    $scope.option.email = val;
                    break;
                case 4:
                    $scope.option.school = val;
                    break;
            }
        };
    	//保存、修改
        $scope.edit = function($this,index,val1,val2){
            var text = $this.target.innerText;
            if(text == $scope.language.xjh.save){
                switch (index){
                    case 1:
                        $scope.option.name = val1;
                        break;
                    case 2:
                        $scope.option.phone = val1;
                        break;
                    case 3:
                        $scope.option.email = val1;
                        break;
                    case 4:
                        $scope.option.school = val1;
                        break;
                }
            }else{
                switch (index){
                    case 1:
                        $scope.obj.name = val2;
                        break;
                    case 2:
                        $scope.obj.phone = val2;
                        break;
                    case 3:
                        $scope.obj.email = val2;
                        break;
                    case 4:
                        $scope.obj.school = val2;
                        break;
                }
            }
        };
            
    	//选择城市
        $scope.showPreach = function(){
        	$('#preaching-city').modal('show');
        };
    	$(document).ready(function(){
    		$('.main-middle-svg').find('stop').css({'stop-color':mainColor});
    		
            var phoneObj = $('.main-bottom').find('input[name=phone]');
            var emailObj = $('.main-bottom').find('input[name=email]');
            phoneObj.bind('input propertychange change',function(){
            	var phoneNumber = $(this).val();
            	if(phoneNumber && /^1[3|4|5|8]\d{9}$/.test(phoneNumber)){
                    //对的
                    $('.phone-alert').hide();
                    $scope.signUp.phoneNumber = true;
                } else{
                    //不对
                    $('.phone-alert').show();
                    $scope.signUp.phoneNumber = false;
                }
            	$scope.$apply();
            });
            emailObj.bind('input propertychange change',function(){
            	var phoneNumber = $(this).val();
            	if(phoneNumber && /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(phoneNumber)){
                    //对的
                    $('.email-alert').hide();
                    $scope.signUp.emailNumber = true;
                } else{
                    //不对
                    $('.email-alert').show();
                    $scope.signUp.emailNumber = false;
                }
            	$scope.$apply();
            });
            
            $('.btn-ok').click(function(){
                $('.main-bottom').hide();
                resetHeight();
                $('.main-top').find('polygon').css({'fill': '#ff9f15'})
            });



            /*可修改的模板*/
            $('.main-bottom-up').find('p').each(function(i,v){
                $(v).mouseover(function(){
                    if($(this).children().find('.edit').text() == $scope.language.xjh.modify){
                        $(this).find('.main-bottom-up-a').show();
                    }else{
                        $(this).find('.main-bottom-up-a').show();
                    }
                });
                $(v).mouseout(function(){
                    if($(this).children().find('.edit').text() == $scope.language.xjh.save){
                        $(this).find('.main-bottom-up-a').show();
                    }else{
                        $(this).find('.main-bottom-up-a').hide();
                    }
                });
            });

            /*点击修改、保存*/
            $('.edit').each(function(i,v){
                $(v).click(function(){
                    if($(this).text() == $scope.language.xjh.modify){
                        $(this).text($scope.language.xjh.save);
                        $(this).siblings().css({'visibility': 'visible'});
                        $(this).parent().css({'display': 'block'});
                        $(this).parent().parent().find('input').show();
                        $(this).parent().parent().find('.input-val').hide();
                    }else{
                        $(this).text($scope.language.xjh.modify);
                        $(this).siblings().css({'visibility': 'hidden'});
                        $(this).parent().parent().find('input').hide();
                        $(this).parent().parent().find('.input-val').show();
                    }

                });
            });
            /*点击取消*/
            $('.cancle').each(function(i,v){
                $(v).click(function(){
                    $(this).parent().find('.edit').text($scope.language.xjh.modify);

                    $(this).parent().css({'display': 'none'});
                    $(this).parent().find('.edit').siblings().css({'visibility': 'hidden'});
                    $(this).parent().parent().find('input').hide();
                    $(this).parent().parent().find('.input-val').show();
                });
            });
        });
    	
    	
    }]
});