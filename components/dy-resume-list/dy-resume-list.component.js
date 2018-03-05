'use strict';

angular.module('byComponent').component('dyResumeList', {
    bindings: {
        resumeList: "="
    },
    templateUrl: 'components/dy-resume-list/dy-resume-list.template.html',
    controller: ['$scope','$state','queryData','$http', function ( $scope,$state,queryData,$http) {
    	console.log(this.resumeList);
    	$scope.language = language;
        //去修改
        $scope.goModify = function(info){
            var urlParams = {
                resumeId: info.resumeId,
                templateId: $scope.$ctrl.resumeList.data.templateId,
                postType: $scope.$ctrl.resumeList.data.postType,
                resumeName: info.resumeName,
                lanType: info.finishLanType,
                recruitType: info.recruitType,
                postId: $scope.$ctrl.resumeList.PostId,
                postName: $scope.$ctrl.resumeList.PostName,
                site: $scope.$ctrl.resumeList.site
            };
            goJumpPage($state,'editResume',urlParams,true);
            $('#myModal').modal('hide');
        };
        //预览简历
        $scope.goPreviewResume = function(info){
        	var urlParams = {
                    resumeId: info.resumeId,
                    resumeName: info.resumeName,
                    lanType: info.resumeLanguage,
                    recruitType: info.recruitType,
                    templateId: $scope.$ctrl.resumeList.data.templateId,
                    //postId: $scope.$ctrl.resumeList.PostId,
                    postName: $scope.$ctrl.resumeList.PostName,
                    site: $scope.$ctrl.resumeList.site
                };
                goJumpPage($state,'previewResume',urlParams,true);
                $('#myModal').modal('hide');
        };
        //去完善
        $scope.goPerfect = function(info){
        	var urlParams = {
        		resumeId: info.resumeId,
        		templateId: $scope.$ctrl.resumeList.data.templateId,
        		recruitType: $scope.$ctrl.resumeList.RecruitType,
        		postId: $scope.$ctrl.resumeList.PostId,
        		postName: $scope.$ctrl.resumeList.PostName,
        		site: $scope.$ctrl.resumeList.site,
        		postType : info.postType,
        		goPerfect: true,
        		lanType: 1
        	};
        	console.log(info);
            goJumpPage($state,'editResume',urlParams,true);
            $('#myModal').modal('hide');
        };
        //创建简历
        $scope.createResume = function(resumeList){
        	$('#myModal').modal('hide');
        	
            goJumpPage($state,'applyPosition',resumeList,true);
            console.log(resumeList);
        };
        //选择志愿
        $scope.choosewishNum = function(a){
        	if(a.canEditCampWishNum == 0 || !(a.selected == 0 && a.canEditCampWishNum == 1)){
        		$scope.wishNum = a.num;
        		if(a.applyId && a.selected == 0){
        			$scope.applyId = a.applyId;
        			$scope.webApplyId = a.webApplyId;
        		}else{
        			$scope.applyId = '';
        			$scope.webApplyId = '';
        		}
        		console.log("选择志愿",$scope.wishNum,$scope.applyId,$scope.webApplyId);
        	}
        };
        //选择站点
        $scope.chooseSite = function(site){       	
	        $('#myModal').modal('show');	
	        $('#mySite').modal('hide');	
        };
        //确认投递
        $scope.confirmDelivery = function(val){
            var resumeList = $scope.$ctrl.resumeList;
            var params = {
            		postId: resumeList.PostId,
                    recruitType: resumeList.RecruitType,
            };
            console.log(val);
            if(resumeList.data.resumeList.length > 1){
            	params.resumeId = val;
            }else if(resumeList.data.resumeList.length == 1){
            	params.resumeId = resumeList.data.resumeList[0].resumeId;
            }
            //设置志愿参数
            if((resumeList.RecruitType == 1 || resumeList.RecruitType == 13) && $scope.$ctrl.resumeList.data.wishNum.length != 0){
            	if($scope.wishNum){
            		if(!$scope.applyId){
            			params.wishNum = $scope.wishNum;
            		}            		
            	}else{
            		alert($scope.language.resumeList.chooseVolunteer);
            		return;
            	}            	
            }
            var applyPostUrl;
            if($scope.applyId && $scope.webApplyId){
        		params.applyId = $scope.applyId;
        		params.webApplyId = $scope.webApplyId; 
        		applyPostUrl = ServerURL + '/web/mode400/crop/replaceApplyRecord';
        	}else{
        		applyPostUrl = ServerURL + '/web/mode400/crop/applyPost';
        	}
            //设置站点id
            if($scope.site){
            	params.chooseSite = $scope.site;
            }
            console.log(params,applyPostUrl);

            if(params.resumeId){
            	$http.get(applyPostUrl+'?r='+Math.random(), {params: params}).success(function (data) {
            		if(data.code == '00'){
                    	$('#myModal').modal('hide');
                    	if(data.data.hasAssessment === 0 || data.data.hasWrittenExam === 0){
                    		goJumpPage($state,'assessmentTips',data.data,false);
                    	}else{         		
                    		goJumpPage($state,'deliverySuccess',{recruitType: resumeList.RecruitType},false);
                    	}                        
                    }else{
                    	alert(data.content,function(){
                    		$('#myModal').modal('hide');
                    		//关闭职位详情
                    		$('.main-content').hide();
                            $('.icon-arrow').hide();
                            $('.close').hide();
                            $(".btn-yes").hide();
                            $('.table-b').find('tr').css({"background-color":"white"});
                    	});
                    }
                }).error(function (data, status) {
                	//网络错误
                    goJumpPage($state,'deliveryFail',params,false);
                });
            }else{
                alert($scope.language.resumeList.chooseResume);
            }
        };
      
    }]
});
