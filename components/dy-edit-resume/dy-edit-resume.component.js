'use strict';
angular.module('byComponent').component('dyEditResume', {
    templateUrl: 'components/dy-edit-resume/dy-edit-resume.template.html',
    controller: ['$scope','$timeout','queryData','$stateParams','Upload','$state','$rootScope','$http', function ( $scope,$timeout,queryData,$stateParams,Upload,$state,$rootScope,$http) {
    	$rootScope.pageName = pageName.editResume;
    	$scope.language = language;
    	$scope.urlParams = getUrlData($stateParams.option);
    	if($scope.urlParams.lanType == 1){
    		$scope.lanTypeExit = "暂存并退出";
    		$scope.lanTypeApply = "申请职位";
    		$scope.lanTypeAddMore = "增加更多";
    	}else{
    		$scope.lanTypeExit = "Temp Store & Exit";
    		$scope.lanTypeApply = "Apply Position";
    		$scope.lanTypeAddMore = "Add More";
    	}
        console.log($stateParams);
      
        var resumeInfo = [];//模板数据
        var getResumeInfo = {};//表单数据
        var indexTotal = 0,index = 0;//dy-form组件ng-repeat次数

        //获取模板
        queryData.getData('/web/mode400/resume/getResumeTemplate',{recruitType: $scope.urlParams.templateId?$scope.urlParams.templateId:$scope.urlParams.recruitType,lanType: $scope.urlParams.lanType}).then(function(data){
            $scope.modelInfo = data.data.resumeTemplate;
            dataSourceValue = data.data.dataSourceValue;
            console.log(data.data);
            //统计repeat-finish数量
            for(var a = 0;a < data.data.resumeTemplate.length;a++){
                resumeInfo.push([data.data.resumeTemplate[a]]);
                if(data.data.resumeTemplate[a].infoItemList){
                	for(var b = 0;b < data.data.resumeTemplate[a].infoItemList.length;b++ ){ 
                		data.data.resumeTemplate[a].infoItemList[b].lanType = $scope.urlParams.lanType;
                        if(data.data.resumeTemplate[a].infoItemList[b].fillType == 9 || data.data.resumeTemplate[a].infoItemList[b].fillType == 4 || data.data.resumeTemplate[a].infoItemList[b].fillType == 3 || data.data.resumeTemplate[a].infoItemList[b].fillType == 5){                        	
                        	var isNotEmpty = dataSourceValue[data.data.resumeTemplate[a].infoItemList[b].dataSource] != 0?true:false;
                        	var isSpecail = data.data.resumeTemplate[a].infoItemList[b].customDataSource;
                        	if(isNotEmpty && !isSpecail){
                            	indexTotal ++;
                            }
                        }
                    }
                }
                
            }
            console.log(indexTotal);
            //获取数据表单数据
            if($scope.urlParams.resumeId){
                queryData.ignoreData('/web/mode400/resume/getResume',{resumeId:$scope.urlParams.resumeId,lanType:$scope.urlParams.lanType}).then(function(data){
                    var info = data.data;
                    console.log(data);
                    if(data.code == '06'){
                    	alert(data.content,function(){
                    		window.close();
                    	});
                    }
                    var name;
                    //三级遍历
                    for(var i = 0;i < info.infoSetList.length;i++){
                        var id = info.infoSetList[i].id;
                        for(var j = 0;j < info.infoSetList[i].recordList.length;j++){
                            //根据数据 增加/重新 渲染模板数量
                            //if(j != 0){
                            for(var x = 0;x < $scope.modelInfo.length;x++){
                                if(id == $scope.modelInfo[x].id){
                                    //清空原来的模板
                                    if(j == 0){
                                        resumeInfo[x].splice(0,1);
                                    }
                                    $scope.modelInfo[x].recordId = info.infoSetList[i].recordList[j].recordId;
                                    $scope.modelInfo[x].code = info.infoSetList[i].code;
                                    //克隆对象,防止数据被覆盖
                                    var objModel = $.extend(true, {}, $scope.modelInfo[x]);
                                    resumeInfo[x].push(objModel);
                                }
                            }
                            //}

                            for(var k = 0; k < info.infoSetList[i].recordList[j].infoItemList.length;k++){
                                name = info.infoSetList[i].id + '_' + info.infoSetList[i].recordList[j].infoItemList[k].id + '_' + (j+1);
                                info.infoSetList[i].recordList[j].infoItemList[k].lanType = $scope.urlParams.lanType;
                                if(info.infoSetList[i].recordList[j].infoItemList[k].customDataSource){
                                	getResumeInfo[name] = info.infoSetList[i].recordList[j].infoItemList[k];
                                }else{
                                	if(info.infoSetList[i].recordList[j].infoItemList[k].fillType == 9){
                                		/*if(info.infoSetList[i].recordList[j].infoItemList[k].id == 32 || info.infoSetList[i].recordList[j].infoItemList[k].id == 33){
                                			getResumeInfo[name] = info.infoSetList[i].recordList[j].infoItemList[k];
                                		}else{
                                			var str = info.infoSetList[i].recordList[j].infoItemList[k].value;
                                            str = str.split('/');
                                            str = str[0] + '/' +  str[1] + '/' + str[2];
                                            getResumeInfo[name] = [str,info.infoSetList[i].recordList[j].infoItemList[k].value];
                                		}*/
                                        var str = info.infoSetList[i].recordList[j].infoItemList[k].value;
                                        str = str.split('/');
                                        str = str[0] + '/' +  str[1] + '/' + str[2];
                                        getResumeInfo[name] = [str,info.infoSetList[i].recordList[j].infoItemList[k].value];
                                    }else if(info.infoSetList[i].recordList[j].infoItemList[k].fillType == 8){
                                        getResumeInfo[name] = info.infoSetList[i].recordList[j].infoItemList[k];
                                        getResumeInfo[name].resumeId = $scope.urlParams.resumeId;
                                    }else if(info.infoSetList[i].recordList[j].infoItemList[k].fillType == 11){
                                    	getResumeInfo[name] = info.infoSetList[i].recordList[j].infoItemList[k];
                                    }else if(info.infoSetList[i].recordList[j].infoItemList[k].fillType == 2){
                                    	if(info.infoSetList[i].recordList[j].infoItemList[k].id == 21){
                                    		getResumeInfo[name] = info.infoSetList[i].recordList[j].infoItemList[k].value;
                                    	}else{
                                    		var item = (info.infoSetList[i].recordList[j].infoItemList[k].value).split('-');
                                    		getResumeInfo[name] = item[0] + '-' + item[1];
                                    	}
                                    }else{
                                        getResumeInfo[name] = info.infoSetList[i].recordList[j].infoItemList[k].value;
                                    }
                                }
                                

                            }
                        }
                    }
                    $scope.resumeInfo = resumeInfo;
                    console.log(getResumeInfo);
                    console.log($scope.resumeInfo);
                });
            }else{
                $scope.resumeInfo = resumeInfo
            }
        });


        //保存简历
        $scope.save = function(type){
            /**
             * 必填项验证
             * flag解决$.each()无法跳出循环bug*/

            var formParams = {};
            var flag = false;
            $('.startDate').each(function(i,v){
            	var startDateVal = $(v).val().split('-');
            	var endDateVal = $('.endDate').eq(i).val().split('-');
            	if(startDateVal[0]>endDateVal[0] || (startDateVal[0]==endDateVal[0] && startDateVal[1]>=endDateVal[1])){
            		$(v).parent().addClass('bc-red');
            		$(v).addClass('bc-red');
            		$('.endDate').eq(i).parent().addClass('bc-red');
            		$('.endDate').eq(i).addClass('bc-red');
            		$('body,html').scrollTop($(v).offset().top-60);
            		
            		$(v).bind('input propertychange change',function(){
            			$(v).parent().removeClass('bc-red');
                		$(v).removeClass('bc-red');
                		$('.endDate').eq(i).parent().removeClass('bc-red');
                		$('.endDate').eq(i).removeClass('bc-red');
            		});
            		$('.endDate').eq(i).bind('input propertychange change',function(){
            			$(v).parent().removeClass('bc-red');
                		$(v).removeClass('bc-red');
                		$('.endDate').eq(i).parent().removeClass('bc-red');
                		$('.endDate').eq(i).removeClass('bc-red');
            		});
            		flag = true;
                    return false;
            	}
            	
            });
            if(flag){
        		return false;
        	}
        	$('.requireFormat').each(function(i,v){
        		var val = $(v).val();
        		var id = $(v).attr('formatId');
        		if(val){
        			var ret = getFormat(id);
        			if(!ret.test($(this).val())){
                		var $this = $(this);
                        $('body,html').scrollTop($this.offset().top-60);
                        $this.focus();
                        $this.parent().addClass('bc-red');
                        $this.addClass('bc-red');

                        $this.bind('input propertychange change',function(){
                        	if($(this).val()){
                        		if(ret.test($(this).val())){
                                	$this.parent().removeClass('bc-red');
                                    $this.removeClass('bc-red');                               
                                }else{
                                	$this.parent().addClass('bc-red');
                                    $this.addClass('bc-red');
                                }
                        	}else{
                        		$this.parent().removeClass('bc-red');
                                $this.removeClass('bc-red');  
                        	}   
                        });
                        flag = true;
                        return false;
                	}
        		}
        	});
        	if(flag){
        		return false;
        	}
            if(type == 2){           	
            	$('.requireFile').each(function(i,v){
            		var fileVal = $(v).get(0).files[0];
            		if(fileVal == '' || fileVal == undefined){
            			var $this = $(this);
            			console.log($this);
            			console.log($this.offset().top);
            			$('body,html').scrollTop($this.offset().top-60);
            			$this.parent().addClass('bc-red');
            			
            			$this.bind('input propertychange change',function(){
                            if($this.get(0).files[0] == ''|| $this.get(0).files[0] == undefined){
                                $this.parent().addClass('bc-red');
                                $this.addClass('bc-red');
                            }else{
                                $this.parent().removeClass('bc-red');
                                $this.removeClass('bc-red');
                            }
                        });
                        flag = true;
                        return false;
            		}
            	});
            	if (flag) {
                    return false;
                }
                $('.requireInput').each(function(i,v){
                    var msg = $(this).attr('msg');
                    var id = $(this).attr('formatId');                    
                    if(id == 36 || id == 37 || id == 100){
                    	var ret = getFormat(id);
                    	if(!ret.test($(this).val())){
                    		var $this = $(this);
                    		var $obj;
                    		if($(this).attr('type') == 'hidden'){
                    			$obj = $(this).parent();
                    		}else{
                    			$obj = $(this);
                    		}
                            $('body,html').scrollTop($obj.offset().top-60);
                            $this.focus();
                            $this.parent().addClass('bc-red');
                            $this.addClass('bc-red');
                            $this.siblings().addClass('bc-red');

                            $this.bind('input propertychange change',function(){
                                if(!ret.test($(this).val())){
                                    $this.parent().addClass('bc-red');
                                    $this.addClass('bc-red');
                                    $this.siblings().addClass('bc-red');
                                }else{
                                    $this.parent().removeClass('bc-red');
                                    $this.removeClass('bc-red');
                                    $this.siblings().removeClass('bc-red');
                                }
                            });
                            flag = true;
                            return false;
                    	}
                    }else{
                    	if($(this).val() == ''|| $(this).val() == undefined){
                            var $this = $(this);
                            var $obj;
                    		if($(this).attr('type') == 'hidden'){
                    			$obj = $(this).parent();
                    		}else{
                    			$obj = $(this);
                    		}
                            $('body,html').scrollTop($obj.offset().top-60);
                            $this.focus();
                            $this.parent().addClass('bc-red');
                            $this.addClass('bc-red');

                            $this.bind('input propertychange change',function(){
                                if($this.val() == ''|| $this.val() == undefined){
                                    $this.parent().addClass('bc-red');
                                    $this.addClass('bc-red');
                                }else{
                                    $this.parent().removeClass('bc-red');
                                    $this.removeClass('bc-red');
                                }
                            });
                            flag = true;
                            return false;
                        }
                    }
                    
                });
                if (flag) {
                    return false;
                }                
                $('.requireRadio').each(function(i,v){
                    var name = "input:radio[name='" + $(this).attr('name') + "']:checked";
                    var val = $(name).val();
                    var msg = $(this).attr('msg');
                    if(val == '' || val == undefined){
                        var $this = $(this);
                        $('body,html').scrollTop($this.offset().top-60);
                        $this.parent().parent().addClass('bc-red');
                        $this.focus();

                        $this.bind('input propertychange change',function(){
                            if($this.val() == ''|| $this.val() == undefined){
                                $this.parent().parent().addClass('bc-red');
                            }else{
                                $this.parent().parent().removeClass('bc-red');
                            }
                        });
                        flag = true;
                        return false;
                    }
                });
                if (flag) {
                    return false;
                }
                $('.requireCheckbox').each(function(i,v){
            		var name = $(v).attr('checkboxName');
            		var itemChecked = '[name=' + name + ']:checked';
            		var item = '[name=' + name + ']';
            		var chk_value = [];
            		$(item).each(function(k,m){
            			$(m).change(function(){
            				var chk_val = [];
            				$(itemChecked).each(function(){ 
            					chk_val.push($(this).val());
            				});
            				if(chk_val.length == 0 || chk_val == undefined){                    		          			
                    			$(v).addClass('bc-red');                   		
                    		}else{
                    			$(v).removeClass('bc-red');          			
                    		}
            			});
            		});
            		$(itemChecked).each(function(j,w){ 
            			chk_value.push($(this).val()); 	
            		}); 
            		if(chk_value.length == 0 || chk_value == undefined){
            			$('body,html').scrollTop($(v).offset().top-60);           			
            			$(v).addClass('bc-red');
            			flag = true;
                        return false;
            		}else{
            			$(v).removeClass('bc-red');          			
            		}
            		
            	});
            	if (flag) {
                    return false;
                }
                $('.requireSelect.selectpicker').each(function(i,v){
                    var val = $(this).val();
                    var msg = $(this).attr('msg');
                    if(val == '' || val == undefined){
                        var $this = $(this);
                        $('body,html').scrollTop($this.offset().top-60);
                        $this.focus();
                        $this.parent().parent().addClass('bc-red');
                        $this.parent().parent().siblings().addClass('bc-red');
                        if($this.hasClass('requireSelect2')){
                            $this.parent().parent().siblings().find('select').change(function(){
                                if($this.parent().parent().siblings().find('select').val() == ''|| $this.parent().parent().siblings().find('select').val() == undefined){
                                    $this.parent().parent().siblings().addClass('bc-red');
                                    $this.parent().parent().addClass('bc-red');
                                }else{
                                    $this.parent().parent().siblings().removeClass('bc-red');
                                    $this.parent().parent().removeClass('bc-red');
                                }
                            });
                        }else{
                            $this.change(function(){
                                if($this.val() == ''|| $this.val() == undefined){
                                    $this.parent().parent().addClass('bc-red');
                                }else{
                                    $this.parent().parent().removeClass('bc-red');
                                }
                            });
                        }
                        flag = true;
                        return false;
                    }
                });
                if (flag) {
                    return false;
                }
            }

            //单独获取文件
            $('.get-file-val').each(function(i,v){
                var name = $(v).attr('name');
                var file = $(v).get(0).files[0];
                if(file){
                    formParams[name] = file;
                }
            });

            formParams = $.extend(formParams , {
                recruitType: $scope.urlParams.recruitType,
                resumeName: $scope.urlParams.resumeName,
                lanType: $scope.urlParams.lanType,
                postType: $scope.urlParams.postType,
            },$("#myForm").serializeJson());
            
            
            
            var url;
            if($scope.urlParams.resumeId && !$scope.urlParams.goPerfect){
            	//修改
            	formParams.resumeId = $scope.urlParams.resumeId;
            	url = ServerURL + '/web/mode400/resume/editResume';	
            }else{
            	//添加
            	url = ServerURL + '/web/mode400/resume/addResume';
            }
            Upload.upload({
                url: url,
                data: formParams
            }).success(function (data) {
                console.log(data);
                if(data.code == '00'){
                    if(type == 2 && $scope.urlParams.postId){
                        //投递 ----postId=职位id&resumeId=简历id&recruitType=招聘类型
                        var params = {
                            postId: $scope.urlParams.postId,
                            recruitType: $scope.urlParams.recruitType,
                            resumeId: formParams.resumeId?$scope.urlParams.resumeId:data.data.resumeId
                        };
                        //防止重复点击生成多份简历
                        if(!formParams.resumeId){
                        	$scope.urlParams.resumeId = data.data.resumeId;
                        	$scope.urlParams.goPerfect = false;
                        }
                        //去填写中/英文简历--非必填
                    	$scope.goModifyResume = function(){
                    		var urlParams = {
                    			postId: $scope.urlParams.postId,
                    			recruitType: $scope.urlParams.recruitType,
                    			postName: $scope.urlParams.postName,
                    			site: $scope.urlParams.site,
                    			resumeId: formParams.resumeId?$scope.urlParams.resumeId:data.data.resumeId,
                    			lanType: $scope.urlParams.lanType==1?2:1,
                    			templateId: $scope.urlParams.templateId?$scope.urlParams.templateId:false		
                    		};
                    		goJumpPage($state,'editResume',urlParams,false);
                    		$('#choose-lantype').modal('hide');
                    	};
                    	//去填写中/英文简历--必填
                    	$scope.mustBePerfected = function(word){
                    		confirm(word,function(r){
                        		if(r){
                        			var urlParams = $scope.urlParams;
                        			urlParams.lanType = $scope.urlParams.lanType==1?2:1;
                        			urlParams.recruitType = $scope.urlParams.recruitType;
                        			urlParams.site = $scope.urlParams.site;
                        			urlParams.postName = $scope.urlParams.postName;
                        			urlParams.resumeId = formParams.resumeId?$scope.urlParams.resumeId:data.data.resumeId;
                        			urlParams.templateId = $scope.urlParams.templateId?$scope.urlParams.templateId:false;
                        			urlParams.goPerfect = false;
                                		
                                	goJumpPage($state,'editResume',urlParams,false);
                                	$('#choose-lantype').modal('hide');
                        		}
                        	});
                    	};
                    	//直接投递
                    	$scope.directDelivery = function(){
                    		$('#choose-lantype').modal('hide');
                    		$scope.witchModal();
                    	};
                        console.log(params);
                        queryData.ignoreData('/web/mode400/resume/getUserResumeList',{recruitType: $scope.urlParams.recruitType,postId: $scope.urlParams.postId,resumeId: formParams.resumeId?$scope.urlParams.resumeId:data.data.resumeId}).then(function(data){
                        	var length = data.data.resumeList.length;
                        	$scope.resumeList = data;
                            $scope.resumeList = $.extend(true, data, $scope.urlParams);
                            $scope.resumeList.hasCompleteResume = true;
                            $scope.resumeList.PostName = $scope.urlParams.postName;
                            $scope.resumeList.PostId = $scope.urlParams.postId;
                            $scope.resumeList.RecruitType = $scope.urlParams.recruitType;
                            $scope.resumeList.site = $scope.urlParams.site;
                            console.log($scope.resumeList);
                            if(data.data.cnResumeFinishStatus === 0 && data.data.enResumeFinishStatus === 0){
                        		if(data.data.resumeList[0].cnFinishStatus === true && data.data.resumeList[0].enFinishStatus === true){
                        			$scope.witchModal();
                        		}else if(data.data.resumeList[0].cnFinishStatus === true && data.data.resumeList[0].enFinishStatus === false){
                        			$scope.mustBePerfected($scope.language.editResume.needsEnglish);                      			
                        		}else{
                        			$scope.mustBePerfected($scope.language.editResume.needsChinese);
                        		}
                        	}else if(data.data.cnResumeFinishStatus === 0 && data.data.enResumeFinishStatus !== 0){
                        		if(data.data.resumeList[0].cnFinishStatus === true && data.data.resumeList[0].enFinishStatus === false){
                        			$('#choose-lantype').modal('show');
                        		}else if(data.data.resumeList[0].cnFinishStatus === false && data.data.resumeList[0].enFinishStatus === true){
                        			$scope.mustBePerfected($scope.language.editResume.needsChinese);
                        		}else if(data.data.resumeList[0].cnFinishStatus === false && data.data.resumeList[0].enFinishStatus === false){
                        			$scope.mustBePerfected($scope.language.editResume.needsChinese);
                        		}else{
                        			$scope.witchModal();
                        		}
                        	}else if(data.data.cnResumeFinishStatus !== 0 && data.data.enResumeFinishStatus === 0){
                        		if(data.data.resumeList[0].cnFinishStatus === false && data.data.resumeList[0].enFinishStatus === true){
                        			$('#choose-lantype').modal('show');
                        		}else if(data.data.resumeList[0].cnFinishStatus === true && data.data.resumeList[0].enFinishStatus === false){
                        			$scope.mustBePerfected($scope.language.editResume.needsEnglish);
                        		}else if(data.data.resumeList[0].cnFinishStatus === false && data.data.resumeList[0].enFinishStatus === false){
                        			$scope.mustBePerfected($scope.language.editResume.needsEnglish);
                        		}else{
                        			$scope.witchModal();
                        		}
                        	}else{
                        		$scope.witchModal();
                        	}
                            
                        });                
                        
                    }else{
                        //暂存
                    	alert($scope.language.editResume.hasBeenSaved,function(){                            
                    		if(window.opener){
                    			if(window.opener.refreshPersonCenterData){
                        			window.opener.refreshPersonCenterData();
                        		}
                        		if(window.opener.closeApplyPage){
                        			window.opener.closeApplyPage();
                        		}
                        		window.close();
                    		}else{
                    			$state.go('personalCenter');
                    		}
                            
                        });
                    }
                }else if(data.code == '07'){
                	alert(data.content,function(){
                        window.location = "/wt/"+copyCode+"/web/index"
                    });
                }else{
                	alert(data.content);
                }

            }).error(function(){

            });
            console.log(formParams);
        };

        //添加模块
        $scope.addModel = function(index,op){
            var option = $.extend(true, {},op);
            if(option.recordId){
                delete option.recordId;
            }

            $scope.resumeInfo[index].push(option);
        };

        //删除模块
        $scope.deleteModel = function(target,index,recordId,code){
            console.log(target,index,recordId,code);
            $scope.resumeInfo[target].splice(index,1);
            //resumeId=简历编号&lanType=简历语言类型：1、中文，2英文&setCode=信息集code&recordId=信息集recordId
            if(recordId){
                var params = {
                    resumeId: $scope.urlParams.resumeId,
                    lanType: $scope.urlParams.lanType,
                    recordId: recordId,
                    setCode: code
                };
                queryData.ignoreData('/web/mode400/resume/deleteResumeSet',params).then(function(data){
                    console.log(data);
                });
            }
        };
        $scope.witchModal = function(){
        	if($scope.urlParams.site){
        		if($scope.urlParams.site.length == 0){
            		$('#myModal').modal('show');
            	}else{
            		$('#mySite').modal('show');
            	}
        	}else{
        		$('#myModal').modal('show');
        	}	
        }; 
        //监听所有dy-form组件渲染完毕
        $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
            index ++;
            //利用indexTotal == index，判断ng-repeat渲染最后一次
            if(indexTotal == index){
                //给表单赋值
            	$timeout(function(){
            		$("#myForm").setForm(getResumeInfo,$scope.urlParams.lanType);
            	});
                

                //添加展开/收起事件
                $('.wt-icon580-60').each(function(i,v){
                    $(v).unbind('click').click(function(){
                        var $this = $(this).parent().parent().parent();
                        if($this.hasClass('itemHidden')){
                            $this.removeClass('itemHidden');
                        }else{
                            $this.addClass('itemHidden');
                        }
                    });
                });

            }
        });
        //setNavColor($scope.recruitType);    
    }]
});
