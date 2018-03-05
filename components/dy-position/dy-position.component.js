'use strict';

angular.module('byComponent').component('dyPosition', {
    bindings: {
        rowCount: "=",
        searchResult: "="
    },
    templateUrl: 'components/dy-position/dy-position.template.html',
    controller: ['$scope', '$timeout', 'queryData','$stateParams', '$state','$rootScope','$location', function($scope, $timeout, queryData, $stateParams,$state,$rootScope,$location) {
        var self = this;
        $scope.language = language;
        
        console.log($stateParams);
        //保存url参数
        $scope.urlParams = getUrlData($stateParams.option);
        //显示搜索条件
        $scope.condition = {};
        //搜索参数
        $scope.condition2 = {};
        //选为志愿页面新增resumeId
        if($scope.urlParams.resumeId){
        	$scope.condition2.resumeId = $scope.urlParams.resumeId;
        }
        //是否开启站点
        if(siteSerch.length == 0){
        	$scope.siteSerch = 'hide';
        }else{
        	$scope.siteSerch = siteSerch[0].siteSerchJson[$scope.urlParams.recruitType];
        }       
        console.log($scope.siteSerch);
        //设置职位列表显示条数
        $scope.condition2.rowSize = 12;
        //区别直接点击选择职位和弹窗选择职位
        $scope.secondjobContrl = false;       
        //搜索关键字
        $rootScope.$watch('searchResult',function(){
            $scope.condition2.postName = $rootScope.searchResult;
            self.searchResult = $rootScope.searchResult;
        });
        
        //作为修改志愿中职位页面时,传isReplaceApplyRecord过滤
        if($scope.urlParams.goChangePosition){
        	$scope.condition2.isReplaceApplyRecord = 1;
        }
        if($scope.urlParams.id){
            var type = $scope.urlParams.entranceType;
            switch (type*1){
                case 2:
                    $scope.condition.postType = $scope.urlParams.content;
                    $scope.condition2.postType = $scope.urlParams.id;
                    break;
                case 3:
                    $scope.condition.workCity = $scope.urlParams.content;
                    $scope.condition2.workCity = $scope.urlParams.id;
                    break;
                case 4:
                    $scope.condition.org = $scope.urlParams.content;
                    $scope.condition2.org = $scope.urlParams.id;
                    break;
            }

        }
        $scope.condition2.recruitType = $scope.urlParams.recruitType;
        //搜索区域数据渲染
        deferred.done(function(data){
            //nav颜色控制
            var type = $scope.condition2.recruitType;
            switch (type*1){
                //主页0---校园1campus----社会2social----内部招聘3---猎头4---内部推荐8----实习生招聘12intern----海外招聘13overseas
                case 1:
                    //校园
                    $scope.positionSearch = data.campus.positionSearch;
                    break;
                case 2:
                    //社会
                    $scope.positionSearch = data.social.positionSearch;
                    break;
                case 13:
                    //海外
                    $scope.positionSearch = data.overseas.positionSearch;
                    break;
                case 12:
                    //实习生
                    $scope.positionSearch = data.intern.positionSearch;
                    break;
                case 0:
                    //搜索结果
                    $scope.positionSearch = data.positionSearch;
                    break;
            }
        });

        /*翻页*/
        $scope.turnPage = function(index,type){
            /**
             * 1:第一页
             * 2:上一页
             * 3：下一页
             * 4：最后一页
             */
            switch (type){
                case 1:
                    $scope.condition2.rowIndex = 1;
                    break;
                case 2:
                    $scope.condition2.rowIndex = index - 1;
                    break;
                case 3:
                    $scope.condition2.rowIndex = index + 1;
                    break;
                case 4:
                    $scope.condition2.rowIndex = $scope.workInfo.pageTotal;
                    break;
            }
        };

        //监听查询职位列表参数
        $scope.$watch("condition2",function(){
            console.log($scope.condition2);
            $scope.closeTheInfo();
            var params = $scope.condition2;
            queryData.postData('/web/mode400/position/list',params).then(function(data){
            	if(data.code == '00'){
            		console.log(data);
                    $scope.workInfo = data.data;
                    self.rowCount = data.data.rowCount;
                    $scope.workInfo.pageTotal = Math.ceil(data.data.rowCount/data.data.rowSize);
                    if($scope.workInfo.pageTotal == 0){
                        $scope.workInfo.pageTotal = 1;
                    }
            	}else{
            		alert(data.content);
            	}               
            });
        },true);

        //切换条件时，重置rowIndex
        $scope.$watch("condition",function(){
            $scope.condition2.rowIndex = 1;
        },true);

        //职位二级联动
        $scope.$watch("condition.postType",function(n,o){
            //防止positionSearch为空时报错
            if($scope.positionSearch){
                if($scope.positionSearch.postType){
                    var length = $scope.positionSearch.postType.length;
                    for(var i = 0;i < length;i++){
                        if($scope.condition.postType == $scope.positionSearch.postType[i].content){
                            $scope.positionSearch.postType2 = $scope.positionSearch.postType[i].data;
                        }
                    }
                    if(n != o && !$scope.secondjobContrl){
                        $scope.condition.postType2 = "";
                        $scope.condition2.postType2 = "";
                        $(".main-right-t-m3-r").find('li').css({'background-color': 'inherit', 'color': '#666'});
                        $(".main-right-t-m2-r").find('li').css({'background-color': 'inherit', 'color': '#666'})
                    }
                }
            }
        });

        //添加选项
        $scope.selectOption = function(name,index,value){
            switch (index){
                case 1:
                    $scope.condition.workCity = name;
                    $scope.condition2.workCity = value;
                    break;
                case 2:
                    $scope.condition.postType = name;
                    $scope.condition2.postType = value;
                    break;
                case 3:
                    $scope.condition.postType2 = name;
                    $scope.condition2.postType2 = value;
                    break;
                case 4:
                    $scope.condition.org = name;
                    $scope.condition2.org = value;
                    break;
                case 5:
                    $scope.condition.recruitType = name;
                    $scope.condition2.recruitType = value;
                    break;
                case 6:
                    $scope.condition.site = name;
                    $scope.condition2.site = value;
                    break;
            }
        };

        //删除选项
        $scope.deleteOption = function(index){
            switch (index){
                case 1:
                    $scope.condition.workCity = '';
                    $scope.condition2.workCity = '';
                    break;
                case 2:
                    $scope.condition.postType = '';
                    $scope.condition2.postType = '';
                    break;
                case 3:
                    $scope.condition.postType2 = '';
                    $scope.condition2.postType2 = '';
                    break;
                case 4:
                    $scope.condition.org = '';
                    $scope.condition2.org = '';
                    break;
                case 5:
                    $scope.condition.recruitType = '';
                    $scope.condition2.recruitType = '';
                    break;
                case 6:
                    $scope.condition.site = '';
                    $scope.condition2.site = '';
                    break;
            }
        };

        //删除全部条件
        $scope.deleteAll = function(){
            if($scope.urlParams.recruitType){
                $scope.condition = {
                    recruitType: $scope.urlParams.recruitType
                };
                $scope.condition2 = {
                    recruitType: $scope.urlParams.recruitType,
                };
            }else{
                $scope.condition = {};
                $scope.condition2 = {};
            }
        };

        /*选择城市*/
        $scope.moreCity = function() {
        	$('#select-city').modal('show');
        	queryData.getData('/web/mode400/position/positionCity',{recruitType:$scope.urlParams.recruitType}).then(function(data){
        		$scope.cityAll = data.data;
        		var cityArr = [],length = $scope.cityAll.length;
        		for(var i = 0;i < length;i ++){
        			cityArr = cityArr.concat($scope.cityAll[i].data);
        		}
        		$scope.citySearchResult = cityArr;
        		
        	});
        	
        	$scope.addCity = function(name,code){
        		$scope.condition.workCity = name;
                $scope.condition2.workCity = code;
                $scope.citySearch = '';
                $('#select-city').modal('hide');
        	}       
        };

        /*选择职位*/
        $scope.moreJob = function() {
        	queryData.getData('/web/mode400/position/positiontype',{recruitType:$scope.urlParams.recruitType}).then(function(data){
        		if(data.code == '00'){
        			$scope.jobAll = data.data;
            		console.log(data);
            		var isOneOrSecond = false;
        			for (var key in data.data) {
        				if(data.data[key].childern.length != 0){
        					//模板二
        					$('#select-secondjob').modal('show');
        					isOneOrSecond = true;
        					break;
        				}
        			}
        			if(!isOneOrSecond){
        				//模板一
        				$('#select-job').modal('show');
        			}	  				
        		}      		
        	});
        	
        	$scope.secondjobClick = function(index){
    			$scope.secondjobIndex = index;
    		};
    		$scope.secondjobAdd = function(bName,bCode,cName,cCode){
    			console.log(bName,bCode,cName,cCode);
    			$scope.condition.postType = bName;
                $scope.condition2.postType = bCode;
    			$scope.condition.postType2 = cName;
                $scope.condition2.postType2 = cCode;
                $('#select-secondjob').modal('hide');
                $scope.secondjobContrl = true;
                
    		};
        	$scope.addJob = function(name,code){
        		$scope.condition.postType = name;
                $scope.condition2.postType = code;
                
                $('#select-job').modal('hide');
                
        	}
        };

        /*选择机构*/
        $scope.moreInstitution = function() {
        	$('#select-institution').modal('show');
        	queryData.getData('/web/mode400/position/positionOrg',{recruitType:$scope.urlParams.recruitType}).then(function(data){
        		$scope.institutionAll = data.data;
        		console.log(data);
        	});
        	
        	$scope.addInstitution = function(name,code){
                $scope.condition.org = name;
                $scope.condition2.org = code;
                
                $('#select-institution').modal('hide');
        	}
        };

        //查询职位详细信息
        $scope.workDetailInfo = function(info){
        	if(!$scope.urlParams.goChangePosition){
        		var params = {
                        postId: info.PostId,
                        recruitType: info.RecruitType
                    };
                    queryData.getData('/web/mode400/position/detail',params).then(function(data){
                    	
                        $scope.workDetail = $.extend(true,data.data,params);
                        $scope.workDetail.postIdStr = info.PostId + '_' + info.RecruitType;
                        console.log($scope.workDetail);
                    });
        	}
            
            //申请职位
            $scope.applyPosition = function(workDetail){
                queryData.getData('/web/mode400/resume/getUserResumeList',{recruitType: workDetail.recruitType,postId: workDetail.postId}).then(function(data){
                	var length = data.data.resumeList.length;
                	$scope.resumeList = data;
                    $scope.resumeList.PostId = workDetail.postId;
                    $scope.resumeList.RecruitType = workDetail.recruitType;
                    $scope.resumeList.PostName = workDetail.name;
                    $scope.resumeList.quickRecruitType = workDetail.quickRecruitType;
                    $scope.resumeList.WorkPlace = workDetail.workPlace;
                    $scope.resumeList.RecruitNumber = workDetail.RecruitNumber;
                    $scope.resumeList.PostType = workDetail.PostType;
                    $scope.resumeList.OrgName = workDetail.OrgName;
                    $scope.resumeList.site = workDetail.site;
                    console.log($scope.resumeList);
                    if($scope.resumeList.data.maxApplyNum<=0){
                    	alert($scope.language.personalCenter.canNotApplyNew);
                    	return;
                    }
                    if(length == 0){
                        if(data.data.cnResumeFinishStatus !== 0 && data.data.enResumeFinishStatus === 0){
                        	$scope.resumeList.lanType = 2;
                        }else{
                        	$scope.resumeList.lanType = 1;
                        }
                        if(!data.data.resumeId){
                            goJumpPage($state,'applyPosition',$scope.resumeList,true);
                        }else{
                        	$('#myModal').modal('show');                        	
                        }
                    }else{
                    	for(var i=0;i<length;i++){
                        	if(data.data.cnResumeFinishStatus === 0 && data.data.enResumeFinishStatus === 0){
                        		if(data.data.resumeList[i].cnFinishStatus === true && data.data.resumeList[i].enFinishStatus === true){
                        			$scope.resumeList.hasCompleteResume = true;
                        			$scope.resumeList.data.resumeList[i].finishStatus = true; 
                        			$scope.chooseSite();
                        		}else if(data.data.resumeList[i].cnFinishStatus === true && data.data.resumeList[i].enFinishStatus === false){
                        			$scope.resumeList.data.resumeList[i].finishStatus = false;
                        			$scope.resumeList.data.resumeList[i].finishLanType = 2;
                        			$('#myModal').modal('show');
                        		}else{
                        			$scope.resumeList.data.resumeList[i].finishStatus = false;
                        			$scope.resumeList.data.resumeList[i].finishLanType = 1;
                        			$('#myModal').modal('show');
                        		}
                        	}else if(data.data.cnResumeFinishStatus === 0 && data.data.enResumeFinishStatus !== 0){
                        		if(data.data.resumeList[i].cnFinishStatus === true){
                        			$scope.resumeList.hasCompleteResume = true;
                        			$scope.resumeList.data.resumeList[i].finishStatus = true;
                        			$scope.chooseSite();
                        		}else{
                        			$scope.resumeList.data.resumeList[i].finishStatus = false;
                        			$scope.resumeList.data.resumeList[i].finishLanType = 1;
                        			$('#myModal').modal('show');
                        		}
                        	}else if(data.data.cnResumeFinishStatus !== 0 && data.data.enResumeFinishStatus === 0){
                        		if(data.data.resumeList[i].enFinishStatus === true){
                        			$scope.resumeList.hasCompleteResume = true;
                        			$scope.resumeList.data.resumeList[i].finishStatus = true;
                        			$scope.chooseSite();
                        		}else{
                        			$scope.resumeList.data.resumeList[i].finishStatus = false;
                        			$scope.resumeList.data.resumeList[i].finishLanType = 2;
                        			$('#myModal').modal('show');
                        		}
                        	}else{
                        		$scope.resumeList.hasCompleteResume = true;
                    			$scope.resumeList.data.resumeList[i].finishStatus = true;
                    			$scope.chooseSite();
                        	}
                                     		
                    	}		
                        

                    }
                });
            };
        };
        $scope.chooseSite = function(){
        	if($scope.resumeList.site){
        		if($scope.resumeList.site.length == 0){
            		$('#myModal').modal('show');
            	}else{
            		$('#mySite').modal('show');
            	}
        	}else{
        		$('#myModal').modal('show');
        	}
        };
        //关闭职位信息窗口
        $scope.closeTheInfo = function(){
            $('.main-content').hide();
            $('.icon-arrow').hide();
            $('.close').hide();
            $(".btn-yes").hide();
            $('.table-b').find('tr').css({"background-color":"white"});
        };
        
        //选为志愿	
        $scope.chooseVolunteer = function(a){
        	if(a.showReplaceApplyRecordInfo == 1){
        		if(a.canReplaceApplyRecord == 1){
                	window.opener.changePosition(a,$scope.urlParams.switchPosition);
                	window.close();
            	}
        	}else{
        		alert($scope.language.position.canNotApply);
        	}        	
        };      
        
        function setPosition(obj){
       	 	var x = obj.position().left;
            var y = (80 - obj.outerWidth()) / 2;
            var z = x - y + 5;
            $('#solid-bottom').css({'left': z});
       }
        $(document).ready(function(){
        	$('.table-b-cell').each(function(i,v){
        		$('.table-a-cell').eq(i).width($(v).width());
        	});
            //表头跟随
            $(window).scroll(function() {
                if($('.table-b').length != 0){
                    var x = $('.table-b').offset().top - $(document).scrollTop();
                    //var y = $('.table-b').position().left;
                    var z = $(document).scrollTop() + 55;
                    $('.table-a').width($('.table-b').width());
                    if (x <= 55) {
                        $('.table-a').css({
                            'display': 'block',
                            'position': 'fixed',
                            'top': '35px'
                        });
                    } else {
                        $('.table-a').css({
                            'display': 'none'
                        });
                    }
                }
            });
        });
    }]
});