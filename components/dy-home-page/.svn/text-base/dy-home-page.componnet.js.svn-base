/**
 * Created by bbk on 2017/4/12.
 */
'use strict';

angular.module('byComponent').component('dyHomePage', {
    bindings:{
        status: "@"
    },
    templateUrl: 'components/dy-home-page/dy-home-page.template.html',
    controller: ['$scope','$timeout','$state',function ( $scope,$timeout,$state) {
        deferred.done(function(data){
            $scope.wechatQRUrl = data.home.wechatQRUrl;
        });
        var self = this;


        $scope.option = JSON.parse(self.status);
        
        $scope.jumpUrl = function(url){
        	if(url){
        		window.open(url,'blank');
        	}
        }
        
        $scope.jumpToPosition = function(){
        	var option = {
                    recruitType : ''
                };
        	goJumpPage($state,"searchResult",option,false);
            $('body').scrollTop(0);
        }
        
        $(document).ready(function(){
            getHeight();
        });
    }]
});
