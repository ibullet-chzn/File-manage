/**
 * Created by administrator on 16/11/22.
 */

export default {
  install(Vue, options){
    /**
     * post请求 下载文件
     * 如果返回正确，则直接返回 blob 二进制文件
     * @param value
     * @param name
     */
    const postDownload = function (value, name = 'file') {
      this.$http.post('/api/download', {
        [name]: value
      }).then(res => {
        // 此处为正常返回的错误结果
        if (res.data.status == -201) {
          this.$message({type: 'error', message: res.data.errMessage});
        }
      }, err => {
        console.log(err);
      });
    };
    Vue._post_download = postDownload;
    Vue.prototype._post_download = postDownload;

    /**
     * 异步上传文件 文件 数据 可同时传输
     */
    const postUpload = function (formId, objectData) {
      let data = new FormData(document.getElementById(formId));
      console.log(data);
      for (let key in objectData) {
        if (objectData.hasOwnProperty(key)) {
          data.append(key, objectData[key]);
        }
      }
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload", true);
      xhr.onload = function () {
        let response = JSON.parse(xhr.response);
        if (xhr.status == 200) {
          Vue._callout('success', '图片上传成功');
        } else {
          console.log(response);
        }
      };
      xhr.send(data);
    };
    Vue._post_upload = postUpload;
    Vue.prototype._post_upload = postUpload;
  }
}
