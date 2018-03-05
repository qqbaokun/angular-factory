'use strict';

/**
 * 搜索结果
 */
angular.module('byComponent').component('dySearchResult', {
    templateUrl: 'components/dy-search-result/dy-search-result.template.html',
    controller: ['$scope','$rootScope', function ( $scope,$rootScope) {
    	$rootScope.pageName = pageName.searchResult;
        $scope.language = language;
    }]
});
