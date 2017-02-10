/**
 * Created by administrator on 2016/12/29.
 */

import fileDao from '../dao/mysql/files';
import globalDao from '../dao/mysql/global';

import encapsulation from '../models/encapsulation'

class UserSev {
  constructor() {
    console.log('userSev 构造成功...');
  }

  /**
   * 文件上传 调用数据库存储其他数据
   * @param filePath
   * @param fileSuffix
   * @param fields
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async upload(filePath, fileSuffix, fields) {
    let insertResult = await fileDao.insert(filePath, fileSuffix, fields);
    return encapsulation.service('SUCCESS', {
      id: insertResult.insertId,
      path: filePath
    });
  }

  /**
   * 查询文件列表 分页
   * @param body
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async fileList(body) {
    // 查询文件分类列表 整理 filter object
    let queryClassificationAllResult = await globalDao.queryClassificationAll();
    let filterClass = {};
    for (let key = 0; key < queryClassificationAllResult.length; key++) {
      filterClass[queryClassificationAllResult[key]['class_base']] = queryClassificationAllResult[key]['class_name'];
    }
    // 查询文件列表数据 转换 文件分类
    let queryAllResult = await fileDao.queryAll();
    for (let key = 0; key < queryAllResult.length; key++) {
      queryAllResult[key]['type'] = filterClass[queryAllResult[key]['type']];
    }
    return encapsulation.service('SUCCESS', queryAllResult);
  }

  /**
   * 根据完整地址查询文件
   * @param path
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async queryFileByPath(path) {
    let queryFileByPathResult = await fileDao.queryByPath(path);
    if (queryFileByPathResult[0]) {
      return encapsulation.service('SUCCESS', {
        filePath: queryFileByPathResult[0].file_path,
        fileName: queryFileByPathResult[0].file_name + '.' + queryFileByPathResult[0].file_suffix
      }, '查询成功');
    }
    return encapsulation.service('FILE_NOT_DEFINED');
  }
}

export default new UserSev();