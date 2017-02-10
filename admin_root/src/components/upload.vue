<template lang="html">
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        XX管理系统
        <small>Version 2.0</small>
      </h1>
      <ol class="breadcrumb">
        <li>
          <router-link to="/app/home"><i class="glyphicon glyphicon-home"></i> 主页</router-link>
        </li>
        <!--<li class="active">Dashboard</li>-->
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <div class="row">
        <!-- left column -->
        <div class="col-md-8">
          <!-- general form elements -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">文件上传</h3>
            </div>
            <!-- /.box-header -->
            <!-- form start -->
            <div class="box-body">
              <el-form id="upload" ref="form" :model="form" label-width="80px">
                <el-form-item label="文件名称">
                  <el-input v-model="form.filename"></el-input>
                </el-form-item>
                <el-form-item label="文件上传">
                  <button type="button" class="dis_button el-button el-button--primary">
                    <span>点击上传</span>
                    <input type="file" id="File" class="dis_input" name="file" @change="change">
                  </button>
                  <span class="dis_filename" v-html="upload_file"></span>
                </el-form-item>
                <el-form-item label="输入作者">
                  <el-input v-model="form.author"></el-input>
                </el-form-item>
                <el-form-item label="文件类型">
                  <el-select v-model="form.type" placeholder="请选择">
                    <el-option
                      v-for="item in types"
                      :label="item.class_name"
                      :value="item.class_base">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="文件等级">
                  <el-select v-model="form.level" placeholder="请选择">
                    <el-option
                      v-for="item in levels"
                      :label="item.level_name"
                      :value="item.level_base">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <!-- /.box-body -->
            <div class="box-footer">
              <button type="button" class="btn btn-primary" @click="upload">Submit</button>
            </div>
          </div>
          <!-- /.box -->
        </div>
        <!--/.col (left) -->
      </div>
      <!-- /.row -->
      <div style="padding: 10px 0px; text-align: center;">
        <div class="text-muted">Excuse the ads! We need some help to keep our site up.</div>
      </div>
    </section>
  </div>
</template>
<script lang="babel">
  import store from '../store'
  export default {
    data () {
      return {
        upload_file: '',
        form: {
          filename: '',
          author: '',
          type: '',
          level: ''
        },
        types: [],
        levels: []
      }
    },
    mounted (){
      // 获取文件分类
      this.$http.post('/api/getClassificationInfo').then(res => {
        if (res.data.status == 0) {
          this.types = res.data.result;
        }
      }, err => {
        console.log(err);
      });
      // 获取文件加密等级
      this.$http.post('/api/getEncryptionLevelInfo').then(res => {
        if (res.data.status == 0) {
          this.levels = res.data.result;
        }
      }, err => {
        console.log(err);
      });
    },
    methods: {
      change: function (e) {
        let val = e.target.value;
        this.upload_file = val.substring(val.lastIndexOf("\\") + 1);
      },
      upload: function () {
        this._post_upload('upload', {
          filename: this.form.filename,
          author: this.form.author,
          type: this.form.type,
          level: this.form.level
        });
      }
    }
  }
</script>
<style lang="less">
  .dis_button {
    position: relative;
  }

  .dis_input {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .dis_filename {
    margin-left: 10px;
  }
</style>
