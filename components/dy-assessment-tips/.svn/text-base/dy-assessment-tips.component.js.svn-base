'use strict';

angular.module('byComponent').component('dyAssessmentTips', {
    templateUrl: 'components/dy-assessment-tips/dy-assessment-tips.template.html',
    controller: ['$scope','$stateParams','$state', function ($scope,$stateParams,$state) {
    	$scope.urlParams = getUrlData($stateParams.option);
    	$scope.language = language;
    	
    	$scope.goAssessOrExam = function(type){
    		if(type == 1){
    			//$state.go('personalCenter');
        		window.open($scope.urlParams.assessUrl,'_blank');
    		}else{
    			window.open($scope.urlParams.writtenExamUrl,'_blank');
    		}
    	};
    }]
});
