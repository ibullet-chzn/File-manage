/**
 * Created by administrator on 2017/1/3.
 */

import mysql from '../index';

class FileDao {
  constructor() {
    console.log('fileDao 构建完成...')
  }

  /**
   * 查询所有加密等级
   * @returns {Promise}
   */
  queryEncryptionLevelAll() {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM bs_encryption';
      mysql.getPool(sql, {}, (err, result) => {
        resolve(result);
      });
    });
  }

  /**
   * 查询所有文件分类
   * @returns {Promise}
   */
  queryClassificationAll() {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM bs_classification';
      mysql.getPool(sql, {}, (err, result) => {
        resolve(result);
      });
    });
  }

  /**
   * 查询文件分类列表的最后一条数据
   * @returns {Promise}
   */
  queryClassificationLast() {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT * FROM bs_classification ORDER BY id DESC LIMIT 1';
      mysql.getPool(sql, {}, (err, result) => {
        resolve(result);
      });
    });
  }

  /**
   * 新增文件分类
   * @param name
   * @param base
   * @returns {Promise}
   */
  insertClassification(name, base) {
    return new Promise((resolve, reject) => {
      let sql = 'INSERT INTO bs_classification (id,class_name,class_base,create_time) VALUES (0,?,?,?)';
      mysql.getPool(sql, [name, base, new Date()], (err, result) => {
        resolve(result);
      });
    });
  }
}

export default new FileDao();