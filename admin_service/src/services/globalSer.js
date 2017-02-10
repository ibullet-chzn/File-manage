/**
 * Created by administrator on 2016/12/29.
 */

import globalDao from '../dao/mysql/global';

import encapsulation from '../models/encapsulation'

class GlobalSev {
  constructor() {
    console.log('globalSev 构造成功...');
  }


  /**
   * 加密等级查询
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async encryptionLevelList() {
    let queryEncryptionLevelAllResult = await globalDao.queryEncryptionLevelAll();
    return encapsulation.service('SUCCESS', queryEncryptionLevelAllResult);
  }

  /**
   * 文件分类查询
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async classificationList() {
    let queryClassificationAllResult = await globalDao.queryClassificationAll();
    return encapsulation.service('SUCCESS', queryClassificationAllResult);
  }

  /**
   * 新增文件分类
   * @param name
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async addClassification(name) {
    let insertClassificationResult = '';
    let queryClassificationLastResult = await globalDao.queryClassificationLast();
    if (queryClassificationLastResult.length === 1) {
      let newClassBase = queryClassificationLastResult[0].class_base += 1;
      insertClassificationResult = await globalDao.insertClassification(name, newClassBase);
    } else {
      insertClassificationResult = await globalDao.insertClassification(name, 1);
    }
    return encapsulation.service('SUCCESS', {
      id: insertClassificationResult.insertId
    });
  }
}

export default new GlobalSev();