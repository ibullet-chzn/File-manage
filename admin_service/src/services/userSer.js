/**
 * Created by administrator on 2016/12/29.
 */

import userDao from '../dao/mysql/users';

import encapsulation from '../models/encapsulation'

class UserSev {
  constructor() {
    console.log('userSev 构造成功...');
  }

  /**
   * 判断登录信息
   * @param body {object}
   *   .username {string} unique
   *   .password {string}
   * @returns {object}
   */
  async login(body) {
    // 调用数据库接口查询数据
    let queryUserByUsernameResult = await userDao.queryByUsername(body.username);
    // 处理查询到的数据
    if (queryUserByUsernameResult[0]) {
      // 判断密码是否符合
      if (queryUserByUsernameResult[0].password === body.password) {
        // 更新登录时间
        await userDao.updateLastLoginTime(queryUserByUsernameResult[0].id, queryUserByUsernameResult[0].this_login_time);
        return encapsulation.service('SUCCESS', {id: queryUserByUsernameResult[0].id}, '登录成功');
      }
      // 返回给ctrl数据
      return encapsulation.service('USER_PASSWORD_ERROR');
    }
    return encapsulation.service('USER_USERNAME_ERROR');
  }

  async getUserInfo(userId) {
    let queryUserByIdResult = await userDao.queryById(userId);
    if (queryUserByIdResult[0]) {
      return encapsulation.service('SUCCESS', {
        id: queryUserByIdResult[0].id,
        realName: queryUserByIdResult[0].real_name,
        position: queryUserByIdResult[0].position,
        createTime: queryUserByIdResult[0].create_time,
        lastLoginTime: queryUserByIdResult[0].last_login_time,
      }, '获取用户信息成功');
    }
    return encapsulation.service('USER_NOT_DEFINED');
  }
}

export default new UserSev();