'use strict';

angular.module('byComponent').component('dyRightBar', {
    templateUrl: 'components/dy-right-bar/dy-right-bar.template.html',
    controller: ['$scope','$timeout', function ( $scope,$timeout) {
        deferred.done(function(data){
            $scope.wechatQRUrl = data.home.wechatQRUrl;
        });
        $(document).ready(function(){
            onMouseOver();
            clickToTarget();
        });
    }]
});
