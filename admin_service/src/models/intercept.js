/**
 * Created by administrator on 2017/1/10.
 */

class Intercept {
  constructor() {
    console.log('intercept 构建完成...')
  }

  /**
   * 登录拦截url 忽略列表
   * @param url
   * @returns {boolean}
   *   :true 表示当前地址被忽略
   *   :false 表示当前地址拦截
   */
  loginIgnorePath(url) {
    const path = [
      '/login',
      '/logout'
    ];
    for (let i = 0; i < path.length; i++) {
      if (path[i] === url) {
        return true;
      }
    }
    return false;
  }
}

export default new Intercept();