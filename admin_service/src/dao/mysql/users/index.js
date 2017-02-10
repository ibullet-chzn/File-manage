/**
 * Created by administrator on 2017/1/3.
 */

import mysql from '../index';

class UserDao {
  constructor() {
    console.log('userDao 构建完成...')
  }

  /**
   * 查询所有数据
   * @returns {Promise}
   */
  queryAll() {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM bs_users';
      mysql.getPool(sql, {}, (err, result) => {
        resolve(result);
      });
    });
  }

  /**
   * 根据用户名查询用户信息
   * @param username {string}
   * @returns {Promise}
   */
  queryByUsername(username) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM bs_users WHERE username = ?';
      mysql.getPool(sql, [username], (err, result) => {
        resolve(result);
      });
    });
  }

  /**
   * 根据用户id查询用户信息
   * @param userId
   * @returns {Promise}
   */
  queryById(userId) {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM bs_users WHERE id = ?';
      mysql.getPool(sql, [userId], (err, result) => {
        resolve(result);
      });
    });
  }

  updateLastLoginTime(userId, time) {
    return new Promise((resolve, reject) => {
      let sql = 'UPDATE bs_users SET last_login_time = ? , this_login_time = ? WHERE id = ?';
      mysql.getPool(sql, [time, new Date(), userId], (err, result) => {
        resolve(result);
      });
    });
  }
}

export default new UserDao();