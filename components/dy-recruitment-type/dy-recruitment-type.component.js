/**
 * Created by bbk on 2017/4/12.
 */
'use strict';

angular.module('byComponent').component('dyRecruitmentType', {
    bindings:{
        status: "@",
        navData:"@",
        navIndex:'@'
    },
    templateUrl: 'components/dy-recruitment-type/dy-recruitment-type.template.html',
    controller: ['$scope','$timeout','$state',function ( $scope,$timeout,$state) {
        var self = this;
        $scope.option = JSON.parse(self.status);
        $scope.navData = JSON.parse(self.navData);
        //防止图片imgUrl为空时查询错误
        if($scope.option.imgUrl){
        	$scope.option.expression = {'background-image': 'url('+ $scope.option.imgUrl + ')'};
        }

        /**
         * 多入口      
         * 六边形入口
         * 正方形入口*/
        $scope.multipleEntry = function(op){
            var option = $.extend(true, {},op);
            option.recruitType = $scope.option.id;
            option.index = self.navIndex;
            option.entranceType = $scope.option.entranceType;
            console.log(option);
            if(option.content){
            	goJumpPage($state,'position',option,false);
            }
            
        };
        /**
         * 圆形入口
         */
        $scope.multipleSingleEntry = function(op){
        	var option = $.extend(true, {},op);
            option.recruitType = $scope.option.id;
            option.index = self.navIndex;
            option.entranceType = $scope.option.entranceType;
            if(option.id != 15){
            	option.id = 0;
            }
            console.log(option);
            if(option){
            	goJumpPage($state,'position',option,false);
            }
        };
        if($scope.option.type == 'B4'){
            console.log($scope.option);
            if(lanType == 1){
	            	switch($scope.option.entranceType*1){
	            	case 1:
	            		$scope.option.titleName = "二级栏目";
	            		break;
	            	case 2:	            		
	            		$scope.option.titleName = "职位类别";	          
	            		break;
	            	case 3:
	            		$scope.option.titleName = "工作地点";
	            		break;
	            	case 4:
	            		$scope.option.titleName = "所属机构";
	            		break;
	            }
            }else{
	            	switch($scope.option.entranceType*1){
	            	case 1:
	            		$scope.option.titleName = "The secondary section";
	            		break;
	            	case 2:	            		
	            		$scope.option.titleName = "Job category";
	            		break;
	            	case 3:
	            		$scope.option.titleName = "Working place";
	            		break;
	            	case 4:
	            		$scope.option.titleName = "subsidiary organ";
	            		break;
	            }
            }
            
        }


        $(document).ready(function(){
            getHeight();
            changeColor();
            hexagonColor();
            squareColor();  
            if($(".hexagon-bg polygon")){$(".hexagon-bg polygon").attr("fill",mainColor).css("opacity","0.2");}
            
            $(".mainCircle .st0").attr("fill",mainColor);
            $(".secondaryCircle .st0").attr("fill",secondaryColor);
        });


    }]
});
