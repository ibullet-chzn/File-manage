// router
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import index from './index'
import login from './components/login.vue'
import home from './components/home.vue'
import upload from './components/upload.vue'
import file_list from './components/file_list.vue'
import global_classification_setting from './components/global_classification_setting.vue'
import global_encryption_setting from './components/global_encryption_setting.vue'

import attendance from './components/attendance.vue'
import leave_record from './components/leave_record.vue'
import overtime_petitioner from './components/overtime_petitioner.vue'
import overtime_record from './components/overtime_record.vue'
import overtime_pass from './components/overtime_pass.vue'
import import_data from './components/import_data.vue'

import store from './store/index'

// 添加 全局 directive
import './directives'

// 添加 全局 filter
import './filters'

const pop = index;

Vue.use(VueRouter);
Vue.use(VueResource);

// ajax 请求的全局拦截器
Vue.http.interceptors.push((request, next) => {
  next((response) => {
    let {status, body} = response;
    if (status == 200) {
      // 这里判断 header 是否设置为文件下载
      // 如果返回的 body 为 blob 则直接下载该文件
      if (response.headers.map['Content-Disposition']) {
        let fileNameArray = response.headers.map['Content-Disposition'][0].split('=');
        let fileName = decodeURIComponent(fileNameArray[1]);
        let links = document.createElement("a");
        document.body.appendChild(links);
        links.style = "display: none";
        let url = window.URL.createObjectURL(body);
        links.href = url;
        links.download = fileName;
        links.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(links);
      } else if (body.code != 0) {
        response.status = 500;
        response.statusMessage = body.message || '系统异常';
        response.statusText = 'Internal Server Error';
        response.ok = false;
      } else {
        response.data = body.data;
      }
    } else {
      response.statusMessage = '系统异常';
    }
    return response;
  })
});

// 添加第三方插件
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI);

// 添加自定义插件
import filePost from './plugin-vue/file-post'
Vue.use(filePost);
import message from './plugin-vue/message'
Vue.use(message);

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   render: h => h(App)
// })


// 0. 如果使用模块化机制编程， 要调用 Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点在讨论嵌套路由。
const routes = [
  {path: '/', redirect: '/login'},
  {path: '/login', name: "login", component: login},
  {
    path: '/app', redirect: '/app/home', component: index,
    children: [
      {path: 'home', name: "home", component: home},
      {path: 'upload', name: "upload", component: upload},
      {path: 'file_list', name: "file_list", component: file_list},
      {path: 'global_classification_setting', name: "global_classification_setting", component: global_classification_setting},
      {path: 'global_encryption_setting', name: "global_encryption_setting", component: global_encryption_setting},
      // this demo
      {path: 'attendance', component: attendance},
      {path: 'leave_record', component: leave_record},
      {path: 'overtime_pass', component: overtime_pass},
      {path: 'overtime_record', component: overtime_record},
      {path: 'overtime_petitioner', component: overtime_petitioner},
      {path: 'import_data', component: import_data}
    ]
  }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  mode: 'history',
  routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  store,
  router,
  render: h => h(App)
  //render: h => h(index)
}).$mount('#app');

// 现在，应用已经启动了！
