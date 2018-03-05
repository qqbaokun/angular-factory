'use strict';

angular.module('byComponent').component('dyPreviewResume', {
    templateUrl: 'components/dy-preview-resume/dy-preview-resume.template.html',
    controller: ['$scope','queryData','$state','$stateParams','$rootScope', function ($scope,queryData,$state,$stateParams,$rootScope) {
    	$rootScope.pageName = pageName.previewResume;
    	$scope.language = language;
    	$scope.ServerURL = ServerURL;
    	deferred.done(function(data) {
            $scope.wechatQRUrl = data.home.wechatQRUrl;
            $scope.menu = data.menu.data;
        });

        $scope.urlParams = getUrlData($stateParams.option);
        //默认语言类型/中文
        $scope.lanType = $scope.urlParams.lanType;
        $scope.recruitType = $scope.urlParams.recruitType;
        $scope.resumeId = $scope.urlParams.resumeId;

        queryData.getData('/web/mode400/resume/getResume',{resumeId:$scope.urlParams.resumeId,lanType:$scope.urlParams.lanType}).then(function(data){
            //$scope.resumeInfo = data.data;
            var resumeInfo = data.data;
            var fileList = [];
            console.log(resumeInfo);

            //筛选出附件
            var infoSetListLength = resumeInfo.infoSetList.length;
            for(var i = 0;i < infoSetListLength;i++){
                var recordListLength = resumeInfo.infoSetList[i].recordList.length;
                for(var j = 0;j < recordListLength;j++){
                    var infoItemListLength = resumeInfo.infoSetList[i].recordList[j].infoItemList.length;
                    for(var k = 0;k < infoItemListLength;k++){
                        if(resumeInfo.infoSetList[i].recordList[j].infoItemList[k].fillType == 8){
                            fileList.push(resumeInfo.infoSetList[i].recordList[j].infoItemList[k]);
                            //resumeInfo.infoSetList[i].recordList[j].infoItemList.splice(k,1);
                            //设置照片
                            if(resumeInfo.infoSetList[i].recordList[j].infoItemList[k].id == 41){
                            	$scope.userHeadImage = ServerURL+"/web/mode400/resume/getResumeAttechment?resumeId="+$scope.urlParams.resumeId+"&fileId="+resumeInfo.infoSetList[i].recordList[j].infoItemList[k].fileId;
                            }
                        }
                    }
                }
            }
            $scope.fileList = fileList;
            $scope.resumeInfo = resumeInfo;
        });

        //编辑简历
        $scope.editResume = function(urlParams){
            goJumpPage($state,'editResume',urlParams,false);
        };

        //投递简历
        $scope.setResume = function(recruitType){
        	var length = $scope.menu.length;
        	for(var i=0;i<length;i++){
        		if($scope.menu[i].id == recruitType){
        			goJumpPage($state,'position',{recruitType: recruitType},false);
        			return;
        		}
        	}
        	goJumpPage($state,'searchResult',{recruitType: ''},false);
        };

        setNavColor($scope.recruitType);
    }]
});
