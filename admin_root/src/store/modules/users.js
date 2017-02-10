/**
 * Created by administrator on 16/11/2.
 */
import Vue from 'vue'

import * as types from '../mutation-types'

// initial state
const state = {
  status: -1,
  id: '',
  realName: '',
  position: '',
  createTime: '',
  lastLoginTime: ''
};

const getters = {
  getters_users_getInfo: state => {
    return new Promise((resolve, reject) => {
      // 如果数据已经存在 直接返回数据
      if (state.status === 0) {
        resolve(state);
        return;
      }
      // 不存在则去获取
      Vue.http.post('/api/getUserInfo').then(res => {
        if (res.data.status === 0) {
          state.status = res.data.status;
          state.id = res.data.result.id;
          state.realName = res.data.result.realName;
          state.position = res.data.result.position;
          state.createTime = res.data.result.createTime;
          state.lastLoginTime = res.data.result.lastLoginTime;
        }
        resolve(state);
      }, err => {
        resolve(err);
      });
    });
  }
};

const actions = {
  async actions_users_getInfo ({getters, commit}) {
    return await getters.getters_users_getInfo;
  },
  async actions_users_clearInfo ({commit}) {
    await commit('USERS_CLEARINFO')
  }
};
// mutations
const mutations = {
  [types.USERS_CLEARINFO] (state){
    state.status = -1;
    state.id = '';
    state.realName = '';
    state.position = '';
    state.createTime = '';
    state.lastLoginTime = '';
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
