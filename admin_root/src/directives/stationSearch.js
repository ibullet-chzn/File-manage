/**
 * Created by administrator on 16/11/2.
 */

import Vue from 'vue'
import Vuex from 'vuex'

export default {
  inserted: function (el, binding) {
    // 车站信息解析
    const station_names = require('../station_name');
    const stationList = {};
    for (let i = 0; i < station_names.split('@').length; i++) {
      let parsing_middleware = station_names.split('@')[i].split('|');
      stationList[parsing_middleware[5]] = {};
      stationList[parsing_middleware[5]].city = parsing_middleware[1];
      stationList[parsing_middleware[5]].code = parsing_middleware[2];
      stationList[parsing_middleware[5]].fullname = parsing_middleware[3];
      stationList[parsing_middleware[5]].shortname = parsing_middleware[4];
      stationList['length'] = i + 1;
    }
    // 添加 搜索input 和 模糊匹配显示区ul (包括主体样式)
    var header = document.createElement('div');
    header.className = 'header';
    var close = document.createElement('div');
    close.className = 'close';

    var input = document.createElement('input');
    var ul = document.createElement('ul');

    // 车站检索事件
    input.addEventListener('input', function () {
      let val = input.value;
      let matchList = [];
      // 根据用户输入,进行模糊匹配
      // matchList里只记录id,完成后去重
      for (let i = 0; i < stationList.length; i++) {
        let stationObj = {};
        stationObj.code = stationList[i].code;
        stationObj.city = stationList[i].city;
        if (stationList[i].city.indexOf(val) > -1) {
          matchList.push(stationObj);
          continue;
        }
        if (stationList[i].fullname.indexOf(val) > -1) {
          matchList.push(stationObj);
          continue;
        }
        if (stationList[i].shortname.indexOf(val) > -1) {
          matchList.push(stationObj);
        }
      }
      // 根据匹配结果添加匹配列表
      ul.innerHTML = '';
      if (matchList.length == 0) {
        var empty = document.createElement('li');
        empty.innerHTML = '啥也没搜到';
        ul.appendChild(empty);
      }
      for (let i = 0; i < matchList.length; i++) {
        var li = document.createElement('li');
        li.addEventListener('click', function () {
          binding.value.closeEvent(event, matchList[i].code, matchList[i].city);
        });
        li.innerHTML = matchList[i].city;
        ul.appendChild(li);
      }
      el.appendChild(ul);
    });
    header.appendChild(close);
    header.appendChild(input);
    el.appendChild(header);
  }
}
