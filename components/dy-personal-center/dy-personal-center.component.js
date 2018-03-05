'use strict';
angular.module('byComponent').component('dyPersonalCenter', {
    templateUrl: 'components/dy-personal-center/dy-personal-center.template.html',
    controller: ['$scope','queryData','$stateParams','$state','$timeout','$rootScope','$filter',function ( $scope,queryData,$stateParams,$state,$timeout,$rootScope,$filter) {
    	$rootScope.pageName = pageName.personalCenter;
    	$scope.language = language;

    	//#22556刷新过程中页面会闪现有内容
    	$scope.modelShow = false;
        
    	deferred.done(function(data) {
            $scope.wechatQRUrl = data.home.wechatQRUrl;
        });
        //获取个人中心数据
    	$scope.getPersonCenterData = function(){
    		queryData.ignoreData('/web/mode400/personCenter/info').then(function(data){
                console.log(data);
                $scope.listResume = data.data.listResume;
                $scope.collection = data.data.collection;
                $scope.listApplyPosition = data.data.listApplyPosition;
                $scope.preachMeeting = data.data.preachMeeting;
                
                $scope.campMaxApplyNum = data.data.campMaxApplyNum;
                $scope.canEditCampWishNum = data.data.canEditCampWishNum;
                $scope.canNotEditCampWishNums = data.data.canNotEditCampWishNums; 
                $scope.canNotEditCampWishNumsMsg = data.data.canNotEditCampWishNumsMsg;
                
                $scope.modelShow = true;
                $scope.getWishList();
            });
    	};
    	$scope.getPersonCenterData();
    	//去测评
    	$scope.goAssessOrExam = function(a,type){
    		if(type == 1){
    			if(a.hasAssessment != 1 && a.isAssessFinish == 1 && a.assessUrl){
	    			window.open(a.assessUrl,'_blank')
	    		}
    		}else{
    			if(a.hasWrittenExam != 1 && a.isWrittenExamFinish == 1 && a.writtenExamUrl){
	    			window.open(a.writtenExamUrl,'_blank')
	    		}
    		}
    	};
        //编辑
        $scope.editResume = function(info){
            var option = {
                resumeId: info.id,
                lanType: info.type,
                recruitType: info.recruitType,
                templateId: info.templateId,
                postType: info.postType
            };
            goJumpPage($state,'editResume',option,true);
        };

        //删除
        $scope.deleteResume = function(resumeId,type,index){
        	confirm($scope.language.personalCenter.sureDelete,function(r){
                if(r){
                	queryData.ignoreData('/web/mode400/resume/deleteResume',{resumeId: resumeId,lanType:type}).then(function(data){
                		if(data.code == '00'){
                			$scope.listResume.splice(index,1);
                			$scope.getPersonCenterData();
                		}else{
                			alert(data.content);
                		}
                        
                    });  
                }
            });           
        };

        //预览
        $scope.showResume = function(info){
            var option = {
            		resumeId: info.id,
                    lanType: info.type,
                    recruitType: info.recruitType,
                    templateId: info.templateId,
                    postType: info.postType
            };
            goJumpPage($state,'previewResume',option,true);
        };

        //取消收藏
        $scope.cancleCollection = function(c,index){
            var params = {
                postIdStr: c.PostId + '_' + c.RecruitType
            };
            confirm($scope.language.personalCenter.sureCancelCollection,function(r){
                if(r){
                    queryData.ignoreData('/web/mode400/deleteAlternativePost',params).then(function(data){
                        $scope.collection.splice(index,1);
                        console.log(data);
                    });
                }
            });
        };

        //去投递
        $scope.delivery = function(c){
            queryData.getData('/web/mode400/resume/getUserResumeList',{recruitType: c.RecruitType,postId: c.PostId}).then(function(data){
            	var length = data.data.resumeList.length;
            	$scope.resumeList = data;
                $scope.resumeList = $.extend(true, data, c);
                console.log($scope.resumeList);
                if($scope.resumeList.data.maxApplyNum<=0){
                	alert($scope.language.personalCenter.canNotApplyNew);
                	return;
                }
                if(length == 0){
                    if(data.data.cnResumeFinishStatus !== 0 && data.data.enResumeFinishStatus === 0){
                    	$scope.resumeList.lanType = 2;
                    }else{
                    	$scope.resumeList.lanType = 1;
                    }
                    if(!data.data.resumeId){
                        goJumpPage($state,'applyPosition',$scope.resumeList,true);
                    }else{
                    	$('#myModal').modal('show');
                    }
                }else{
                	for(var i=0;i<length;i++){
                    	if(data.data.cnResumeFinishStatus === 0 && data.data.enResumeFinishStatus === 0){
                    		if(data.data.resumeList[i].cnFinishStatus === true && data.data.resumeList[i].enFinishStatus === true){
                    			$scope.resumeList.hasCompleteResume = true;
                    			$scope.resumeList.data.resumeList[i].finishStatus = true; 
                    			$scope.chooseSite();
                    		}else if(data.data.resumeList[i].cnFinishStatus === true && data.data.resumeList[i].enFinishStatus === false){
                    			$scope.resumeList.data.resumeList[i].finishStatus = false;
                    			$scope.resumeList.data.resumeList[i].finishLanType = 2;
                    			$('#myModal').modal('show');
                    		}else{
                    			$scope.resumeList.data.resumeList[i].finishStatus = false;
                    			$scope.resumeList.data.resumeList[i].finishLanType = 1;
                    			$('#myModal').modal('show');
                    		}
                    	}else if(data.data.cnResumeFinishStatus === 0 && data.data.enResumeFinishStatus !== 0){
                    		if(data.data.resumeList[i].cnFinishStatus === true){
                    			$scope.resumeList.hasCompleteResume = true;
                    			$scope.resumeList.data.resumeList[i].finishStatus = true;
                    			$scope.chooseSite();
                    		}else{
                    			$scope.resumeList.data.resumeList[i].finishStatus = false;
                    			$scope.resumeList.data.resumeList[i].finishLanType = 1;
                    			$('#myModal').modal('show');
                    		}
                    	}else if(data.data.cnResumeFinishStatus !== 0 && data.data.enResumeFinishStatus === 0){
                    		if(data.data.resumeList[i].enFinishStatus === true){
                    			$scope.resumeList.hasCompleteResume = true;
                    			$scope.resumeList.data.resumeList[i].finishStatus = true;
                    			$scope.chooseSite();
                    		}else{
                    			$scope.resumeList.data.resumeList[i].finishStatus = false;
                    			$scope.resumeList.data.resumeList[i].finishLanType = 2;
                    			$('#myModal').modal('show');
                    		}
                    	}else{
                    		$scope.resumeList.hasCompleteResume = true;
                			$scope.resumeList.data.resumeList[i].finishStatus = true;
                			$scope.chooseSite();
                    	}
                                 		
                	}		
                }
            });

        };
        $scope.chooseSite = function(){
        	if($scope.resumeList.site){
        		if($scope.resumeList.site.length == 0){
            		$('#myModal').modal('show');
            	}else{
            		$('#mySite').modal('show');
            	}
        	}else{
        		$('#myModal').modal('show');
        	}	
        };
        //获取应聘流程
        $scope.getApplyDetail = function(a){
            //applyId=148801&postId=110501&recruitType=1
            if(!a.applyStatus && a.hasProcessId == 1 && a.applyId){
                var params = {
                    applyId: a.applyId,
                    postId: a.postId,
                    recruitType: a.recruitType,
                    applyResumeId: a.applyResumeId
                };
                queryData.ignoreData('/web/mode400/personCenter/applyProcess',params).then(function(data){
                    a = $.extend(true,a,data.data);
                    console.log(params);
                });
            }
        };

        //获取职位详情
        $scope.getJobDetail = function(info){
            var params = {
                postId: info.PostId,
                recruitType: info.RecruitType
            };
            queryData.ignoreData('/web/mode400/position/detail',params).then(function(data){
                $scope.workDetail = $.extend(true,data.data,params);
                $scope.workDetail.postIdStr = info.PostId + '_' + info.RecruitType;
                console.log($scope.workDetail);

                $('#myResumeModal').modal('show');


            }); 
        };
        //修改职位
        $scope.modifyPosition = function(){
        	$scope.getWishList();
            $('#modifyPositionModal').modal('show');
        };
        //修改志愿
        $scope.getWishList = function(){
        	$scope.volunteerParams = {
        			oldVolunteers: [],
        			newVolunteers: [],
        			applyIds: [],
        			webApplyIds: []
        	};
        	//var wishList = $scope.listApplyPosition;
        	var wishList = [];
        	var positionList = [];
        	var length = $scope.listApplyPosition.length;
        	for(var i=0;i<length;i++){
        		//保存下标,修改职位时用到
				$scope.listApplyPosition[i].index = i;
				if($scope.listApplyPosition[i].unprocessed == 0){
					positionList.push($scope.listApplyPosition[i]);
				}				
        		if(($scope.listApplyPosition[i].recruitType == 1 || $scope.listApplyPosition[i].recruitType == 13) && $scope.listApplyPosition[i].wishNum && $scope.listApplyPosition[i].wishNum <= 10 ){
        			if($scope.listApplyPosition[i].unprocessed == 0){        				
        				//待处理
        				wishList.push($scope.listApplyPosition[i]);
        			}
        		}
        	}
        	
        	//分组
        	function dataGrouping(arr){
        		var map = {},dest = [];
    	        for(var i = 0; i < arr.length; i++){
    	            var ai = arr[i];
    	            //var oldVolunteers = wishList[i].wishNum;
    	            if(!map[ai.resumeId]){
    	                dest.push({
    	                	resumeId: ai.resumeId,
    	                	resumeName: ai.resumeName,
    	                    data: [ai],
    	                    oldVolunteers:[ai.wishNum],
    	                    applyIds:[ai.applyId],
    	                    webApplyIds:[ai.webApplyId],
    	                    newVolunteers:['']
    	                });
    	                map[ai.resumeId] = ai;
    	            }else{
    	                for(var j = 0; j < dest.length; j++){
    	                    var dj = dest[j];
    	                    if(dj.resumeId == ai.resumeId){
    	                        dj.data.push(ai);
    	                        dj.oldVolunteers.push(ai.wishNum);
    	                        dj.applyIds.push(ai.applyId);
    	                        dj.webApplyIds.push(ai.webApplyId);
    	                        dj.newVolunteers.push('');
    	                        break;
    	                    }
    	                }
    	            }
    	        }
    	        return dest;
        	}
        	
        	$scope.wishList = dataGrouping(wishList);
        	$scope.positionList = dataGrouping(positionList);
        }
        if(!$scope.resumeWishIndex){
        	$scope.resumeWishIndex = 0;
        }
        //tab栏切换
        $scope.chooseResume = function(index){
        	$scope.resumeWishIndex = index;
        };
        //点击选择志愿
        $scope.chooseWish = function(i,parentIndex,index){
        	var canEdit = $filter('isExistInArray')(i,$scope.canNotEditCampWishNums);
        	if(!canEdit){
        		$scope.wishList[parentIndex].newVolunteers[index] = i;
        	}
        	
        	console.log(canEdit,$scope.wishList[parentIndex].newVolunteers);
        };
        //传过滤器到页面中,ngClass中不能使用过滤器
        $scope.isExistInArray = function(a){
        	var canEdit = $filter('isExistInArray')(a,$scope.canNotEditCampWishNums);
        	if(canEdit){
        		return true;
        	}else{
        		return false;
        	}
        };       
        $scope.modifyVolunteer = function(){
        	$scope.getWishList();
            $('#modifyVolunteerModal').modal('show');               
            
            //确认修改
            $scope.okVolunteer = function(index,parentIndex){
            	var params = {
            			oldVolunteers: $scope.wishList[index].oldVolunteers,
            			applyIds: $scope.wishList[index].applyIds,
            			webApplyIds: $scope.wishList[index].webApplyIds,
            			newVolunteers: $scope.wishList[index].newVolunteers
            	};
            	console.log(params);
            	var obj = $.extend(true,{},params);
            	var nary=obj.newVolunteers.sort(); 
                for(var i=0;i<params.newVolunteers.length;i++){ 
                	if(!params.newVolunteers[i] || params.newVolunteers.length == 0){
                		alert($scope.language.personalCenter.volunteersNotEmpty);
                		return;
                	}
    	            if (nary[i]==nary[i+1] && nary[i]){ 
    	            	/*$scope.wishList[parentIndex].data[i+1].name*/
    	            	alert($scope.language.personalCenter.voluntaryDuplication);
    	            	return;
    	            } 
                }
            	queryData.getData("/web/mode400/personCenter/changeVolunteer",params).then(function(data){
            		console.log(data);
            		if(data.code == '00'){
            			$('#modifyVolunteerModal').modal('hide'); 
            			$scope.getPersonCenterData();
                		alert(data.content);
            		}
            	});
            };
        };

        //去职位页面
        $scope.goPositionPage = function(a){
            var option = {
                recruitType: a.recruitType,
                switchPosition: a.index,
                resumeId: a.resumeId,
                goChangePosition: true
            }; 
            if(!a.resumeId){
            	alert($scope.language.personalCenter.canNotChange);
            }else if(!a.applyId){
            	alert($scope.language.personalCenter.changeLater,function(){
            		$scope.getPersonCenterData();
            	});
            }else{
                goJumpPage($state,'position',option,true);
            }
        };
        //宣讲会
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
    						a.careerFairDateStatus = 2;
    						$scope.totalNumber = data.count;
    						$scope.autoCloseModal();
    					}
    			    	
    				}else{
    					alert(data.content);
    				}
    			});
        	};
    		
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
        //修改志愿弹窗-修改职位
        window.changePosition = function(a,index){
        	var params = {
        		applyId: $scope.listApplyPosition[index].applyId,
        		webApplyId: $scope.listApplyPosition[index].webApplyId,
        		resumeId: $scope.listApplyPosition[index].resumeId,
        		recruitType: $scope.listApplyPosition[index].recruitType,
        		postId: a.PostId
        	};
        	console.log(params);
        	//var tarIndex = $scope.wishList[index].index;
        	
        	var option = {
        		webApplyId: '0',
        		applyId: '0',
        		name: a.PostName,
        		workPlace: a.WorkPlace,
        		postId: a.PostId
        	};
        	queryData.getData('/web/mode400/crop/replaceApplyRecord',params).then(function(data){
        		if(data.code == '00'){
        			console.log(data);
        			//$scope.wishList[index] = $.extend(true, $scope.wishList[index], option);
        			//$scope.listApplyPosition[index] = $.extend(true, $scope.listApplyPosition[index],option,data.data);
        			$scope.getPersonCenterData();
        		}else{
        			alert(data.content);
        		}
        	});       	    	
        };
        //关闭其他页面刷新个人中心
        window.refreshPersonCenterData = function(){
        	$scope.getPersonCenterData();
        };
       
        $(document).ready(function(){
    		$('.main-middle-svg').find('stop').css({'stop-color':mainColor});
    		$scope.signUp = {};
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
