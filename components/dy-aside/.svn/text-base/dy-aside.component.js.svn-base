'use strict';

angular.module('byComponent').component('dyAside', {
    templateUrl: 'components/dy-aside/dy-aside.template.html',
    controller: ['$scope', '$stateParams','$state','$rootScope', function($scope, $stateParams,$state,$rootScope) {
        $rootScope.pageName = pageName.position;
        $scope.language = language;
    	$scope.urlParams = getUrlData($stateParams.option);
        console.log($scope.urlParams);
        var id = $scope.urlParams.id;
        var index;

        deferred.done(function(data) {
            $scope.wechatQRUrl = data.home.wechatQRUrl;
            $scope.nav = data.menu.data;

            if(id != 0 && id != 15 && $scope.urlParams.entranceType !=2 && $scope.urlParams.entranceType !=3 && $scope.urlParams.entranceType !=4){
                for(var i=0;i<$scope.nav.length;i++){
                    if($scope.nav[i].submenus){
                        for(var j=0;j<$scope.nav[i].submenus.length;j++){
                            if($scope.nav[i].submenus[j].id == id){
                                index = i;
                                $scope.option = $scope.nav[i];
                                $scope.urlParams.recruitType = mainData.menu.data[i].id
                            }
                        }
                    }
                }
            }else{
                index = $scope.urlParams.index;
                $scope.option = $scope.nav[index];
            }

            setNavColor($scope.urlParams.recruitType);


        });






        console.log($scope.option);
        
        //初始化值
        if($scope.urlParams.entranceType*1 == 1){
            var length = $scope.option.submenus.length;
            for(var i = 0; i < length;i ++){
                if($scope.option.submenus[i].id == id){
                    $scope.subIndex = i;
                    $scope.cultureData = $scope.option.submenus[i];
                    console.log($scope.cultureData);

                    if($scope.option.submenus[i].id == 0){
                        $scope.subShowIndex = 0;
                    }else{
                        $scope.subShowIndex = 1;                 
                    }
                }
            }
        }
        else if($scope.urlParams.entranceType == undefined || $scope.urlParams.entranceType == "" || $scope.urlParams.entranceType == null){
            $scope.subIndex = 0;
            $scope.subShowIndex = 0;
            $scope.option = {
                submenus: [{title: lanType == 1?"职位列表":"Position List"}]
            }
        }else{
        	if(id == 15){
        		$scope.subShowIndex = 2;
        		$scope.meetingImg = $scope.option.imgUrl;
        	}else{
        		$scope.subShowIndex = 0;
        	}
            $scope.subIndex = 0;           
            index = $scope.urlParams.index;
            $scope.option = $scope.nav[index];
        }


        $scope.changeSubIndex = function(i,id){
            if(id == 0){
            	if($scope.urlParams.id == 15 || $scope.urlParams.recruitType == 15){
            		$scope.subShowIndex = 2;
            		//宣讲会图片
                    $scope.meetingImg = $scope.option.imgUrl;
            	}else{
            		$scope.subShowIndex = 0;
            	}
                
            }else if(id == 15){
            	$scope.subShowIndex = 2;
        		//宣讲会图片
            	$scope.meetingImg = $scope.option.submenus[i].imgUrl;
            }else{
                $scope.subShowIndex = 1;              
            }
            $scope.subIndex = i;
            $scope.cultureData = $scope.option.submenus[i];
        };
    }]
});