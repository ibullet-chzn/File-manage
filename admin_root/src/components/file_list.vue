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
        <div class="col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">文件列表</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <data-tables :data='tableData'
                           :tool-bar-def='toolBarDef'
                           :row-action-def='rowActionsDef'>
                <el-table-column prop="id" label="文件编号" sortable="custom"></el-table-column>
                <el-table-column label="文件名称" sortable="custom">
                  <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>地址: {{ scope.row.file_path }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag>{{ scope.row.file_name }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column prop="author" label="文件作者" sortable="custom"></el-table-column>
                <el-table-column prop="type" label="文件分类" sortable="custom"></el-table-column>
                <el-table-column label="加密等级" sortable="custom">
                  <template scope="scope">
                    {{ scope.row.level | tf_levels }}
                  </template>
                </el-table-column>
                <el-table-column label="上传时间" sortable="custom" width="180">
                  <template scope="scope">
                    {{ scope.row.create_time | datetime }}
                  </template>
                </el-table-column>
              </data-tables>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
  </div>
</template>
<script lang="babel">
  import DataTables from 'vue-data-tables'
  export default {
    name: 'app',
    components: {
      DataTables
    },
    data() {
      return {
        tableData: [],
        rowActionsDef: this.getRowActionsDef(),
        toolBarDef: this.getToolBarDef()
      }
    },
    created() {
      this.$http.post('/api/getFileList', {}).then(res => {
        if (res.data.status == 0) {
          this.tableData = res.data.result;
        }
      }, err => {
        console.log(err);
      });
    },
    methods: {
      getToolBarDef: function () {
        let actions = [{
          name: '文件上传',
          handler: () => {
            this.$router.push('/app/upload');
          },
          icon: 'plus'
        }];
        return {
          actions: {
            width: 5,
            def: actions
          },
          filters: {
            width: 14,
            prop: 'level',
            def: [
              {
                'code': '1',
                'name': 'A'
              },
              {
                'code': '2',
                'name': 'B'
              },
              {
                'code': '3',
                'name': 'C'
              },
              {
                'code': '4',
                'name': 'S'
              },
              {
                'code': '5',
                'name': 'SS'
              },
              {
                'code': '6',
                'name': 'SSS'
              }
            ]
          }
        }
      },
      getRowActionsDef: function () {
        return [{
          type: 'primary',
          handler: row => {
            this._post_download(row.file_path);
          },
          tip: '下载'
        }]
      }
    }
  }
</script>
<style lang="less">

</style>
