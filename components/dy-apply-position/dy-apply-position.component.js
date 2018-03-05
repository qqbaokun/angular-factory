'use strict';
angular.module('byComponent').component('dyApplyPosition', {
    templateUrl: 'components/dy-apply-position/dy-apply-position.template.html',
    controller: ['$scope','$stateParams','queryData','Upload','$state','$rootScope', function ( $scope,$stateParams,queryData,Upload,$state,$rootScope) {
        console.log($stateParams);
        $scope.language = language;
        $rootScope.pageName = pageName.applyPosition;
        deferred.done(function(data){
            $scope.privacyStatement = data.privacyStatement;
            if($scope.privacyStatement.status == 0){
                $('#myPrivacyStatement').modal('show');
            }
        });

        $scope.workDetail = getUrlData($stateParams.option);

        $scope.stepIndex = 0;
        $scope.external = {
            channelId: ''
        };



        //获取站点信息/web/mode400/resume/getChannel
        queryData.getData('/web/mode400/crop/getApplyPostWay',{postId: $scope.workDetail.PostId,recruitType: $scope.workDetail.RecruitType}).then(function(data){
            $scope.getApplyPostWay = data.data;
            
            var length = $scope.getApplyPostWay.importResume.length;
            var importResumeAll = '';
            for(var i=0;i<length;i++){
            	if(i == length-1){
            		importResumeAll += $scope.getApplyPostWay.importResume[i].name;
            	}else{
            		importResumeAll += $scope.getApplyPostWay.importResume[i].name + '、';
            	}
            }
            $scope.importResumeAll = importResumeAll;
            console.log(data);
              
            if($scope.workDetail.lanType == 1){
            	$scope.updateFile = {
            		upfile: "上传简历：",
            		chooseFile:"选择文件",
            		unChooseFile:"未选择任何文件",
            		fileFormat:"上传附件的格式为jpg、jpeg、bmp、png、html、htm、pdf、doc、docx、txt、xls、xlsx、mht等！",
            		createQuick:"创建快捷简历"
            	}
            }else{
            	$scope.updateFile = {
                	upfile: "Upload resume:",
                	chooseFile:"Select file",
                	unChooseFile:"Did not choose any files",
                	fileFormat:"Upload appendages are jpg,jpeg,bmp,png,html,htm,pdf,doc,docx,txt,xls,xlsx,mht, etc. ",
                	createQuick:"Create Quick CV"
                }
            }
            //获取快捷简历模板
            if($scope.getApplyPostWay.quickResume != 1){
            	queryData.getData('/web/mode400/resume/getResumeTemplate',{recruitType: $scope.workDetail.quickRecruitType,lanType: $scope.workDetail.lanType}).then(function(data){
                    console.log(data);
                    dataSourceValue = data.data.dataSourceValue;
                    var length = data.data.resumeTemplate.length;
                    var resumeInfo = [];                   
                    for(var a = 0;a < data.data.resumeTemplate.length;a++){
                        resumeInfo.push([data.data.resumeTemplate[a]]);
                        if(data.data.resumeTemplate[a].infoItemList){
                        	for(var b = 0;b < data.data.resumeTemplate[a].infoItemList.length;b++ ){ 
                        		data.data.resumeTemplate[a].infoItemList[b].lanType = $scope.workDetail.lanType;                                
                            }
                        }
                        
                    }
                    
                    $scope.resumeInfo = resumeInfo;
                    console.log($scope.resumeInfo);
                });
            }
        });

        //下一步
        $scope.jumpStep = function(type,external){
            console.log(external);
            if(type == 1){
                queryData.getData('/web/mode400/resume/importResumeList',external).then(function(data){
                    console.log(data);
                    if(data.code == '00'){
                    	$scope.webResume = data.data;
                        $scope.stepIndex = type;
                    }else{
                    	alert(data.content);
                    }
                    
                });
            }else{
                $scope.stepIndex = type;
            }
        };

        //导入简历
        $scope.importResume = function(external,webResumeValue){
            var webValue = JSON.parse(webResumeValue);
            var params = {
                websiteResumeName : webValue.webResumeName + '(' + webValue.languageStr + ')',
                recruitType: $scope.workDetail.RecruitType,
                operateUrl : webValue.operateUrl,
                postType: $scope.workDetail.data.postType
            };
            params = $.extend(true,external,params);
            console.log(params);
            
            Upload.upload({
                url: ServerURL + '/web/mode400/resume/importWebsiteResume',
                data: params
            }).success(function(data){
            	console.log(data);
                if(data.code == '00'){
                	var option = {
                            postId: $scope.workDetail.PostId,
                            resumeId: data.data.resumeId,
                            recruitType: $scope.workDetail.RecruitType,
                            postName: $scope.workDetail.PostName,
                            templateId: $scope.workDetail.data.templateId,
                            lanType: $scope.workDetail.lanType,
                            site: $scope.workDetail.site
                     };
                     goJumpPage($state,'editResume',option,false);
                }else{
                	alert(data.content);
                }
            }).error(function(){
            	console.log(data);
            });
        };

        //上传文件
        $scope.uploadResume = function (file) {
            console.log(file);
        };
        $scope.uploadQuickResume = function(file){
        	$scope.file1 = file;
        };

        //确认上传
        $scope.uploadAllFile = function(file,lanType){
            var params = {
                recruitType: $scope.workDetail.RecruitType,
                file: file,
                lanTypeAttachment: lanType,
                postType: $scope.workDetail.data.postType
            };

            console.log(params);
            Upload.upload({
                url: ServerURL + '/web/mode400/resume/analyzerResume',
                data: params
            }).success(function (data) {
                console.log(data);
                if(data.code == '00'){
                	/*alert($scope.language.applyPosition.uploadSuccess,function(){
                        
                    });*/
                	var option = {
                            postId: $scope.workDetail.PostId,
                            resumeId: data.data.resumeId,
                            recruitType: $scope.workDetail.RecruitType,
                            templateId: $scope.workDetail.data.templateId,
                            postName: $scope.workDetail.PostName,
                            site: $scope.workDetail.site,
                            lanType: lanType
                     };
                     goJumpPage($state,'editResume',option,false);
                }else{
                	alert(data.content);
                }
                
            }).error(function (data) {
                console.log(data);
            });
        };

        
        


        //保存简历
        $scope.createResume = function(){
            /**
             * 必填项验证
             * flag解决$.each()无法跳出循环bug*/
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
        	if (flag) {
                return false;
            }
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

            var formParams = $.extend({} , {
                recruitType: $scope.workDetail.RecruitType,
                lanType: $scope.workDetail.lanType,
                isQuickResume: '0'
            },$("#myForm").serializeJson());
            if($scope.getApplyPostWay.quickResumeFileNecessary == 0){
            	if($scope.file1){
            		formParams.resumeAttachment = $scope.file1;
            	}else{
            		alert($scope.language.applyPosition.placeUpload);
            		return false;
            	}
            }
            //投递
            if(!$scope.alreadyCreate){
            	queryData.getData('/web/mode400/resume/addResume',formParams).then(function(data){
                    $scope.alreadyCreate = true;
                    $scope.alreadyCreateResumeId = data.data.resumeId;
                    $scope.getResumeList($scope.alreadyCreateResumeId);
                });
            }else{
            	$scope.getResumeList($scope.alreadyCreateResumeId);
            }
            
            console.log(formParams);
        };
        $scope.getResumeList = function(resumeId){
        	queryData.ignoreData('/web/mode400/resume/getUserResumeList',{recruitType: $scope.workDetail.RecruitType,postId: $scope.workDetail.PostId,resumeId: resumeId}).then(function(data){
            	$scope.resumeList = data;
                $scope.resumeList = $.extend(true, data, $scope.workDetail);
                $scope.resumeList.hasCompleteResume = true;
                $scope.resumeList.quickApply = true;
                
                $('#myModal').modal('show');
                console.log($scope.resumeList);
                
            });
        };
        //在线填写
        $scope.fillOnline = function(){
            var option = {
                postId: $scope.workDetail.PostId,
                recruitType: $scope.workDetail.RecruitType,
                lanType: $scope.workDetail.lanType,
                templateId: $scope.workDetail.data.templateId,
                postType : $scope.workDetail.data.postType,
                postName:  $scope.workDetail.PostName,
                site: $scope.workDetail.site
            };
            goJumpPage($state,'editResume',option,false);
        };
        
        window.closeApplyPage = function(){
        	window.close();
        };
        setNavColor($scope.workDetail.RecruitType);
    }]
});
