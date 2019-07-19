/**
 * 这个文件主要用于 Hybrid 框架中 Native 和 H5 之间通信，里面根据约定好的接口规范来编写通信 API
 */

(function(win) {

  var ua = win.navigator && win.navigator.userAgent || '';
  // 工具函数
  var util = {
    isIOS: function() {
      if(/Mobile/.test(ua) && ua.match(/iPad|iPod|iPhone/)) {
        return true;
      }
      return false;
    },
    isAndriond: function() {
      if(/Mobile/.test(ua) && /Android/i.test(ua)) {
        return true;
      }
      return false;
    }
  };

  // 所有提供给 Native 或 H5 调用的 API 或者临时生成的唯一的 callback 函数都挂载在这个对象上（临时的 callback 用完要及时 delete 掉）
  win.JSBridge = {
    _SURPPORTED_API: null,
    // (Native主动调用)这个对象上面会挂载所有 Native 调用 H5 的接口，例如H5页面弹框等
    H5API: {

    },
    // 所有回调函数都注册到这里
    _callback: {

    },
    /*
     * 所有通过 `win.JSBridge.NativeAPI.bindNativeEvent` 注册的事件都挂载在这里
     * 当 Native 调用 `win.JSBridge.onEvent` 发送事件通知时，都来这里找到对应的事件类型和回调函数一一执行
     *
     * @example(经过执行后可能会变成这样)
     * _event: {  // 事件类型为 key，注册事件回调函数按注册顺序放在数组里
     *   "activeweb": [
     *     eventcallback1,
     *     eventcallback2...
     *   ],
     *   "eventType2": [
     *     eventcallback1,
     *     eventcallback2...
     *   ],
     * }
     */
    _event: {

    },
    /**
     当 Native 成功执行完且需回调 H5 方法的时候调用这个方法（一般是在 H5 发起的网络请求中包含了 callback 参数时才需要回调），并按下面的数据格式传递数据
     @param callbackToken {String} 对应于网络请求中发过去的callback参数值
     @param response {Object} JSON 对象，具体字段如下：
     @param response.success {Boolean} 成功与否
     @param response.msg {String} 相关信息
     @param response.data {Object} JSON 数据对象
     @param response.code {Int} 状态码

     @example
     // 接着上面“网络请求格式约定”的例子
     window.JSBridge.onSuccess('token_1439804657177',{
        code: 200,
        success: true,
        msg: '执行成功',
        data: [
          {name: '张三', tel: 123456789},
          {name: '移动客服', tel: 10086}
        ]
      });
     */
    onSuccess: function(callbackToken, response){
      var self = this;
      if(typeof callbackToken === 'string' && typeof response === 'object'){
        try{
          JSBridge._callback[callbackToken](response);
        }catch(err){
          // TODO (全局提示、错误日志收集等)
        }
      }else{
        // TODO (调用Native失败率统计等)
        try{
          self._callback[callbackToken](response);
        }catch(err){
          // TODO (全局提示、错误日志收集等)
        }
      }
    },
    /**
     Native 执行发生错误时回调这个方法，可用在当网络请求中没有 callback 参数时回调这个方法而不是 window.JSBridge.onSuccess(callbackToken, response)；
     或者在 H5 并没有调用 Native 方法时，发生了错误调用这个方法来统计错误信息等。参数如下：
     @param error {Object} JSON 对象，错误原因描述
     @param error.level {Int} 错误等级，值越大越严重
     @param error.msg {String} 错误描述
     @param error.stack {String} 可选，错误发生时程序堆栈信息
     */
    onError: function(error){
      // TODO
    },
    /**
     * 调用 Native API（将发出约定格式的请求，由 Native 拦截此请求并执行相应方法）
     *
     * Doc: http://wiki.shinemo.com:8090/pages/viewpage.action?pageId=15565665
     * Example:
     *   window.JSBridge.requestHybrid({
    *     module: 'addressmodule',
    *     method: 'getAddressList',
    *     data: {
    *       sort: 'increase'
    *     },
    *     callback: function(data) {
    *       conosle.log(JSON.stringify(data));
    *     }
    *   });
     *
     * @param {Object} params 传过去的参数对象
     * @param {String} params.module 必填，要调用的 Native 模块的名称
     * @param {String} params.method 必填，要调用的 Native API 名称
     * @param {Object} params.data 选填，传过去参数值
     * @param {Function} params.callback 选填，Native 完成后的回调函数
     */
    requestHybrid: function(params) {
      var self = this;

      // 如果有回调函数，则注册在 window.JSBridge._callback 对象上面，由它做统一分发，调用后销毁
      if(params.callback) {
        var token = params.callbackName || ('token_' + (new Date().getTime())) ;
        self._callback[token] = function(data) {
          params.callback(data);
          delete self._callback[token];
        }
        // 将token传给Native回调使用
        params._token = token;
      }

      var createdUrl = self._getUrlByParams(params,params.callbackName);
      self._postToNative(createdUrl);
    },

    /**
     * 根据参数生成约定格式的 Url
     */
    _getUrlByParams: function(params) {
      var totalUrl = '';
      var protoHead = 'native://';

      totalUrl += protoHead +  params.method;

      /*  if(params.callback){
       !params.data && (params.data = {});
       params.data.callback = params._token;
       }*/

      if(params.data) {
        if(typeof params.data=="object"){
          params.data = JSON.stringify(params.data)
        }
        totalUrl += '?data=' + encodeURIComponent(params.data);
        totalUrl +='&callback='+params._token;
      }else{
        totalUrl +='?callback='+params._token;
      }

      return totalUrl;
    },

    /**
     * 利用生成的 url 发出网络请求供 Native 拦截并调用相应方法
     */
    _postToNative: function(createdUrl) {

      /*
       @FIXME:
       通过修改 location 来发起请求通知客户端会导致一个问题：
       通过 <script src="hybrid-bridge.js"></script> 引入脚本后，如果这个脚本初始化时发出请求
       native://webview/test 则页面后面的 <script></script> 代码则无法执行
       方案：在 hybrid-bridge.js 初始化时先不调用 win.JSBridge._confirmSurpportedAPI 发起请求，
       而是在页面的脚本里面再调用此方法发起请求。
       */
     /* if(util.isIOS()) {
        win.location = createdUrl;
      }else if(util.isAndriond()){*/
        var iframe = document.createElement('iframe');
        iframe.src = createdUrl;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
        iframe = null;
      /*}else{
        win.location = createdUrl;
      }*/
    }
  };
})(window);

