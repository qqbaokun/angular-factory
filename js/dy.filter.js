/**
 * Created by bbk on 2017/4/21.
 */

/**
 * 自定义过滤器
 */
angular.module("dy.filter", [])
    .filter('isInclude', function () {
        return function (str,params) {
            return str.indexOf(params) >= 0;
        }
    })
    .filter('getNum',function(){
        return function (str,parasm){
            var end = new RegExp(/\d+$/);
            return end.exec(parasm);
        }
    })
    //to html
    .filter('toHtml', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        }
    }])
    //to json
    .filter('toJson', ['$sce', function ($sce) {
        return function (text,params) {
            return JSON.parse(text)[params];
        }
    }])
    //阿拉伯数字转汉语数字
    .filter('changeNum', function () {
        return function (num) {
        	var str = [];
        	if(lanType != 1){
        		str = ["No.One","No.Two","No.Three","No.Four","No.Five","No.Six","No.Seven","No.Eight","No.Nine","No.Ten"];
        	}else{
        		str = ["一","二","三","四","五","六","七","八","九","十"];
        	}        	
            return str[num-1];
        }
    })
    //创建数组
    .filter('createNum', function () {
        return function (num) {
        	var str = [] ;
        	for(var i=1;i<=num;i++){
        		str.push(i);
        	}
            return str;
        }
    })
    //超出文本隐藏
    .filter('textLengthSet', function() {
		return function(value, wordwise, max, tail) {
			if (!value) return '';
		
			max = parseInt(max, 10);
			if (!max) return value;
			if (value.length <= max) return value;
		
			value = value.substr(0, max);
			if (wordwise) {
				var lastspace = value.lastIndexOf(' ');
				if (lastspace != -1) {
					value = value.substr(0, lastspace);
				}
			}
			if(!tail){
				return value +' …';
			}else{
				return value;
			}
			
		};
	})
	//替换文字
	.filter('replaceText', function() {
		return function(value, word) {
			if(value){
				return value;
			}else{
				return word;
			}
		};
	})
	//判断数组是否有空元素
	.filter('hasEmptyElement', function() {
		return function(arr) {
			function isInArray(arr,value){			    
				var index = arr.indexOf(value);
				if(index >= 0){
					return true;
				}else{
				    return false;
				}			   

			}
			return isInArray(arr,'');
		};
	})
	//判断某个元素是否在数组中存在
	.filter('isExistInArray', function() {
		return function(value,arr) {
			for(var i = 0; i < arr.length; i++){
		        if(value === arr[i].wishNum){
		            return true;
		        }
		    }
		    return false;			
		};
	});