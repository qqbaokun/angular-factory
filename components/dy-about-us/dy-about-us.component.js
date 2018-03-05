'use strict';

angular.module('byComponent').component('dyAboutUs', {
    bindings: {
        status: "@",
        navData:"@",
        navIndex:'@'
    },
    templateUrl: 'components/dy-about-us/dy-about-us.template.html',
    controller: ['$scope','$timeout','$state', function ( $scope,$timeout,$state) {
        var self = this;
        
        deferred.done(function(data) {
            $scope.wechatQRUrl = data.home.wechatQRUrl;
            $scope.nav = data.menu.data;
        });
        
        $scope.navData = JSON.parse(self.navData);
        $scope.aboutUs = JSON.parse(self.status);



        if($scope.aboutUs.type == "C2"){
            var length = $scope.aboutUs.data.length;
            for(var i=0;i<length;i++){
                if($scope.aboutUs.data[i].templatePosition == "top"){
                    $scope.aboutUsTop = $scope.aboutUs.data[i];
                }else if($scope.aboutUs.data[i].templatePosition == "left"){
                    $scope.aboutUsLeft = $scope.aboutUs.data[i];
                }else if($scope.aboutUs.data[i].templatePosition == "right"){
                    $scope.aboutUsRight = $scope.aboutUs.data[i];
                }
            }
            
            
        }
        
        $scope.videoPlay = function(type){
        	if(type == 1){
        		$('#video-play').modal('show');
        	}else{
        		$('#video-play2').modal('show');
        	}
        	
        };
        
        $scope.multipleEntry = function(op){
            var option = $.extend(true, {},op);
            option.index = self.navIndex;
           
            var id = option.picLinkColumnId;
            var index;

            console.log(option);
            //链接打开
            if(option.picLinkOpen == 0){
            	if(option.picLinkUrl){
                	window.open(option.picLinkUrl,'_blank');
                }else if(!(id === 'null' || id === undefined)){           	
                	var urlParams = {
                			recruitType: option.picLinkColumnFId,
                			id: option.picLinkColumnId,
                			entranceType: 1
                	}
                	goJumpPage($state,'position',urlParams,false);
                }else{
                	
                }
            }
            
      
        };
    }]
});
