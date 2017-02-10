/**
 * Created by administrator on 2016/12/29.
 */

import mysql from '../dao/mysql';
import users from '../dao/mysql/users';

export default async (ctx, next) => {
  let queryUserByPhoneResult = await users.queryAll();
  ctx.body = {
    result: queryUserByPhoneResult
  };
}