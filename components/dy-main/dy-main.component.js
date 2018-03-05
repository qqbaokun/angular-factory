'use strict';
angular.module('byComponent').component('dyMain', {
    bindings: {

    },
    templateUrl: 'components/dy-main/dy-main.template.html',
    controller: ['$scope','$rootScope','$timeout', function ($scope,$rootScope,$timeout) {
        var self = this;
        $rootScope.pageName = pageName.homePage;
        
        $('dy-nav').scope().$$childHead.searchResult = '';
        $('.search-result').blur();
        
        deferred.done(function(data){
            $scope.type = data.home.components;
            $scope.navData = data.menu.data;
        });
        
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        	//根据url定位位置
        	var index = GetQueryString('index');
        	console.log(index);
        	if(index == '' || index == undefined){
        		//下面是在table render完成后执行的js 
        		$timeout(function(){
        			var targetIndex = sessionStorage.getItem("targetIndex");
                    if(targetIndex){
                        $('html,body').scrollTop((height-56)*targetIndex);
                    }
        		});
                    
        	}else{
        		setTimeout(function(){                    
                    $('html,body').scrollTop((height-56)*index);
                },100);
        		
        	}
            


            /*根据滑动位置判断颜色*/
            $(document).ready(function() {
                $(window).unbind('scroll').bind('scroll', changeColor);
                getHeight();
            });
        });
    }]
});
