/**
 * Created by administrator on 16/11/22.
 */

export default{
  install(Vue, options){
    Vue.test = function () {
      console.log(1);
      return 2;
    };

    Vue.prototype.test = function () {
      console.log(3);
      return 4;
    }
  }
}
