/*
 *
 *  使用说明:
 *  get 方法
 *  接口: api
 *  参数: params 对象
 *  queryData.getData("api", params).then(function(data) {
 *       console.log(data);
 *  }
 *
 *  post请求同理
 *
 */
angular.module("dy.service", [])
    .factory("queryData", function ($http, $q,$state,$location) {
        var resultData = {};

        /**
         * get方法获取数据
         * @param urlParams url参数
         * @param params 业务参数
         * @param state 是否缓存, true缓存, false不缓存
         */
        resultData.getData = function (urlParams, params, state) {
            var deferred = $q.defer();
            /* get方法获取数据 */
            $http.get(ServerURL + urlParams+'?r='+Math.random(), {params: params}, {cache: state}).success(function (data) {
                if(data.code == '07'){                   
                	showLoginPage(1);
                	$('dy-login').scope().userName = false;
                	return;
                }
                if(data.code != '00'){
                	alert(data.content);
                	return;
                }
                if(data.code) {
                    deferred.resolve(data);
                }else{
                    deferred.reject(data);
                }
            }).error(function (data, status) {
                deferred.reject(data);
                if (status == 401 || status == -1) {
                	window.location = ServerURL + "/web/index";
                }else if(status == 500){
                    alert("服务器错误,请联系管理员");
                }
                else {
                    alert(status + " 错误, 请联系管理员");
                }
                return false;
            });
            return deferred.promise;
        };
        /* post方法获取数据 */
        resultData.postData = function (urlParams, params) {
            var deferred = $q.defer();
            /* post方法获取数据 */
            $http({    
                method: "POST",    
                url: ServerURL + urlParams,    
                data: params,    
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },    
                transformRequest: function(obj) {    
                    var str = [];                    
                    for (var p in obj) {  
                    	if(obj[p]){
                    		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p])); 
                        }else{
                        	
                        }                           
                    }    
                    return str.join("&");    
                }  
            }).success(function(data){
            	if(data.code == '07'){
                    showLoginPage(1);
                    $('dy-login').scope().userName = false;
                	return;
                }
                if(data.code != '00'){
                	alert(data.content);
                	return
                }
                if(data.code) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(data);
                }
            }).error(function (data, status) {
                deferred.reject(data);
                if (status == 401 || status == -1) {
                    window.location = ServerURL + "/web/index";
                }else if(status == 500){
                    alert("服务器错误,请联系管理员");
                }
                else {
                    alert(status + " 错误, 请联系管理员");
                }
                return false;
            });  
            return deferred.promise;
        };
        //忽略loading
        resultData.ignoreData = function (urlParams, params, state) {
            var deferred = $q.defer();
            /* get方法获取数据 */
            $http.get(ServerURL + urlParams +'?r='+Math.random(), {params: params,ignoreLoadingBar: true}, {cache: state}).success(function (data) {
            	if(data.code == '07'){
                    showLoginPage(1);
                    $('dy-login').scope().userName = false;
                	return;
                }
                if(data.code != '00'){
                	alert(data.content);
                	return;
                }
                if(data.code) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(data);
                }
            }).error(function (data, status) {
                deferred.reject(data);
                if (status == 401 || status == -1) {
                	window.location = ServerURL  + "/web/index";
                }else if(status == 500){
                    alert("服务器错误,请联系管理员");
                }
                else {
                    alert(status + " 错误, 请联系管理员");
                }
                return false;
            });
            return deferred.promise;
        };
        //不判断code
        resultData.ignoreCode = function (urlParams, params, state) {
            var deferred = $q.defer();
            /* get方法获取数据 */
            $http.get(ServerURL + urlParams +'?r='+Math.random(), {params: params,ignoreLoadingBar: true}, {cache: state}).success(function (data) {            	
                if(data) {
                    deferred.resolve(data);
                }
                else {
                    deferred.reject(data);
                }
            }).error(function (data, status) {
                deferred.reject(data);
                if (status == 401 || status == -1) {
                	window.location = ServerURL  + "/web/index";
                }else if(status == 500){
                    alert("服务器错误,请联系管理员");
                }
                else {
                    alert(status + " 错误, 请联系管理员");
                }
                return false;
            });
            return deferred.promise;
        };
        return resultData;
    });
    

