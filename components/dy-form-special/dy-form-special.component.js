'use strict';

angular.module('byComponent').component('dyFormSpecial', {
	bindings: {
        name:'@',
        data:'@'
    },
    templateUrl: 'components/dy-form-special/dy-form-special.template.html',
    controller: ['$scope','queryData', function ($scope,queryData) {
    	var self = this;
    	var str;
        $scope.dataInfo = JSON.parse(self.data);
        $scope.name = self.name;
        $scope.fillType = $scope.dataInfo.fillType;
        //特殊模板类型-输入
        //当fillType=1时是文本输入框但是有模糊匹配功能
        //学校 模糊数据连接：/wt/企业code/web/dic/selectSchool!createSchoolJson?lanType=语言&q=模糊数据&limit=查询条数
        //专业 模糊数据连接：/wt/企业code/web/dic/selectSchool!createFrontMajorJson?lanType=语言&q=模糊数据&limit=查询条数
        $scope.inputMethod = function(a){
        	str = 'input[name=' + $scope.name + ']'; 
        	if(a.code){
        		$(str).val(a.code);
        	}
        	if(a.id){
        		$(str).val(a.id);
        	}
        	$(str).next().val(a.name);
        	$(str).next().show();
        	$(str).siblings(".input-query").hide();
        	$scope.option1 = [];
		};
        
        if($scope.fillType == 1){
        	return false;
        }
        //特殊模板类型-弹窗
    	$scope.chooseSchool = function(){
    		str = 'input[name=' + $scope.name + ']'; 
    		$scope.schoolVal = {
    			value: $(str).next().val(),
    			text: $(str).val()
    		};
    		var option = {
    			itemId: $scope.dataInfo.id,
    			dataSource: $scope.dataInfo.customDataSource
    		};
    		if(!$scope.option1){
    			queryData.ignoreData('/web/mode400/resume/getCustomDataSource',option).then(function(data){
    				/*if($scope.fillType == 9){
    					var length = data.data.length;
    					var arr = [];
    					if($scope.dataInfo.customDataSource == 'subject'){   						
    						for(var i=0;i<length;i++){
        						arr = arr.concat(data.data[i].subject);
        					}
    						$scope.option1 = arr;
    						if(!$scope.option2){
    							$scope.option2 = $scope.option1[0].child;
    							$scope.item1 = $scope.option1[0];
    						}
    						//标题
    						if($scope.dataInfo.lanType == 1){
    							$scope.modelTitle = "选择专业";
    						}else{
    							$scope.modelTitle = "Choose major";
    						}
    					}else{
    						for(var i=0;i<length;i++){
        						arr = arr.concat(data.data[i].area);
        					}
    						$scope.option1 = arr;
    						if(!$scope.option2){
    							$scope.option2 = $scope.option1[0].school;
    							$scope.item1 = $scope.option1[0];
    						}
    						//标题
    						if($scope.dataInfo.lanType == 1){
    							$scope.modelTitle = "选择学校";
    						}else{
    							$scope.modelTitle = "Choose school";
    						}
    					}    					    					
    				}else{
    					$scope.option1 = data.data; 
    				}*/  
    				var length = data.data.length;
					var arr = [];
					if($scope.dataInfo.customDataSource == 'subject'){ 
						$scope.option1 = data.data;
						for(var i=0;i<length;i++){
    						arr = arr.concat(data.data[i].subject);
    					}
						//$scope.option1 = arr;
						if(!$scope.option2){
							$scope.option2 = $scope.option1[0].child;
							$scope.item1 = $scope.option1[0];
						}
						//标题
						if($scope.dataInfo.lanType == 1){
							$scope.modelTitle = "选择专业";
						}else{
							$scope.modelTitle = "Choose major";
						}
					}else{
						for(var i=0;i<length;i++){
    						arr = arr.concat(data.data[i].area);
    					}
						$scope.option1 = arr;
						if(!$scope.option2){
							$scope.option2 = $scope.option1[0].school;
							$scope.item1 = $scope.option1[0];
						}
						//标题
						if($scope.dataInfo.lanType == 1){
							$scope.modelTitle = "选择学校";
						}else{
							$scope.modelTitle = "Choose school";
						}
					} 
                });
    		}
    		$('.modal_'+ $scope.name).modal('show');
    	};
    	$scope.chooseItem = function(item,type){
    		if($scope.dataInfo.customDataSource == 'subject'){
    			if(type == 1){
        			$scope.option2 = item.child;
        			$scope.item1 = item;
        		}else if(type == 2){
        			$(str).val(item.id);
        			$(str).next().val($scope.item1.name+'-'+item.name);
    				$('.modal_'+ $scope.name).modal('hide');				
        		}else{
        			$(str).val('');
        			$(str).next().val('');
        			$('.modal_'+ $scope.name).modal('hide');
        		}
    		}else{
    			if(type == 1){
        			$scope.option2 = item.school;
        			$scope.item1 = item;
        		}else if(type == 2){
        			$(str).val(item.name);
        			$(str).next().val(item.name);
    				$('.modal_'+ $scope.name).modal('hide');				
        		}else{
        			$(str).val('');
        			$(str).next().val('');
        			$('.modal_'+ $scope.name).modal('hide');
        		}
    		}
    		 		
    	};    	
    }]
});
