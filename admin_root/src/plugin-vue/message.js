/**
 * Created by administrator on 16/11/22.
 */

export default {
  install(Vue, options){

    const calloutTypeForStyle = {
      danger: 'callout-danger',
      info: 'callout-info',
      warning: 'callout-warning',
      success: 'callout-success',
    };

    /**
     * 调取弹窗显示信息 3秒后消失
     * id message 必须存在
     * @param type {string} danger info warning success
     * @param value {string}
     * @param title {string}
     */
    const callout = function (type, value, title = '提示') {
      let message = document.getElementById('message');
      message.style.position = 'absolute';
      message.style.top = '105px';
      message.style.right = '15px';
      // 创建html文件流
      let callout = document.createElement('div');
      callout.className = 'callout ' + calloutTypeForStyle[type];
      callout.style.width = '300px';
      callout.style.transition = 'all 0.4s';
      callout.style.webkitTransition = 'all 0.4s';
      // 动画改变参数
      callout.style.opacity = '1';
      callout.style.transform = 'translate3d(315px,0,0)';
      let h4 = document.createElement('h4');
      h4.innerHTML = title;
      let p = document.createElement('p');
      p.innerHTML = value;
      callout.appendChild(h4);
      callout.appendChild(p);
      // 入场动画
      setTimeout(function () {
        callout.style.transform = 'translate3d(0,0,0)';
      }, 10);
      // 离场动画
      setTimeout(function () {
        callout.style.opacity = '0';
        setTimeout(function () {
          message.removeChild(callout);
        }, 400);
      }, 3000);
      message.appendChild(callout);
    };
    Vue._callout = callout;
    Vue.prototype._callout = callout;

    // <div class="callout callout-info" style="position:absolute;top:105px;right:15px;">
    //     <h4>I am an info callout!</h4>
    //
    //   <p>Follow the steps to continue to payment.</p>
    // </div>
  }
}
