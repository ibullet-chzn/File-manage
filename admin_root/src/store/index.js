// index.js
import Vue from 'vue'
import Vuex from 'vuex'
// modules
import users from "./modules/users"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users
  }
})
