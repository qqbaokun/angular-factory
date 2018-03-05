'use strict';

angular.module('byComponent').component('dyCorporateCulture', {
    bindings: {

    },
    templateUrl: 'components/dy-corporate-culture/dy-corporate-culture.template.html',
    controller: ['$scope','$stateParams','$rootScope', function ($scope,$stateParams,$rootScope) {
    	$rootScope.pageName = pageName.corporateCulture;
    	$scope.urlParams = getUrlData($stateParams.option);
        //var index = $stateParams.option;

        deferred.done(function(data) {
            $scope.wechatQRUrl = data.home.wechatQRUrl;
            var option = data.menu.data[$scope.urlParams.index];

            var menuData = [];
            for(var i=0;i<option.submenus.length;i++){
                if(option.submenus[i].id != 0){
                    menuData.push(option.submenus[i]);
                }
            }
            console.log(menuData);
            $scope.option = menuData;
        });
        
        setNavColor($scope.urlParams.recruitType);
    }]
});
