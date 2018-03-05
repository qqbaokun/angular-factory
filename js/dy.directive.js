/**
 * Created by bbk on 2017/4/14.
 */
/* 自定义指令 */
angular.module("dy.directive", [])
    .directive('selectCourt', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

            }
        }
    })
    .directive('editMouseOver', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
            	$(element).mouseover(function(){
            		$(this).addClass("mc-c");
            		$(this).find(".icon-bianji").addClass("mc-c");
            	});
            	$(element).mouseout(function(){
            		$(this).removeClass("mc-c");
            		$(this).find(".icon-bianji").removeClass("mc-c");
            	});
            }
        }
    })
    .directive('toggleShow',function($http,$timeout,queryData){
      return {
        restrict:'A',
        link:function (scope,element,attrs) {
          //var height = $(element).find("span").height();
          $(element).mouseover(function(e){
            $(this).find("span").css({
              "bottom":"0px",
            });
          });
          $(element).mouseout(function(e){
              $(this).find("span").css({
              "bottom":"-50px",
              });
          });
        }
      }
    })
    //turnAround校园招聘旋转圆圈
    .directive('turnAround', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var roundJ = 0,roundK = 0,roundL = 0,roundM = 0,rotateNum;
                $(element).find('.campus-round-c-c').each(function(i,v){

                    var $this,interVal;
                    $(v).mouseover(function(e){

                        $this = $(this).siblings();
                        interVal = setInterval( function(){
                            switch (i){
                                case 0:
                                    roundJ = roundJ + 1;
                                    $this.css({'transform': 'rotate(' + roundJ + 'deg)'});
                                    break;
                                case 1:
                                    roundK = roundK + 1;
                                    $this.css({'transform': 'rotate(' + roundK + 'deg)'});
                                    break;
                                case 2:
                                    roundL = roundL + 1;
                                    $this.css({'transform': 'rotate(' + roundL + 'deg)'});
                                    break;
                                case 3:
                                    roundM = roundM + 1;
                                    $this.css({'transform': 'rotate(' + roundM + 'deg)'});
                                    break;
                            }

                        },10);
                    });

                    $(v).mouseout(function(e){
                        $this = $(this).parent();
                        clearInterval(interVal);
                    });


                });
            }
        }
    })
    //全局颜色
    .directive('defineColor', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                   /*主色字体色：      class="mc-c"
                 	    主色背景色：      class="mc-bgc"
				                主色边框色：      class="mc-bc"
				                副色字体色：      class="sc-c"
				                副色背景色：      class="sc-bgc"
				                副色边框色：      class="sc-bc"*/
                var colorStyle = '<style>.mc-bgc{background-color:' + mainColor + '!important}' +
                    '.sc-bgc{background-color:' + secondaryColor + '!important}' +
                    '.mc-c{color:' + mainColor + '!important}' +
                    '.sc-c{color:' + secondaryColor + '!important}' +
                    '.icon-shalou{color:' + secondaryColor +'}' +
                    '.mc-bc{border-color:' + mainColor + '!important}' +
                    '.mc-bc::after{border-color:' + mainColor + '}' +
                    '.sc-bc{border-color:' + secondaryColor + '!important}' +
                    '.mc-bbc{border-bottom-color:' + mainColor + '!important}' +
                    '.sc-bbc{border-bottom-color:' + secondaryColor + '!important}' +
                    '.w-c{color:white!important}' +
                    '.delete-all:hover{color:' + secondaryColor + '!important}' +
                    '.city-name:hover{color:white;background-color:'+ secondaryColor +';'+'border-color:'+ secondaryColor +'!important;}';

                $(element).before(colorStyle);
            }
        }
    })
    //设置最小高度
    .directive('setMinHeight', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).css({'min-height':height-attrs.setMinHeight});
                $('body').scrollTop(0);
            }
        }
    })
    //设置最大高度
    .directive('setMaxHeight', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).css({'max-height':height-attrs.setMaxHeight});
            }
        }
    })
    //applyPosition收起或收缩
    .directive('applyOpenClose', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                $(element).click(function(){
                	var $this = $(this).find('span');
                    if($this.hasClass('wt-icon140-540')){
                    	$this.removeClass('wt-icon140-540').addClass('wt-icon140-560');
                        $(this).parent().removeClass('applyPositionModel-close');
                    }else{
                        $this.removeClass('wt-icon140-560').addClass('wt-icon140-540');
                        $(this).parent().addClass('applyPositionModel-close')
                    }
                });
            }
        }
    })
    //首页幻灯片
    .directive('creatSwiper', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
            	$(element).css({"background-image":'url('+ scope.u +')'});
                if (scope.$last) {
                    $(document).ready(function(){
                    	var $swiperList = $(".swiper-container-1"),i = 1;
                    	var $swiperImg = $swiperList.find(".swiper-slide");
                    	$swiperImg.eq(0).css({'opacity':"1"}).siblings().css({'opacity':"0"});
                    	var interval = setInterval(function (){
                    		$swiperImg.eq(i).animate({'opacity':"1"}, 300,function(){
                    			$(this).siblings().css({'opacity':"0"});
                    		});
                    		i++;
                    		if(i>=$swiperImg.length){
                    			i=0;
                    		};
                    	},3000);
                    	
                    });
                }
            }
        }
    })
    //集团化幻灯片
    .directive('creatGroupSwiper', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last) {
                    $(document).ready(function(){
                    	var length = scope.option.data.length;
                    	if(length >= 6){
                    		length = 6;
                    	}
                    	$(element).parents().find(".collectivize-main").css({'margin-left':-1*100*length + 'px',"width":length * 200});
                    	$(function () {
            				//定义需要反复使用的dom元素
                    		var $listCon = $(".swiper-container-2");
            				var $listDiv = $('.swiper-container-2 .swiper-wrapper');
            				var $prevA = $('.collectivize-main .swiper-button-prev');
            				var $nextA = $('.collectivize-main .swiper-button-next');
            				if(scope.option.data.length <= 6){
            					$nextA.addClass("swiper-button-disabled");
            				}
            				$prevA.addClass("swiper-button-disabled");
            				//定义一些翻页所需要的变量或常量
            				var index = 0; //当前第几页, 默认是第一页
            				var moving = false; //标识当前是否正在移动,默认不动
            				var SLIDE_TIME = 300; //翻页持续的时间
            				var SLIDE_DIS = 200; //翻一页的距离   //ctrl+shift+x/y  大小写
            				var IMG_COUNT = scope.option.data.length //图片的个数 
            				var intervalId;
            				$listDiv.width(SLIDE_DIS * IMG_COUNT);
            				$prevA.click(function() {
            					nextPage(false);
            				});
            				$nextA.click(function() {
            					nextPage(true);
            				});

            				autoNextPage();

            				$listDiv.hover(function () {
            					clearInterval(intervalId);
            				}, function () {
            					autoNextPage();
            				});
            				
            				/*
            				 * 自动翻到下一页 
            				 */
            				function autoNextPage () {
            					intervalId = setInterval(function () {
            						if($listDiv.position().left  > (-(IMG_COUNT)*SLIDE_DIS + $listCon.width()+2)){
            							nextPage(true);
            						}else{
            							$listDiv.animate({'left':"0px"}, SLIDE_TIME, 'linear',function(){
            								$prevA.addClass("swiper-button-disabled");
            								$nextA.removeClass("swiper-button-disabled");
            								moving = false;
            							});
            						}
            					}, 3000);
            					if(scope.option.data.length <= 6){
            						clearInterval(intervalId);
            					}
            				}
            				
            				/*
            				 * 翻到下/上一页,或指定的页
            				 */
            				function nextPage (next) {
            					//如果正在移动, 直接结束
            					if(moving) {
            						return;
            					}
            					//设置为正在移动
            					moving = true;
            					//计算翻页的偏移量
            					var offset = 0;
        						offset = next ? -SLIDE_DIS : SLIDE_DIS;
            					//计算目标位置的left值
            					var targetLeft = $listDiv.position().left + offset;
            					//启动自定义动画,实现水平滑动
            					if(targetLeft <= (-(IMG_COUNT)*SLIDE_DIS + $listCon.width()+2) ) {
            						$prevA.removeClass("swiper-button-disabled");
    								$nextA.addClass("swiper-button-disabled");
        							$listDiv.animate({'left':-(IMG_COUNT)*SLIDE_DIS + $listCon.width()+2 + "px"}, SLIDE_TIME, 'linear',function(){
        								moving = false;
        							});
        						} 
        						else if(targetLeft >= 0) {
    								$prevA.addClass("swiper-button-disabled");
    								$nextA.removeClass("swiper-button-disabled");
        							$listDiv.animate({'left':"0px"}, SLIDE_TIME, 'linear',function(){
        								moving = false;
        							});
        						}else{
            						$prevA.removeClass("swiper-button-disabled");
            						$nextA.removeClass("swiper-button-disabled");
        							$listDiv.animate({'left':targetLeft}, SLIDE_TIME, 'linear', function () {
                						moving = false;
        							});
        						}
            				}
            			});
                    });
                }
            }
        }
    })
    //自定义swiper热区颜色
    .directive('swiperStyle', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var swiperStyle = '<style>.swiper-pagination-white .swiper-pagination-bullet {background-color:' + mainColor +';}</style>';
                $(element).before(swiperStyle);
            }
        }
    })
    .directive('renderFinish', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished',element);
                    });
                }
            }
        }
    })
    .directive('repeatFinish', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last) {
                    $timeout(function() {
                        scope.$emit('ngRepeatFinished',element);
                        var tagName = $(element).parent()[0].tagName;
                        if(tagName == 'SELECT'){
                            $(element).parent().selectpicker({
                                size: 6
                            });
                        }
                    });
                }
            }
        }
    })
    //简历数
    .directive('repeatPositionFinish', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                if (scope.$last) {
                    scope.$emit('repeatPositionFinish',element);
                }
            }
        }
    })
    //select加皮肤
    .directive('defaultStyle', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
            	$timeout(function(){
            		$(element).parent().selectpicker({
                        size: 6
                    });
            	});
                
            }
        }
    })
    //input选择格式
    .directive('chooseDate', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
            	var id = scope.$parent.dataInfo.id;
            	var lanType = scope.$parent.dataInfo.lanType;
            	var language;
            	//简历中英文
            	if(lanType == 1){
            		language = 'zh-CN';
            	}else{
            		language = 'en';
            	}
            	console.log(scope.$parent.dataInfo);
            	if(id == 21){
            		chooseDate($(element),{
            			language:  language
            		});
            	}else{
            		chooseDate($(element),{
            	        startView: 3,
            	        minView: 3,
            	        format:'yyyy-mm',
            	        forceParse: true,
            	        language:  language
            		});
            	}
                
            }
        }
    })
    //个人中心-我的简历-鼠标移入效果
    .directive('resumeListColor', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                $(element).mouseover(function(){
                    $(this).css("background-color","#efeded"); 
                    $(this).find('.resumeIcon a').css("opacity","1"); 
                }).mouseout(function(){
                    $(this).css("background-color","transparent");
                    $(this).find('.resumeIcon a').css("opacity","0"); 
                });
            }
        }
    })
    //个人中心-我的简历-鼠标移入效果
    .directive('resumeCollectionColor', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                $(element).mouseover(function(){
                    $(this).addClass("haveBack");
                }).mouseout(function(){
                    $(this).removeClass("haveBack");
                });
            }
        }
    })
    //个人中心-点击nav跟随
    .directive('clickToTarget', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var ele = '.PMR-' + attr.clickToTarget;
                /*$(element).on("click", function(){
                    $('body').animate({scrollTop:$(ele).offset().top-120}, 300);
                });*/
                $(element).click(function(){
                	$('html,body').animate({scrollTop:$(ele).offset().top-120+'px'}, 300);
                });
            }
        }
    })
    //个人中心-滚动nav跟随
    .directive('scrollToTarget', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var scRgb = secondaryColor.colorRgb();
                var myResumeStyle = "<style>.societyColor{background-color:rgba(" + scRgb + ",.3)}" +
                                    ".schoolColor{background-color:rgba(" + scRgb + ",.5)}" +
                                    ".overseasColor{background-color:rgba(" + scRgb + ",.7)}" +
                                    ".internColor{background-color:rgba(" + scRgb + ",.9)}" +
                                    "</style>";
                $(element).before(myResumeStyle);

                function changeClass(the){
                    the.siblings().css({"color":"#494949","border-color":"#e1e1e1"});
                    the.css({"color":mainColor,"border-color":mainColor});
                }
                function changeColorPc(){
                    var scrollHeight = $(window).scrollTop();
                    if($('.PML-main').length != 0){
                        $('.PML-main').each(function(i,v){
                            var vt = $(v).offset().top;
                            var vw = $(v).height();
                            if(scrollHeight >= vt -80*(i+1)-85 && scrollHeight <= vt+vw/2){
                                $('.PML-menu').find('li').each(function(j,w){
                                    if(i == j){
                                        changeClass($(w));
                                    }
                                });
                            }
                        });
                    }
                }
                var interval = setInterval(function(){
                    changeColorPc();
                },500);
                $(document).ready(function () {
                    $(window).scroll(function(e){
                        changeColorPc();
                        clearInterval(interval);
                    });
                });

                clearNavColor();
            }
        }
    })
    //个人中心-查看应聘详情
    .directive('getApplyDetail', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
            	if(scope.a.hasProcessId == 1 || scope.a.hasAssessment != 1 || scope.a.hasWrittenExam != 1){
            		$(element).click(function(){
                        var $this = $(this);
                        var $i = $this.find("i") ;
                        var strClass = "haveBack";
                        if(!$this.parent().parent().attr('class')){
                            $this.parent().parent().addClass("haveBack").next(".hideRow").css("display","table-row");
                            $i.attr("class","toUp");
                        }
                        else{
                            $this.parent().parent().removeClass("haveBack").next(".hideRow").css("display","none");
                            $i.attr("class","toDown");
                        }
                    });
            	}           	
            }
        }
    })
    //编辑简历-点击nav跟随
    .directive('editClickTarget', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var id = '#' + attr.editClickTarget;
                $(element).on("click", function(){
                    $('html,body').animate({scrollTop:$(id).offset().top-90}, 300);
                    changeClass($(this));
                });
                function changeClass(the){
                    the.siblings().removeClass('mc-c mc-bc');
                    the.addClass('mc-c mc-bc');
                }
            }
        }
    })
    //编辑简历-滚动nav跟随
    .directive('editScrollTarget', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                function changeClass(the){
                    the.siblings().removeClass('mc-c mc-bc');
                    the.addClass('mc-c mc-bc');
                }
                function changeColorPc(){
                    var scrollHeight = $(window).scrollTop();
                    if($('.edit-resume-div').length != 0){
                        $('.edit-resume-div').each(function(i,v){
                            var vt = $(v).offset().top;
                            var vw = $(v).height();

                            if(scrollHeight >= vt -150 && scrollHeight <= vt+vw/2){
                                $('.PML-menu').find('li').each(function(j,w){
                                    if(i == j){
                                        changeClass($(w));
                                    }
                                    if(i>=$('.edit-resume-div').length/2){
                                    	$('.person-main-left').scrollTop(500);
                                    }else{
                                    	$('.person-main-left').scrollTop(0);
                                    }
                                });
                            }
                        });
                    }
                }
                $(document).ready(function () {
                    $(window).scroll(function(e){
                        changeColorPc();
                    });
                    $('.person-main-left').hover(function(){
                    	$(window).off('scroll');
                    },function(){
                    	$(window).scroll(function(e){
                            changeColorPc();
                        });
                    });
                    $('.next-step').css({right: (width-1200)/2+30+'px'});
                });
            }
        }
    })
    //nav获取焦点
    .directive('searchResult', function ($state) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
            	/**
            	 * input样式修改
            	 * @placeholder
            	 */
            	var inputStyle = "<style>#nav ::-webkit-input-placeholder {color: white;}#nav :-moz-placeholder {color: white;}#nav ::-moz-placeholder {color: white;}#nav :-ms-input-placeholder {color: white;}</style>";
                
                $(element).focus(function(){
                    var option = {
                        recruitType : 0
                    };
                    goJumpPage($state,'searchResult',option,false);
                    $('body').scrollTop(0);
                });
                if(mainData.menu.type*1 == 2){
                	$(element).before(inputStyle);
                }
            }
        }
    })
    //单击收藏, 单击取消收藏 指令
    .directive("cancelcollectionOrCollection", function ($state,$location, queryData) {
        return {
            restrict: "AE",
            link: function (scope, element, attrs) {
                element.on("click", function () {
                    //改变五角星颜色
                    if (attrs.collection == 0) {
                        queryData.ignoreData('/web/mode400/addAlternativePost',{postIdStr:attrs.postid}).then(function(data){
                            scope.workDetail.alternative = 1;
                            if(data.code == '00'){
                            	if (element.attr("class") == "iconfont icon-fav") {
                                    element.attr("class", "iconfont icon-shoucang1");
                                }else {
                                    element.attr("class", "iconfont icon-fav");
                                }
                            }else{
                            	alert(data.content);
                            }
                        });
                    }else {
                        queryData.ignoreData('/web/mode400/deleteAlternativePost',{postIdStr:attrs.postid}).then(function(data){
                            scope.workDetail.alternative = 0;
                            if(data.code != '00'){
                            	if (element.attr("class") == "iconfont icon-fav") {
                                    element.attr("class", "iconfont icon-shoucang1");
                                }else {
                                    element.attr("class", "iconfont icon-fav");
                                }
                            }else{
                            	alert(data.content);
                            }
                        });
                    }
                });

            }
        }
    })
    //职位列表-控制下划线位置
    .directive('addCondition', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var addCondition = attrs.addCondition;
                var j = 0;
                $(element).click(function() {
                    //控制下划线位置
                    if(addCondition){
                    	setPosition($(this));
                    }
                });
           
                $(document).ready(function(){
                	if (scope.$last) {
                		if(addCondition){
                			$('.main-right-t-m2-r').find('li').each(function(i,v){
                            	if($(v).text() == scope.$parent.urlParams.content){
                            		setPosition($(v));
                                	//setColor($(v));	
                            	}
                            });
                		}
                    }
                });                              
                function setPosition(obj){
                	 var x = obj.position().left;
                     var y = (80 - obj.outerWidth()) / 2;
                     var z = x - y + 5;
                     $('#solid-bottom').css({
                         'left': z
                     });
                }
            }
        }
    })
    //职位列表-点击弹出详情
    .directive('positionDetails', function ($http, $timeout, queryData) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var a;
                $(element).mouseover(function() {
                    var d = $(this).hasClass('mouseOn');
                    if (!d) {
                        $(this).css({
                            'background-color': '#fbfbfb'
                        });
                    }
                    if(attrs.positionDetails){
                    	 $(this).find('td:last button').show();
                    }                   
                });
                $(element).mouseout(function() {
                    var d = $(this).hasClass('mouseOn');
                    if (!d) {
                        $(this).css({
                            'background-color': 'white'
                        });
                    }
                    if(attrs.positionDetails){
                   	 	$(this).find('td:last button').hide();
                    } 
                });
                $(element).find('td:last button').click(function(e){
                    e.stopPropagation();
                });
                $(element).click(function() {
                    /*选中元素给底色*/
                	if(!attrs.positionDetails){
                		$(this).addClass('mouseOn');
                        $(this).siblings().removeClass('mouseOn');
                        $(this).css({
                            'background-color': '#fbfbfb'
                        });
                        $(this).siblings(':not(:first)').css({
                            'background-color': 'white'
                        });

                        var leftLocation = $(this).find('td').eq(2).offset().left;

                        var rightBposition = ($(window).width() - 1200)/2;

                        console.log(rightBposition);

                        var length = $(this).find('td').length;

                        var thisWidth = $(this).find('td').eq(length-1).offset().left - $(this).find('td').eq(2).offset().left + $(this).find('td').eq(length-1).innerWidth();

                        var b = $('.page-b').offset().top;

                        var c = $(this).offset().top;

                        if ($('.table-a').css('display') == 'block') {
                            a = $('.table-a').offset().top;

                        } else {
                            a = $('.table-b').offset().top;
                        }

                        $('.main-content').css({
                            'top': a + 41,
                            'height': b - a - 60,
                            'opacity': '0',
                            'left': leftLocation,
                            'width': thisWidth
                        });
                        $('.icon-arrow').css({
                            'top': c + 15,
                            'opacity': '0',
                            'border-color': mainColor,
                            left: leftLocation
                        });
                        $('.close').css({
                            'top': a + 60,
                            'right': rightBposition + 60,
                            'opacity': '0'
                        });
                        $('.btn-yes').css({
                            'top': b - 100,
                            'right': rightBposition + 60,
                            'opacity': '0'
                        });

                        $('.main-content').show();
                        $('.icon-arrow').show();
                        $('.close').show();
                        $(".btn-yes").show();

                        $('.main-content,.icon-arrow,.close,.btn-yes').animate({
                            opacity: '1'
                        }, 0);
                	}
                    
                });
            }
        }
    })
    //企业文化-点击nav跟随
    .directive('cultureClickTarget', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var index = attr.cultureClickTarget;
                $(element).click(function(){
                    $('.PMR-myResume').each(function(i,v){
                        if(i == index){
                            var top = $(v).offset().top;
                            $('html,body').animate({scrollTop:top-105}, 300);
                        }
                    });
                });
            }
        }
    })
    //企业文化-点击滚动跟随
    .directive('cultureScrollTarget', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                function changeClass(the){
                    the.siblings().removeClass('mc-c mc-bc');
                    the.addClass('mc-c mc-bc');
                }
                function changeColorPc(){
                    var scrollHeight = $(window).scrollTop();
                    if($('#corporate-culture').length != 0){
                        $('.PMR-myResume').each(function(i,v){
                            var vt = $(v).offset().top;
                            var vw = $(v).height();


                            if(i == 0){
                                if(scrollHeight >= 0 && scrollHeight <= vt+vw/2){
                                    $('.PML-menu').find('li').each(function(j,w){
                                        if(i == j){
                                            changeClass($(w));
                                        }
                                    });
                                }

                            }else{
                                var pvt = $(v).prev().offset().top;
                                var pvw = $(v).prev().height();
                                if(scrollHeight >= pvt+pvw/2 && scrollHeight <= vt+vw/2){
                                    $('.PML-menu').find('li').each(function(j,w){
                                        if(i == j){
                                            changeClass($(w));
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
                $(document).ready(function () {
                    $(window).scroll(function(e){
                        changeColorPc();
                    });
                });
            }
        }
    })
    //解析视频地址
    .directive('embedSrc', function () {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            var current = element;
	            //scope.$watch(attrs.embedSrc, function () {
	                var clone = element.clone().attr('src', attrs.embedSrc);
	                //console.log(clone);
	                current.replaceWith(clone);
	                current = clone;
	            //});
	         }
	    };
    })
    //城市搜索获取焦点显示/隐藏
    .directive('citySearch', function () {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	            $(element).click(function(e){
	            	$(this).find('.search-result-li').show();
	            	e.stopPropagation();
	            	$(document).click(function(){
		            	$(this).find('.search-result-li').hide();
		            });
	            });
	         }
	    };
    })
    //职位列表-选择职位
    .directive('secondjobStyle', function () {
	    return {
	        restrict: 'A',
	        link: function (scope, element, attrs) {
	        	var height = $(element).find('.jobmain-left ul').height();
	            if(height > 400){
	            	$(element).find('.border-bg').hide();
	            }
	            $(element).find('.jobmain-left').hover(function(){
	                $(this).css("overflow-y","auto")
	            },function(){
	                $(this).css("overflow-y","hidden")
	            });
	            $(element).find('.jobmain-right').hover(function(){
	                $(this).find('.jobmain-right-cell').css("overflow-y","auto")
	            },function(){
	            	$(this).find('.jobmain-right-cell').css("overflow-y","hidden")
	            });

	         }
	    };
    })
    //职位列表-选择职位
    .directive('secondjobClick', function () {
	    return {
	        restrict: 'A',	  
	        link: function (scope, element, attrs) {
	        	$(element).click(function(){
	        		var index = attrs.secondjobClick;
	        		$(this).css({'border-right': '1px solid white','background-color': 'white'});
                    $(this).siblings().css({'border-right': '1px solid #cccccc','background-color': '#f8f8f8'});
	        	});	        
	         }
	    };
    })
    //新加滚动效果
    .directive('personFlow', function () {
	    return {
	        restrict: 'A',	  
	        link: function (scope, element, attrs) {
	        	//console.log(scope);
	        	
	        	if (scope.$last === true){
		        	var parCon = $(element).parents(".hideRow-right");
		        	var parAll = $(element).parents(".hideRow-right-all");
		        	var parAllW = 95*(scope.$index+1);
		        	
		        	var xiaoyu = parCon.find(".icon-xiaoyuhao");
		        	var dayu = parCon.find(".icon-dayuhao");
		        	parAll.css({"width":parAllW,"margin-left":"0"});
		        	if(parAllW > 570){
		        		dayu.addClass("mc-c");
		        	}
		        	function xiaoyuM(){
	        			//parAll.css("margin-left","100px");
	        			var nowML = parseInt(parAll.css("margin-left"));
	        			if(nowML >= 0){
	        				xiaoyu.removeClass("mc-c");	        				
	        			}else{
	        				parAll.animate({"margin-left":nowML+95},200);
	        				if(nowML+95 == 0){
	        					xiaoyu.removeClass("mc-c");
	        				}
	        			}
	        			
	        			if(!dayu.hasClass("mc-c")){
	        				dayu.addClass("mc-c");
	        			}
	        			xiaoyu.unbind();
	        			setTimeout(function(){
	        				xiaoyu.on("click",xiaoyuM);
	        			},210);
		        	}
		        	function dayuM(){
		        		//parAll.css("margin-left","200px");
		        		var nowML = parseInt(parAll.css("margin-left"));
	        			
		        		
		        		if(nowML <= 570 -parAllW){
		        			dayu.removeClass("mc-c");
	        			}else{
	        				parAll.animate({"margin-left":nowML-95},200);
	        				if(nowML-95 == 570 -parAllW){
	        					dayu.removeClass("mc-c");
	        				}
	        			}
		        		if(!xiaoyu.hasClass("mc-c")){
		        			xiaoyu.addClass("mc-c");
	        			}
		        		dayu.unbind();
	        			setTimeout(function(){
	        				dayu.on("click",dayuM);
	        			},210);
		        	}
		        	xiaoyu.on("click",xiaoyuM);
		        	dayu.on("click",dayuM);	
	        		
	        	}

	        	
	         }
	    };
    })
    .directive('chooseWish', function () {
	    return {
	        restrict: 'A',	  
	        link: function (scope, element, attrs) {
	        	$(element).click(function(){
	        		if(!$(this).hasClass('choosed')){
	        			$(this).addClass('choose onChoose');
	        			
	        			$(this).siblings().each(function(i,v){
		        			if($(v).hasClass('choose onChoose')){
		        				$(v).removeClass('choose onChoose');
		        			}
		        		});
	        		}
	        	});	        
	         }
	    };
    })
    //忘记密码
    .directive('checkFindpass', function ($http) {
	    return {
	        restrict: 'A',	  
	        link: function (scope, element, attrs) {
	        	$(document).ready(function(){
	        		element.on("blur", function () {                   
		        		$http.get(ServerURL+"/web/mode400/checkUserName?r="+Math.random(),{params:{userName: element.val()}}).success(function(data){
		        			if(data.code == '00'){	        				
		        				scope.loginHook4 = false;
		        			}else if(data.code == '06'){	        				
		        				scope.loginHook4 = true;
		        			}
		        		}).error(function(error){
		        			
		        		});
		        		
		        		if(!element.val()){
		        			scope.loginHook4 = false;
		        		}
		        		
	                }); 
		        	
		        	$(element).focus(function(){
		        		scope.loginHook4 = false;
		        	});
		        	
		        	$(element).parent().find('.login-hook4').click(function(){
		        		element.val('');
		        		$(element).blur();
	                    showLoginPage(2);
		        	});
	        	});
	         }
	    };
    })
    //登录页面检查用户名
    .directive('checkLogin', function ($http) {
	    return {
	        restrict: 'A',	  
	        link: function (scope, element, attrs) {
	        	$(document).ready(function(){
	        		element.on("input propertychange change", function () {                   
	        			checkUserName();
		        		
	                });
		        	element.on("focus",function(){
		        		scope.loginHook5 = false;
		        	});
		        	function checkUserName(){
		        		$http.get(ServerURL+"/web/mode400/checkUserName?r="+Math.random(),{params:{userName: element.val()}}).success(function(data){
		        			if(data.code == '00'){	        				
		        				scope.loginHook5 = false;
		        			}else if(data.code == '06'){	        				
		        				scope.loginHook5 = true;
		        			}
		        		}).error(function(error){
		        			
		        		});
		        		
		        		if(!element.val()){
		        			scope.loginHook5 = false;
		        		}
		        	}
	        	});
	         }
	    };
    })
    //注册页面检查用户名
    .directive('checkRegister', function ($http) {
	    return {
	        restrict: 'A',	  
	        link: function (scope, element, attrs) {
	        	$(document).ready(function(){
	        		element.on("blur", function () {                   
		        		$http.get(ServerURL+"/web/mode400/checkUserName?r="+Math.random(),{params:{userName: element.val()}}).success(function(data){
		        			if(data.code == '00'){	        				
		        				scope.loginHook6 = true;
		        			}else if(data.code == '06'){	        				
		        				scope.loginHook6 = false;
		        			}
		        		}).error(function(error){
		        			
		        		});
		        		
		        		if(!element.val()){
		        			scope.loginHook6 = false;
		        		}
		        		
	                }); 
		        	element.on("focus",function(){
		        		scope.loginHook6 = false;
		        	});
	        	});	        	
	         }
	    };
    })
    //宣讲会切换城市
    /*.directive('switchCity', function ($http) {
	    return {
	        restrict: 'A',	  
	        link: function (scope, element, attrs) {
	        	$(element).click(function(){
	        		$(this).addClass('sc-bgc sc-bc selected');
	        		$(this).siblings().removeClass('sc-bgc sc-bc selected');
	        	});
	         }
	    };
    })*/
    //防止按钮重复点击多次触发
    .directive('clickAndDisable', function($timeout) {
	    return {
	        restrict: 'A',
	        link: function(scope, iElement, iAttrs) {
	            var time = 500;
	            if(iAttrs.clickAndDisable){
	            	time = iAttrs.clickAndDisable;
	            }
	            iElement.bind('click', function() {
	                iElement.prop('disabled',true);
	                functionThatReturnsPromise().finally(function() {
	                    iElement.prop('disabled',false);
	                })
	            });
	            function functionThatReturnsPromise() {
	                return $timeout(angular.noop, time);
	            };
	        }
	    };
    })
    //特殊模板-学校/专业
    .directive('chooseCell', function($timeout) {
	    return {
	        restrict: 'A',
	        link: function(scope,element,attrs) {
	            $(element).click(function(e){
	            	var _x,_y;
	            	_x = e.clientX;
            		_y = e.clientY;
            		$('.choose-cell').show();

            		$('.choose-cell').scrollTop(0);
            		
	            	$('.choose-cell').css({'left':_x-5,'top':_y-5});
	            	
	            	$('.choose-cell').unbind('mouseleave').bind('mouseleave',function(){
	            		$(this).hide();
	            	});	            	
	            });  
	        }
	    };
    })
    //编辑简历-特殊模板-学校/专业-fillType=1
    .directive('schoolOrSubject', function($timeout,queryData) {
	    return {
	        restrict: 'A',
	        link: function(scope,element,attrs) {
	        	var type = attrs.schoolOrSubject;
	        	var $this;
	        	if(scope.$parent.dataInfo.fillType == 1){
	        		if(type == 1){	        			
	        			$(element).click(function(e){
	        				$this = $(this);
	        				$this.hide();
	        				$this.next().val($(this).val());
	        				$this.next().show().focus();
	        				e.stopPropagation();
	        				$(document).click(function(){
	        					$this.siblings(".schoolOrSubject").addClass('ng-hide');
	        					$this.show();
	        					$this.siblings(".input-query").hide();
	        				});
	        			});
	        		}else{
	        			var url;
			        	if(scope.$parent.dataInfo.customDataSource == 'subject'){
		            		url = '/web/dic/selectSchool!createFrontMajorJson';
		            	}else{
		            		url = '/web/dic/selectSchool!createSchoolJson';
		            	} 
			        	$(element).bind('input propertychange change',function(){
			            	var params = {
			            			lanType: scope.$parent.dataInfo.lanType,
			            			q: $(element).val(),
			            			limit: 10
			            	};
			            	queryData.ignoreCode(url,params).then(function(data){
			            		scope.$parent.option1 = data;
			            	});
			        	});
	        		}
	        		
	        	}
	        	
	        }
	    };
    })
    //职位列表设置宽度
    .directive('setWidth', function ($state) {
        return {
            restrict: 'A',
            link: function(scope,element,attr) {
            	var width = attr.setWidth;
            	if(width){
            		$(element).css({'width':width+'%'});
            	}else{
            		$(element).css({'width':'auto'});
            	}
            	
            }
        }
    })
;


