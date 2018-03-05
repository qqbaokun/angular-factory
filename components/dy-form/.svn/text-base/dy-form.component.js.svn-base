'use strict';

/**
 * 表单各个组件
 */
angular.module('byComponent').component('dyForm', {
    bindings: {
        code:'@',
        nameNum:'@',
        data:'@'
    },
    templateUrl: 'components/dy-form/dy-form.template.html',
    controller: ['$scope','queryData','$http','$timeout', function ($scope,queryData,$http,$timeout) {
        var self = this;
        $scope.dataInfo = JSON.parse(self.data);
        $scope.name = self.nameNum;
        $scope.fillType = $scope.dataInfo.fillType;
        
        if($scope.dataInfo.lanType == 1){
        	$scope.lanTypeChoose = "请选择";
        	$scope.lanTypeDelete = "删除";
        	$scope.lanTypeFile = "未选择任何文件，文件小于5M";
        }else{
        	$scope.lanTypeChoose = "Please choose";
        	$scope.lanTypeDelete = "Delete";
        	$scope.lanTypeFile = "No file is selected and the file is less than 5M";
        }
        var str;
        if(self.code){
            if($scope.dataInfo.fillType == 9){
                $scope.option = dataSourceValue[self.code];
                

                $scope.selectValChange = function(code,name){
                    str = 'select[name=' + name + ']';
                    if(code){
                        queryData.ignoreData('/web/mode400/resume/getResumeDicByCode',{code: code,lanType: $scope.dataInfo.lanType}).then(function(data){
                            $scope.option2 = data.data;

                            $(str).val(data.data[0]);
                            $(str).empty();
                            $.each(data.data, function (i) {
                                if(i ==0){
                                    $("<option value='" + data.data[i].code + "' selected>" + data.data[i].name + "</option>")
                                        .appendTo($(str));
                                }else{
                                    $("<option value='" + data.data[i].code + "'>" + data.data[i].name + "</option>")
                                        .appendTo($(str));
                                }

                            });
                            $(str).selectpicker('refresh');
                        });
                    }else{
                    	if($scope.dataInfo.lanType == 1){
                    		$("<option value='' selected>请选择</option>")
                            .appendTo($(str));
                    	}else{
                    		$("<option value='' selected>Please choose</option>")
                            .appendTo($(str));
                    	}
                        
                        $(str).selectpicker('refresh');
                    }

                };

            }else{
                $scope.option = dataSourceValue[self.code];
                if(dataSourceValue[self.code].length == 0){           		
            		str = 'select[name=' + $scope.name + ']';
            		$timeout(function(){
            			$(str).selectpicker();
            		});
            		
            	}
            }
        }else{
            if($scope.dataInfo.fillType == 8){
                $scope.fileShow =false;
                $scope.uploadUser = function(file){
                    if(file){
                        $scope.fileShow = true;
                    }
                };
                $scope.deleteFile = function(file){
                    $scope.file = '';
                    $scope.fileShow =false;
                };

            }
        }
    }]
});
