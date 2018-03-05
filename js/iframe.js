/**
 * Created by bbk on 2017/9/4.
 */
var mainData = window.parent.mainData;
var mainColor = window.parent.mainColor;
var secondaryColor = window.parent.secondaryColor;
var ServerURL = window.parent.ServerURL;
var height = window.parent.height;


/**
 * 获取url参数
 * @params name
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null) return  unescape(r[2]); return null;
}

//重置iframe高度
function resetHeight(){
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.iframeAuto(index);

    var topOffset = (height - $(window.parent.document).find('.layui-layer-iframe').height())/2;
    parent.layer.style(index, {
        top: Math.floor(topOffset)
    });
}

//关闭iframe
function closeModel(){
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index); //再执行关闭
}

/**
 * 配置angular-loading-bar
 */
function configuredLoadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 100;
    cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner" style="position: fixed; width: 100%; height: 100%; left: 0;top: 0; background: rgba(0, 0, 0, .7);">' +
        '<div class="item" style="position: relative; top: 50%; left: 50%;margin-left: -109px;margin-top: -90px;">' +
        '<div class="item-inner">' +
        '<div class="item-loader-container">' +
        '<div class="la-ball-climbing-dot la-2x">' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '<div></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}
