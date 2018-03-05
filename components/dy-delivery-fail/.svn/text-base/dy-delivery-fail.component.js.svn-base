'use strict';
angular.module('byComponent').component('dyDeliveryFail', {
    templateUrl: 'components/dy-delivery-fail/dy-delivery-fail.template.html',
    controller: ['$scope','$state','$stateParams','$rootScope','queryData', function ( $scope,$state,$stateParams,$rootScope,queryData) {
    	$rootScope.pageName = pageName.deliveryFail;
    	$scope.language = language;
    	$scope.urlParams = getUrlData($stateParams.option);
    	deferred.done(function(data){
            $scope.wechatQRUrl = data.home.wechatQRUrl;
        });
        //去看其他职位
        $scope.reDelivery = function(){
        	queryData.getData('/web/mode400/crop/applyPost',$scope.urlParams).then(function(data){
	            console.log(data);
	            if(data.code == '00'){
	            	if(data.data.hasAssessment === 0 || data.data.hasWrittenExam === 0){
                		goJumpPage($state,'assessmentTips',data.data,false);
                	}else{         		
                		goJumpPage($state,'deliverySuccess',{recruitType: resumeList.RecruitType},false);
                	}   
	            }else{
	            	alert(data.content);
	            }
        	});
        };
    }]
});
