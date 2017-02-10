import globalSer from '../services/globalSer';

class GlobalCtrl {
  constructor() {
    console.log('globalCtrl 构造成功...');
  }

  /**
   * 加密等级列表查询
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async encryptionLevelList() {
    return await globalSer.encryptionLevelList();
  }

  /**
   * 文件分类列表查询
   * @returns {Promise.<{status: number, errMessage: string, data: Object}>}
   */
  async classificationList() {
    return await globalSer.classificationList();
  }

  async addClassification(body) {
    return await globalSer.addClassification(body.name);
  }
}

export default new GlobalCtrl();
