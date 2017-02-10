import fs from 'fs'
import path from 'path'
import parse from 'async-busboy'
import Router from 'koa-router'
import encapsulation from '../models/encapsulation'

import config from '../config'

import indexCtrl from '../controllers/indexCtrl'
import userCtrl from '../controllers/userCtrl'
import fileCtrl from '../controllers/fileCtrl'
import globalCtrl from '../controllers/globalCtrl'

const router = Router();

router.get('/', indexCtrl);

/**
 * 登录
 */
router.post('/login', async(ctx, next) => {
  let loginResult = await userCtrl.login(ctx.request.body);
  if (loginResult.status === 0) {
    ctx.session = loginResult;
  }
  ctx.body = encapsulation.body('SUCCESS', loginResult);
});

/**
 * 登出
 */
router.post('/logout', async(ctx, next) => {
  ctx.session = null;
  ctx.body = encapsulation.body('SUCCESS');
});

/**
 * 获取用户注册信息 session 中保存了用户id
 */
router.post('/getUserInfo', async(ctx, next) => {
  let userId = ctx.session.result.id;
  let getUserInfoResult = await userCtrl.getUserInfo(userId);
  ctx.body = encapsulation.body('SUCCESS', getUserInfoResult);
});

/**
 * 文件上传接口
 */
router.post('/upload', async(ctx, next) => {
  let userId = ctx.session.result.id;
  const {files, fields} = await parse(ctx.req);
  let uploadReturnPath = await fileCtrl.upload(files, userId, fields);
  ctx.body = encapsulation.body('SUCCESS', uploadReturnPath);
});

/**
 * 文件列表 分页查询 结合 vue-data-tables
 */
router.post('/getFileList', async(ctx, next) => {
  let uploadReturnPath = await fileCtrl.fileList(ctx.request.body);
  ctx.body = encapsulation.body('SUCCESS', uploadReturnPath);
});

/**
 * 文件下载接口
 * 完整路径下载 file
 */
router.post('/download', async(ctx, next) => {
  await fileCtrl.download(ctx.request.body).then(data => {
    ctx.set('Content-Disposition', 'attachment;filename=' + encodeURIComponent(data.fileName));
    ctx.body = data.file;
  }, () => {
    ctx.body = encapsulation.body('SUCCESS', encapsulation.service('FILE_NOT_DEFINED'));
  });
});

/**
 * 获取加密等级信息
 */
router.post('/getEncryptionLevelInfo', async(ctx, next) => {
  let queryEncryptionLevelListResult = await globalCtrl.encryptionLevelList();
  ctx.body = encapsulation.body('SUCCESS', queryEncryptionLevelListResult);
});

/**
 * 获取文件分类详情
 */
router.post('/getClassificationInfo', async(ctx, next) => {
  let queryClassificationListResult = await globalCtrl.classificationList();
  ctx.body = encapsulation.body('SUCCESS', queryClassificationListResult);
});

/**
 * 添加文件分类
 */
router.post('/addClassification', async(ctx, next) => {
  let queryClassificationListResult = await globalCtrl.addClassification(ctx.request.body);
  ctx.body = encapsulation.body('SUCCESS', queryClassificationListResult);
});

export default router
