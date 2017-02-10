/**
 * Created by administrator on 16/11/17.
 */

import Vue from 'vue'

Vue.filter('datetime', function (date) {
  let format = 'YYYY-MM-DD HH:mm:ss';
  // 若时间为空,则返回当前时间
  date = date ? new Date(date) : new Date();
  // 匹配年份
  if (/(Y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 匹配小时
  let dateHours = '';
  if (/(H+)/.test(format)) {
    dateHours = date.getHours();
    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? dateHours : ("00" + dateHours).substr(("" + dateHours).length));
  }
  // 匹配 月份 日期 分钟 秒钟 季度 毫秒
  const getDate = {
    "M+": date.getMonth() + 1,
    "D+": date.getDate(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    "S+": date.getMilliseconds()
  };
  for (let k in getDate) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? getDate[k] : ("00" + getDate[k]).substr(("" + getDate[k]).length));
    }
  }
  return format;
});

Vue.filter('tf_levels', function (value) {
  const encryption = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'S',
    5: 'SS',
    6: 'SSS',
  };
  return encryption[value];
});
