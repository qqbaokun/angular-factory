'use strict';
angular.module('byComponent').component('dyDeliverySuccess', {
    templateUrl: 'components/dy-delivery-success/dy-delivery-success.template.html',
    controller: ['$scope','$state','$stateParams','$rootScope', function ( $scope,$state,$stateParams,$rootScope) {
    	$rootScope.pageName = pageName.deliverySuccess;
    	$scope.language = language;
    	$scope.urlParams = getUrlData($stateParams.option);
    	deferred.done(function(data){
            $scope.wechatQRUrl = data.home.wechatQRUrl;
        });
        //去看其他职位
        $scope.seeOtherJob = function(){
            goJumpPage($state,'position',$scope.urlParams,false);
        };

        //查看应聘进度
        $scope.seeApply = function(){
            $state.go('personalCenter');
        };
    }]
});
