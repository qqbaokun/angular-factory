'use strict';

angular.module('byComponent').component('dyFooter', {
    templateUrl: 'components/dy-footer/dy-footer.template.html',
    controller: ['$scope','queryData', function ( $scope,queryData) {
    	$scope.language = language;
        deferred.done(function(data){
            $scope.copyRight = data.copyRight;
        });

        //获取访问人数
        queryData.ignoreData('/web/mode400/crop/getCount').then(function(data){
            $scope.visitorNumber = data.data;
        });
        //初始化语言状态 进入或刷新的时候会执行
        var lType = localStorage.getItem("lanType") || "1";
        queryData.ignoreData('/web/mode400/changeLanType',{requestLocale:lType});
        
        //切换语言
        $scope.changeLanType = function(type){
        	queryData.ignoreData('/web/mode400/changeLanType',{requestLocale:type}).then(function(data){
        		if(data.code = '00'){
        			localStorage.setItem("lanType",type);        
        			window.location.reload();
        		}
            });
        };
    }]
});
